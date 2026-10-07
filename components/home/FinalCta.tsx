"use client";

import Link from "next/link";
import { ArrowRight, Film, CheckCircle2, Sparkles } from "lucide-react";

export function FinalCta() {
  return (
    <section
      style={{
        padding: "7rem 1.5rem",
        background: "linear-gradient(180deg, #090909 0%, #0d0a03 50%, #080808 100%)",
        borderTop: "1px solid rgba(245,196,81,0.15)",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "350px",
          background: "radial-gradient(ellipse, rgba(245,196,81,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Urgency badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 18px",
            background: "rgba(245,196,81,0.1)",
            border: "1px solid rgba(245,196,81,0.3)",
            borderRadius: "9999px",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.09em",
            textTransform: "uppercase",
            color: "#f5c451",
            marginBottom: "2rem",
          }}
        >
          <Sparkles size={12} />
          Don&apos;t Miss The Cutoff — Registration Closes 19 Oct 2026
        </div>

        {/* Main heading */}
        <h2
          style={{
            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
            fontSize: "clamp(2rem, 6vw, 4.5rem)",
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            color: "#ffffff",
            marginBottom: "1rem",
          }}
        >
          SHOW YOUR STORY.
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #ffd76a 0%, #f5c451 50%, #d9a93a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            CREATE YOUR IMPACT.
          </span>
        </h2>

        <p
          style={{
            fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
            color: "#a3a3a3",
            maxWidth: "600px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
          }}
        >
          Assemble your crew, polish your screenplay, and submit your short film for the premier state-level student
          cinema awards at Velalar College of Engineering and Technology.
        </p>

        {/* Quick specs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
            marginBottom: "2.5rem",
          }}
        >
          {[
            "₹500 / Team",
            "Max 5 Crew Members",
            "Max 10 Minutes Runtime",
            "Tamil Nadu Students Only",
          ].map((spec) => (
            <div key={spec} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
              <CheckCircle2 size={15} color="#4ade80" />
              <span style={{ fontSize: "13px", color: "#d4d4d4" }}>{spec}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "14px" }}>
          <Link
            href="/register"
            className="btn-gold"
            style={{ padding: "16px 40px", fontSize: "15px", borderRadius: "14px", letterSpacing: "0.06em" }}
          >
            REGISTER YOUR FILM NOW
            <ArrowRight size={17} />
          </Link>
          <Link
            href="/rules"
            className="btn-secondary"
            style={{ padding: "16px 32px", fontSize: "14px", borderRadius: "14px" }}
          >
            <Film size={16} />
            Read Submission Guide
          </Link>
        </div>
      </div>
    </section>
  );
}
