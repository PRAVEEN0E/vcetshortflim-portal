"use client";

import { useState } from "react";
import { Lock, Unlock } from "lucide-react";
import { toggleRegistrationLockAction } from "@/actions/admin";
import { useRouter } from "next/navigation";

export function RegistrationLockToggle({ initialStatus }: { initialStatus: boolean }) {
  const [isOpen, setIsOpen] = useState(initialStatus);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleToggle = async () => {
    if (!window.confirm(isOpen ? "Are you sure you want to LOCK registrations? Users will not be able to register." : "Are you sure you want to UNLOCK registrations? Users will be able to register again.")) {
      return;
    }

    setLoading(true);
    const res = await toggleRegistrationLockAction(!isOpen);
    
    if (res.success) {
      setIsOpen(!isOpen);
      router.refresh();
    } else {
      alert(res.error || "Failed to toggle status");
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 16px",
        borderRadius: "8px",
        fontSize: "12px",
        fontWeight: 600,
        cursor: loading ? "not-allowed" : "pointer",
        opacity: loading ? 0.7 : 1,
        transition: "all 0.2s ease",
        background: isOpen ? "rgba(239, 68, 68, 0.1)" : "rgba(34, 197, 94, 0.1)",
        border: `1px solid ${isOpen ? "rgba(239, 68, 68, 0.3)" : "rgba(34, 197, 94, 0.3)"}`,
        color: isOpen ? "#ef4444" : "#22c55e",
      }}
    >
      {isOpen ? <Unlock size={14} /> : <Lock size={14} />}
      {loading ? "SAVING..." : isOpen ? "LOCK REGISTRATION" : "UNLOCK REGISTRATION"}
    </button>
  );
}
