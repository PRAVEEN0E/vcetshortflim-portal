import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { MultiStepRegistrationForm } from "@/components/registration/MultiStepRegistrationForm";
import { Film, Sparkles } from "lucide-react";

export const metadata = {
  title: "Team Registration | VCET State Level Short Film Competition 2026",
  description:
    "Register your school or college short film for the VCET State Level Short Film Competition 2026. Entry fee ₹500 per team.",
};

export default function RegisterPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#050505", color: "#fff" }}>
      <Navbar />

      <main style={{ padding: "2.5rem 1.25rem", width: "100%", boxSizing: "border-box", flex: 1 }}>
        <div style={{ width: "100%", maxWidth: "1100px", margin: "0 auto" }}>
          {/* Page Header */}
          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 3rem" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                borderRadius: "9999px",
                background: "rgba(245,196,81,0.08)",
                border: "1px solid rgba(245,196,81,0.25)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#f5c451",
                marginBottom: "1.25rem",
              }}
            >
              <Sparkles size={12} />
              Public Registration Portal · No Login Required
            </div>
            <h1
              style={{
                fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                fontSize: "clamp(1.75rem, 5vw, 3rem)",
                fontWeight: 900,
                color: "#fff",
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                marginBottom: "1rem",
              }}
            >
              REGISTER YOUR{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #ffd76a, #f5c451, #d9a93a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                SHORT FILM
              </span>
            </h1>
            <p style={{ fontSize: "14px", color: "#a3a3a3", lineHeight: 1.7 }}>
              Complete the 5 steps below with your team details, synopsis, and public Google Drive link to
              reserve your spot.
            </p>
          </div>

          {/* Multi-step Form */}
          <MultiStepRegistrationForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
