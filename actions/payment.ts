"use server";

import { prisma } from "@/lib/prisma";

export interface PaymentConfig {
  upiId: string;
  amount: number;
  qrUrl?: string;
}

export async function getPaymentConfig(): Promise<PaymentConfig> {
  return {
    upiId: process.env.NEXT_PUBLIC_UPI_ID || "vcetfilms@okaxis",
    amount: 500,
    qrUrl: process.env.NEXT_PUBLIC_PAYMENT_QR_URL || "/images/vcet-upi-qr.png",
  };
}

export async function getPaymentStatus(registrationNumber: string) {
  try {
    const reg = await prisma.registration.findUnique({
      where: { registrationNumber },
      select: {
        registrationNumber: true,
        paymentStatus: true,
        registrationStatus: true,
        teamName: true,
        filmTitle: true,
      },
    });

    if (!reg) return null;
    return reg;
  } catch (error) {
    console.error("Error retrieving payment status:", error);
    return null;
  }
}
