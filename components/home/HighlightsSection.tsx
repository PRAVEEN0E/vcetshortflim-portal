"use client";

import { motion } from "framer-motion";
import { Sparkles, Trophy, Video, Users, Medal, Compass } from "lucide-react";

const highlights = [
  {
    title: "Open Creative Theme",
    desc: "Freedom to explore any story, genre, or socially impactful message without rigid constraints.",
    icon: Compass,
  },
  {
    title: "₹50,000+ Total Prize Pool",
    desc: "Grand cash awards for Top 3 winners plus 5 individual craft categories and trophies.",
    icon: Trophy,
  },
  {
    title: "Auditorium Big Screen Showcase",
    desc: "Shortlisted finalist entries will be projected on the state-of-the-art auditorium screen at VCET.",
    icon: Video,
  },
  {
    title: "School & College Streams",
    desc: "Equal opportunities for budding student filmmakers from 10th–12th standard and college levels.",
    icon: Users,
  },
  {
    title: "Medals & State Certificates",
    desc: "Every single crew member receives an official participation certificate and an event medal.",
    icon: Medal,
  },
  {
    title: "Direct Jury Feedback",
    desc: "Interact with veteran film directors and critics during the awards symposium.",
    icon: Sparkles,
  },
];

export function HighlightsSection() {
  return (
    <section
      style={{
        padding: "6rem 1.5rem",
        background: "#090909",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 3.5rem" }}>
          <div className="section-eyebrow" style={{ justifyContent: "center" }}>
            <Sparkles size={11} />
            Why Participate
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
              HIGHLIGHTS
            </span>
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            What makes the VCET State Level Short Film Competition an unmatched launchpad for young directors.
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                style={{
                  background: "#0d0d0d",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "16px",
                  padding: "1.75rem 1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  transition: "all 0.25s ease",
                  cursor: "default",
                }}
                className="highlight-item"
              >
                <div
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "12px",
                    background: "rgba(245,196,81,0.08)",
                    border: "1px solid rgba(245,196,81,0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#f5c451",
                    transition: "all 0.25s ease",
                  }}
                  className="highlight-icon"
                >
                  <Icon size={20} />
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#fff",
                      marginBottom: "6px",
                      fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "13px", color: "#737373", lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        .highlight-item:hover {
          border-color: rgba(245,196,81,0.2) !important;
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.5);
        }
        .highlight-item:hover .highlight-icon {
          background: rgba(245,196,81,0.15) !important;
          border-color: rgba(245,196,81,0.35) !important;
        }
      `}</style>
    </section>
  );
}
