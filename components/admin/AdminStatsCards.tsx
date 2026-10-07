import { Users, Clock, CheckCircle2, XCircle, FileCheck, ShieldAlert } from "lucide-react";
import type { DashboardStats } from "@/actions/admin";

interface AdminStatsCardsProps {
  stats: DashboardStats;
}

const cardDefs = (stats: DashboardStats) => [
  {
    label: "Total Registrations",
    value: stats.totalRegistrations,
    subtext: "Teams registered",
    icon: Users,
    color: "#f5c451",
    bg: "rgba(245,196,81,0.08)",
    border: "rgba(245,196,81,0.2)",
  },
  {
    label: "Pending Payments",
    value: stats.pendingPayments,
    subtext: "Awaiting review",
    icon: Clock,
    color: "#facc15",
    bg: "rgba(250,204,21,0.08)",
    border: "rgba(250,204,21,0.2)",
  },
  {
    label: "Verified Payments",
    value: stats.verifiedPayments,
    subtext: "Confirmed ₹500",
    icon: CheckCircle2,
    color: "#4ade80",
    bg: "rgba(74,222,128,0.08)",
    border: "rgba(74,222,128,0.2)",
  },
  {
    label: "Rejected Payments",
    value: stats.rejectedPayments,
    subtext: "Invalid screenshots",
    icon: XCircle,
    color: "#f87171",
    bg: "rgba(248,113,113,0.08)",
    border: "rgba(248,113,113,0.2)",
  },
  {
    label: "Approved Registrations",
    value: stats.approvedRegistrations,
    subtext: "Accepted for jury",
    icon: FileCheck,
    color: "#60a5fa",
    bg: "rgba(96,165,250,0.08)",
    border: "rgba(96,165,250,0.2)",
  },
  {
    label: "Rejected Registrations",
    value: stats.rejectedRegistrations,
    subtext: "Disqualified",
    icon: ShieldAlert,
    color: "#f87171",
    bg: "rgba(248,113,113,0.08)",
    border: "rgba(248,113,113,0.2)",
  },
];

export function AdminStatsCards({ stats }: AdminStatsCardsProps) {
  const cards = cardDefs(stats);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: "12px",
      }}
    >
      {cards.map((c, i) => {
        const Icon = c.icon;
        return (
          <div
            key={i}
            style={{
              background: "#0d0d0d",
              border: `1px solid ${c.border}`,
              borderRadius: "14px",
              padding: "1.1rem 1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  color: "#737373",
                  lineHeight: 1.3,
                }}
              >
                {c.label}
              </span>
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px",
                  background: c.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: c.color,
                  flexShrink: 0,
                }}
              >
                <Icon size={13} />
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', monospace",
                  fontSize: "1.75rem",
                  fontWeight: 900,
                  color: c.color,
                  lineHeight: 1,
                  marginBottom: "4px",
                }}
              >
                {c.value}
              </div>
              <div style={{ fontSize: "10px", color: "#525252" }}>{c.subtext}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
