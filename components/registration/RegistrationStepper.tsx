import { Check } from "lucide-react";

interface RegistrationStepperProps {
  currentStep: number;
  totalSteps: number;
}

const steps = [
  { number: 1, title: "Institution" },
  { number: 2, title: "Team" },
  { number: 3, title: "Members" },
  { number: 4, title: "Film Details" },
  { number: 5, title: "Review" },
];

export function RegistrationStepper({ currentStep }: RegistrationStepperProps) {
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;
  const pct = Math.round((currentStep / steps.length) * 100);

  return (
    <div style={{ width: "100%", marginBottom: "2.5rem" }}>
      {/* Desktop stepper */}
      <div style={{ position: "relative" }} className="desktop-stepper">
        {/* Base track */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "10%",
            right: "10%",
            height: "2px",
            background: "rgba(255, 255, 255, 0.08)",
            zIndex: 0,
          }}
        />
        {/* Gold filled track */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "10%",
            width: `${progress * 0.8}%`,
            height: "2px",
            background: "linear-gradient(90deg, #f5c451, #d9a93a)",
            transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            zIndex: 1,
            boxShadow: "0 0 10px rgba(245, 196, 81, 0.5)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            position: "relative",
            zIndex: 2,
          }}
        >
          {steps.map((s) => {
            const isDone = currentStep > s.number;
            const isCurrent = currentStep === s.number;
            return (
              <div
                key={s.number}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    minWidth: "42px",
                    minHeight: "42px",
                    maxWidth: "42px",
                    maxHeight: "42px",
                    flexShrink: 0,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    fontWeight: 800,
                    transition: "all 0.3s ease",
                    background: isDone
                      ? "linear-gradient(135deg, #ffd76a, #f5c451, #d9a93a)"
                      : isCurrent
                      ? "#0d0d0d"
                      : "#0d0d0d",
                    border: isDone
                      ? "none"
                      : isCurrent
                      ? "2px solid #f5c451"
                      : "1px solid rgba(255, 255, 255, 0.12)",
                    color: isDone ? "#000" : isCurrent ? "#f5c451" : "#737373",
                    boxShadow: isDone
                      ? "0 0 18px rgba(245, 196, 81, 0.4)"
                      : isCurrent
                      ? "0 0 16px rgba(245, 196, 81, 0.25)"
                      : "none",
                  }}
                >
                  {isDone ? <Check size={18} strokeWidth={3} /> : s.number}
                </div>
                <span
                  style={{
                    marginTop: "10px",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: isCurrent ? "#f5c451" : isDone ? "#e5e5e5" : "#737373",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile progress */}
      <div className="mobile-stepper">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <span style={{ fontSize: "13px", color: "#a3a3a3", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Step {currentStep} of {steps.length}:{" "}
            <span style={{ color: "#f5c451", fontWeight: 700 }}>{steps[currentStep - 1]?.title}</span>
          </span>
          <span style={{ fontSize: "13px", fontFamily: "monospace", fontWeight: 800, color: "#f5c451" }}>
            {pct}%
          </span>
        </div>
        <div
          style={{
            width: "100%",
            height: "6px",
            background: "rgba(255, 255, 255, 0.08)",
            borderRadius: "9999px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${pct}%`,
              background: "linear-gradient(90deg, #f5c451, #d9a93a)",
              borderRadius: "9999px",
              transition: "width 0.4s ease",
            }}
          />
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .desktop-stepper { display: block !important; }
          .mobile-stepper { display: none !important; }
        }
        @media (max-width: 639px) {
          .desktop-stepper { display: none !important; }
          .mobile-stepper { display: block !important; }
        }
      `}</style>
    </div>
  );
}
