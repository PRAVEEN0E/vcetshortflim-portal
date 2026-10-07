"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  fullRegistrationSchema,
  memberRoles,
  type FullRegistrationInput,
} from "@/lib/validations";
import { RegistrationStepper } from "./RegistrationStepper";
import {
  Building2,
  Users,
  Film,
  FileCheck2,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  ExternalLink,
  GraduationCap,
  School,
  Check,
} from "lucide-react";

const STORAGE_KEY = "vcet_shortfilm_reg_draft";

export function MultiStepRegistrationForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [initLoaded, setInitLoaded] = useState(false);

  const form = useForm<FullRegistrationInput>({
    resolver: zodResolver(fullRegistrationSchema),
    mode: "onBlur",
    defaultValues: {
      institutionType: "COLLEGE",
      institutionName: "",
      district: "",
      city: "",
      teamName: "",
      leaderName: "",
      leaderPhone: "",
      leaderEmail: "",
      members: [
        {
          name: "",
          role: "Director",
          phone: "",
          email: "",
        },
      ],
      filmTitle: "",
      directorName: "",
      filmDuration: "9",
      filmDescription: "",
      driveLink: "",
      isOriginalWork: false as unknown as true,
      hasAgreedRules: false as unknown as true,
    },
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  const watchedValues = watch();

  // Load from session storage on mount if available
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        Object.keys(parsed).forEach((k) => {
          setValue(k as any, parsed[k]);
        });
      }
    } catch (e) {
      console.error("Failed to load draft:", e);
    }
    setInitLoaded(true);
  }, [setValue]);

  // Save to session storage on change
  useEffect(() => {
    if (!initLoaded) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(watchedValues));
    } catch (e) {
      console.error("Failed to persist draft:", e);
    }
  }, [watchedValues, initLoaded]);

  // Auto-fill Member 1 with Leader Details if empty
  const copyLeaderToMember1 = () => {
    if (
      watchedValues.leaderName &&
      (!watchedValues.members?.[0]?.name || watchedValues.members[0].name === "")
    ) {
      setValue("members.0.name", watchedValues.leaderName);
      setValue("members.0.phone", watchedValues.leaderPhone);
      setValue("members.0.email", watchedValues.leaderEmail);
    }
  };

  // Step 1 Validation
  const handleNextStep1 = async () => {
    const valid = await trigger([
      "institutionType",
      "institutionName",
      "district",
      "city",
    ]);
    if (valid) setStep(2);
  };

  // Step 2 Validation
  const handleNextStep2 = async () => {
    const valid = await trigger([
      "teamName",
      "leaderName",
      "leaderPhone",
      "leaderEmail",
    ]);
    if (valid) {
      copyLeaderToMember1();
      setStep(3);
    }
  };

  // Step 3 Validation
  const handleNextStep3 = async () => {
    const valid = await trigger("members");
    if (valid) {
      if (!watchedValues.directorName && watchedValues.leaderName) {
        setValue("directorName", watchedValues.leaderName);
      }
      setStep(4);
    }
  };

  // Step 4 Validation
  const handleNextStep4 = async () => {
    const valid = await trigger([
      "filmTitle",
      "directorName",
      "filmDuration",
      "filmDescription",
      "driveLink",
    ]);
    if (valid) setStep(5);
  };

  // Step 5 Submit Review -> Navigate to /register/payment
  const onFinalSubmit = (data: FullRegistrationInput) => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      router.push("/register/payment");
    } catch (err) {
      console.error("Failed to proceed to payment:", err);
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: "860px", margin: "0 auto" }}>
      <RegistrationStepper currentStep={step} totalSteps={5} />

      <form onSubmit={handleSubmit(onFinalSubmit)}>
        {/* ================= STEP 1: INSTITUTION DETAILS ================= */}
        {step === 1 && (
          <div className="form-card">
            <div className="step-header">
              <div className="step-icon-badge">
                <Building2 size={22} />
              </div>
              <div>
                <h2 className="step-title">STEP 1 — INSTITUTION DETAILS</h2>
                <p className="step-subtitle">Where are the team members currently studying?</p>
              </div>
            </div>

            {/* Institution Type Selector */}
            <div className="form-group">
              <label className="input-label">
                Institution Type <span className="required">*</span>
              </label>
              <div className="type-grid">
                <div
                  onClick={() => setValue("institutionType", "SCHOOL")}
                  className={`type-card ${watchedValues.institutionType === "SCHOOL" ? "active" : ""}`}
                >
                  <div className="type-icon">
                    <School size={20} />
                  </div>
                  <div>
                    <div className="type-title">School Category</div>
                    <div className="type-desc">10th, 11th, &amp; 12th Standard</div>
                  </div>
                  <div className={`radio-indicator ${watchedValues.institutionType === "SCHOOL" ? "active" : ""}`}>
                    {watchedValues.institutionType === "SCHOOL" && <Check size={12} strokeWidth={3} />}
                  </div>
                </div>

                <div
                  onClick={() => setValue("institutionType", "COLLEGE")}
                  className={`type-card ${watchedValues.institutionType === "COLLEGE" ? "active" : ""}`}
                >
                  <div className="type-icon">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <div className="type-title">College Category</div>
                    <div className="type-desc">Diploma, UG, &amp; PG Students</div>
                  </div>
                  <div className={`radio-indicator ${watchedValues.institutionType === "COLLEGE" ? "active" : ""}`}>
                    {watchedValues.institutionType === "COLLEGE" && <Check size={12} strokeWidth={3} />}
                  </div>
                </div>
              </div>
              {errors.institutionType && (
                <p className="field-error">{errors.institutionType.message}</p>
              )}
            </div>

            {/* Institution Name */}
            <div className="form-group">
              <label className="input-label">
                Institution Name <span className="required">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Velalar College of Engineering and Technology"
                {...register("institutionName")}
                className={`field-input ${errors.institutionName ? "error" : ""}`}
              />
              {errors.institutionName && (
                <p className="field-error">{errors.institutionName.message}</p>
              )}
            </div>

            {/* District & City */}
            <div className="grid-2col">
              <div className="form-group">
                <label className="input-label">
                  District (Tamil Nadu) <span className="required">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Erode, Coimbatore, Chennai"
                  {...register("district")}
                  className={`field-input ${errors.district ? "error" : ""}`}
                />
                {errors.district && (
                  <p className="field-error">{errors.district.message}</p>
                )}
              </div>

              <div className="form-group">
                <label className="input-label">
                  City / Town <span className="required">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Thindal, Perundurai"
                  {...register("city")}
                  className={`field-input ${errors.city ? "error" : ""}`}
                />
                {errors.city && (
                  <p className="field-error">{errors.city.message}</p>
                )}
              </div>
            </div>

            <div className="action-bar single">
              <button
                type="button"
                onClick={handleNextStep1}
                className="btn-gold-action"
              >
                <span>Continue to Team Details</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: TEAM DETAILS ================= */}
        {step === 2 && (
          <div className="form-card">
            <div className="step-header">
              <div className="step-icon-badge">
                <Users size={22} />
              </div>
              <div>
                <h2 className="step-title">STEP 2 — TEAM DETAILS</h2>
                <p className="step-subtitle">Primary point of contact for this entry</p>
              </div>
            </div>

            {/* Team Name */}
            <div className="form-group">
              <label className="input-label">
                Team Name <span className="required">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., CineCraft Studios"
                {...register("teamName")}
                className={`field-input ${errors.teamName ? "error" : ""}`}
              />
              {errors.teamName && (
                <p className="field-error">{errors.teamName.message}</p>
              )}
            </div>

            {/* Team Leader Name */}
            <div className="form-group">
              <label className="input-label">
                Team Leader Name <span className="required">*</span>
              </label>
              <input
                type="text"
                placeholder="Full Name of Team Leader"
                {...register("leaderName")}
                className={`field-input ${errors.leaderName ? "error" : ""}`}
              />
              {errors.leaderName && (
                <p className="field-error">{errors.leaderName.message}</p>
              )}
            </div>

            {/* Leader Phone & Email */}
            <div className="grid-2col">
              <div className="form-group">
                <label className="input-label">
                  Team Leader Phone (10 Digits) <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="e.g., 9876543210"
                  {...register("leaderPhone")}
                  className={`field-input mono ${errors.leaderPhone ? "error" : ""}`}
                />
                {errors.leaderPhone && (
                  <p className="field-error">{errors.leaderPhone.message}</p>
                )}
              </div>

              <div className="form-group">
                <label className="input-label">
                  Team Leader Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  placeholder="leader@gmail.com"
                  {...register("leaderEmail")}
                  className={`field-input ${errors.leaderEmail ? "error" : ""}`}
                />
                {errors.leaderEmail && (
                  <p className="field-error">{errors.leaderEmail.message}</p>
                )}
              </div>
            </div>

            <div className="action-bar">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-back-action"
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleNextStep2}
                className="btn-gold-action"
              >
                <span>Continue to Members</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: TEAM MEMBERS ================= */}
        {step === 3 && (
          <div className="form-card">
            <div className="step-header-with-badge">
              <div className="step-header" style={{ borderBottom: "none", paddingBottom: 0 }}>
                <div className="step-icon-badge">
                  <Users size={22} />
                </div>
                <div>
                  <h2 className="step-title">STEP 3 — TEAM MEMBERS</h2>
                  <p className="step-subtitle">Total maximum 5 members allowed (including Leader)</p>
                </div>
              </div>

              <div className="counter-pill">
                <span>MEMBERS:</span>
                <strong>{fields.length} / 5</strong>
              </div>
            </div>

            {/* Member Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.5rem" }}>
              {fields.map((field, idx) => (
                <div key={field.id} className="member-card">
                  <div className="member-card-header">
                    <span className="member-card-badge">
                      Member #{idx + 1} {idx === 0 && "(Team Leader / Member 1)"}
                    </span>
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(idx)}
                        className="btn-remove-member"
                      >
                        <Trash2 size={13} />
                        <span>Remove</span>
                      </button>
                    )}
                  </div>

                  <div className="member-fields-grid">
                    <div>
                      <label className="input-label-sm">
                        Full Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Member Name"
                        {...register(`members.${idx}.name` as const)}
                        className={`field-input-sm ${errors.members?.[idx]?.name ? "error" : ""}`}
                      />
                      {errors.members?.[idx]?.name && (
                        <p className="field-error">{errors.members[idx]?.name?.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="input-label-sm">
                        Role in Film <span className="required">*</span>
                      </label>
                      <select
                        {...register(`members.${idx}.role` as const)}
                        className={`field-input-sm select ${errors.members?.[idx]?.role ? "error" : ""}`}
                      >
                        {memberRoles.map((role) => (
                          <option key={role} value={role} style={{ background: "#111", color: "#fff" }}>
                            {role}
                          </option>
                        ))}
                      </select>
                      {errors.members?.[idx]?.role && (
                        <p className="field-error">{errors.members[idx]?.role?.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="input-label-sm">
                        Phone <span className="required">*</span>
                      </label>
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="10 Digits"
                        {...register(`members.${idx}.phone` as const)}
                        className={`field-input-sm mono ${errors.members?.[idx]?.phone ? "error" : ""}`}
                      />
                      {errors.members?.[idx]?.phone && (
                        <p className="field-error">{errors.members[idx]?.phone?.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="input-label-sm">
                        Email <span className="required">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="email@domain.com"
                        {...register(`members.${idx}.email` as const)}
                        className={`field-input-sm ${errors.members?.[idx]?.email ? "error" : ""}`}
                      />
                      {errors.members?.[idx]?.email && (
                        <p className="field-error">{errors.members[idx]?.email?.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Member Button */}
            <div style={{ marginTop: "1rem" }}>
              {fields.length < 5 ? (
                <button
                  type="button"
                  onClick={() =>
                    append({
                      name: "",
                      role: "Actor",
                      phone: "",
                      email: "",
                    })
                  }
                  className="btn-add-member"
                >
                  <Plus size={16} />
                  <span>+ Add Team Member ({fields.length} / 5 added)</span>
                </button>
              ) : (
                <div className="limit-notice">
                  Maximum team limit of 5 members reached.
                </div>
              )}
            </div>

            <div className="action-bar">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn-back-action"
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleNextStep3}
                className="btn-gold-action"
              >
                <span>Continue to Film Details</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 4: FILM DETAILS ================= */}
        {step === 4 && (
          <div className="form-card">
            <div className="step-header">
              <div className="step-icon-badge">
                <Film size={22} />
              </div>
              <div>
                <h2 className="step-title">STEP 4 — FILM DETAILS</h2>
                <p className="step-subtitle">Film synopsis, duration, and public Google Drive submission</p>
              </div>
            </div>

            {/* Film Title & Director Name */}
            <div className="grid-2col">
              <div className="form-group">
                <label className="input-label">
                  Film Title <span className="required">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., The Silent Canvas"
                  {...register("filmTitle")}
                  className={`field-input ${errors.filmTitle ? "error" : ""}`}
                />
                {errors.filmTitle && (
                  <p className="field-error">{errors.filmTitle.message}</p>
                )}
              </div>

              <div className="form-group">
                <label className="input-label">
                  Director Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Director Full Name"
                  {...register("directorName")}
                  className={`field-input ${errors.directorName ? "error" : ""}`}
                />
                {errors.directorName && (
                  <p className="field-error">{errors.directorName.message}</p>
                )}
              </div>
            </div>

            {/* Film Duration */}
            <div className="form-group">
              <label className="input-label">
                Film Duration (Max 10 Minutes) <span className="required">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., 8:30 (Minutes:Seconds) or 9"
                {...register("filmDuration")}
                className={`field-input mono ${errors.filmDuration ? "error" : ""}`}
              />
              <p className="field-hint">
                Must not exceed 10 minutes total, including introductory titles and credits.
              </p>
              {errors.filmDuration && (
                <p className="field-error">{errors.filmDuration.message}</p>
              )}
            </div>

            {/* Film Description */}
            <div className="form-group">
              <label className="input-label">
                Film Synopsis / Description <span className="required">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Briefly describe the plot, logline, or message of your short film..."
                {...register("filmDescription")}
                className={`field-textarea ${errors.filmDescription ? "error" : ""}`}
              />
              {errors.filmDescription && (
                <p className="field-error">{errors.filmDescription.message}</p>
              )}
            </div>

            {/* Google Drive Public Link */}
            <div className="form-group">
              <label className="input-label">
                Google Drive Public Link <span className="required">*</span>
              </label>
              <input
                type="url"
                placeholder="https://drive.google.com/file/d/.../view?usp=sharing"
                {...register("driveLink")}
                className={`field-input mono ${errors.driveLink ? "error" : ""}`}
              />
              <div className="drive-alert">
                <AlertCircle size={18} className="alert-icon" />
                <div style={{ lineHeight: 1.5 }}>
                  <strong style={{ color: "#ffd76a" }}>Important Google Drive Setting:</strong>{" "}
                  Set link access to <strong>&ldquo;Anyone with the link can view&rdquo;</strong>.
                  If the link is restricted to VCET or private access, the jury will NOT be able to view your entry.
                </div>
              </div>
              {errors.driveLink && (
                <p className="field-error">{errors.driveLink.message}</p>
              )}
            </div>

            <div className="action-bar">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="btn-back-action"
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleNextStep4}
                className="btn-gold-action"
              >
                <span>Review Registration</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 5: REVIEW & CONFIRM ================= */}
        {step === 5 && (
          <div className="form-card">
            <div className="step-header">
              <div className="step-icon-badge">
                <FileCheck2 size={22} />
              </div>
              <div>
                <h2 className="step-title">STEP 5 — REVIEW REGISTRATION</h2>
                <p className="step-subtitle">Verify all entered information before proceeding to payment</p>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="summary-grid">
              {/* Institution Summary */}
              <div className="summary-card">
                <div className="summary-card-header">
                  <span>INSTITUTION DETAILS</span>
                  <button type="button" onClick={() => setStep(1)} className="btn-edit-link">
                    Edit
                  </button>
                </div>
                <div className="summary-value-title">{watchedValues.institutionName || "—"}</div>
                <div className="summary-detail">Category: <span style={{ color: "#f5c451", fontWeight: 600 }}>{watchedValues.institutionType}</span></div>
                <div className="summary-detail">Location: {watchedValues.city}, {watchedValues.district}</div>
              </div>

              {/* Team & Leader Summary */}
              <div className="summary-card">
                <div className="summary-card-header">
                  <span>TEAM &amp; LEADER</span>
                  <button type="button" onClick={() => setStep(2)} className="btn-edit-link">
                    Edit
                  </button>
                </div>
                <div className="summary-value-title">{watchedValues.teamName || "—"}</div>
                <div className="summary-detail">Leader: {watchedValues.leaderName}</div>
                <div className="summary-detail mono">📞 +91 {watchedValues.leaderPhone} | ✉ {watchedValues.leaderEmail}</div>
              </div>

              {/* Members Summary */}
              <div className="summary-card full-width">
                <div className="summary-card-header">
                  <span>TEAM MEMBERS ({watchedValues.members?.length || 0} / 5)</span>
                  <button type="button" onClick={() => setStep(3)} className="btn-edit-link">
                    Edit
                  </button>
                </div>
                <div className="summary-members-grid">
                  {watchedValues.members?.map((m, i) => (
                    <div key={i} className="summary-member-item">
                      <div className="summary-member-top">
                        <span style={{ fontWeight: 700, color: "#fff" }}>{m.name || `Member ${i + 1}`}</span>
                        <span className="summary-role-tag">{m.role}</span>
                      </div>
                      <div className="summary-member-phone mono">{m.phone}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Film Summary */}
              <div className="summary-card full-width">
                <div className="summary-card-header">
                  <span>FILM SUBMISSION</span>
                  <button type="button" onClick={() => setStep(4)} className="btn-edit-link">
                    Edit
                  </button>
                </div>
                <div className="summary-value-title" style={{ color: "#f5c451" }}>
                  &ldquo;{watchedValues.filmTitle || "—"}&rdquo;
                </div>
                <div className="summary-detail">Director: <strong>{watchedValues.directorName}</strong> &bull; Duration: <strong>{watchedValues.filmDuration} mins</strong></div>
                <p className="summary-synopsis">{watchedValues.filmDescription}</p>
                <div className="summary-drive-link">
                  <ExternalLink size={14} style={{ flexShrink: 0 }} />
                  <span className="mono">{watchedValues.driveLink}</span>
                </div>
              </div>
            </div>

            {/* Mandatory Checkbox Confirmations */}
            <div className="confirmation-box">
              <h3 className="confirmation-title">REQUIRED PARTICIPATION CONFIRMATIONS</h3>

              <label className="checkbox-row">
                <input
                  type="checkbox"
                  {...register("isOriginalWork")}
                  className="checkbox-input"
                />
                <span className="checkbox-text">
                  I confirm that the submitted film is original work created solely by our team members. Any form of plagiarism or unauthorized content will lead to immediate disqualification.
                </span>
              </label>
              {errors.isOriginalWork && (
                <p className="field-error" style={{ marginLeft: "30px" }}>{errors.isOriginalWork.message}</p>
              )}

              <label className="checkbox-row">
                <input
                  type="checkbox"
                  {...register("hasAgreedRules")}
                  className="checkbox-input"
                />
                <span className="checkbox-text">
                  I have read and agree to all competition rules, screening guidelines, and accept the non-refundable registration fee of ₹500 per team.
                </span>
              </label>
              {errors.hasAgreedRules && (
                <p className="field-error" style={{ marginLeft: "30px" }}>{errors.hasAgreedRules.message}</p>
              )}
            </div>

            {/* Navigation & Submit button */}
            <div className="action-bar">
              <button
                type="button"
                onClick={() => setStep(4)}
                className="btn-back-action"
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>

              <button
                type="submit"
                className="btn-gold-action large"
              >
                <span>PROCEED TO PAYMENT (₹500)</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </form>

      <style>{`
        .form-card {
          background: #0d0d0d;
          border: 1px solid rgba(245, 196, 81, 0.28);
          border-radius: 24px;
          padding: 2.5rem 2.25rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8), 0 0 40px rgba(245, 196, 81, 0.05);
          position: relative;
        }
        @media (max-width: 640px) {
          .form-card {
            padding: 1.75rem 1.25rem;
            border-radius: 20px;
          }
        }
        .step-header {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-bottom: 1.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 2rem;
        }
        .step-header-with-badge {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        @media (min-width: 640px) {
          .step-header-with-badge {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }
        .step-icon-badge {
          width: 48px;
          height: 48px;
          min-width: 48px;
          border-radius: 14px;
          background: rgba(245, 196, 81, 0.1);
          border: 1px solid rgba(245, 196, 81, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #f5c451;
        }
        .step-title {
          font-family: 'Space Grotesk', 'Inter', sans-serif;
          font-size: 1.25rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          line-height: 1.2;
        }
        .step-subtitle {
          font-size: 13px;
          color: #888888;
          margin-top: 4px;
        }
        .counter-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 9999px;
          background: rgba(245, 196, 81, 0.12);
          border: 1px solid rgba(245, 196, 81, 0.3);
          color: #f5c451;
          font-size: 12px;
          align-self: flex-start;
        }
        .counter-pill strong {
          font-family: monospace;
          font-size: 14px;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .input-label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #a3a3a3;
          margin-bottom: 8px;
        }
        .input-label-sm {
          display: block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #888888;
          margin-bottom: 6px;
        }
        .required {
          color: #f5c451;
          margin-left: 2px;
        }
        .field-input {
          width: 100%;
          padding: 14px 18px;
          border-radius: 12px;
          background: #121212;
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #ffffff;
          font-size: 15px;
          outline: none;
          box-sizing: border-box;
          transition: all 0.2s ease;
        }
        .field-input:focus {
          border-color: #f5c451;
          box-shadow: 0 0 0 3px rgba(245, 196, 81, 0.15);
          background: #141414;
        }
        .field-input.error {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
        }
        .field-input.mono {
          font-family: monospace;
        }
        .field-input-sm {
          width: 100%;
          padding: 10px 14px;
          border-radius: 10px;
          background: #161616;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #ffffff;
          font-size: 13px;
          outline: none;
          box-sizing: border-box;
          transition: all 0.2s ease;
        }
        .field-input-sm:focus {
          border-color: #f5c451;
          box-shadow: 0 0 0 2px rgba(245, 196, 81, 0.15);
        }
        .field-input-sm.select {
          cursor: pointer;
        }
        .field-input-sm.mono {
          font-family: monospace;
        }
        .field-input-sm.error {
          border-color: #ef4444;
        }
        .field-textarea {
          width: 100%;
          padding: 14px 18px;
          border-radius: 12px;
          background: #121212;
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #ffffff;
          font-size: 14px;
          line-height: 1.6;
          outline: none;
          resize: vertical;
          box-sizing: border-box;
          font-family: inherit;
        }
        .field-textarea:focus {
          border-color: #f5c451;
          box-shadow: 0 0 0 3px rgba(245, 196, 81, 0.15);
          background: #141414;
        }
        .field-textarea.error {
          border-color: #ef4444;
        }
        .field-error {
          font-size: 12px;
          color: #f87171;
          margin-top: 6px;
          font-weight: 500;
        }
        .field-hint {
          font-size: 12px;
          color: #737373;
          margin-top: 6px;
        }
        .grid-2col {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 640px) {
          .grid-2col {
            grid-template-columns: 1fr 1fr;
          }
        }
        .type-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 640px) {
          .type-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        .type-card {
          padding: 1.25rem 1.5rem;
          border-radius: 16px;
          background: #121212;
          border: 1px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.2s ease;
          position: relative;
        }
        .type-card:hover {
          border-color: rgba(245, 196, 81, 0.4);
          background: #151515;
        }
        .type-card.active {
          background: rgba(245, 196, 81, 0.1);
          border: 2px solid #f5c451;
          box-shadow: 0 0 20px rgba(245, 196, 81, 0.12);
        }
        .type-icon {
          width: 40px;
          height: 40px;
          min-width: 40px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a3a3a3;
        }
        .type-card.active .type-icon {
          background: #f5c451;
          color: #000;
        }
        .type-title {
          font-weight: 700;
          font-size: 15px;
          color: #ffffff;
        }
        .type-card.active .type-title {
          color: #ffd76a;
        }
        .type-desc {
          font-size: 12px;
          color: #737373;
          margin-top: 2px;
        }
        .radio-indicator {
          margin-left: auto;
          width: 22px;
          height: 22px;
          min-width: 22px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: transparent;
        }
        .radio-indicator.active {
          background: #f5c451;
          border-color: #f5c451;
          color: #000;
        }
        .action-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 2rem;
          margin-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          gap: 1rem;
        }
        @media (max-width: 640px) {
          .action-bar {
            flex-direction: column-reverse;
            align-items: stretch;
          }
          .btn-gold-action, .btn-back-action {
            width: 100%;
            justify-content: center;
          }
        }
        .action-bar.single {
          justify-content: flex-end;
        }
        .btn-gold-action {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          border-radius: 12px;
          background: linear-gradient(135deg, #ffd76a 0%, #f5c451 50%, #d9a93a 100%);
          color: #000000;
          font-weight: 800;
          font-size: 14px;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(245, 196, 81, 0.3);
          transition: all 0.2s ease;
        }
        .btn-gold-action:hover {
          background: linear-gradient(135deg, #ffe082 0%, #ffd76a 100%);
          transform: translateY(-1px);
          box-shadow: 0 6px 26px rgba(245, 196, 81, 0.4);
        }
        .btn-gold-action.large {
          padding: 16px 36px;
          font-size: 15px;
          box-shadow: 0 6px 30px rgba(245, 196, 81, 0.4);
        }
        .btn-back-action {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 24px;
          border-radius: 12px;
          background: #141414;
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #e5e5e5;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-back-action:hover {
          background: #1c1c1c;
          border-color: rgba(255, 255, 255, 0.2);
        }
        .member-card {
          padding: 1.25rem;
          border-radius: 16px;
          background: #121212;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .member-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        .member-card-badge {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #f5c451;
        }
        .btn-remove-member {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #f87171;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 8px;
          padding: 4px 10px;
          cursor: pointer;
        }
        .btn-remove-member:hover {
          background: rgba(239, 68, 68, 0.2);
        }
        .member-fields-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        @media (min-width: 640px) {
          .member-fields-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (min-width: 800px) {
          .member-fields-grid {
            grid-template-columns: 1.2fr 1fr 1fr 1.2fr;
          }
        }
        .btn-add-member {
          width: 100%;
          padding: 14px;
          border-radius: 14px;
          border: 2px dashed rgba(245, 196, 81, 0.35);
          background: rgba(245, 196, 81, 0.04);
          color: #f5c451;
          font-weight: 700;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-add-member:hover {
          border-color: #f5c451;
          background: rgba(245, 196, 81, 0.08);
        }
        .limit-notice {
          padding: 12px;
          border-radius: 12px;
          background: #141414;
          border: 1px solid rgba(255, 255, 255, 0.08);
          text-align: center;
          font-size: 13px;
          color: #737373;
        }
        .drive-alert {
          margin-top: 10px;
          padding: 14px 16px;
          border-radius: 12px;
          background: rgba(245, 196, 81, 0.08);
          border: 1px solid rgba(245, 196, 81, 0.25);
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 13px;
          color: #e5e5e5;
        }
        .alert-icon {
          color: #f5c451;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .summary-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 640px) {
          .summary-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        .summary-card {
          padding: 1.25rem;
          border-radius: 16px;
          background: #121212;
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .summary-card.full-width {
          grid-column: 1 / -1;
        }
        .summary-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #f5c451;
          margin-bottom: 4px;
        }
        .btn-edit-link {
          background: transparent;
          border: none;
          color: #a3a3a3;
          font-size: 11px;
          text-decoration: underline;
          cursor: pointer;
        }
        .btn-edit-link:hover {
          color: #ffffff;
        }
        .summary-value-title {
          font-size: 15px;
          font-weight: 700;
          color: #ffffff;
        }
        .summary-detail {
          font-size: 13px;
          color: #a3a3a3;
        }
        .summary-detail.mono {
          font-family: monospace;
          font-size: 12px;
        }
        .summary-members-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 8px;
          margin-top: 6px;
        }
        @media (min-width: 640px) {
          .summary-members-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }
        }
        .summary-member-item {
          padding: 10px 12px;
          border-radius: 10px;
          background: #161616;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .summary-member-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13px;
        }
        .summary-role-tag {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          color: #f5c451;
          background: rgba(245, 196, 81, 0.1);
          padding: 2px 6px;
          border-radius: 6px;
        }
        .summary-member-phone {
          font-size: 11px;
          color: #737373;
          margin-top: 4px;
        }
        .summary-synopsis {
          font-size: 13px;
          color: #737373;
          line-height: 1.5;
          margin-top: 4px;
        }
        .summary-drive-link {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #f5c451;
          word-break: break-all;
          margin-top: 6px;
        }
        .confirmation-box {
          margin-top: 1.75rem;
          padding: 1.5rem;
          border-radius: 16px;
          background: rgba(245, 196, 81, 0.06);
          border: 1px solid rgba(245, 196, 81, 0.2);
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .confirmation-title {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #f5c451;
        }
        .checkbox-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          cursor: pointer;
        }
        .checkbox-input {
          width: 18px;
          height: 18px;
          min-width: 18px;
          margin-top: 2px;
          accent-color: #f5c451;
          cursor: pointer;
        }
        .checkbox-text {
          font-size: 13px;
          color: #d4d4d4;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
