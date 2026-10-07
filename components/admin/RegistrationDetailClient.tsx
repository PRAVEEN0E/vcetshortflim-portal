"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  updatePaymentStatusAction,
  updateRegistrationStatusAction,
} from "@/actions/admin";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ConfirmationModal } from "@/components/admin/ConfirmationModal";
import { formatDate } from "@/lib/utils";
import {
  ArrowLeft,
  Building,
  Users,
  Film,
  CreditCard,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Maximize2,
  Phone,
  Mail,
  ShieldCheck,
  FileCheck,
  X,
  ShieldAlert,
} from "lucide-react";

interface Member {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
}

interface RegistrationData {
  id: string;
  registrationNumber: string;
  institutionType: string;
  institutionName: string;
  district: string;
  city: string;
  teamName: string;
  leaderName: string;
  leaderPhone: string;
  leaderEmail: string;
  filmTitle: string;
  directorName: string;
  filmDuration: string;
  filmDescription: string;
  driveLink: string;
  paymentScreenshotUrl: string;
  upiId: string;
  paymentAmount: number;
  paymentStatus: string;
  registrationStatus: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  members: Member[];
}

interface RegistrationDetailClientProps {
  registration: RegistrationData;
}

export function RegistrationDetailClient({
  registration,
}: RegistrationDetailClientProps) {
  const router = useRouter();

  const [reg, setReg] = useState(registration);
  const [isScreenshotZoomed, setIsScreenshotZoomed] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Modal dialog states
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    type: "payment" | "registration";
    targetStatus: "VERIFIED" | "REJECTED" | "APPROVED";
    title: string;
    message: string;
    variant: "danger" | "success" | "warning";
  }>({
    isOpen: false,
    type: "payment",
    targetStatus: "VERIFIED",
    title: "",
    message: "",
    variant: "warning",
  });

  const openPaymentModal = (targetStatus: "VERIFIED" | "REJECTED") => {
    if (targetStatus === "VERIFIED") {
      setModalConfig({
        isOpen: true,
        type: "payment",
        targetStatus,
        title: "Verify ₹500 Payment?",
        message: `Are you sure you want to mark the payment for ${reg.registrationNumber} (${reg.teamName}) as VERIFIED?`,
        variant: "success",
      });
    } else {
      setModalConfig({
        isOpen: true,
        type: "payment",
        targetStatus,
        title: "Reject Payment Screenshot?",
        message: `Are you sure you want to REJECT the payment screenshot for ${reg.registrationNumber}? The team will be notified of invalid payment.`,
        variant: "danger",
      });
    }
  };

  const openRegistrationModal = (targetStatus: "APPROVED" | "REJECTED") => {
    if (targetStatus === "APPROVED") {
      setModalConfig({
        isOpen: true,
        type: "registration",
        targetStatus,
        title: "Approve Short Film Registration?",
        message: `Are you sure you want to officially APPROVE registration ${reg.registrationNumber} ("${reg.filmTitle}") for festival screening?`,
        variant: "success",
      });
    } else {
      setModalConfig({
        isOpen: true,
        type: "registration",
        targetStatus,
        title: "Reject / Disqualify Registration?",
        message: `Are you sure you want to REJECT registration ${reg.registrationNumber}? This will exclude the entry from the festival.`,
        variant: "danger",
      });
    }
  };

  const handleConfirmModal = async () => {
    setActionLoading(true);
    try {
      if (modalConfig.type === "payment") {
        const res = await updatePaymentStatusAction(reg.id, modalConfig.targetStatus as any);
        if (res.success) {
          setReg((prev) => ({
            ...prev,
            paymentStatus: modalConfig.targetStatus,
          }));
        }
      } else {
        const res = await updateRegistrationStatusAction(
          reg.id,
          modalConfig.targetStatus as any
        );
        if (res.success) {
          setReg((prev) => ({
            ...prev,
            registrationStatus: modalConfig.targetStatus,
          }));
        }
      }
      router.refresh();
    } catch (e) {
      console.error("Action error:", e);
    } finally {
      setActionLoading(false);
      setModalConfig((prev) => ({ ...prev, isOpen: false }));
    }
  };

  return (
    <div className="w-full" style={{ paddingBottom: "4rem" }}>
      {/* Top Header Bar */}
      <div className="detail-top-bar">
        <div className="title-left">
          <Link href="/admin/dashboard" className="btn-back-square">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <div className="meta-subtext">
              <span>REGISTRATION PROFILE</span>
              <span className="dot">&bull;</span>
              <span>Submitted {formatDate(reg.createdAt)}</span>
            </div>
            <h1 className="reg-id-title">{reg.registrationNumber}</h1>
          </div>
        </div>

        {/* Status badges */}
        <div className="badges-group">
          <StatusBadge type="payment" status={reg.paymentStatus} />
          <StatusBadge type="registration" status={reg.registrationStatus} />
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="detail-grid">
        {/* Left Column: Details Cards */}
        <div className="left-col">
          {/* Card 1: Institution Details */}
          <div className="admin-card">
            <div className="card-header">
              <div className="card-header-icon">
                <Building size={18} />
              </div>
              <h2 className="card-header-title">INSTITUTION DETAILS</h2>
            </div>

            <div className="data-grid-2">
              <div className="data-item">
                <span className="data-label">Institution Name</span>
                <span className="data-value strong">{reg.institutionName}</span>
              </div>

              <div className="data-item">
                <span className="data-label">Institution Type</span>
                <span className="data-value gold">{reg.institutionType}</span>
              </div>

              <div className="data-item">
                <span className="data-label">District</span>
                <span className="data-value">{reg.district}</span>
              </div>

              <div className="data-item">
                <span className="data-label">City / Location</span>
                <span className="data-value">{reg.city}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Team & Leader Details */}
          <div className="admin-card">
            <div className="card-header">
              <div className="card-header-icon">
                <Users size={18} />
              </div>
              <h2 className="card-header-title">TEAM &amp; LEADER DETAILS</h2>
            </div>

            <div className="data-grid-2">
              <div className="data-item">
                <span className="data-label">Team Name</span>
                <span className="data-value strong">{reg.teamName}</span>
              </div>

              <div className="data-item">
                <span className="data-label">Team Leader Name</span>
                <span className="data-value">{reg.leaderName}</span>
              </div>

              <div className="data-item">
                <span className="data-label">Leader Phone</span>
                <a href={`tel:${reg.leaderPhone}`} className="data-link mono">
                  <Phone size={13} />
                  <span>+91 {reg.leaderPhone}</span>
                </a>
              </div>

              <div className="data-item">
                <span className="data-label">Leader Email</span>
                <a href={`mailto:${reg.leaderEmail}`} className="data-link">
                  <Mail size={13} />
                  <span>{reg.leaderEmail}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Card 3: Team Members */}
          <div className="admin-card">
            <div className="card-header">
              <div className="card-header-icon">
                <Users size={18} />
              </div>
              <h2 className="card-header-title">
                TEAM MEMBERS ({reg.members.length} / 5)
              </h2>
            </div>

            <div className="members-stack">
              {reg.members.map((m, idx) => (
                <div key={m.id || idx} className="member-item-row">
                  <div className="member-left">
                    <div className="member-name-tag">
                      <span className="m-name">{m.name}</span>
                      <span className="m-role">{m.role}</span>
                    </div>
                    <div className="member-contacts">
                      <span className="mono">📞 +91 {m.phone}</span>
                      <span>✉ {m.email}</span>
                    </div>
                  </div>
                  <span className="member-index-badge">Member #{idx + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Film Details & Google Drive Link */}
          <div className="admin-card">
            <div className="card-header">
              <div className="card-header-icon">
                <Film size={18} />
              </div>
              <h2 className="card-header-title">FILM DETAILS &amp; SUBMISSION</h2>
            </div>

            <div className="film-info-stack">
              <div>
                <span className="data-label">Film Title</span>
                <div className="film-title-display">&ldquo;{reg.filmTitle}&rdquo;</div>
              </div>

              <div className="data-grid-2">
                <div className="data-item">
                  <span className="data-label">Director Name</span>
                  <span className="data-value strong">{reg.directorName}</span>
                </div>
                <div className="data-item">
                  <span className="data-label">Film Duration</span>
                  <span className="data-value gold mono">{reg.filmDuration} Minutes</span>
                </div>
              </div>

              <div>
                <span className="data-label">Synopsis / Description</span>
                <p className="synopsis-box">{reg.filmDescription}</p>
              </div>

              {/* Google Drive Link Box */}
              <div className="drive-link-card">
                <div className="drive-top">
                  <Film size={15} color="#ffd76a" />
                  <span>GOOGLE DRIVE SUBMISSION LINK</span>
                </div>
                <div className="drive-action-row">
                  <span className="drive-url-text mono">{reg.driveLink}</span>
                  <a
                    href={reg.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-open-drive"
                  >
                    <span>OPEN DRIVE LINK</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Payment Verification & Decision Controls */}
        <div className="right-col">
          {/* Card: Payment Information */}
          <div className="admin-card right-sticky-card">
            <div className="card-header" style={{ justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div className="card-header-icon">
                  <CreditCard size={18} />
                </div>
                <h2 className="card-header-title">PAYMENT VERIFICATION</h2>
              </div>
              <span className="amount-tag">₹{reg.paymentAmount}</span>
            </div>

            <div className="payment-meta-rows">
              <div className="p-row">
                <span className="p-label">Payment Status:</span>
                <StatusBadge type="payment" status={reg.paymentStatus} />
              </div>
              <div className="p-row">
                <span className="p-label">Paid To UPI ID:</span>
                <span className="p-val mono" style={{ color: "#ffd76a" }}>{reg.upiId}</span>
              </div>
              <div className="p-row">
                <span className="p-label">Amount:</span>
                <span className="p-val" style={{ fontWeight: 800, color: "#fff", fontSize: "15px" }}>
                  ₹{reg.paymentAmount}
                </span>
              </div>
            </div>

            {/* Cloudinary Payment Screenshot Preview */}
            <div className="screenshot-section">
              <div className="screenshot-top">
                <span className="screenshot-label">CLOUDINARY PAYMENT SCREENSHOT</span>
                <button
                  type="button"
                  onClick={() => setIsScreenshotZoomed(true)}
                  className="btn-zoom-link"
                >
                  <Maximize2 size={13} />
                  <span>Zoom</span>
                </button>
              </div>

              <div
                onClick={() => setIsScreenshotZoomed(true)}
                className="screenshot-preview-box"
              >
                <img
                  src={reg.paymentScreenshotUrl}
                  alt="Payment screenshot proof"
                  className="screenshot-img"
                />
                <div className="zoom-hover-overlay">
                  <Maximize2 size={18} />
                  <span>Click to Enlarge Screenshot</span>
                </div>
              </div>
            </div>

            {/* Payment Decision Buttons */}
            <div className="decision-section">
              <div className="decision-title">ADMIN PAYMENT DECISION</div>
              <div className="action-buttons-grid">
                <button
                  type="button"
                  onClick={() => openPaymentModal("VERIFIED")}
                  disabled={reg.paymentStatus === "VERIFIED"}
                  className="btn-verify-payment"
                >
                  <CheckCircle2 size={16} />
                  <span>VERIFY PAYMENT</span>
                </button>

                <button
                  type="button"
                  onClick={() => openPaymentModal("REJECTED")}
                  disabled={reg.paymentStatus === "REJECTED"}
                  className="btn-reject-payment"
                >
                  <XCircle size={16} />
                  <span>REJECT PAYMENT</span>
                </button>
              </div>
            </div>

            {/* Registration Approval Section */}
            <div className="decision-section" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <ShieldCheck size={16} color="#f5c451" />
                  <span className="decision-title" style={{ margin: 0 }}>REGISTRATION APPROVAL</span>
                </div>
                <StatusBadge type="registration" status={reg.registrationStatus} />
              </div>

              <p className="approval-desc">
                Registration approval decides whether this film is officially accepted into the jury screening pool for the 22 October 2026 festival.
              </p>

              <div className="action-buttons-grid">
                <button
                  type="button"
                  onClick={() => openRegistrationModal("APPROVED")}
                  disabled={reg.registrationStatus === "APPROVED"}
                  className="btn-approve-film"
                >
                  <FileCheck size={16} />
                  <span>APPROVE FILM</span>
                </button>

                <button
                  type="button"
                  onClick={() => openRegistrationModal("REJECTED")}
                  disabled={reg.registrationStatus === "REJECTED"}
                  className="btn-reject-reg"
                >
                  <ShieldAlert size={16} />
                  <span>REJECT REG</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Screenshot Zoom Modal */}
      {isScreenshotZoomed && (
        <div className="modal-lightbox-backdrop" onClick={() => setIsScreenshotZoomed(false)}>
          <div className="modal-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-header">
              <span className="lightbox-title">
                Payment Proof Screenshot &bull; {reg.registrationNumber}
              </span>
              <button
                type="button"
                onClick={() => setIsScreenshotZoomed(false)}
                className="btn-close-lightbox"
              >
                <X size={18} />
              </button>
            </div>
            <div className="lightbox-image-wrap">
              <img
                src={reg.paymentScreenshotUrl}
                alt="Enlarged payment screenshot"
                className="lightbox-full-img"
              />
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        onCancel={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={handleConfirmModal}
        title={modalConfig.title}
        message={modalConfig.message}
        variant={modalConfig.variant}
        isLoading={actionLoading}
      />

      <style>{`
        .detail-top-bar {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        @media (min-width: 640px) {
          .detail-top-bar {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }
        .title-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .btn-back-square {
          width: 44px;
          height: 44px;
          min-width: 44px;
          border-radius: 12px;
          background: #141414;
          border: 1px solid rgba(255, 255, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a3a3a3;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .btn-back-square:hover {
          background: #202020;
          color: #ffffff;
          border-color: rgba(245, 196, 81, 0.4);
        }
        .meta-subtext {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #737373;
        }
        .meta-subtext .dot {
          color: #f5c451;
        }
        .reg-id-title {
          font-family: 'Space Grotesk', monospace, sans-serif;
          font-size: clamp(1.5rem, 4vw, 2.25rem);
          font-weight: 900;
          color: #ffffff;
          letter-spacing: 0.04em;
          margin-top: 2px;
          line-height: 1.1;
        }
        .badges-group {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .detail-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
          align-items: start;
        }
        @media (min-width: 960px) {
          .detail-grid {
            grid-template-columns: 1.25fr 1fr;
          }
        }
        .left-col {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          align-self: start;
          height: fit-content;
        }
        .right-col {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          align-self: start;
          height: fit-content;
        }
        .admin-card {
          background: #0d0d0d;
          border: 1px solid rgba(245, 196, 81, 0.25);
          border-radius: 22px;
          padding: 1.75rem 2rem;
          box-shadow: 0 10px 40px rgba(0,0,0,0.8), 0 0 25px rgba(245,196,81,0.03);
        }
        @media (max-width: 640px) {
          .admin-card {
            padding: 1.5rem 1.25rem;
            border-radius: 18px;
          }
        }
        .card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 1.5rem;
        }
        .card-header-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(245, 196, 81, 0.1);
          border: 1px solid rgba(245, 196, 81, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #f5c451;
        }
        .card-header-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.05rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #ffffff;
        }
        .data-grid-2 {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 520px) {
          .data-grid-2 {
            grid-template-columns: 1fr 1fr;
          }
        }
        .data-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .data-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #737373;
        }
        .data-value {
          font-size: 14px;
          color: #e5e5e5;
        }
        .data-value.strong {
          font-size: 15px;
          font-weight: 700;
          color: #ffffff;
        }
        .data-value.gold {
          color: #ffd76a;
          font-weight: 700;
        }
        .data-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #f5c451;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .data-link:hover {
          color: #ffd76a;
          text-decoration: underline;
        }
        .mono {
          font-family: monospace;
        }
        .members-stack {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .member-item-row {
          padding: 14px 18px;
          border-radius: 14px;
          background: #121212;
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .member-left {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .member-name-tag {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .m-name {
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
        }
        .m-role {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          color: #f5c451;
          background: rgba(245, 196, 81, 0.12);
          border: 1px solid rgba(245, 196, 81, 0.3);
          padding: 2px 7px;
          border-radius: 6px;
        }
        .member-contacts {
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 12px;
          color: #888888;
          flex-wrap: wrap;
        }
        .member-index-badge {
          font-size: 11px;
          font-family: monospace;
          color: #737373;
          flex-shrink: 0;
        }
        .film-info-stack {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .film-title-display {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.5rem;
          font-weight: 900;
          color: #ffd76a;
          line-height: 1.2;
          margin-top: 4px;
        }
        .synopsis-box {
          font-size: 13px;
          line-height: 1.6;
          color: #cccccc;
          background: #121212;
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 14px 16px;
          border-radius: 12px;
          margin-top: 4px;
        }
        .drive-link-card {
          background: rgba(245, 196, 81, 0.06);
          border: 1px solid rgba(245, 196, 81, 0.28);
          border-radius: 14px;
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .drive-top {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #ffd76a;
        }
        .drive-action-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }
        .drive-url-text {
          font-size: 13px;
          color: #ffffff;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 320px;
        }
        .btn-open-drive {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 10px;
          background: linear-gradient(135deg, #ffd76a, #f5c451, #d9a93a);
          color: #000;
          font-size: 12px;
          font-weight: 800;
          text-decoration: none;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }
        .btn-open-drive:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(245, 196, 81, 0.4);
        }
        .amount-tag {
          font-family: monospace;
          font-size: 15px;
          font-weight: 800;
          color: #4ade80;
          background: rgba(74, 222, 128, 0.12);
          border: 1px solid rgba(74, 222, 128, 0.3);
          padding: 4px 10px;
          border-radius: 8px;
        }
        .payment-meta-rows {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 1.25rem;
        }
        .p-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13px;
        }
        .p-label {
          color: #888888;
        }
        .p-val {
          color: #ffffff;
        }
        .screenshot-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 1.5rem;
        }
        .screenshot-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .screenshot-label {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #a3a3a3;
        }
        .btn-zoom-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: transparent;
          border: none;
          color: #f5c451;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }
        .btn-zoom-link:hover {
          color: #ffd76a;
          text-decoration: underline;
        }
        .screenshot-preview-box {
          height: 380px;
          background: #050505;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          cursor: pointer;
          position: relative;
        }
        .screenshot-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 8px;
          transition: transform 0.3s ease;
        }
        .screenshot-preview-box:hover .screenshot-img {
          transform: scale(1.03);
        }
        .zoom-hover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #ffffff;
          font-size: 13px;
          font-weight: 700;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .screenshot-preview-box:hover .zoom-hover-overlay {
          opacity: 1;
        }
        .decision-section {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 1.25rem;
        }
        .decision-title {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #888888;
        }
        .action-buttons-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .btn-verify-payment {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 13px 14px;
          border-radius: 12px;
          background: rgba(34, 197, 94, 0.18);
          border: 1px solid rgba(34, 197, 94, 0.45);
          color: #4ade80;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-verify-payment:hover:not(:disabled) {
          background: #16a34a;
          color: #ffffff;
          border-color: #16a34a;
          box-shadow: 0 4px 16px rgba(34, 197, 94, 0.35);
        }
        .btn-verify-payment:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
        .btn-reject-payment {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 13px 14px;
          border-radius: 12px;
          background: rgba(239, 68, 68, 0.18);
          border: 1px solid rgba(239, 68, 68, 0.45);
          color: #f87171;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-reject-payment:hover:not(:disabled) {
          background: #dc2626;
          color: #ffffff;
          border-color: #dc2626;
          box-shadow: 0 4px 16px rgba(239, 68, 68, 0.35);
        }
        .btn-reject-payment:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
        .approval-desc {
          font-size: 12px;
          color: #737373;
          line-height: 1.5;
        }
        .btn-approve-film {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 13px 14px;
          border-radius: 12px;
          background: linear-gradient(135deg, #ffd76a, #f5c451, #d9a93a);
          color: #000000;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.04em;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 18px rgba(245, 196, 81, 0.3);
          transition: all 0.2s ease;
        }
        .btn-approve-film:hover:not(:disabled) {
          background: linear-gradient(135deg, #ffe082, #ffd76a);
          transform: translateY(-1px);
          box-shadow: 0 6px 22px rgba(245, 196, 81, 0.45);
        }
        .btn-approve-film:disabled {
          opacity: 0.35;
          cursor: not-allowed;
          transform: none;
        }
        .btn-reject-reg {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 13px 14px;
          border-radius: 12px;
          background: #181818;
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #a3a3a3;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-reject-reg:hover:not(:disabled) {
          background: rgba(239, 68, 68, 0.2);
          border-color: rgba(239, 68, 68, 0.5);
          color: #f87171;
        }
        .btn-reject-reg:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
        .modal-lightbox-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.92);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          backdrop-filter: blur(12px);
        }
        .modal-lightbox-content {
          max-width: 900px;
          width: 100%;
          background: #0d0d0d;
          border: 1px solid rgba(245, 196, 81, 0.3);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.95);
        }
        .lightbox-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          background: #141414;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .lightbox-title {
          font-size: 13px;
          font-weight: 700;
          color: #ffd76a;
        }
        .btn-close-lightbox {
          background: rgba(255, 255, 255, 0.08);
          border: none;
          color: #ffffff;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .btn-close-lightbox:hover {
          background: rgba(239, 68, 68, 0.3);
          color: #f87171;
        }
        .lightbox-image-wrap {
          padding: 16px;
          max-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #050505;
        }
        .lightbox-full-img {
          max-height: 75vh;
          max-width: 100%;
          object-fit: contain;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}
