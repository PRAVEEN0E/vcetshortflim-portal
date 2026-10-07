"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/utils";
import { Search, ArrowUpDown, Eye, FileText, Download } from "lucide-react";
import * as XLSX from "xlsx";

interface RegistrationWithMembers {
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
  paymentStatus: string;
  registrationStatus: string;
  createdAt: Date | string;
  members: Array<{ id: string; name: string; role: string }>;
}

interface AdminRegistrationTableProps {
  initialRegistrations: RegistrationWithMembers[];
}

export function AdminRegistrationTable({ initialRegistrations }: AdminRegistrationTableProps) {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [instFilter, setInstFilter] = useState(searchParams.get("type") || "ALL");
  const [paymentFilter, setPaymentFilter] = useState(searchParams.get("payment") || "ALL");
  const [regFilter, setRegFilter] = useState(searchParams.get("regStatus") || "ALL");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">(
    (searchParams.get("sort") as "newest" | "oldest") || "newest"
  );

  const filtered = initialRegistrations
    .filter((reg) => {
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const match =
          reg.registrationNumber.toLowerCase().includes(q) ||
          reg.teamName.toLowerCase().includes(q) ||
          reg.leaderName.toLowerCase().includes(q) ||
          reg.filmTitle.toLowerCase().includes(q) ||
          reg.leaderPhone.toLowerCase().includes(q) ||
          reg.district.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (instFilter !== "ALL" && reg.institutionType !== instFilter) return false;
      if (paymentFilter !== "ALL" && reg.paymentStatus !== paymentFilter) return false;
      if (regFilter !== "ALL" && reg.registrationStatus !== regFilter) return false;
      return true;
    })
    .sort((a, b) => {
      const da = new Date(a.createdAt).getTime();
      const db = new Date(b.createdAt).getTime();
      return sortOrder === "newest" ? db - da : da - db;
    });

  const clearFilters = () => {
    setSearch("");
    setInstFilter("ALL");
    setPaymentFilter("ALL");
    setRegFilter("ALL");
    setSortOrder("newest");
  };

  const hasFilters = search || instFilter !== "ALL" || paymentFilter !== "ALL" || regFilter !== "ALL";

  const exportToExcel = () => {
    // Format the data for excel
    const excelData = filtered.map((reg) => ({
      "Reg No": reg.registrationNumber,
      "Team Name": reg.teamName,
      "Leader Name": reg.leaderName,
      "Leader Phone": reg.leaderPhone,
      "Leader Email": reg.leaderEmail,
      "Film Title": reg.filmTitle,
      "Director Name": reg.directorName,
      "Institution Type": reg.institutionType,
      "Institution Name": reg.institutionName,
      District: reg.district,
      City: reg.city,
      "Payment Status": reg.paymentStatus,
      "Registration Status": reg.registrationStatus,
      "Created At": new Date(reg.createdAt).toLocaleString(),
      // Add member names by roles
      ...reg.members.reduce((acc, member, idx) => {
        acc[`Member ${idx + 1} Name`] = member.name;
        acc[`Member ${idx + 1} Role`] = member.role;
        return acc;
      }, {} as Record<string, string>),
    }));

    // Create workbook
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");

    // Save file
    XLSX.writeFile(workbook, `VCET_Registrations_${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  const selectStyle: React.CSSProperties = {
    padding: "8px 12px",
    borderRadius: "8px",
    background: "#0d0d0d",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#d4d4d4",
    fontSize: "12px",
    outline: "none",
    cursor: "pointer",
    appearance: "none" as const,
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23737373' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 10px center",
    paddingRight: "28px",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Filters Bar */}
      <div
        style={{
          background: "#0d0d0d",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "16px",
          padding: "1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}>
          {/* Search */}
          <div style={{ position: "relative", flex: "1 1 260px" }}>
            <Search
              size={14}
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#525252",
                pointerEvents: "none",
              }}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Reg#, Team, Leader, Film, Phone..."
              style={{
                width: "100%",
                paddingLeft: "36px",
                paddingRight: "14px",
                paddingTop: "9px",
                paddingBottom: "9px",
                borderRadius: "8px",
                background: "#111",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#fff",
                fontSize: "13px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <select value={instFilter} onChange={(e) => setInstFilter(e.target.value)} style={selectStyle}>
            <option value="ALL">All Institutions</option>
            <option value="SCHOOL">Schools Only</option>
            <option value="COLLEGE">Colleges Only</option>
          </select>

          <select value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)} style={selectStyle}>
            <option value="ALL">All Payments</option>
            <option value="PENDING">Payment Pending</option>
            <option value="VERIFIED">Payment Verified</option>
            <option value="REJECTED">Payment Rejected</option>
          </select>

          <select value={regFilter} onChange={(e) => setRegFilter(e.target.value)} style={selectStyle}>
            <option value="ALL">All Reg Status</option>
            <option value="PENDING">Review Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>

          <button
            type="button"
            onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
            className="btn-ghost"
            style={{ fontSize: "11px", padding: "8px 12px", whiteSpace: "nowrap" }}
          >
            <ArrowUpDown size={12} color="#f5c451" />
            Sort: {sortOrder === "newest" ? "Newest" : "Oldest"}
          </button>

          <button
            type="button"
            onClick={exportToExcel}
            className="btn-gold"
            style={{ fontSize: "11px", padding: "8px 12px", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "5px" }}
          >
            <Download size={12} />
            Export Excel
          </button>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              style={{
                background: "none",
                border: "none",
                color: "#f5c451",
                fontSize: "12px",
                cursor: "pointer",
                textDecoration: "underline",
                padding: "4px",
              }}
            >
              Reset
            </button>
          )}
        </div>

        <div
          style={{
            paddingTop: "10px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            fontSize: "11px",
            color: "#737373",
          }}
        >
          Showing <strong style={{ color: "#fff" }}>{filtered.length}</strong> of{" "}
          <strong style={{ color: "#fff" }}>{initialRegistrations.length}</strong> total registrations
        </div>
      </div>

      {/* Desktop Table */}
      <div
        style={{
          background: "#0d0d0d",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "16px",
          overflow: "hidden",
        }}
        className="desktop-table"
      >
        <div style={{ overflowX: "auto" }}>
          <table className="table-cinematic">
            <thead>
              <tr>
                <th style={{ color: "#f5c451" }}>Reg No</th>
                <th>Team &amp; Leader</th>
                <th>Institution</th>
                <th>District</th>
                <th>Film Title</th>
                <th>Payment</th>
                <th>Reg Status</th>
                <th>Created</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ padding: "3rem", textAlign: "center" }}>
                    <FileText size={32} color="#333" style={{ margin: "0 auto 10px" }} />
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#525252", marginBottom: "4px" }}>
                      No registrations match your search
                    </p>
                    <p style={{ fontSize: "12px", color: "#404040" }}>Try clearing or adjusting filters</p>
                  </td>
                </tr>
              ) : (
                filtered.map((reg) => (
                  <tr key={reg.id}>
                    <td>
                      <span
                        style={{
                          fontFamily: "monospace",
                          fontWeight: 700,
                          color: "#f5c451",
                          fontSize: "12px",
                        }}
                      >
                        {reg.registrationNumber}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: "#fff", fontSize: "13px" }}>{reg.teamName}</div>
                      <div style={{ fontSize: "11px", color: "#737373" }}>
                        {reg.leaderName} · {reg.leaderPhone}
                      </div>
                    </td>
                    <td style={{ maxWidth: "180px" }}>
                      <div
                        style={{
                          color: "#e5e5e5",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          fontSize: "12px",
                        }}
                        title={reg.institutionName}
                      >
                        {reg.institutionName}
                      </div>
                      <div style={{ fontSize: "10px", color: "#737373", fontFamily: "monospace" }}>
                        {reg.institutionType}
                      </div>
                    </td>
                    <td style={{ color: "#a3a3a3", fontSize: "12px" }}>{reg.district}</td>
                    <td style={{ maxWidth: "160px" }}>
                      <div
                        style={{
                          fontWeight: 600,
                          color: "#fff",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          fontSize: "12px",
                        }}
                        title={reg.filmTitle}
                      >
                        &ldquo;{reg.filmTitle}&rdquo;
                      </div>
                      <div style={{ fontSize: "10px", color: "#737373" }}>Dir: {reg.directorName}</div>
                    </td>
                    <td>
                      <StatusBadge type="payment" status={reg.paymentStatus} />
                    </td>
                    <td>
                      <StatusBadge type="registration" status={reg.registrationStatus} />
                    </td>
                    <td style={{ color: "#737373", fontSize: "11px", whiteSpace: "nowrap" }}>
                      {formatDate(reg.createdAt)}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <Link
                        href={`/admin/registrations/${reg.id}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          padding: "6px 12px",
                          borderRadius: "7px",
                          background: "rgba(245,196,81,0.1)",
                          border: "1px solid rgba(245,196,81,0.25)",
                          color: "#f5c451",
                          fontSize: "11px",
                          fontWeight: 700,
                          textDecoration: "none",
                          transition: "all 0.18s ease",
                        }}
                        className="view-link"
                      >
                        <Eye size={12} />
                        VIEW
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }} className="mobile-cards">
        {filtered.length === 0 ? (
          <div
            style={{
              background: "#0d0d0d",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "14px",
              padding: "2rem",
              textAlign: "center",
            }}
          >
            <FileText size={28} color="#333" style={{ margin: "0 auto 10px" }} />
            <p style={{ fontSize: "13px", color: "#525252", fontWeight: 600 }}>
              No registrations match your search
            </p>
          </div>
        ) : (
          filtered.map((reg) => (
            <div
              key={reg.id}
              style={{
                background: "#0d0d0d",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "14px",
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingBottom: "10px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span style={{ fontFamily: "monospace", fontWeight: 700, color: "#f5c451", fontSize: "13px" }}>
                  {reg.registrationNumber}
                </span>
                <span style={{ fontSize: "11px", color: "#525252" }}>{formatDate(reg.createdAt)}</span>
              </div>
              <div>
                <div style={{ fontWeight: 700, color: "#fff", fontSize: "15px" }}>{reg.teamName}</div>
                <div style={{ fontSize: "12px", color: "#737373" }}>
                  {reg.leaderName} · {reg.leaderPhone}
                </div>
              </div>
              <div style={{ fontSize: "12px" }}>
                <div style={{ color: "#f5c451", fontWeight: 600, marginBottom: "3px" }}>
                  Film: &ldquo;{reg.filmTitle}&rdquo;
                </div>
                <div style={{ color: "#737373", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {reg.institutionName} · {reg.district}
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                <StatusBadge type="payment" status={reg.paymentStatus} />
                <StatusBadge type="registration" status={reg.registrationStatus} />
              </div>
              <Link
                href={`/admin/registrations/${reg.id}`}
                className="btn-gold"
                style={{ justifyContent: "center", padding: "10px", fontSize: "12px" }}
              >
                <Eye size={14} />
                VIEW FULL DETAILS
              </Link>
            </div>
          ))
        )}
      </div>

      <style>{`
        @media (min-width: 768px) {
          .desktop-table { display: block !important; }
          .mobile-cards { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-table { display: none !important; }
          .mobile-cards { display: flex !important; }
        }
        .view-link:hover {
          background: rgba(245,196,81,0.2) !important;
          border-color: rgba(245,196,81,0.4) !important;
          color: #ffd76a !important;
        }
      `}</style>
    </div>
  );
}
