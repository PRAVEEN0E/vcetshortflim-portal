import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { PaymentClient } from "@/components/payment/PaymentClient";
import { getPaymentConfig } from "@/actions/payment";
import { getSystemSettings } from "@/actions/admin";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Payment & Verification | VCET State Level Short Film Competition 2026",
  description:
    "Complete ₹500 team entry fee via UPI QR code and upload payment screenshot for verification.",
};

export default async function PaymentPage() {
  const settings = await getSystemSettings();
  if (!settings.isRegistrationOpen) {
    redirect("/register");
  }

  const paymentConfig = await getPaymentConfig();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#050505",
        color: "#fff",
      }}
    >
      <Navbar />

      <main style={{ padding: "2.5rem 1.25rem", width: "100%", boxSizing: "border-box", flex: 1 }}>
        <div style={{ width: "100%", maxWidth: "1100px", margin: "0 auto" }}>
          <PaymentClient
            upiId={paymentConfig.upiId}
            qrUrl={paymentConfig.qrUrl || "/images/vcet-upi-qr.svg"}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
