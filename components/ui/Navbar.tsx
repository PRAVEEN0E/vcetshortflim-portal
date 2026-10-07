"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Film, BookOpen, Trophy, UserPlus, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "Home", icon: Film },
    { href: "/rules", label: "Rules", icon: BookOpen },
    { href: "/prizes", label: "Prizes", icon: Trophy },
  ];

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          backgroundColor: scrolled ? "rgba(5,5,5,0.97)" : "rgba(5,5,5,0.8)",
          borderBottom: "1px solid rgba(245,196,81,0.15)",
          transition: "background-color 0.3s ease, box-shadow 0.3s ease",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.6)" : "none",
        }}
      >
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
            {/* Logo (Mobile Only) */}
            <Link href="/" className="show-mobile" style={{ alignItems: "center", gap: "8px", textDecoration: "none", color: "#fff" }}>
              <div style={{ background: "linear-gradient(135deg, #ffd76a, #f5c451, #d9a93a)", padding: "4px", borderRadius: "6px", color: "#000", display: "flex" }}>
                <Film size={16} />
              </div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, letterSpacing: "0.05em", fontSize: "15px" }}>
                VCET FILM FEST
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav style={{ display: "flex", alignItems: "center", gap: "4px", marginLeft: "1.5rem" }} className="hidden-mobile">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 14px",
                      borderRadius: "8px",
                      fontSize: "13px",
                      fontWeight: 500,
                      textDecoration: "none",
                      color: active ? "#f5c451" : "#a3a3a3",
                      background: active ? "rgba(245,196,81,0.1)" : "transparent",
                      border: active ? "1px solid rgba(245,196,81,0.25)" : "1px solid transparent",
                      transition: "all 0.18s ease",
                    }}
                  >
                    <Icon size={15} />
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }} className="hidden-mobile">
              <Link
                href="/admin/login"
                style={{
                  fontSize: "12px",
                  color: "#737373",
                  textDecoration: "none",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  transition: "color 0.18s ease",
                }}
              >
                Admin
              </Link>
              <Link href="/register" className="btn-gold" style={{ padding: "9px 20px", fontSize: "12px" }}>
                <UserPlus size={14} />
                Register — ₹500
              </Link>
            </div>

            {/* Mobile toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }} className="show-mobile">
              <Link
                href="/register"
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  padding: "7px 14px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #f5c451, #d9a93a)",
                  color: "#000",
                  textDecoration: "none",
                }}
              >
                Register
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  padding: "8px",
                  cursor: "pointer",
                  color: "#a3a3a3",
                  display: "flex",
                  alignItems: "center",
                }}
                aria-label="Toggle navigation"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
              background: "#090909",
              padding: "1rem 1.5rem",
            }}
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    marginBottom: "4px",
                    fontSize: "14px",
                    fontWeight: 500,
                    textDecoration: "none",
                    color: active ? "#f5c451" : "#d4d4d4",
                    background: active ? "rgba(245,196,81,0.08)" : "transparent",
                  }}
                >
                  <Icon size={16} />
                  {link.label}
                </Link>
              );
            })}
            <div
              style={{
                marginTop: "12px",
                paddingTop: "12px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Link
                href="/admin/login"
                onClick={() => setMobileOpen(false)}
                style={{ fontSize: "12px", color: "#737373", textDecoration: "none" }}
              >
                Admin Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="btn-gold"
                style={{ fontSize: "12px", padding: "8px 16px" }}
              >
                Register Team
              </Link>
            </div>
          </div>
        )}
      </header>

      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}
