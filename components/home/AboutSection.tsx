"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Film, Shield, Video, Building } from "lucide-react";

const points = [
  "Open to all 10th, 11th, and 12th standard school students across Tamil Nadu",
  "Open to undergraduate and postgraduate college students from any stream",
  "Completely Open Theme — tell whatever story moves you",
  "Maximum film run time of 10 minutes (strictly enforced)",
  "Maximum team size of 5 passionate student creators",
  "Direct submission via public Google Drive link (MP4 / Full HD)",
];

const specs = [
  { label: "Eligibility", value: "10th, 11th, 12th & College Students" },
  { label: "Geographic Scope", value: "Tamil Nadu State Only" },
  { label: "Registration Fee", value: "₹500 / Team", green: true },
  { label: "Team Size", value: "Maximum 5 Members" },
  { label: "Film Runtime", value: "Strictly ≤ 10 Minutes", gold: true },
];

export function AboutSection() {
  return (
    <section
      style={{
        padding: "6rem 1.5rem",
        background: "#0b0b0b",
        borderTop: "1px solid rgba(245,196,81,0.08)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "3.5rem",
            alignItems: "start",
          }}
        >
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-eyebrow">
              <Building size={11} />
              About The Festival
            </div>
            <h2
              className="section-title"
              style={{ marginBottom: "1.25rem" }}
            >
              A PREMIER STAGE FOR{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #ffd76a, #f5c451, #d9a93a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                ASPIRING TAMIL CINEASTES
              </span>
            </h2>
            <p style={{ fontSize: "15px", color: "#d4d4d4", lineHeight: 1.75, marginBottom: "1rem" }}>
              Velalar College of Engineering and Technology (Autonomous), Thindal, Erode, proudly hosts the prestigious{" "}
              <strong style={{ color: "#fff" }}>State Level Short Film Competition 2026</strong>. Designed to foster the next generation of visual storytellers, this festival invites raw talent from schools and collegiate institutions throughout Tamil Nadu.
            </p>
            <p style={{ fontSize: "14px", color: "#a3a3a3", lineHeight: 1.75, marginBottom: "2rem" }}>
              Whether your passion lies in hard-hitting drama, social reality, science fiction, suspense, or comedy — this is your canvas. Let your vision be seen by distinguished industry jurors on the big screen.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
              }}
            >
              {points.map((pt, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <CheckCircle2 size={14} color="#f5c451" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span style={{ fontSize: "12px", color: "#d4d4d4", lineHeight: 1.5 }}>{pt}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Spec Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              style={{
                background: "rgba(17,17,17,0.9)",
                border: "1px solid rgba(245,196,81,0.25)",
                borderRadius: "20px",
                padding: "2rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Glow corner */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "150px",
                  height: "150px",
                  background: "radial-gradient(circle, rgba(245,196,81,0.08) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />

              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: "1.25rem",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                  marginBottom: "1.25rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "11px",
                      background: "linear-gradient(135deg, #f5c451, #d9a93a)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Video size={20} color="#000" />
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>VCET Film Fest '26</div>
                    <div style={{ fontSize: "11px", color: "#f5c451" }}>Open Theme • State Level</div>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: "11px",
                    fontFamily: "monospace",
                    fontWeight: 700,
                    padding: "4px 10px",
                    background: "rgba(245,196,81,0.12)",
                    color: "#f5c451",
                    borderRadius: "6px",
                    border: "1px solid rgba(245,196,81,0.2)",
                  }}
                >
                  OCT 2026
                </span>
              </div>

              {/* Specs */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {specs.map((s, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 0",
                      borderBottom: i < specs.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                      fontSize: "12px",
                    }}
                  >
                    <span style={{ color: "#737373" }}>{s.label}</span>
                    <span
                      style={{
                        fontWeight: 700,
                        color: s.green ? "#4ade80" : s.gold ? "#f5c451" : "#f5f5f5",
                      }}
                    >
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Notice */}
              <div
                style={{
                  marginTop: "1.25rem",
                  padding: "12px 14px",
                  background: "#0d0d0d",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  fontSize: "12px",
                  color: "#a3a3a3",
                }}
              >
                <Shield size={15} color="#f5c451" style={{ flexShrink: 0, marginTop: "1px" }} />
                All submitted work must be 100% original. Plagiarized entries will be disqualified immediately.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
