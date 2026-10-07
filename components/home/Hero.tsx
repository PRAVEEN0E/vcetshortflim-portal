"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, BookOpen, Film, Users, Clock, Sparkles, Calendar, ShieldCheck } from "lucide-react";

const highlights = [
  { label: "Registration Fee", value: "₹500 / Team", icon: ShieldCheck },
  { label: "Max Team Size", value: "5 Members", icon: Users },
  { label: "Film Duration", value: "Max 10 Min", icon: Clock },
  { label: "Theme", value: "Open Theme", icon: Sparkles },
  { label: "Reg. Deadline", value: "19 Oct 2026", icon: Calendar },
  { label: "Festival Date", value: "22 Oct 2026", icon: Film },
];

function TiltCard({ children }: { children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [10, -10]);
  const rotateY = useTransform(x, [0, 1], [-10, 10]);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width);
    y.set(mouseY / rect.height);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
        width: "100%",
        height: "100%",
      }}
      animate={{
        y: isHovered ? -5 : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          width: "100%",
          height: "100%",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "5rem 1.5rem 6rem",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Background glows */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "500px",
          background: "radial-gradient(ellipse, rgba(245,196,81,0.09) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "30%",
          right: "-10%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(180,130,30,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "-5%",
          width: "350px",
          height: "350px",
          background: "radial-gradient(ellipse, rgba(245,196,81,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1280px", width: "100%", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
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
            marginBottom: "1.75rem",
          }}
        >
          <Sparkles size={13} />
          <span>Velalar College of Engineering and Technology</span>
          <span style={{ opacity: 0.4 }}>•</span>
          <span>Tamil Nadu State Level · 2026</span>
        </motion.div>

        {/* Logo Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "2rem", display: "flex", justifyContent: "center" }}
        >
          <img
            src="/images/vcet-film-fest-logo.png"
            alt="VCET Film Fest — State Level Short Film Competition"
            style={{
              height: "clamp(120px, 20vw, 240px)",
              width: "auto",
              objectFit: "contain",
              mixBlendMode: "screen",
              filter: "drop-shadow(0 0 30px rgba(245, 196, 81, 0.4))",
            }}
          />
        </motion.div>

        {/* Main Title (formerly Tagline) */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          style={{
            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
            fontSize: "clamp(2rem, 5vw, 4rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: "0.02em",
            textTransform: "uppercase",
            color: "#ffffff",
            marginBottom: "1.25rem",
          }}
        >
          SHOW YOUR STORY.{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #ffd76a 0%, #f5c451 50%, #d9a93a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              display: "inline-block",
            }}
          >
            CREATE YOUR IMPACT.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          style={{
            fontSize: "clamp(0.875rem, 1.5vw, 1.05rem)",
            color: "#a3a3a3",
            maxWidth: "600px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
          }}
        >
          An exclusive creative arena for 10th–12th school students and college filmmakers across Tamil Nadu to compete
          for state honours, cash rewards, and industry recognition.
        </motion.p>

        {/* Prize callout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.38 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            padding: "10px 24px",
            background: "rgba(245,196,81,0.06)",
            border: "1px solid rgba(245,196,81,0.2)",
            borderRadius: "12px",
            marginBottom: "2.5rem",
          }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1.5rem",
              fontWeight: 900,
              background: "linear-gradient(135deg, #ffd76a, #f5c451)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            ₹38,000+
          </span>
          <span style={{ fontSize: "12px", color: "#a3a3a3", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
            Total Prize Pool
          </span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.46 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 max-w-sm sm:max-w-none mx-auto"
          style={{ marginBottom: "4rem" }}
        >
          <Link
            href="/register"
            className="btn-gold w-full sm:w-auto justify-center"
            style={{ padding: "16px 32px", fontSize: "14px", borderRadius: "12px" }}
          >
            REGISTER NOW
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/rules"
            className="btn-secondary w-full sm:w-auto justify-center"
            style={{ padding: "16px 32px", fontSize: "14px", borderRadius: "12px" }}
          >
            <BookOpen size={16} />
            VIEW RULES
          </Link>
        </motion.div>

        {/* Highlights Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ width: "100%", maxWidth: "1000px", margin: "0 auto", overflow: "hidden", position: "relative" }}
        >
          {/* Fading edges for marquee */}
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "60px", background: "linear-gradient(to right, #050505, transparent)", zIndex: 10, pointerEvents: "none" }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "60px", background: "linear-gradient(to left, #050505, transparent)", zIndex: 10, pointerEvents: "none" }} />
          
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
            style={{ display: "flex", width: "max-content", gap: "16px", padding: "10px 0" }}
          >
            {[...highlights, ...highlights].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} style={{ width: "160px", flexShrink: 0 }}>
                  <TiltCard>
                    <div
                      style={{
                        background: "rgba(17,17,17,0.8)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: "14px",
                        padding: "18px 14px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px",
                        textAlign: "center",
                        transition: "all 0.25s ease",
                        backdropFilter: "blur(12px)",
                      }}
                      className="highlight-card"
                    >
                      <div
                        style={{
                          width: "34px",
                          height: "34px",
                          borderRadius: "9px",
                          background: "rgba(245,196,81,0.1)",
                          border: "1px solid rgba(245,196,81,0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#f5c451",
                        }}
                      >
                        <Icon size={15} />
                      </div>
                      <div style={{ fontSize: "10px", color: "#737373", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff", lineHeight: 1.2, whiteSpace: "nowrap" }}>
                        {item.value}
                      </div>
                    </div>
                  </TiltCard>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .highlight-card:hover {
          border-color: rgba(245,196,81,0.25) !important;
          box-shadow: 0 8px 30px rgba(0,0,0,0.5);
        }
      `}</style>
    </section>
  );
}
