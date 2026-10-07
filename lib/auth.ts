import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || "vcet_shortfilm_fest_2026_super_secret_jwt_key_991823"
);

const COOKIE_NAME = "vcet_admin_session";

export interface AdminSession {
  email: string;
  role: "ADMIN";
}

/**
 * Verify admin credentials against environment variables
 */
export async function verifyAdminCredentials(
  email: string,
  passwordPlain: string
): Promise<boolean> {
  const configuredEmail = (process.env.ADMIN_EMAIL || "admin@vcet.ac.in").toLowerCase();
  if (email.toLowerCase() !== configuredEmail) {
    return false;
  }

  // 1. If ADMIN_PASSWORD_HASH is set, compare with bcrypt
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  if (passwordHash) {
    const isMatch = await bcrypt.compare(passwordPlain, passwordHash);
    if (isMatch) return true;
  }

  // 2. Direct comparison with ADMIN_PASSWORD environment variable (default: vcet@shortfilm2026)
  const configuredPlain = process.env.ADMIN_PASSWORD || "vcet@shortfilm2026";
  if (passwordPlain === configuredPlain) {
    return true;
  }

  return false;
}

/**
 * Create admin session JWT and set HTTP-only cookie
 */
export async function createAdminSession(email: string): Promise<string> {
  const token = await new SignJWT({ email, role: "ADMIN" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(JWT_SECRET);

  const cookieStore = await cookies();
  cookieStore.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12, // 12 hours
  });

  return token;
}

/**
 * Destroy admin session by clearing cookie
 */
export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Get current admin session from cookie
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (payload.role === "ADMIN" && typeof payload.email === "string") {
      return {
        email: payload.email,
        role: "ADMIN",
      };
    }
    return null;
  } catch {
    return null;
  }
}
