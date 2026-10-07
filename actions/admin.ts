"use server";

import { prisma } from "@/lib/prisma";
import {
  verifyAdminCredentials,
  createAdminSession,
  destroyAdminSession,
  getAdminSession,
} from "@/lib/auth";
import { revalidatePath } from "next/cache";

export interface DashboardStats {
  totalRegistrations: number;
  pendingPayments: number;
  verifiedPayments: number;
  rejectedPayments: number;
  approvedRegistrations: number;
  rejectedRegistrations: number;
}

export interface AdminFilters {
  search?: string;
  institutionType?: string;
  district?: string;
  paymentStatus?: string;
  registrationStatus?: string;
  sort?: "newest" | "oldest";
}

/**
 * Admin Login Action
 */
export async function loginAdminAction(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return { success: false, error: "Email and password are required." };
    }

    const isValid = await verifyAdminCredentials(email, password);
    if (!isValid) {
      return { success: false, error: "Invalid email or password." };
    }

    await createAdminSession(email);
    return { success: true };
  } catch (error: any) {
    console.error("Login action error:", error);
    return { success: false, error: "An error occurred during login." };
  }
}

/**
 * Admin Logout Action
 */
export async function logoutAdminAction() {
  await destroyAdminSession();
  return { success: true };
}

/**
 * Get Dashboard Statistics & Filtered Registrations
 */
export async function getAdminDashboardData(filters: AdminFilters = {}) {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Unauthorized access. Please log in as an administrator.");
  }

  // 1. Get statistics
  const [
    totalRegistrations,
    pendingPayments,
    verifiedPayments,
    rejectedPayments,
    approvedRegistrations,
    rejectedRegistrations,
  ] = await Promise.all([
    prisma.registration.count(),
    prisma.registration.count({ where: { paymentStatus: "PENDING" } }),
    prisma.registration.count({ where: { paymentStatus: "VERIFIED" } }),
    prisma.registration.count({ where: { paymentStatus: "REJECTED" } }),
    prisma.registration.count({ where: { registrationStatus: "APPROVED" } }),
    prisma.registration.count({ where: { registrationStatus: "REJECTED" } }),
  ]);

  const stats: DashboardStats = {
    totalRegistrations,
    pendingPayments,
    verifiedPayments,
    rejectedPayments,
    approvedRegistrations,
    rejectedRegistrations,
  };

  // 2. Build where filter for registrations table
  const where: any = {};

  if (filters.search && filters.search.trim()) {
    const s = filters.search.trim();
    where.OR = [
      { registrationNumber: { contains: s, mode: "insensitive" } },
      { teamName: { contains: s, mode: "insensitive" } },
      { leaderName: { contains: s, mode: "insensitive" } },
      { filmTitle: { contains: s, mode: "insensitive" } },
      { leaderPhone: { contains: s, mode: "insensitive" } },
    ];
  }

  if (filters.institutionType && filters.institutionType !== "ALL") {
    where.institutionType = filters.institutionType;
  }

  if (filters.district && filters.district !== "ALL") {
    where.district = { contains: filters.district, mode: "insensitive" };
  }

  if (filters.paymentStatus && filters.paymentStatus !== "ALL") {
    where.paymentStatus = filters.paymentStatus;
  }

  if (filters.registrationStatus && filters.registrationStatus !== "ALL") {
    where.registrationStatus = filters.registrationStatus;
  }

  const orderBy = {
    createdAt: filters.sort === "oldest" ? ("asc" as const) : ("desc" as const),
  };

  const registrations = await prisma.registration.findMany({
    where,
    orderBy,
    include: {
      members: true,
    },
  });

  return {
    stats,
    registrations,
  };
}

/**
 * Get Single Registration by ID
 */
export async function getRegistrationById(id: string) {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Unauthorized. Admin access required.");
  }

  const registration = await prisma.registration.findUnique({
    where: { id },
    include: {
      members: true,
    },
  });

  return registration;
}

/**
 * Update Payment Status (VERIFIED / REJECTED)
 */
export async function updatePaymentStatusAction(
  id: string,
  newStatus: "VERIFIED" | "REJECTED"
) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Admin session required." };
  }

  try {
    const updated = await prisma.registration.update({
      where: { id },
      data: { paymentStatus: newStatus },
    });

    revalidatePath("/admin/dashboard");
    revalidatePath(`/admin/registrations/${id}`);

    return {
      success: true,
      registration: updated,
    };
  } catch (error: any) {
    console.error("Error updating payment status:", error);
    return { success: false, error: "Failed to update payment status." };
  }
}

/**
 * Update Registration Status (APPROVED / REJECTED)
 */
export async function updateRegistrationStatusAction(
  id: string,
  newStatus: "APPROVED" | "REJECTED"
) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Admin session required." };
  }

  try {
    const updated = await prisma.registration.update({
      where: { id },
      data: { registrationStatus: newStatus },
    });

    revalidatePath("/admin/dashboard");
    revalidatePath(`/admin/registrations/${id}`);

    return {
      success: true,
      registration: updated,
    };
  } catch (error: any) {
    console.error("Error updating registration status:", error);
    return { success: false, error: "Failed to update registration status." };
  }
}

/**
 * Get System Settings
 */
export async function getSystemSettings() {
  try {
    const settings = await prisma.systemSettings.findUnique({
      where: { id: "global" },
    });
    return settings || { isRegistrationOpen: true };
  } catch (error) {
    // If table doesn't exist yet (before migration), default to true
    return { isRegistrationOpen: true };
  }
}

/**
 * Toggle Registration Lock
 */
export async function toggleRegistrationLockAction(isOpen: boolean) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized." };
  }

  try {
    await prisma.systemSettings.upsert({
      where: { id: "global" },
      update: { isRegistrationOpen: isOpen },
      create: { id: "global", isRegistrationOpen: isOpen },
    });
    
    revalidatePath("/");
    revalidatePath("/register");
    revalidatePath("/register/payment");
    revalidatePath("/admin/dashboard");
    
    return { success: true };
  } catch (error: any) {
    console.error("Error toggling registration lock:", error);
    return { success: false, error: "Failed to toggle registration lock." };
  }
}
