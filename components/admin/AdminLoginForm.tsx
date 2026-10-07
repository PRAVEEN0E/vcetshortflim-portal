"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdminAction } from "@/actions/admin";
import { Lock, Mail, ShieldAlert, Loader2, ArrowRight, Film } from "lucide-react";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      const result = await loginAdminAction(formData);
      if (!result.success) {
        setError(result.error || "Authentication failed.");
        setIsLoading(false);
        return;
      }
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(msg);
      setIsLoading(false);
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: "440px", margin: "0 auto" }}>
      <div
        style={{
          background: "rgba(13,13,13,0.95)",
          border: "1px solid rgba(245,196,81,0.25)",
          borderRadius: "24px",
          padding: "2.5rem",
          backdropFilter: "blur(20px)",
          boxShadow: "0 0 60px rgba(0,0,0,0.8), 0 0 30px rgba(245,196,81,0.05)",
        }}
      >
        {/* Icon + Title */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <img
            src="/images/vcet-film-fest-logo.png"
            alt="VCET Film Fest"
            style={{
              height: "56px",
              width: "auto",
              objectFit: "contain",
              margin: "0 auto 1.25rem",
              borderRadius: "8px",
              boxShadow: "0 0 24px rgba(245,196,81,0.2)",
            }}
          />
          <h1
            style={{
              fontFamily: "'Space Grotesk', 'Inter', sans-serif",
              fontSize: "1.5rem",
              fontWeight: 900,
              color: "#fff",
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
              marginBottom: "6px",
            }}
          >
            Admin Authentication
          </h1>
          <p style={{ fontSize: "12px", color: "#737373" }}>
            Sign in to manage registrations and verify UPI payments
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              padding: "12px 14px",
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.25)",
              borderRadius: "10px",
              fontSize: "12px",
              color: "#f87171",
              marginBottom: "1.25rem",
            }}
          >
            <ShieldAlert size={15} style={{ flexShrink: 0, marginTop: "1px" }} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: "1rem" }}>
            <label className="input-label">
              Admin Email <span className="required">*</span>
            </label>
            <div style={{ position: "relative" }}>
              <Mail
                size={15}
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#525252",
                  pointerEvents: "none",
                }}
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@vcet.ac.in"
                className="input-cinematic"
                style={{ paddingLeft: "40px" }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label className="input-label">
              Password <span className="required">*</span>
            </label>
            <div style={{ position: "relative" }}>
              <Lock
                size={15}
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#525252",
                  pointerEvents: "none",
                }}
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="input-cinematic"
                style={{ paddingLeft: "40px" }}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-gold"
            style={{ width: "100%", padding: "14px", fontSize: "13px", justifyContent: "center" }}
          >
            {isLoading ? (
              <>
                <Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} />
                Verifying Credentials...
              </>
            ) : (
              <>
                SIGN IN TO ADMIN PANEL
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div
          style={{
            marginTop: "1.5rem",
            paddingTop: "1.25rem",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            textAlign: "center",
            fontSize: "11px",
            color: "#525252",
          }}
        >
          Authorized VCET Organizing Committee only.
          <br />
          Session protected by HTTP-only secure cookie.
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
