import Link from "next/link";
import { Film, Phone, MapPin, Calendar, Award, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer
      style={{
        background: "#050505",
        borderTop: "1px solid rgba(245,196,81,0.15)",
        color: "#737373",
      }}
    >
      {/* Festival tagline banner */}
      <div
        style={{
          background: "linear-gradient(90deg, rgba(245,196,81,0.05), rgba(245,196,81,0.08), rgba(245,196,81,0.05))",
          borderBottom: "1px solid rgba(245,196,81,0.1)",
          padding: "2rem 1.5rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#f5c451",
              marginBottom: "0.5rem",
            }}
          >
            Velalar College of Engineering and Technology Presents
          </p>
          <h2
            style={{
              fontFamily: "'Space Grotesk', 'Inter', sans-serif",
              fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "0.03em",
              textTransform: "uppercase",
            }}
          >
            "SHOW YOUR STORY.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #ffd76a, #f5c451, #d9a93a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              CREATE YOUR IMPACT."
            </span>
          </h2>
        </div>
      </div>

      {/* Main footer columns */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2.5rem",
          }}
        >
          {/* Col 1: College Info */}
          <div style={{ gridColumn: "span 1" }}>
            <div style={{ marginBottom: "1.25rem" }}>
              <img
                src="/images/vcet-film-fest-logo.png"
                alt="VCET Film Fest"
                style={{
                  height: "50px",
                  width: "auto",
                  objectFit: "contain",
                  borderRadius: "8px",
                  boxShadow: "0 0 20px rgba(245,196,81,0.15)",
                }}
              />
            </div>
            <p style={{ fontSize: "13px", lineHeight: 1.7, marginBottom: "1rem" }}>
              State Level Short Film Competition for school (10th–12th) and college students across Tamil Nadu. Open
              theme, ₹50,000+ prize pool.
            </p>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "12px" }}>
              <MapPin size={14} color="#f5c451" style={{ flexShrink: 0, marginTop: "2px" }} />
              <span>Perundurai Road, Thindal, Erode, Tamil Nadu 638012</span>
            </div>
          </div>

          {/* Col 2: Student Coordinators */}
          <div>
            <h4
              style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#f5c451",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Phone size={12} />
              Student Coordinators
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { name: "Surya", phone: "7358412012" },
                { name: "Pradeep", phone: "7418862116" },
              ].map((c) => (
                <div
                  key={c.name}
                  style={{
                    background: "#0d0d0d",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "10px",
                    padding: "10px 14px",
                  }}
                >
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#f5f5f5", marginBottom: "3px" }}>
                    {c.name}
                  </div>
                  <a
                    href={`tel:${c.phone}`}
                    style={{
                      fontSize: "13px",
                      color: "#f5c451",
                      textDecoration: "none",
                      fontFamily: "monospace",
                      letterSpacing: "0.05em",
                    }}
                  >
                    +91 {c.phone.slice(0, 5)} {c.phone.slice(5)}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: Key Deadlines */}
          <div>
            <h4
              style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#f5c451",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Calendar size={12} />
              Key Deadlines
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0" }}>
              {[
                { label: "Registration Ends", value: "19 Oct 2026", highlight: true },
                { label: "Competition Screening", value: "22 Oct 2026", highlight: true },
                { label: "Team Size", value: "Up to 5 Members", highlight: false },
                { label: "Registration Fee", value: "₹500 / Team", highlight: false, green: true },
              ].map((item) => (
                <li
                  key={item.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    fontSize: "12px",
                  }}
                >
                  <span style={{ color: "#737373" }}>{item.label}</span>
                  <span
                    style={{
                      fontWeight: 700,
                      color: item.green ? "#4ade80" : item.highlight ? "#f5c451" : "#f5f5f5",
                    }}
                  >
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: "14px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {[
                { href: "/rules", label: "Rules" },
                { href: "/prizes", label: "Prizes" },
                { href: "/register", label: "Register", gold: true },
                { href: "/admin/login", label: "Admin" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{
                    fontSize: "11px",
                    textDecoration: "none",
                    color: l.gold ? "#f5c451" : "#737373",
                    fontWeight: l.gold ? 600 : 400,
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: "2.5rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
            fontSize: "11px",
          }}
        >
          <p>© 2026 Velalar College of Engineering and Technology. All rights reserved.</p>
          <p style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Award size={13} color="#f5c451" />
            Certificates &amp; Medals provided for all participants.
          </p>
        </div>
      </div>
    </footer>
  );
}
