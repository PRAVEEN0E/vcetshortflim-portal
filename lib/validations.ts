import { z } from "zod";

// Phone number regex for standard 10-digit Indian phone numbers (optionally prefixed with +91 or 0)
export const phoneRegex = /^(?:(?:\+|00)91[\s-]?)?[6-9]\d{9}$/;

export const memberRoles = [
  "Director",
  "Actor",
  "Cinematographer",
  "Editor",
  "Writer",
  "Producer",
  "Other",
] as const;

export const teamMemberSchema = z.object({
  name: z.string().trim().min(2, "Member name must be at least 2 characters"),
  role: z.enum(memberRoles, {
    errorMap: () => ({ message: "Please select a valid role" }),
  }),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().trim().email("Enter a valid email address"),
});

export const institutionSchema = z.object({
  institutionType: z.enum(["SCHOOL", "COLLEGE"], {
    errorMap: () => ({ message: "Please select School or College" }),
  }),
  institutionName: z
    .string()
    .trim()
    .min(3, "Institution name must be at least 3 characters"),
  district: z.string().trim().min(2, "District name is required"),
  city: z.string().trim().min(2, "City name is required"),
});

export const teamDetailsSchema = z.object({
  teamName: z.string().trim().min(2, "Team name must be at least 2 characters"),
  leaderName: z
    .string()
    .trim()
    .min(2, "Team leader name must be at least 2 characters"),
  leaderPhone: z
    .string()
    .trim()
    .regex(phoneRegex, "Enter a valid 10-digit mobile number for team leader"),
  leaderEmail: z.string().trim().email("Enter a valid email for team leader"),
});

export const filmDetailsSchema = z.object({
  filmTitle: z.string().trim().min(2, "Film title is required"),
  directorName: z.string().trim().min(2, "Director name is required"),
  filmDuration: z
    .string()
    .trim()
    .refine((val) => {
      // accepts formats like "8", "8:30", "08:30", "9 mins", "10 min"
      const cleaned = val.replace(/[^0-9.:]/g, "");
      if (cleaned.includes(":")) {
        const [mins, secs] = cleaned.split(":");
        const m = parseInt(mins, 10);
        const s = parseInt(secs || "0", 10);
        return !isNaN(m) && m <= 10 && (m < 10 || s === 0);
      }
      const num = parseFloat(cleaned);
      return !isNaN(num) && num > 0 && num <= 10;
    }, "Film duration must not exceed 10 minutes"),
  filmDescription: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters"),
  driveLink: z
    .string()
    .trim()
    .url("Enter a valid Google Drive URL")
    .refine(
      (url) =>
        url.includes("drive.google.com") ||
        url.includes("docs.google.com") ||
        url.startsWith("https://"),
      "Please provide a public Google Drive link"
    ),
});

export const reviewAgreementsSchema = z.object({
  isOriginalWork: z.literal(true, {
    errorMap: () => ({
      message: "You must confirm that the film is original work",
    }),
  }),
  hasAgreedRules: z.literal(true, {
    errorMap: () => ({
      message: "You must read and agree to the competition rules",
    }),
  }),
});

// Full Registration Form Schema (for the multi-step registration)
export const fullRegistrationSchema = institutionSchema
  .merge(teamDetailsSchema)
  .merge(filmDetailsSchema)
  .merge(reviewAgreementsSchema)
  .extend({
    members: z
      .array(teamMemberSchema)
      .min(1, "At least 1 team member is required")
      .max(5, "Maximum 5 team members allowed"),
  });

export type TeamMemberInput = z.infer<typeof teamMemberSchema>;
export type FullRegistrationInput = z.infer<typeof fullRegistrationSchema>;

// Payment Submission Schema (submitted when uploading payment screenshot)
export const paymentSubmissionSchema = z.object({
  registrationData: fullRegistrationSchema,
  upiId: z.string().trim().min(3, "UPI ID is required"),
});

// Admin Login Schema
export const adminLoginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});
