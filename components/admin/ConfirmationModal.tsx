"use client";

import { AlertTriangle, Loader2 } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "success" | "warning";
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "warning",
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const confirmStyles: Record<string, React.CSSProperties> = {
    danger: {
      background: "#dc2626",
      color: "#ffffff",
      border: "1px solid #ef4444",
      boxShadow: "0 4px 16px rgba(239, 68, 68, 0.4)",
    },
    success: {
      background: "#16a34a",
      color: "#ffffff",
      border: "1px solid #22c55e",
      boxShadow: "0 4px 16px rgba(34, 197, 94, 0.4)",
    },
    warning: {
      background: "linear-gradient(135deg, #ffd76a, #f5c451, #d9a93a)",
      color: "#000000",
      border: "none",
      boxShadow: "0 4px 16px rgba(245, 196, 81, 0.4)",
    },
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        background: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(8px)",
      }}
      onClick={onCancel}
    >
      <div
        style={{
          maxWidth: "460px",
          width: "100%",
          borderRadius: "24px",
          background: "#0d0d0d",
          border: "1px solid rgba(245, 196, 81, 0.35)",
          padding: "2.5rem 2rem",
          textAlign: "center",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.95)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "14px",
            background: "rgba(245, 196, 81, 0.12)",
            border: "1px solid rgba(245, 196, 81, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#f5c451",
            margin: "0 auto 1.25rem",
          }}
        >
          <AlertTriangle size={26} />
        </div>

        <h3
          style={{
            fontSize: "1.25rem",
            fontWeight: 800,
            color: "#ffffff",
            textTransform: "uppercase",
            letterSpacing: "0.02em",
            marginBottom: "10px",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: "13px",
            color: "#cccccc",
            lineHeight: 1.6,
            marginBottom: "2rem",
          }}
        >
          {message}
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            style={{
              padding: "12px 24px",
              borderRadius: "12px",
              background: "#181818",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              color: "#cccccc",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            style={{
              padding: "12px 28px",
              borderRadius: "12px",
              fontSize: "13px",
              fontWeight: 800,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              ...confirmStyles[variant],
              opacity: isLoading ? 0.5 : 1,
            }}
          >
            {isLoading && <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />}
            <span>{confirmText}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
