import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Users,
  Film,
  FileCheck,
  ShieldAlert,
  ArrowRight,
  Phone,
} from "lucide-react";

export const metadata = {
  title: "Rules & Eligibility | VCET State Level Short Film Competition 2026",
  description:
    "Official rulebook, eligibility guidelines, and submission instructions for the State Level Short Film Competition at Velalar College of Engineering and Technology.",
};

export default function RulesPage() {
  const eligibilityList = [
    "School Students currently enrolled in 10th, 11th, or 12th Standard from any recognized board in Tamil Nadu.",
    "College Students pursuing Diploma, Undergraduate (UG), or Postgraduate (PG) programs from recognized colleges and universities across Tamil Nadu.",
    "Valid institution identity proof (School / College ID card) must be presented by participants during final screening verification.",
    "Individual crew members can only be associated with one participating film submission.",
  ];

  const submissionRules = [
    "Theme: Completely OPEN THEME. Entries can explore any creative story, narrative, or genre.",
    "Runtime Limit: Film duration must NOT exceed 10 minutes. Opening titles and closing credits are included within this 10-minute cap.",
    "Language & Subtitles: Tamil or English dialogue is preferred. Films with regional dialect or other Indian languages must feature English subtitles.",
    "Submission Link: High quality public Google Drive link (1080p Full HD MP4 or MOV format). The drive folder or file permission must be set to 'Anyone with the link can view'.",
    "Originality: The film must be 100% original work produced by the registered team. Plagiarized scripts or footage will lead to immediate cancellation.",
    "Copyright & Audio: All music tracks, stock footage, or sound effects must be copyright-free or have appropriate creative commons / team ownership rights.",
  ];

  const disqualificationPoints = [
    "Submissions exceeding the strict 10-minute maximum runtime.",
    "Use of abusive, defamatory, communally provocative, or vulgar content.",
    "Unaccessible or restricted Google Drive links that cannot be reviewed by the jury before 19 October 2026.",
    "Teams submitting more than 5 members or failing to upload verifiable payment proof of the ₹500 entry fee.",
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#050505", color: "#fff" }}>
      <Navbar />

      <main style={{ flex: 1, padding: "4rem 1.5rem 5rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 3.5rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "9999px", background: "rgba(245,196,81,0.08)", border: "1px solid rgba(245,196,81,0.25)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#f5c451", marginBottom: "1.25rem" }}>
              <BookOpen size={12} />
              Official Rulebook &amp; Code of Conduct
            </div>
            <h1 style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase" as const, letterSpacing: "-0.02em", lineHeight: 1.05, marginBottom: "1rem" }}>
              RULES &amp;{" "}
              <span style={{ background: "linear-gradient(135deg, #ffd76a, #f5c451, #d9a93a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>ELIGIBILITY</span>
            </h1>
            <p style={{ fontSize: "15px", color: "#a3a3a3", lineHeight: 1.7, maxWidth: "560px", margin: "0 auto" }}>
              Please review all official competition rules carefully before registering your short film. Strict compliance ensures fair adjudication.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Quick Summary Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
              {[{ icon: Clock, label: "Runtime Cap", value: "Max 10 Minutes", c: "#f5c451" }, { icon: Users, label: "Team Limit", value: "Maximum 5 Members", c: "#f5c451" }, { icon: Film, label: "Entry Fee", value: "₹500 / Team", c: "#4ade80" }].map((item, i) => { const Icon = item.icon; return (
              <div key={i} style={{ background: "#0d0d0d", border: "1px solid rgba(245,196,81,0.15)", borderRadius: "14px", padding: "1.5rem", textAlign: "center" }}>
                <Icon size={28} color="#f5c451" style={{ margin: "0 auto 8px" }} />
                <div style={{ fontSize: "10px", textTransform: "uppercase" as const, letterSpacing: "0.08em", color: "#737373", fontWeight: 600 }}>{item.label}</div>
                <div style={{ fontSize: "16px", fontWeight: 800, color: item.c, marginTop: "4px", fontFamily: "'Space Grotesk', sans-serif" }}>{item.value}</div>
              </div>); })}
            </div>

            {/* Section 1: Eligibility */}
            <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "1.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.25rem" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(245,196,81,0.08)", border: "1px solid rgba(245,196,81,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#f5c451", flexShrink: 0 }}><Users size={18} /></div>
                <div>
                  <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}>1. Eligibility Criteria</h2>
                  <p style={{ fontSize: "11px", color: "#737373" }}>Who is permitted to compete</p>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {eligibilityList.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13px", color: "#d4d4d4" }}>
                    <CheckCircle2 size={15} color="#4ade80" style={{ flexShrink: 0, marginTop: "1px" }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Film Submission & Specifications */}
            <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "1.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.25rem" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(245,196,81,0.08)", border: "1px solid rgba(245,196,81,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#f5c451", flexShrink: 0 }}><Film size={18} /></div>
                <div>
                  <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}>2. Film Submission Specifications</h2>
                  <p style={{ fontSize: "11px", color: "#737373" }}>Technical criteria and submission guidelines</p>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "1.25rem" }}>
                {submissionRules.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13px", color: "#d4d4d4" }}>
                    <CheckCircle2 size={15} color="#4ade80" style={{ flexShrink: 0, marginTop: "1px" }} />
                    {item}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "12px 14px", background: "rgba(245,196,81,0.06)", border: "1px solid rgba(245,196,81,0.2)", borderRadius: "10px", fontSize: "12px", color: "#d4d4d4" }}>
                <AlertTriangle size={15} color="#f5c451" style={{ flexShrink: 0, marginTop: "1px" }} />
                <div><strong style={{ color: "#f5c451" }}>Important Google Drive Instructions:</strong> Ensure your link has access permissions set to <em>&ldquo;Anyone on the internet with the link can view&rdquo;</em>. If the jury cannot access the video link upon initial review, the submission may be rejected without refund.</div>
              </div>
            </div>

            {/* Section 3: Disqualification Factors */}
            <div style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: "16px", padding: "1.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.25rem" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#f87171", flexShrink: 0 }}><ShieldAlert size={18} /></div>
                <div>
                  <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}>3. Grounds for Immediate Disqualification</h2>
                  <p style={{ fontSize: "11px", color: "#737373" }}>Violations strictly prohibited</p>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {disqualificationPoints.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13px", color: "#d4d4d4" }}>
                    <AlertTriangle size={15} color="#f87171" style={{ flexShrink: 0, marginTop: "1px" }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: Registration Process & Payment Notice */}
            <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "1.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.25rem" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(245,196,81,0.08)", border: "1px solid rgba(245,196,81,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#f5c451", flexShrink: 0 }}><FileCheck size={18} /></div>
                <div>
                  <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}>4. Registration &amp; Fee Policy</h2>
                  <p style={{ fontSize: "11px", color: "#737373" }}>Manual UPI fee and screenshot verification</p>
                </div>
              </div>
              <p style={{ fontSize: "13px", color: "#d4d4d4", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                The competition registration fee is <strong style={{ color: "#fff" }}>₹500 per team</strong>. Payment must be made directly using UPI by scanning the official QR code on the payment page. A screenshot of the completed transaction must be uploaded during submission. All registrations remain in <em>Pending Verification</em> until validated by the organizing committee.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px", paddingTop: "1.25rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: "12px", color: "#737373" }}>Registration Cutoff: <strong style={{ color: "#f5c451" }}>19 October 2026</strong> | Screening: <strong style={{ color: "#f5c451" }}>22 October 2026</strong></div>
                <Link href="/register" className="btn-gold" style={{ padding: "10px 24px", fontSize: "13px" }}>
                  Proceed to Registration <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Contact assistance box */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "1.25rem 1.5rem", background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Phone size={20} color="#f5c451" />
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff", marginBottom: "2px" }}>Need Clarification on Rules?</div>
                  <div style={{ fontSize: "12px", color: "#737373" }}>Call Surya (7358412012) or Pradeep (7418862116)</div>
                </div>
              </div>
              <a href="tel:7358412012" className="btn-ghost" style={{ fontSize: "12px", padding: "8px 16px" }}>Call Coordinator</a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
