import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import Link from "next/link";
import { ArrowLeft, Film } from "lucide-react";

export const metadata = {
  title: "Admin Login | VCET State Level Short Film Competition",
  description: "Secure login portal for VCET Short Film Competition administration.",
};

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) {
    redirect("/admin/dashboard");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#050505",
        color: "#fff",
        padding: "1.5rem",
      }}
    >
      {/* Top bar */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1280px",
          width: "100%",
          margin: "0 auto",
          paddingBottom: "1rem",
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "12px",
            color: "#737373",
            textDecoration: "none",
            transition: "color 0.18s ease",
          }}
        >
          <ArrowLeft size={14} color="#f5c451" />
          Back to Competition Website
        </Link>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "7px",
              background: "linear-gradient(135deg, #f5c451, #d9a93a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Film size={14} color="#000" />
          </div>
          <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#525252", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            VCET Official System
          </span>
        </div>
      </header>

      {/* Background glow */}
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(245,196,81,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Center form */}
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 0",
          position: "relative",
          zIndex: 1,
        }}
      >
        <AdminLoginForm />
      </main>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          paddingTop: "1.25rem",
          fontSize: "11px",
          color: "#404040",
        }}
      >
        © 2026 Velalar College of Engineering and Technology. All rights reserved.
      </footer>
    </div>
  );
}
