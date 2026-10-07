"use client";

import { Phone, MapPin, HelpCircle } from "lucide-react";

const coordinators = [
  {
    name: "SURYA",
    phone: "7358412012",
    display: "+91 73584 12012",
    role: "General Queries & Registration Guidance",
  },
  {
    name: "PRADEEP",
    phone: "7418862116",
    display: "+91 74188 62116",
    role: "Technical & Submission Support",
  },
];

export function ContactSection() {
  return (
    <section
      style={{
        padding: "6rem 1.5rem",
        background: "#080808",
        borderTop: "1px solid rgba(245,196,81,0.08)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto 3.5rem" }}>
          <div className="section-eyebrow" style={{ justifyContent: "center" }}>
            <HelpCircle size={11} />
            Support &amp; Inquiries
          </div>
          <h2 className="section-title" style={{ marginBottom: "0.75rem" }}>
            CONTACT{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #ffd76a, #f5c451, #d9a93a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              COORDINATORS
            </span>
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Have queries regarding eligibility, Google Drive submissions, or UPI payment verification? Reach out
            directly.
          </p>
        </div>

        {/* Coordinator Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            maxWidth: "720px",
            margin: "0 auto 2rem",
          }}
        >
          {coordinators.map((c) => (
            <div
              key={c.name}
              style={{
                background: "#0d0d0d",
                border: "1px solid rgba(245,196,81,0.15)",
                borderRadius: "18px",
                padding: "2rem 1.75rem",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
                transition: "all 0.25s ease",
              }}
              className="contact-card"
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "14px",
                  background: "rgba(245,196,81,0.08)",
                  border: "1px solid rgba(245,196,81,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#f5c451",
                  marginBottom: "0.5rem",
                }}
              >
                <Phone size={24} />
              </div>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#f5c451",
                }}
              >
                Student Coordinator
              </span>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                  fontSize: "1.5rem",
                  fontWeight: 900,
                  color: "#fff",
                  letterSpacing: "-0.01em",
                }}
              >
                {c.name}
              </h3>
              <p style={{ fontSize: "12px", color: "#737373", marginBottom: "1rem" }}>{c.role}</p>
              <a
                href={`tel:${c.phone}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  width: "100%",
                  padding: "12px 16px",
                  background: "rgba(245,196,81,0.08)",
                  border: "1px solid rgba(245,196,81,0.25)",
                  borderRadius: "10px",
                  color: "#f5c451",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  fontSize: "15px",
                  textDecoration: "none",
                  letterSpacing: "0.05em",
                  transition: "all 0.2s ease",
                }}
                className="phone-link"
              >
                <Phone size={15} />
                {c.display}
              </a>
            </div>
          ))}
        </div>

        {/* Address card */}
        <div
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            background: "#0d0d0d",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "14px",
            padding: "1.25rem 1.5rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "rgba(245,196,81,0.08)",
                border: "1px solid rgba(245,196,81,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#f5c451",
                flexShrink: 0,
              }}
            >
              <MapPin size={18} />
            </div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff", marginBottom: "2px" }}>
                Velalar College of Engineering and Technology
              </div>
              <div style={{ fontSize: "12px", color: "#737373" }}>
                Thindal, Perundurai Road, Erode – 638012, Tamil Nadu
              </div>
            </div>
          </div>
          <span
            style={{
              fontSize: "11px",
              fontFamily: "monospace",
              fontWeight: 700,
              padding: "6px 14px",
              background: "rgba(245,196,81,0.08)",
              border: "1px solid rgba(245,196,81,0.2)",
              borderRadius: "8px",
              color: "#f5c451",
              whiteSpace: "nowrap",
            }}
          >
            Event Date: 22 October 2026
          </span>
        </div>
      </div>

      <style>{`
        .contact-card:hover {
          border-color: rgba(245,196,81,0.3) !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.5), 0 0 20px rgba(245,196,81,0.05);
        }
        .phone-link:hover {
          background: rgba(245,196,81,0.15) !important;
          border-color: rgba(245,196,81,0.4) !important;
          color: #ffd76a !important;
        }
      `}</style>
    </section>
  );
}
