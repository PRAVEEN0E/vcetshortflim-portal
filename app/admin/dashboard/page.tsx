import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getAdminDashboardData } from "@/actions/admin";
import { AdminNavbar } from "@/components/admin/AdminNavbar";
import { AdminStatsCards } from "@/components/admin/AdminStatsCards";
import { AdminRegistrationTable } from "@/components/admin/AdminRegistrationTable";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export const metadata = {
  title: "Admin Dashboard | VCET Short Film Competition 2026",
  description: "Monitor registrations, verify UPI payments, and review films.",
};

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  let data;
  try {
    data = await getAdminDashboardData();
  } catch (err) {
    console.error("Dashboard error:", err);
    redirect("/admin/login");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#050505",
        color: "#fff",
      }}
    >
      <AdminNavbar adminEmail={session.email} />

      <main style={{ flex: 1, padding: "2rem 1.5rem 4rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* Header */}
          <div>
            <div
              style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#f5c451",
                marginBottom: "6px",
              }}
            >
              Control Center
            </div>
            <h1
              style={{
                fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 900,
                color: "#fff",
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
              }}
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
                REGISTRATIONS
              </span>
            </h1>
          </div>

          {/* Stats Cards */}
          <AdminStatsCards stats={data.stats} />

          {/* Registrations Table */}
          <Suspense
            fallback={
              <div
                style={{
                  padding: "4rem",
                  textAlign: "center",
                  background: "#0d0d0d",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "16px",
                }}
              >
                <Loader2
                  size={32}
                  color="#f5c451"
                  style={{ margin: "0 auto 12px", animation: "spin 1s linear infinite" }}
                />
                <p style={{ fontSize: "13px", color: "#737373" }}>Loading registrations table...</p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            }
          >
            <AdminRegistrationTable initialRegistrations={data.registrations} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
