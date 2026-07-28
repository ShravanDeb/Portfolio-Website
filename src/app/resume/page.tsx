import type { Metadata } from "next";
import PrintButton from "@/components/print-button";
import React from "react";

export const metadata: Metadata = {
  title: "Resume — Shravan Deb",
  description:
    "Resume of Shravan Deb — AI/ML engineer, systems builder, product developer.",
};

const S = {
  page: {
    fontFamily: "Georgia, 'Times New Roman', Times, serif",
    width: "8.5in",
    minHeight: "11in",
    boxSizing: "border-box" as const,
    background: "#fff",
    color: "#111",
    margin: "20px auto",
    padding: "0.5in 0.6in",
    fontSize: "10pt",
    lineHeight: "1.4",
    WebkitFontSmoothing: "antialiased",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  } as React.CSSProperties,

  header: {
    textAlign: "center" as const,
    marginBottom: "12pt",
  },
  headerName: {
    fontSize: "20pt",
    fontWeight: 700,
    margin: "0 0 4pt 0",
    letterSpacing: "-0.3px",
    color: "#000",
  },
  headerTitle: {
    fontSize: "12pt",
    fontWeight: 400,
    margin: "0 0 6pt 0",
    color: "#333",
  },
  headerContact: {
    fontSize: "9.5pt",
    lineHeight: "1.5",
    color: "#444",
  },

  section: {
    marginBottom: "11pt",
  },
  sectionHeader: {
    fontSize: "10.5pt",
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
    color: "#000",
    borderBottom: "1px solid #000",
    paddingBottom: "2pt",
    marginBottom: "6pt",
  },

  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "4pt 20pt",
    fontSize: "9.5pt",
    background: "#f8f9fa",
    padding: "6pt 8pt",
    borderRadius: "4px",
    marginBottom: "12pt",
  },
  detailsItem: {
    display: "flex",
    justifyContent: "space-between",
  },
  detailsLabel: {
    fontWeight: 600,
    color: "#444",
  },

  profileText: {
    fontSize: "10pt",
    lineHeight: "1.45",
    margin: 0,
    textAlign: "justify" as const,
  },

  expEntry: {
    marginBottom: "10pt",
  },
  expTopLine: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: "1pt",
  },
  expRole: {
    fontSize: "10.5pt",
    fontWeight: 700,
    color: "#000",
  },
  expDate: {
    fontSize: "9.5pt",
    fontWeight: 600,
    color: "#333",
  },
  expSubLine: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: "4pt",
  },
  expOrg: {
    fontSize: "10pt",
    fontStyle: "italic",
    color: "#333",
  },
  expLocation: {
    fontSize: "9.5pt",
    color: "#555",
  },
  bulletList: {
    margin: "0",
    paddingLeft: "14pt",
  },
  bullet: {
    fontSize: "9.5pt",
    lineHeight: "1.4",
    marginBottom: "2.5pt",
  },

  skillRow: {
    fontSize: "9.5pt",
    lineHeight: "1.5",
    margin: "0 0 3pt 0",
  },
  skillLabel: {
    fontWeight: 700,
    color: "#000",
  },

  langGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "8pt",
    fontSize: "9.5pt",
  },
  langItem: {
    display: "flex",
    flexDirection: "column" as const,
  },
};

export default function ResumePage() {
  return (
    <>
      {/* Screen-only print button */}
      <div className="no-print" style={{ position: "fixed", top: "16px", right: "16px", zIndex: 100 }}>
        <PrintButton />
      </div>

      <div className="resume-page" style={S.page}>
        {/* ── HEADER ─────────────────────────────────────────── */}
        <div style={S.header}>
          <h1 style={S.headerName}>Shravan Deb</h1>
          <p style={S.headerTitle}>AI/ML Engineer</p>
          <div style={S.headerContact}>
            <span>123 Main Street, Chennai, Tamil Nadu</span> &bull;{" "}
            <span>+91 98765 43210</span> &bull;{" "}
            <span>shravan@email.com</span>
            <br />
            <span>linkedin.com/in/shravandeb</span> &bull;{" "}
            <span>github.com/shravandeb</span>
          </div>
        </div>

        {/* ── PERSONAL DETAILS ──────────────────────────────── */}
        <div style={S.detailsGrid}>
          <div style={S.detailsItem}>
            <span style={S.detailsLabel}>Born:</span>
            <span>15 March 2004 (Chennai, India)</span>
          </div>
          <div style={S.detailsItem}>
            <span style={S.detailsLabel}>Marital Status:</span>
            <span>Single</span>
          </div>
          <div style={S.detailsItem}>
            <span style={S.detailsLabel}>Nationality:</span>
            <span>Indian</span>
          </div>
          <div style={S.detailsItem}>
            <span style={S.detailsLabel}>Gender:</span>
            <span>Male</span>
          </div>
        </div>

        {/* ── PROFILE ───────────────────────────────────────── */}
        <div style={S.section}>
          <div style={S.sectionHeader}>Profile</div>
          <p style={S.profileText}>
            AI/ML engineer with 4+ years of experience building production systems spanning real-time infrastructure, natural language processing, and collaborative analytics. Specialized in deploying intelligent systems at scale — from anomaly detection pipelines processing 12k events/sec to virtual assistants serving 500+ daily users. Focused on the intersection of machine learning, systems engineering, and developer tooling.
          </p>
        </div>

        {/* ── EXPERIENCE ────────────────────────────────────── */}
        <div style={S.section}>
          <div style={S.sectionHeader}>Experience</div>
          
          {/* Role 1 */}
          <div style={S.expEntry}>
            <div style={S.expTopLine}>
              <span style={S.expRole}>ML Engineer Intern</span>
              <span style={S.expDate}>Jan 2025 – May 2025</span>
            </div>
            <div style={S.expSubLine}>
              <span style={S.expOrg}>SRM Embedded Research Lab</span>
              <span style={S.expLocation}>Chennai, India</span>
            </div>
            <ul style={S.bulletList}>
              <li style={S.bullet}>Designed and deployed a real-time anomaly detection pipeline using PyTorch and Redis Streams, processing 12k+ events/sec across distributed IoT sensors.</li>
              <li style={S.bullet}>Reduced false positive rate by 38% through custom ensemble architecture combining transformer encoders with statistical process control.</li>
              <li style={S.bullet}>Built internal CLI tooling in Go for model versioning and A/B deployment, adopted by 4 research teams within first month.</li>
              <li style={S.bullet}>Authored technical documentation and runbooks adopted as onboarding standard for incoming lab members.</li>
            </ul>
          </div>

          {/* Role 2 */}
          <div style={{ ...S.expEntry, marginBottom: 0 }}>
            <div style={S.expTopLine}>
              <span style={S.expRole}>Frontend Developer</span>
              <span style={S.expDate}>Aug 2023 – Dec 2023</span>
            </div>
            <div style={S.expSubLine}>
              <span style={S.expOrg}>SRM Tech Club</span>
              <span style={S.expLocation}>Chennai, India</span>
            </div>
            <ul style={S.bulletList}>
              <li style={S.bullet}>Shipped event portal with Next.js serving 2,000+ students across 3 major hackathons.</li>
              <li style={S.bullet}>Implemented real-time leaderboards via WebSockets, reducing perceived latency from 3s to under 200ms.</li>
              <li style={S.bullet}>Coordinated design handoff with 2 graphic designers, maintaining a component library used by 3 subsequent event teams.</li>
            </ul>
          </div>
        </div>

        {/* ── EDUCATION ─────────────────────────────────────── */}
        <div style={S.section}>
          <div style={S.sectionHeader}>Education</div>
          <div style={{ ...S.expEntry, marginBottom: 0 }}>
            <div style={S.expTopLine}>
              <span style={S.expRole}>B.Tech Computer Science — AI &amp; Machine Learning</span>
              <span style={S.expDate}>2022 – 2026</span>
            </div>
            <div style={S.expSubLine}>
              <span style={S.expOrg}>SRM IST</span>
              <span style={S.expLocation}>Chennai, India</span>
            </div>
            <ul style={S.bulletList}>
              <li style={S.bullet}><strong>CGPA:</strong> 8.5 / 10 &bull; <strong>Coursework:</strong> Deep Learning, NLP, Computer Vision, Distributed Systems</li>
              <li style={S.bullet}>Teaching Assistant for Machine Learning (CS6001), 2 semesters, 60+ students per section.</li>
            </ul>
          </div>
        </div>

        {/* ── SKILLS ────────────────────────────────────────── */}
        <div style={S.section}>
          <div style={S.sectionHeader}>Skills</div>
          <p style={S.skillRow}><span style={S.skillLabel}>Languages: </span>Python, Go, TypeScript, C/C++, SQL</p>
          <p style={S.skillRow}><span style={S.skillLabel}>Backend &amp; Infra: </span>Docker, Kubernetes, Prometheus, Grafana, FastAPI</p>
          <p style={S.skillRow}><span style={S.skillLabel}>Cloud &amp; Tooling: </span>AWS, GCP, Git, PostgreSQL, Redis, CI/CD</p>
          <p style={S.skillRow}><span style={S.skillLabel}>Practices: </span>MLOps, System Design, Real-time Data Pipelines, Technical Writing</p>
        </div>

        {/* ── LANGUAGES ─────────────────────────────────────── */}
        <div style={{ ...S.section, marginBottom: 0 }}>
          <div style={S.sectionHeader}>Languages</div>
          <div style={S.langGrid}>
            <div style={S.langItem}>
              <strong>English</strong>
              <span style={{ color: "#555" }}>Fluent</span>
            </div>
            <div style={S.langItem}>
              <strong>Hindi</strong>
              <span style={{ color: "#555" }}>Native</span>
            </div>
            <div style={S.langItem}>
              <strong>Bengali</strong>
              <span style={{ color: "#555" }}>Native</span>
            </div>
            <div style={S.langItem}>
              <strong>Tamil</strong>
              <span style={{ color: "#555" }}>Conversational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Print + page styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        body { background: #f0f2f5; margin: 0; padding: 0; }
        @media print {
          body { background: white !important; }
          .no-print { display: none !important; }
          .resume-page { 
            box-shadow: none !important; 
            margin: 0 !important; 
            width: 8.5in !important;
            height: 11in !important;
            min-height: 11in !important;
            padding: 0.5in 0.6in !important;
            overflow: hidden !important;
          }
          @page { size: letter portrait; margin: 0; }
        }
      `}} />
    </>
  );
}