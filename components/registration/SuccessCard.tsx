"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import { CheckCircle2, Clock, Download, Home, Film, Building, Users, ShieldCheck, Award } from "lucide-react";

export function SuccessCard() {
  const searchParams = useSearchParams();
  const regNumber = searchParams.get("regNumber") || "REG-2026-0001";
  const teamName = searchParams.get("team") || "Registered Team";
  const filmTitle = searchParams.get("film") || "Short Film Entry";
  const institutionName = searchParams.get("institution") || "Velalar College of Engineering and Technology";

  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.55 },
        colors: ["#f5c451", "#ffd76a", "#d9a93a", "#ffffff", "#f5f5f5"],
      });
      setTimeout(() => {
        confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 }, colors: ["#f5c451", "#fff"] });
        confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 }, colors: ["#f5c451", "#fff"] });
      }, 400);
    } catch {
      // Ignore if confetti fails
    }
  }, []);

  const details = [
    { label: "Team Name", value: teamName, icon: Users },
    { label: "Film Title", value: `"${filmTitle}"`, icon: Film },
    { label: "Institution", value: institutionName, icon: Building },
  ];

  return (
    <div style={{ maxWidth: "640px", margin: "0 auto" }}>
      <div
        id="confirmation-slip"
        style={{
          background: "rgba(13,13,13,0.95)",
          border: "1px solid rgba(245,196,81,0.35)",
          borderRadius: "24px",
          padding: "3rem 2.5rem",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 0 60px rgba(245,196,81,0.08), 0 20px 60px rgba(0,0,0,0.8)",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "-30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "400px",
            height: "300px",
            background: "radial-gradient(ellipse, rgba(245,196,81,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Success icon */}
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "rgba(74,222,128,0.1)",
            border: "2px solid rgba(74,222,128,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#4ade80",
            margin: "0 auto 1.5rem",
            boxShadow: "0 0 24px rgba(74,222,128,0.15)",
          }}
        >
          <CheckCircle2 size={38} />
        </div>

        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#f5c451",
              marginBottom: "8px",
            }}
          >
            Velalar College of Engineering and Technology
          </div>
          <h1
            style={{
              fontFamily: "'Space Grotesk', 'Inter', sans-serif",
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              fontWeight: 900,
              color: "#fff",
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
              marginBottom: "8px",
            }}
          >
            Registration Successful!
          </h1>
          <p style={{ fontSize: "13px", color: "#737373" }}>
            Your registration has been submitted successfully.
          </p>
        </div>

        {/* Reg number highlight */}
        <div
          style={{
            background: "#0a0a0a",
            border: "1px solid rgba(245,196,81,0.3)",
            borderRadius: "16px",
            padding: "1.5rem",
            textAlign: "center",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#737373",
              marginBottom: "8px",
            }}
          >
            Unique Registration Number
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
              fontWeight: 900,
              letterSpacing: "0.08em",
              background: "linear-gradient(135deg, #ffd76a, #f5c451, #d9a93a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {regNumber}
          </div>
          <div style={{ fontSize: "11px", color: "#525252", marginTop: "6px" }}>
            Please quote this number in all communications.
          </div>
        </div>

        {/* Details */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "1.25rem 0",
            marginBottom: "1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "0",
          }}
        >
          {details.map((d, i) => {
            const Icon = d.icon;
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: i < details.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "12px",
                    color: "#737373",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={14} color="#f5c451" />
                  {d.label}:
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#f5f5f5",
                    textAlign: "right",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "240px",
                  }}
                >
                  {d.value}
                </span>
              </div>
            );
          })}
          {/* Payment status row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "10px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              marginTop: "4px",
            }}
          >
            <span style={{ fontSize: "12px", color: "#737373" }}>Payment Status:</span>
            <span
              className="badge badge-pending"
              style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}
            >
              <Clock size={11} />
              Pending Verification
            </span>
          </div>
        </div>

        {/* Notice */}
        <div
          style={{
            background: "#0a0a0a",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "12px",
            padding: "1rem 1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginBottom: "1.75rem",
            fontSize: "12px",
            color: "#a3a3a3",
            lineHeight: 1.6,
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
            <ShieldCheck size={15} color="#f5c451" style={{ flexShrink: 0, marginTop: "1px" }} />
            Your payment screenshot will be verified by the organizing committee.
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
            <Award size={15} color="#f5c451" style={{ flexShrink: 0, marginTop: "1px" }} />
            Please save your registration number for future reference and entry on festival day.
          </div>
        </div>

        {/* Action buttons */}
        <div
          className="no-print"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            onClick={() => window.print()}
            className="btn-gold"
            style={{ flex: "1 1 180px", justifyContent: "center", padding: "13px 24px" }}
          >
            <Download size={16} />
            DOWNLOAD CONFIRMATION
          </button>
          <Link
            href="/"
            className="btn-secondary"
            style={{ flex: "1 1 160px", justifyContent: "center", padding: "13px 20px" }}
          >
            <Home size={15} />
            BACK TO HOME
          </Link>
        </div>
      </div>
    </div>
  );
}
