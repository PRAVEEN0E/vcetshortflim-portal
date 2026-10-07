"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { submitRegistration } from "@/actions/registration";
import {
  QrCode,
  Copy,
  Check,
  Upload,
  AlertCircle,
  Loader2,
  ArrowLeft,
  ShieldCheck,
  X,
  CreditCard,
  FileCheck2,
} from "lucide-react";

interface PaymentClientProps {
  upiId: string;
  qrUrl: string;
}

const STORAGE_KEY = "vcet_shortfilm_reg_draft";

export function PaymentClient({ upiId, qrUrl }: PaymentClientProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [draftData, setDraftData] = useState<any>(null);
  const [isLoadingDraft, setIsLoadingDraft] = useState(true);

  // File upload state
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        setDraftData(JSON.parse(raw));
      }
    } catch (e) {
      console.error("Error reading draft data:", e);
    }
    setIsLoadingDraft(false);
  }, []);

  const handleCopyUpi = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    setServerError(null);

    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowed.includes(selectedFile.type)) {
      setFileError("Invalid format. Please upload JPG, JPEG, PNG, or WEBP.");
      return;
    }

    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (selectedFile.size > MAX_SIZE) {
      setFileError("File is too large. Maximum size is 10 MB.");
      return;
    }

    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
  };

  const handleRemoveFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFileError(null);
    setServerError(null);

    if (!draftData) {
      setServerError("Registration data not found. Please fill out the registration form.");
      return;
    }

    if (!file) {
      setFileError("Please upload your payment screenshot before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("registrationData", JSON.stringify(draftData));
      formData.append("upiId", upiId);
      formData.append("screenshot", file);

      const result = await submitRegistration(formData);

      if (!result.success) {
        setServerError(result.error || "Submission failed. Please verify and try again.");
        setIsSubmitting(false);
        return;
      }

      // Clear draft storage
      sessionStorage.removeItem(STORAGE_KEY);

      // Navigate to success page
      router.push(
        `/register/success?regNumber=${encodeURIComponent(
          result.registrationNumber || ""
        )}&team=${encodeURIComponent(draftData.teamName || "")}&film=${encodeURIComponent(
          draftData.filmTitle || ""
        )}&institution=${encodeURIComponent(draftData.institutionName || "")}`
      );
    } catch (err: any) {
      console.error("Submission error:", err);
      setServerError(err?.message || "An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (isLoadingDraft) {
    return (
      <div style={{ padding: "6rem 1rem", textAlign: "center" }}>
        <Loader2 size={36} color="#f5c451" style={{ animation: "spin 1s linear infinite", margin: "0 auto" }} />
        <p style={{ color: "#a3a3a3", fontSize: "14px", marginTop: "16px" }}>Loading payment gateway...</p>
      </div>
    );
  }

  if (!draftData) {
    return (
      <div
        style={{
          maxWidth: "600px",
          margin: "3rem auto",
          background: "#0d0d0d",
          border: "1px solid rgba(245, 196, 81, 0.3)",
          borderRadius: "24px",
          padding: "3rem 2rem",
          textAlign: "center",
          boxShadow: "0 10px 40px rgba(0,0,0,0.8)",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "rgba(245, 196, 81, 0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#f5c451",
            margin: "0 auto 1.5rem",
          }}
        >
          <AlertCircle size={32} />
        </div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", textTransform: "uppercase", marginBottom: "8px" }}>
          No Registration Draft Found
        </h2>
        <p style={{ fontSize: "14px", color: "#888", lineHeight: 1.6, marginBottom: "2rem" }}>
          Please complete your institution, team, and film details on the registration form before accessing payment verification.
        </p>
        <Link
          href="/register"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "14px 28px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #ffd76a, #f5c451, #d9a93a)",
            color: "#000",
            fontWeight: 800,
            fontSize: "14px",
            textDecoration: "none",
          }}
        >
          <ArrowLeft size={16} />
          <span>Go to Registration Form</span>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1050px", margin: "0 auto", paddingBottom: "3rem" }}>
      {/* Top Banner */}
      <div className="payment-top-banner">
        <div className="banner-tag">
          <CreditCard size={13} />
          <span>Manual UPI Verification</span>
        </div>
        <h1 className="banner-title">REGISTRATION FEE</h1>
        <div className="banner-fee-row">
          <span className="banner-amount">₹500</span>
          <span className="banner-per">/ TEAM</span>
        </div>
        <div className="banner-team-pill">
          Team: <strong>&ldquo;{draftData.teamName}&rdquo;</strong> &bull; {draftData.institutionName}
        </div>
      </div>

      <div className="payment-grid">
        {/* Left Column: QR Code & UPI ID */}
        <div className="payment-card left-card">
          <div className="card-badge">
            <QrCode size={15} />
            <span>Scan QR to Pay</span>
          </div>

          {/* QR Code image */}
          <div className="qr-container">
            <img
              src={qrUrl}
              alt="VCET Short Film Competition UPI QR Code"
              className="qr-image"
            />
          </div>

          <p className="qr-caption">Scan with GPay, PhonePe, Paytm, BHIM, or any UPI App</p>

          {/* UPI ID Box */}
          <div className="upi-box">
            <div className="upi-label">OFFICIAL FESTIVAL UPI ID</div>
            <div className="upi-row">
              <span className="upi-text">{upiId}</span>
              <button
                type="button"
                onClick={handleCopyUpi}
                className="btn-copy-upi"
              >
                {copied ? <Check size={14} strokeWidth={3} /> : <Copy size={14} />}
                <span>{copied ? "COPIED!" : "COPY UPI ID"}</span>
              </button>
            </div>
            {copied && (
              <p className="copied-toast">✓ UPI ID copied to clipboard</p>
            )}
          </div>
        </div>

        {/* Right Column: Instructions & Screenshot Upload Form */}
        <div className="payment-card right-card">
          <div className="instructions-header">
            <FileCheck2 size={20} color="#f5c451" />
            <h2 className="instructions-title">PAYMENT INSTRUCTIONS</h2>
          </div>

          <ol className="steps-list">
            <li className="step-item">
              <span className="step-num">1</span>
              <span>Scan the QR code using any UPI application (GPay, PhonePe, Paytm, BHIM).</span>
            </li>
            <li className="step-item">
              <span className="step-num">2</span>
              <span>Pay exactly <strong style={{ color: "#ffd76a" }}>₹500</strong> for team registration.</span>
            </li>
            <li className="step-item">
              <span className="step-num">3</span>
              <span>Complete the payment transaction.</span>
            </li>
            <li className="step-item">
              <span className="step-num">4</span>
              <span>Take a clear screenshot of the successful payment receipt.</span>
            </li>
            <li className="step-item">
              <span className="step-num">5</span>
              <span>Upload the screenshot below (JPG, PNG, WEBP &le; 10 MB).</span>
            </li>
            <li className="step-item">
              <span className="step-num">6</span>
              <span>Submit the registration to receive your official Registration Number.</span>
            </li>
          </ol>

          {/* Upload Form */}
          <form onSubmit={handleSubmit} style={{ marginTop: "1.75rem" }}>
            <div style={{ marginBottom: "1.25rem" }}>
              <label className="upload-label">
                UPLOAD PAYMENT SCREENSHOT <span style={{ color: "#f5c451" }}>*</span>
              </label>

              {!previewUrl ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="upload-dropzone"
                >
                  <div className="upload-icon-circle">
                    <Upload size={24} />
                  </div>
                  <div className="upload-prompt-text">
                    Click to select payment receipt screenshot
                  </div>
                  <div className="upload-hint-text">
                    Supports JPG, JPEG, PNG, WEBP (Max 10 MB)
                  </div>
                </div>
              ) : (
                <div className="preview-container">
                  <div className="preview-image-box">
                    <img
                      src={previewUrl}
                      alt="Payment screenshot preview"
                      className="preview-img"
                    />
                  </div>
                  <div className="preview-footer">
                    <span className="preview-filename">{file?.name}</span>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="btn-remove-preview"
                    >
                      <X size={14} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />

              {fileError && (
                <p className="field-error-text">{fileError}</p>
              )}
            </div>

            {/* Server Error Alert */}
            {serverError && (
              <div className="error-alert-box">
                <AlertCircle size={18} style={{ flexShrink: 0, marginTop: "2px" }} />
                <span>{serverError}</span>
              </div>
            )}

            {/* Submit Button */}
            <div style={{ marginTop: "1.5rem" }}>
              <button
                type="submit"
                disabled={isSubmitting || !file}
                className="btn-submit-payment"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} style={{ animation: "spin 1s linear infinite" }} />
                    <span>Processing Registration &amp; Cloud Upload...</span>
                  </>
                ) : (
                  <span>SUBMIT REGISTRATION</span>
                )}
              </button>

              <div className="security-footer">
                <ShieldCheck size={15} color="#4ade80" />
                <span>Secure SSL server processing &bull; Cloudinary certified storage</span>
              </div>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        .payment-top-banner {
          background: #0d0d0d;
          border: 1px solid rgba(245, 196, 81, 0.35);
          border-radius: 24px;
          padding: 2.25rem 2rem;
          text-align: center;
          margin-bottom: 2rem;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,0.8), 0 0 30px rgba(245,196,81,0.06);
        }
        .banner-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          border-radius: 9999px;
          background: rgba(245, 196, 81, 0.1);
          border: 1px solid rgba(245, 196, 81, 0.25);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #f5c451;
          margin-bottom: 10px;
        }
        .banner-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.5rem, 4vw, 2.25rem);
          font-weight: 900;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: #ffffff;
          line-height: 1.1;
        }
        .banner-fee-row {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 8px;
          margin: 12px 0 14px;
        }
        .banner-amount {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(3rem, 7vw, 4.25rem);
          font-weight: 900;
          background: linear-gradient(135deg, #ffd76a 0%, #f5c451 50%, #d9a93a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }
        .banner-per {
          font-size: 14px;
          font-weight: 700;
          color: #a3a3a3;
          letter-spacing: 0.08em;
        }
        .banner-team-pill {
          display: inline-block;
          font-size: 13px;
          color: #d4d4d4;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 6px 16px;
          border-radius: 9999px;
          max-width: 90%;
        }
        .payment-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: stretch;
        }
        @media (min-width: 820px) {
          .payment-grid {
            grid-template-columns: 1fr 1.25fr;
          }
        }
        .payment-card {
          background: #0d0d0d;
          border: 1px solid rgba(245, 196, 81, 0.25);
          border-radius: 24px;
          padding: 2.25rem 2rem;
          box-shadow: 0 10px 40px rgba(0,0,0,0.8), 0 0 30px rgba(245,196,81,0.04);
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 640px) {
          .payment-card {
            padding: 1.75rem 1.25rem;
            border-radius: 20px;
          }
        }
        .left-card {
          align-items: center;
          text-align: center;
        }
        .card-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border-radius: 9999px;
          background: rgba(245, 196, 81, 0.1);
          border: 1px solid rgba(245, 196, 81, 0.25);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #f5c451;
          margin-bottom: 1.5rem;
        }
        .qr-container {
          width: 100%;
          max-width: 260px;
          aspect-ratio: 1 / 1;
          background: #ffffff;
          padding: 16px;
          border-radius: 20px;
          border: 2px solid rgba(245, 196, 81, 0.4);
          box-shadow: 0 0 35px rgba(245, 196, 81, 0.25), 0 10px 30px rgba(0,0,0,0.8);
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .qr-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .qr-caption {
          font-size: 12px;
          color: #737373;
          margin-bottom: 1.5rem;
          max-width: 260px;
          line-height: 1.4;
        }
        .upi-box {
          width: 100%;
          background: #121212;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 14px 16px;
          box-sizing: border-box;
        }
        .upi-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #737373;
          margin-bottom: 8px;
          text-align: left;
        }
        .upi-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }
        .upi-text {
          font-family: monospace;
          font-size: 15px;
          font-weight: 800;
          color: #ffd76a;
          word-break: break-all;
          text-align: left;
        }
        .btn-copy-upi {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 10px;
          background: linear-gradient(135deg, #ffd76a, #f5c451, #d9a93a);
          color: #000;
          font-size: 12px;
          font-weight: 800;
          border: none;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }
        .btn-copy-upi:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(245, 196, 81, 0.4);
        }
        .copied-toast {
          font-size: 12px;
          font-weight: 600;
          color: #4ade80;
          margin-top: 8px;
          text-align: left;
        }
        .instructions-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 1.25rem;
        }
        .instructions-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.15rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #ffffff;
        }
        .steps-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .step-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 13px;
          color: #cccccc;
          line-height: 1.5;
        }
        .step-num {
          width: 24px;
          height: 24px;
          min-width: 24px;
          border-radius: 50%;
          background: rgba(245, 196, 81, 0.15);
          color: #f5c451;
          font-weight: 800;
          font-size: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 1px;
        }
        .upload-label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #a3a3a3;
          margin-bottom: 8px;
        }
        .upload-dropzone {
          border: 2px dashed rgba(245, 196, 81, 0.4);
          background: rgba(245, 196, 81, 0.02);
          border-radius: 16px;
          padding: 2rem 1.5rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .upload-dropzone:hover {
          border-color: #f5c451;
          background: rgba(245, 196, 81, 0.06);
        }
        .upload-icon-circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(245, 196, 81, 0.1);
          color: #f5c451;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
        }
        .upload-prompt-text {
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
        }
        .upload-hint-text {
          font-size: 12px;
          color: #737373;
          margin-top: 4px;
        }
        .preview-container {
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: #141414;
          border-radius: 16px;
          padding: 12px;
        }
        .preview-image-box {
          height: 240px;
          background: #050505;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .preview-img {
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
        }
        .preview-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 10px;
          padding: 0 4px;
        }
        .preview-filename {
          font-size: 12px;
          color: #a3a3a3;
          max-width: 220px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .btn-remove-preview {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: #f87171;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 6px;
          padding: 4px 10px;
          cursor: pointer;
        }
        .btn-remove-preview:hover {
          background: rgba(239, 68, 68, 0.2);
        }
        .field-error-text {
          font-size: 12px;
          color: #f87171;
          margin-top: 6px;
          font-weight: 500;
        }
        .error-alert-box {
          padding: 12px 16px;
          border-radius: 12px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #f87171;
          font-size: 13px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-top: 12px;
        }
        .btn-submit-payment {
          width: 100%;
          padding: 16px 24px;
          border-radius: 14px;
          background: linear-gradient(135deg, #ffd76a 0%, #f5c451 50%, #d9a93a 100%);
          color: #000000;
          font-family: inherit;
          font-weight: 900;
          font-size: 15px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          box-shadow: 0 6px 26px rgba(245, 196, 81, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.2s ease;
        }
        .btn-submit-payment:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 32px rgba(245, 196, 81, 0.45);
        }
        .btn-submit-payment:disabled {
          opacity: 0.45;
          cursor: not-allowed;
          transform: none;
        }
        .security-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 12px;
          color: #737373;
          margin-top: 14px;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
