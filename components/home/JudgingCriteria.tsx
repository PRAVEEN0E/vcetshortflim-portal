"use client";

import { motion } from "framer-motion";
import { BookOpen, Clapperboard, Users, Camera, Scissors, Lightbulb, Zap } from "lucide-react";

const criteria = [
  {
    title: "Story & Screenplay",
    desc: "Narrative structure, character development, dialogues, pacing, and emotional coherence.",
    icon: BookOpen,
    weight: "20%",
  },
  {
    title: "Direction",
    desc: "Vision, staging, narrative translation onto the screen, tone consistency, and dramatic staging.",
    icon: Clapperboard,
    weight: "20%",
  },
  {
    title: "Acting Performance",
    desc: "Believability, expressive depth, natural dialogue delivery, and character immersion.",
    icon: Users,
    weight: "15%",
  },
  {
    title: "Cinematography",
    desc: "Visual composition, framing, camera movements, lighting aesthetics, and visual style.",
    icon: Camera,
    weight: "15%",
  },
  {
    title: "Editing",
    desc: "Rhythm, continuity, cuts, montage tempo, color grading, sound synchronization.",
    icon: Scissors,
    weight: "10%",
  },
  {
    title: "Creativity & Originality",
    desc: "Fresh perspective, unique treatment, innovative themes, and bold thematic approach.",
    icon: Lightbulb,
    weight: "10%",
  },
  {
    title: "Overall Impact",
    desc: "Audience resonance, lasting message, emotional resonance, and cinematic punch.",
    icon: Zap,
    weight: "10%",
  },
];

export function JudgingCriteria() {
  return (
    <section
      style={{
        padding: "6rem 1.5rem",
        background: "#080808",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 3.5rem" }}>
          <div className="section-eyebrow" style={{ justifyContent: "center" }}>
            <Clapperboard size={11} />
            Jury Evaluation Standards
          </div>
          <h2 className="section-title" style={{ marginBottom: "0.75rem" }}>
            JUDGING{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #ffd76a, #f5c451, #d9a93a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              CRITERIA
            </span>
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Evaluated impartially by an esteemed panel of film critics, directors, and veteran cinematographers.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
            gap: "14px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {criteria.map((item, idx) => {
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
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  transition: "all 0.25s ease",
                }}
                className="criteria-card"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "10px",
                      background: "rgba(245,196,81,0.08)",
                      border: "1px solid rgba(245,196,81,0.18)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#f5c451",
                    }}
                    className="criteria-icon"
                  >
                    <Icon size={18} />
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      fontFamily: "monospace",
                      fontWeight: 700,
                      padding: "3px 10px",
                      borderRadius: "6px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#f5c451",
                    }}
                  >
                    Weight: {item.weight}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#fff",
                    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ fontSize: "12px", color: "#737373", lineHeight: 1.6 }}>{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        .criteria-card:hover {
          border-color: rgba(245,196,81,0.2) !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(0,0,0,0.5);
        }
        .criteria-card:hover .criteria-icon {
          background: rgba(245,196,81,0.14) !important;
          border-color: rgba(245,196,81,0.3) !important;
        }
      `}</style>
    </section>
  );
}
