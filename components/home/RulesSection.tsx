"use client";

import Link from "next/link";
import { BookOpen, ShieldCheck, AlertTriangle, ArrowRight, CheckCircle } from "lucide-react";

const rules = [
  {
    title: "Eligibility",
    detail:
      "Open to 10th, 11th, and 12th standard school students and all undergraduate / postgraduate college students from Tamil Nadu.",
  },
  {
    title: "Team Size",
    detail:
      "Maximum of 5 members per crew (including the Team Leader). A member can only represent one film.",
  },
  {
    title: "Film Duration",
    detail:
      "Strictly 10 minutes maximum, including title cards and credits. Exceeding 10 minutes leads to penalty or disqualification.",
  },
  {
    title: "Theme & Genre",
    detail:
      "Completely OPEN THEME. Fiction, documentary, docudrama, animation, or experimental narratives are welcome.",
  },
  {
    title: "Originality & Copyright",
    detail:
      "The film must be an original work created by the registered team. Royalty-free or original background score is mandatory.",
  },
  {
    title: "Submission Format",
    detail:
      "A public, viewable Google Drive link containing high definition video (1080p MP4 / MOV) must be provided during registration.",
  },
];

export function RulesSection() {
  return (
    <section
      style={{
        padding: "6rem 1.5rem",
        background: "#070707",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "1rem",
            marginBottom: "3rem",
          }}
        >
          <div>
            <div className="section-eyebrow">
              <BookOpen size={11} />
              Guidelines &amp; Compliance
            </div>
            <h2 className="section-title">
              KEY COMPETITION{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #ffd76a, #f5c451, #d9a93a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                RULES
              </span>
            </h2>
          </div>
          <Link
            href="/rules"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              fontWeight: 600,
              color: "#f5c451",
              textDecoration: "none",
              transition: "opacity 0.2s ease",
            }}
          >
            View Complete Official Rulebook
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Rules grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "14px",
            marginBottom: "1.5rem",
          }}
        >
          {rules.map((rule, idx) => (
            <div
              key={idx}
              style={{
                background: "#0d0d0d",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                transition: "all 0.25s ease",
              }}
              className="rule-card"
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <ShieldCheck size={17} color="#f5c451" />
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#fff",
                    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                  }}
                >
                  {rule.title}
                </h3>
              </div>
              <p style={{ fontSize: "12px", color: "#737373", lineHeight: 1.65 }}>{rule.detail}</p>
              <div
                style={{
                  paddingTop: "10px",
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "11px",
                  color: "#525252",
                }}
              >
                <CheckCircle size={12} color="#4ade80" />
                Enforced by Jury &amp; Scrutiny Team
              </div>
            </div>
          ))}
        </div>

        {/* Drive notice */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "12px",
            padding: "1rem 1.25rem",
            background: "rgba(245,196,81,0.06)",
            border: "1px solid rgba(245,196,81,0.2)",
            borderRadius: "12px",
            fontSize: "13px",
            color: "#d4d4d4",
          }}
        >
          <AlertTriangle size={17} color="#f5c451" style={{ flexShrink: 0, marginTop: "1px" }} />
          <div>
            <strong style={{ color: "#f5c451" }}>Notice on Google Drive Links: </strong>
            Please ensure your Google Drive link has sharing permission set to{" "}
            <em>"Anyone with the link can view"</em> so our preview jury can access your film without requesting
            permission.
          </div>
        </div>
      </div>

      <style>{`
        .rule-card:hover {
          border-color: rgba(245,196,81,0.2) !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(0,0,0,0.5);
        }
      `}</style>
    </section>
  );
}
