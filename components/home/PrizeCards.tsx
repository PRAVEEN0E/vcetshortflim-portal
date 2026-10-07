"use client";

import { motion } from "framer-motion";
import { Trophy, Award, Sparkles, Medal, Clapperboard, Star } from "lucide-react";

const specialAwards = [
  { title: "Best Director", icon: Clapperboard },
  { title: "Best Actor", icon: Star },
  { title: "Best Cinematography", icon: Sparkles },
  { title: "Best Editing", icon: Award },
  { title: "Best Story", icon: Medal },
];

const podium = [
  {
    rank: "Runner Up",
    title: "SECOND PRIZE",
    amount: "₹10,000",
    desc: "+ Prestigious Trophy & Official Certificate",
    sub: "State-level runner up accolade & public screening showcase",
    color: "#a3a3a3",
    bg: "rgba(163,163,163,0.08)",
    border: "rgba(163,163,163,0.2)",
    order: 2,
    scale: false,
  },
  {
    rank: "Champion",
    title: "FIRST PRIZE",
    amount: "₹20,000",
    desc: "+ Champion Trophy & Certificate of Excellence",
    sub: "Grand screening presentation at VCET Auditorium",
    color: "#f5c451",
    bg: "rgba(245,196,81,0.08)",
    border: "rgba(245,196,81,0.4)",
    order: 1,
    scale: true,
    badge: "Grand Winner",
  },
  {
    rank: "2nd Runner Up",
    title: "THIRD PRIZE",
    amount: "₹5,000",
    desc: "+ Official Trophy & Certificate",
    sub: "Honorable podium recognition across Tamil Nadu",
    color: "#d97706",
    bg: "rgba(217,119,6,0.08)",
    border: "rgba(217,119,6,0.2)",
    order: 3,
    scale: false,
  },
];

export function PrizeCards() {
  return (
    <section
      style={{
        padding: "6rem 1.5rem",
        background: "#0a0a0a",
        borderTop: "1px solid rgba(245,196,81,0.08)",
        borderBottom: "1px solid rgba(245,196,81,0.08)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "700px",
          height: "300px",
          background: "radial-gradient(ellipse, rgba(245,196,81,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 4rem" }}>
          <div className="section-eyebrow" style={{ justifyContent: "center" }}>
            <Trophy size={12} />
            Cash Rewards &amp; Trophies
          </div>
          <h2
            className="section-title"
            style={{ marginBottom: "0.75rem" }}
          >
            COMPETITION{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #ffd76a, #f5c451, #d9a93a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              PRIZES
            </span>
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Compete with the finest young cinematic talents from schools and colleges across Tamil Nadu.
          </p>
        </div>

        {/* Podium */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
            maxWidth: "900px",
            margin: "0 auto 4rem",
            alignItems: "end",
          }}
        >
          {podium.map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: item.order * 0.1 }}
              style={{
                background: item.bg,
                border: `1px solid ${item.border}`,
                borderRadius: "20px",
                padding: item.scale ? "2.5rem 1.75rem" : "2rem 1.5rem",
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                position: "relative",
                backdropFilter: "blur(12px)",
                transform: item.scale ? "translateY(-12px)" : "none",
                boxShadow: item.scale ? `0 0 40px ${item.border}` : "none",
              }}
            >
              {item.badge && (
                <div
                  style={{
                    position: "absolute",
                    top: "-14px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "linear-gradient(135deg, #f5c451, #d9a93a)",
                    color: "#000",
                    fontSize: "10px",
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "4px 14px",
                    borderRadius: "9999px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.badge}
                </div>
              )}

              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  background: `${item.bg}`,
                  border: `1px solid ${item.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                  color: item.color,
                }}
              >
                <Trophy size={24} />
              </div>

              <div
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: item.color,
                  marginBottom: "4px",
                }}
              >
                {item.rank}
              </div>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: "#fff",
                  marginBottom: "1.5rem",
                }}
              >
                {item.title}
              </h3>

              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: item.scale ? "2.75rem" : "2.25rem",
                  fontWeight: 900,
                  lineHeight: 1,
                  background: `linear-gradient(135deg, ${item.color}, ${item.color}99)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: "0.5rem",
                }}
              >
                {item.amount}
              </div>
              <p style={{ fontSize: "12px", color: "#a3a3a3", marginBottom: "1.5rem" }}>{item.desc}</p>

              <div
                style={{
                  marginTop: "auto",
                  paddingTop: "1rem",
                  borderTop: `1px solid ${item.border}`,
                  fontSize: "11px",
                  color: "#737373",
                }}
              >
                {item.sub}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Special Awards */}
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <h4
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "1.1rem",
                fontWeight: 800,
                color: "#fff",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "6px",
              }}
            >
              Special Craft Category Awards
            </h4>
            <p style={{ fontSize: "12px", color: "#737373" }}>
              ₹1,000 Cash Prize + Certificate for individual excellence in cinema
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "12px",
            }}
          >
            {specialAwards.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  style={{
                    background: "#0d0d0d",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    padding: "1.25rem 1rem",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.2s ease",
                  }}
                  className="special-award-card"
                >
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      background: "rgba(245,196,81,0.1)",
                      border: "1px solid rgba(245,196,81,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#f5c451",
                    }}
                  >
                    <Icon size={17} />
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>{item.title}</span>
                  <span style={{ fontSize: "13px", fontWeight: 800, color: "#f5c451" }}>₹1,000</span>
                  <span style={{ fontSize: "10px", color: "#737373" }}>Award Certificate</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Participation guarantee */}
        <div
          style={{
            marginTop: "2.5rem",
            maxWidth: "600px",
            margin: "2.5rem auto 0",
            padding: "1rem 1.5rem",
            background: "rgba(245,196,81,0.06)",
            border: "1px solid rgba(245,196,81,0.2)",
            borderRadius: "14px",
            textAlign: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", color: "#f5c451", fontWeight: 700, fontSize: "14px", marginBottom: "4px" }}>
            <Medal size={17} />
            Participation Certificates &amp; Medals for ALL Teams
          </div>
          <p style={{ fontSize: "12px", color: "#737373" }}>
            Every registered team member will receive a recognized State Level Participation Certificate and Medal.
          </p>
        </div>
      </div>

      <style>{`
        .special-award-card:hover {
          border-color: rgba(245,196,81,0.25) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}
