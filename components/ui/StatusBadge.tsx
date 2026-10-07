interface StatusBadgeProps {
  type: "payment" | "registration";
  status: string;
}

const paymentMap: Record<string, { label: string; color: string; bg: string; border: string }> = {
  PENDING: {
    label: "Pending",
    color: "#f5c451",
    bg: "rgba(245,196,81,0.1)",
    border: "rgba(245,196,81,0.2)",
  },
  VERIFIED: {
    label: "Verified",
    color: "#4ade80",
    bg: "rgba(74,222,128,0.1)",
    border: "rgba(74,222,128,0.2)",
  },
  REJECTED: {
    label: "Rejected",
    color: "#f87171",
    bg: "rgba(248,113,113,0.1)",
    border: "rgba(248,113,113,0.2)",
  },
};

const registrationMap: Record<string, { label: string; color: string; bg: string; border: string }> = {
  PENDING: {
    label: "Under Review",
    color: "#f5c451",
    bg: "rgba(245,196,81,0.1)",
    border: "rgba(245,196,81,0.2)",
  },
  APPROVED: {
    label: "Approved",
    color: "#4ade80",
    bg: "rgba(74,222,128,0.1)",
    border: "rgba(74,222,128,0.2)",
  },
  REJECTED: {
    label: "Rejected",
    color: "#f87171",
    bg: "rgba(248,113,113,0.1)",
    border: "rgba(248,113,113,0.2)",
  },
};

export function StatusBadge({ type, status }: StatusBadgeProps) {
  const map = type === "payment" ? paymentMap : registrationMap;
  const cfg = map[status] ?? {
    label: status,
    color: "#a3a3a3",
    bg: "rgba(163,163,163,0.08)",
    border: "rgba(163,163,163,0.15)",
  };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: "3px 10px",
        borderRadius: "6px",
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: cfg.color,
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: cfg.color,
          display: "inline-block",
          flexShrink: 0,
        }}
      />
      {cfg.label}
    </span>
  );
}
