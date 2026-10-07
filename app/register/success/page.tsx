import { Suspense } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { SuccessCard } from "@/components/registration/SuccessCard";
import { Loader2 } from "lucide-react";

export const metadata = {
  title: "Registration Successful | VCET State Level Short Film Competition",
  description: "Official registration acknowledgment for VCET Short Film Competition 2026.",
};

export default function RegistrationSuccessPage() {
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

      <main style={{ flex: 1, padding: "4rem 1.5rem 5rem", position: "relative" }}>
        {/* Background glow */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "500px",
            background: "radial-gradient(ellipse, rgba(245,196,81,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Suspense
            fallback={
              <div style={{ padding: "4rem", textAlign: "center" }}>
                <Loader2
                  size={32}
                  color="#f5c451"
                  style={{ margin: "0 auto 12px", animation: "spin 1s linear infinite" }}
                />
                <p style={{ fontSize: "13px", color: "#737373" }}>Loading confirmation receipt...</p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            }
          >
            <SuccessCard />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
