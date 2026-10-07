"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutAdminAction } from "@/actions/admin";
import { Film, LogOut, ArrowLeft, ShieldCheck } from "lucide-react";
import { useState } from "react";

interface AdminNavbarProps {
  adminEmail?: string;
}

export function AdminNavbar({ adminEmail = "admin@vcet.ac.in" }: AdminNavbarProps) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logoutAdminAction();
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error("Logout failed:", e);
      setLoggingOut(false);
    }
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        background: "rgba(5,5,5,0.97)",
        borderBottom: "1px solid rgba(245,196,81,0.15)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
        }}
      >
        {/* Logo */}
        <Link
          href="/admin/dashboard"
          style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}
        >
          <img
            src="/images/vcet-film-fest-logo.png"
            alt="VCET Film Fest Admin"
            style={{
              height: "40px",
              width: "auto",
              objectFit: "contain",
              borderRadius: "6px",
            }}
          />
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "4px 8px",
              borderRadius: "6px",
              background: "rgba(245,196,81,0.12)",
              border: "1px solid rgba(245,196,81,0.25)",
              color: "#f5c451",
              fontSize: "10px",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            PORTAL
          </div>
        </Link>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "1px",
            }}
            className="email-display"
          >
            <span style={{ fontSize: "11px", color: "#525252" }}>Signed in as</span>
            <span
              style={{
                fontSize: "11px",
                fontFamily: "monospace",
                color: "#f5c451",
                maxWidth: "180px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {adminEmail}
            </span>
          </div>

          <Link
            href="/"
            target="_blank"
            className="btn-ghost"
            style={{ fontSize: "11px", padding: "6px 12px" }}
          >
            <ArrowLeft size={12} />
            Public Site
          </Link>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="btn-danger"
            style={{ fontSize: "11px", padding: "6px 12px" }}
          >
            <LogOut size={13} />
            {loggingOut ? "Signing out..." : "Logout"}
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .email-display { display: none !important; }
        }
      `}</style>
    </header>
  );
}
