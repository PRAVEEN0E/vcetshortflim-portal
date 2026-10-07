import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import Link from "next/link";
import {
  Trophy,
  Award,
  Medal,
  Star,
  Clapperboard,
  Camera,
  Scissors,
  BookOpen,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "Prizes & Awards | VCET State Level Short Film Competition 2026",
  description:
    "Explore the prize pool, cash awards, trophies, craft category recognitions, and participation medals at the VCET State Level Short Film Festival.",
};

const craftAwards = [
  {
    category: "Best Director",
    cash: "₹1,000",
    icon: Clapperboard,
    desc: "For directorial vision, cinematic staging, dramatic rhythm, and creative execution.",
  },
  {
    category: "Best Actor",
    cash: "₹1,000",
    icon: Star,
    desc: "For standout acting performance, believability, depth, and screen presence.",
  },
  {
    category: "Best Cinematography",
    cash: "₹1,000",
    icon: Camera,
    desc: "For outstanding visual framing, camera motion, lighting atmosphere, and color design.",
  },
  {
    category: "Best Editing",
    cash: "₹1,000",
    icon: Scissors,
    desc: "For seamless pacing, narrative continuity, montage structure, and rhythm.",
  },
  {
    category: "Best Story",
    cash: "₹1,000",
    icon: BookOpen,
    desc: "For thoughtful scriptwriting, screenplay depth, original concepts, and dialogue.",
  },
];

const podium = [
  {
    rank: "State Runner Up",
    title: "SECOND PRIZE",
    amount: "₹10,000",
    desc: "+ State Level Runner Up Trophy & Official Certificate",
    sub: "Awarded to the overall 2nd best short film across all schools & colleges.",
    color: "#a3a3a3",
    border: "rgba(163,163,163,0.2)",
    order: 2,
  },
  {
    rank: "State Winner",
    title: "FIRST PRIZE",
    amount: "₹20,000",
    desc: "+ Champion Grand Trophy & Certificate of Excellence",
    sub: "Premier award presented live during the Grand Screening at VCET Auditorium.",
    color: "#f5c451",
    border: "rgba(245,196,81,0.4)",
    badge: "Grand Champion",
    order: 1,
    hero: true,
  },
  {
    rank: "2nd Runner Up",
    title: "THIRD PRIZE",
    amount: "₹5,000",
    desc: "+ Official Podium Trophy & Certificate",
    sub: "Awarded to the overall 3rd best short film entry.",
    color: "#d97706",
    border: "rgba(217,119,6,0.2)",
    order: 3,
  },
];

export default function PrizesPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#050505", color: "#fff" }}>
      <Navbar />

      <main style={{ flex: 1, padding: "4rem 1.5rem 5rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 4rem" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                borderRadius: "9999px",
                background: "rgba(245,196,81,0.08)",
                border: "1px solid rgba(245,196,81,0.25)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#f5c451",
                marginBottom: "1.25rem",
              }}
            >
              <Trophy size={12} />
              ₹38,000+ Total Prize Pool
            </div>
            <h1
              style={{
                fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 900,
                color: "#fff",
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                marginBottom: "1rem",
              }}
            >
              AWARDS &amp;{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #ffd76a, #f5c451, #d9a93a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                RECOGNITION
              </span>
            </h1>
            <p style={{ fontSize: "15px", color: "#a3a3a3", lineHeight: 1.7, maxWidth: "560px", margin: "0 auto" }}>
              Rewarding extraordinary student filmmaking from across Tamil Nadu with state-level honors, prestigious
              trophies, cash prizes, and industry accolades.
            </p>
          </div>

          {/* Podium */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "20px",
              maxWidth: "900px",
              margin: "0 auto 5rem",
              alignItems: "end",
            }}
          >
            {podium.map((item) => (
              <div
                key={item.title}
                style={{
                  background: item.hero ? "rgba(245,196,81,0.05)" : "#0d0d0d",
                  border: `1px solid ${item.border}`,
                  borderRadius: "20px",
                  padding: item.hero ? "2.5rem 1.75rem" : "2rem 1.5rem",
                  textAlign: "center",
                  position: "relative",
                  transform: item.hero ? "translateY(-16px)" : "none",
                  boxShadow: item.hero ? `0 0 40px ${item.border}` : "none",
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
                      padding: "4px 16px",
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
                    background: `${item.color}14`,
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
                <h2
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: "#fff",
                    marginBottom: "1.5rem",
                  }}
                >
                  {item.title}
                </h2>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', monospace",
                    fontSize: item.hero ? "3rem" : "2.5rem",
                    fontWeight: 900,
                    color: item.color,
                    lineHeight: 1,
                    marginBottom: "0.5rem",
                  }}
                >
                  {item.amount}
                </div>
                <p style={{ fontSize: "12px", color: "#a3a3a3", marginBottom: "1.5rem" }}>{item.desc}</p>
                <div
                  style={{
                    paddingTop: "1rem",
                    borderTop: `1px solid ${item.border}`,
                    fontSize: "11px",
                    color: "#737373",
                  }}
                >
                  {item.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Craft Awards */}
          <div style={{ marginBottom: "4rem" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  fontWeight: 900,
                  color: "#fff",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                INDIVIDUAL{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #ffd76a, #f5c451, #d9a93a)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  CRAFT AWARDS
                </span>
              </h2>
              <p style={{ fontSize: "13px", color: "#737373" }}>
                Recognizing specialized technical mastery in cinema with ₹1,000 cash prizes and official certificates.
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "14px",
              }}
            >
              {craftAwards.map((item, idx) => {
                const Icon = item.icon;
                return (
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
                    className="craft-card"
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div
                        style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "11px",
                          background: "rgba(245,196,81,0.08)",
                          border: "1px solid rgba(245,196,81,0.18)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#f5c451",
                        }}
                      >
                        <Icon size={20} />
                      </div>
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: 800,
                          padding: "4px 12px",
                          borderRadius: "8px",
                          background: "rgba(245,196,81,0.1)",
                          border: "1px solid rgba(245,196,81,0.2)",
                          color: "#f5c451",
                        }}
                      >
                        {item.cash}
                      </span>
                    </div>
                    <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}>
                      {item.category}
                    </h3>
                    <p style={{ fontSize: "12px", color: "#737373", lineHeight: 1.6 }}>{item.desc}</p>
                    <div
                      style={{
                        paddingTop: "10px",
                        borderTop: "1px solid rgba(255,255,255,0.05)",
                        fontSize: "11px",
                        color: "#525252",
                      }}
                    >
                      Official Citation &amp; Trophy Certificate
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Participation guarantee */}
          <div
            style={{
              background: "rgba(245,196,81,0.05)",
              border: "1px solid rgba(245,196,81,0.2)",
              borderRadius: "20px",
              padding: "2.5rem",
              textAlign: "center",
              marginBottom: "3rem",
            }}
          >
            <Medal size={40} color="#f5c451" style={{ margin: "0 auto 1rem" }} />
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "1.25rem",
                fontWeight: 900,
                color: "#fff",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              Recognition For Every Team Member
            </h3>
            <p style={{ fontSize: "14px", color: "#a3a3a3", maxWidth: "600px", margin: "0 auto 1.5rem", lineHeight: 1.7 }}>
              Every registered team member (up to 5 per film) who participates in the competition will be awarded an
              official <strong style={{ color: "#fff" }}>State Level Participation Certificate</strong> and an
              exclusive <strong style={{ color: "#fff" }}>Competition Medal</strong> issued by VCET.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "10px" }}>
              {["Official College Seal", "Physical Medals", "Resume & Portfolio Accolade"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "8px",
                    background: "rgba(245,196,81,0.08)",
                    border: "1px solid rgba(245,196,81,0.2)",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#f5c451",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center" }}>
            <Link href="/register" className="btn-gold" style={{ padding: "14px 36px", fontSize: "14px" }}>
              REGISTER YOUR TEAM NOW (₹500)
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .craft-card:hover {
          border-color: rgba(245,196,81,0.2) !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(0,0,0,0.5);
        }
      `}</style>
    </div>
  );
}
