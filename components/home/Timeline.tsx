"use client";

import { motion } from "framer-motion";
import { Calendar, Flag, Award, Eye } from "lucide-react";

const steps = [
  {
    date: "OPEN NOW",
    title: "Online Registration & Payment",
    desc: "Teams register online, pay ₹500 via UPI QR code, upload screenshot, and submit their public Google Drive link.",
    icon: Flag,
    current: true,
  },
  {
    date: "19 OCT 2026",
    title: "Registration & Film Submission Deadline",
    desc: "Strict deadline at 11:59 PM. All drive links and payment verifications must be finalized before this cutoff.",
    icon: Calendar,
    deadline: true,
  },
  {
    date: "20–21 OCT 2026",
    title: "Preliminary Jury Scrutiny",
    desc: "Distinguished jury panel reviews all qualified entries across the 7 judging criteria to select finalist films.",
    icon: Eye,
  },
  {
    date: "22 OCT 2026",
    title: "Grand Screening & Awards Ceremony",
    desc: "Live theater screening of top shortlisted films at the VCET Auditorium followed by trophy and cash prize distribution.",
    icon: Award,
    grand: true,
  },
];

export function Timeline() {
  return (
    <section
      style={{
        padding: "6rem 1.5rem",
        background: "#090909",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 4rem" }}>
          <div className="section-eyebrow" style={{ justifyContent: "center" }}>
            <Calendar size={11} />
            Competition Schedule
          </div>
          <h2 className="section-title" style={{ marginBottom: "0.75rem" }}>
            FESTIVAL{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #ffd76a, #f5c451, #d9a93a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              TIMELINE
            </span>
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Mark your calendars and ensure your film is submitted before the registration portal closes.
          </p>
        </div>

        {/* Steps */}
        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative" }}>
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: "24px",
              top: "0",
              bottom: "0",
              width: "1px",
              background: "linear-gradient(180deg, #f5c451 0%, rgba(245,196,81,0.1) 100%)",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}
                >
                  {/* Node */}
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: step.grand
                        ? "linear-gradient(135deg, #f5c451, #d9a93a)"
                        : step.current
                        ? "rgba(245,196,81,0.15)"
                        : "#0d0d0d",
                      border: step.grand
                        ? "none"
                        : step.current
                        ? "2px solid #f5c451"
                        : "1px solid rgba(255,255,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: step.grand ? "#000" : step.current ? "#f5c451" : "#737373",
                      flexShrink: 0,
                      position: "relative",
                      zIndex: 1,
                      boxShadow: step.grand
                        ? "0 0 24px rgba(245,196,81,0.3)"
                        : step.current
                        ? "0 0 16px rgba(245,196,81,0.15)"
                        : "none",
                    }}
                  >
                    <Icon size={20} />
                  </div>

                  {/* Card */}
                  <div
                    style={{
                      flex: 1,
                      background: step.grand ? "rgba(245,196,81,0.05)" : "#0d0d0d",
                      border: step.grand
                        ? "1px solid rgba(245,196,81,0.3)"
                        : step.current
                        ? "1px solid rgba(245,196,81,0.2)"
                        : "1px solid rgba(255,255,255,0.07)",
                      borderRadius: "14px",
                      padding: "1.25rem 1.5rem",
                      marginBottom: "0",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "8px",
                        marginBottom: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11px",
                          fontFamily: "monospace",
                          fontWeight: 700,
                          padding: "3px 10px",
                          borderRadius: "6px",
                          background: step.current
                            ? "rgba(245,196,81,0.15)"
                            : "rgba(255,255,255,0.06)",
                          color: step.current ? "#f5c451" : "#a3a3a3",
                          border: step.current
                            ? "1px solid rgba(245,196,81,0.25)"
                            : "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        {step.date}
                      </span>
                      {step.grand && (
                        <span
                          style={{
                            fontSize: "10px",
                            fontWeight: 700,
                            color: "#f5c451",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <Award size={12} />
                          Grand Finale
                        </span>
                      )}
                    </div>
                    <h3
                      style={{
                        fontSize: "15px",
                        fontWeight: 700,
                        color: step.grand ? "#f5c451" : "#fff",
                        marginBottom: "6px",
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p style={{ fontSize: "13px", color: "#737373", lineHeight: 1.6 }}>{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
