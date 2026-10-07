/**
 * VCET Short Film Competition — Cinematic Design Token System
 * Black + Gold Premium Film Festival UI
 */

export const colors = {
  // Backgrounds
  bg: {
    base: "#050505",
    primary: "#090909",
    secondary: "#0D0D0D",
    surface: "#111111",
    surfaceMid: "#151515",
    surfaceHigh: "#1A1A1A",
    card: "rgba(17,17,17,0.85)",
    overlay: "rgba(5,5,5,0.75)",
  },
  // Gold Palette
  gold: {
    primary: "#F5C451",
    secondary: "#D9A93A",
    bright: "#FFD76A",
    dim: "rgba(245,196,81,0.15)",
    border: "rgba(245,196,81,0.35)",
    borderStrong: "rgba(245,196,81,0.6)",
    glow: "rgba(245,196,81,0.12)",
    glowStrong: "rgba(245,196,81,0.22)",
  },
  // Text
  text: {
    primary: "#FFFFFF",
    secondary: "#F5F5F5",
    muted: "#A3A3A3",
    faint: "#737373",
    gold: "#F5C451",
  },
  // Borders
  border: {
    default: "rgba(255,255,255,0.08)",
    muted: "rgba(255,255,255,0.04)",
    gold: "rgba(245,196,81,0.35)",
    goldStrong: "rgba(245,196,81,0.6)",
  },
  // Semantic
  success: { bg: "rgba(34,197,94,0.12)", text: "#4ade80", border: "rgba(34,197,94,0.25)" },
  warning: { bg: "rgba(245,196,81,0.12)", text: "#F5C451", border: "rgba(245,196,81,0.35)" },
  danger: { bg: "rgba(239,68,68,0.12)", text: "#f87171", border: "rgba(239,68,68,0.25)" },
  info: { bg: "rgba(59,130,246,0.12)", text: "#60a5fa", border: "rgba(59,130,246,0.25)" },
} as const;

export const fonts = {
  heading: "var(--font-space-grotesk)",
  body: "var(--font-inter)",
  mono: "var(--font-geist-mono)",
} as const;

export const radius = {
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "20px",
  "2xl": "24px",
  "3xl": "32px",
  full: "9999px",
} as const;

export const shadow = {
  goldSm: "0 0 12px rgba(245,196,81,0.15)",
  goldMd: "0 0 24px rgba(245,196,81,0.2)",
  goldLg: "0 0 40px rgba(245,196,81,0.25)",
  card: "0 4px 24px rgba(0,0,0,0.5)",
  cardHover: "0 8px 40px rgba(0,0,0,0.6)",
} as const;
