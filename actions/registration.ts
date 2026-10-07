"use server";

import { prisma } from "@/lib/prisma";
import { uploadPaymentScreenshot } from "@/lib/cloudinary";
import { fullRegistrationSchema } from "@/lib/validations";

export interface RegistrationSubmissionResult {
  success: boolean;
  registrationNumber?: string;
  error?: string;
}

export async function submitRegistration(
  formData: FormData
): Promise<RegistrationSubmissionResult> {
  try {
    const rawDataJson = formData.get("registrationData") as string;
    const upiId = (formData.get("upiId") as string) || "Not provided";
    const screenshotFile = formData.get("screenshot") as File | null;

    if (!rawDataJson) {
      return { success: false, error: "Missing registration payload." };
    }

    if (!screenshotFile || !(screenshotFile instanceof File) || screenshotFile.size === 0) {
      return { success: false, error: "Payment screenshot is required." };
    }

    // 1. Validate file size and type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(screenshotFile.type)) {
      return {
        success: false,
        error: "Invalid file type. Only JPG, JPEG, PNG, and WEBP images are allowed.",
      };
    }

    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (screenshotFile.size > MAX_FILE_SIZE) {
      return {
        success: false,
        error: "Screenshot file size exceeds 10 MB. Please upload a smaller image.",
      };
    }

    // 2. Validate registration data with Zod
    let parsedData;
    try {
      const parsedJson = JSON.parse(rawDataJson);
      parsedData = fullRegistrationSchema.parse(parsedJson);
    } catch (err: any) {
      if (err?.errors && Array.isArray(err.errors)) {
        const firstError = err.errors[0]?.message || "Validation failed";
        return { success: false, error: firstError };
      }
      return { success: false, error: "Invalid form data provided." };
    }

    // 3. Prevent duplicate submission (check by leader phone or drive link)
    const existingRegistration = await prisma.registration.findFirst({
      where: {
        OR: [
          { leaderPhone: parsedData.leaderPhone },
          { driveLink: parsedData.driveLink },
        ],
      },
      select: { registrationNumber: true, leaderPhone: true, driveLink: true },
    });

    if (existingRegistration) {
      if (existingRegistration.leaderPhone === parsedData.leaderPhone) {
        return {
          success: false,
          error: `A registration with mobile number ${parsedData.leaderPhone} already exists (${existingRegistration.registrationNumber}).`,
        };
      }
      return {
        success: false,
        error: "This film submission link has already been registered.",
      };
    }

    // 4. Generate unique registration number (Format: REG-2026-0001)
    const count = await prisma.registration.count();
    let regNumber = `REG-2026-${String(count + 1).padStart(4, "0")}`;

    // Ensure uniqueness in case of past deletes or race conditions
    let exists = await prisma.registration.findUnique({
      where: { registrationNumber: regNumber },
    });
    let attempt = 1;
    while (exists && attempt < 100) {
      regNumber = `REG-2026-${String(count + 1 + attempt).padStart(4, "0")}`;
      exists = await prisma.registration.findUnique({
        where: { registrationNumber: regNumber },
      });
      attempt++;
    }

    // 5. Upload screenshot to Cloudinary
    const arrayBuffer = await screenshotFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let screenshotUrl: string;
    try {
      screenshotUrl = await uploadPaymentScreenshot(
        buffer,
        regNumber,
        screenshotFile.type
      );
    } catch (uploadError: any) {
      console.error("Cloudinary upload failure:", uploadError);
      return {
        success: false,
        error: "Failed to upload payment screenshot. Please try again.",
      };
    }

    // 6. Save in Neon PostgreSQL using transaction
    const newRecord = await prisma.$transaction(async (tx) => {
      const created = await tx.registration.create({
        data: {
          registrationNumber: regNumber,
          institutionType: parsedData.institutionType,
          institutionName: parsedData.institutionName,
          district: parsedData.district,
          city: parsedData.city,
          teamName: parsedData.teamName,
          leaderName: parsedData.leaderName,
          leaderPhone: parsedData.leaderPhone,
          leaderEmail: parsedData.leaderEmail,
          filmTitle: parsedData.filmTitle,
          directorName: parsedData.directorName,
          filmDuration: parsedData.filmDuration,
          filmDescription: parsedData.filmDescription,
          driveLink: parsedData.driveLink,
          paymentScreenshotUrl: screenshotUrl,
          upiId: upiId || "DIRECT_UPI_QR",
          paymentAmount: 500,
          paymentStatus: "PENDING",
          registrationStatus: "PENDING",
          members: {
            create: parsedData.members.map((member) => ({
              name: member.name,
              role: member.role,
              phone: member.phone,
              email: member.email,
            })),
          },
        },
      });

      return created;
    });

    return {
      success: true,
      registrationNumber: newRecord.registrationNumber,
    };
  } catch (error: any) {
    console.error("Registration submission error:", error);
    return {
      success: false,
      error:
        error?.message ||
        "An unexpected error occurred while processing your registration. Please try again.",
    };
  }
}
