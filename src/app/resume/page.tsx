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
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    width: "8.5in",
    minHeight: "11in",
    maxHeight: "11in",
    boxSizing: "border-box" as const,
    background: "#ffffff",
    color: "#1e293b",
    margin: "20px auto",
    padding: "0.35in 0.4in", // Minimal padding to maximize printable area and ensure 1-page fit
    fontSize: "9.5pt",
    lineHeight: "1.45",
    WebkitFontSmoothing: "antialiased",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
    position: "relative" as const,
    overflow: "hidden" as const,
  } as React.CSSProperties,

  header: {
    marginBottom: "10pt",
  },
  headerName: {
    fontSize: "22pt",
    fontWeight: 700,
    margin: "0 0 2pt 0",
    letterSpacing: "-0.03em",
    color: "#0f172a",
    lineHeight: "1.1",
  },
  headerTitle: {
    fontSize: "11.5pt",
    fontWeight: 500,
    margin: "0 0 6pt 0",
    color: "#334155",
    letterSpacing: "-0.01em",
  },
  headerContact: {
    fontSize: "9pt",
    lineHeight: "1.4",
    color: "#475569",
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "4pt 8pt",
    alignItems: "center",
  },
  link: {
    color: "#0f172a",
    textDecoration: "none",
    fontWeight: 500,
  },
  separator: {
    color: "#cbd5e1",
  },

  section: {
    marginBottom: "9pt",
  },
  sectionHeader: {
    fontSize: "10pt",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    color: "#0f172a",
    borderBottom: "1.5px solid #0f172a",
    paddingBottom: "2pt",
    marginBottom: "5pt",
  },

  // Optimized inline grid replaces bulky grey boxes for better ATS parsing
  detailsBar: {
    display: "grid",
    gridTemplateColumns: "repeat(4, auto)",
    justifyContent: "space-between",
    fontSize: "8.5pt",
    color: "#475569",
    borderTop: "1px solid #e2e8f0",
    borderBottom: "1px solid #e2e8f0",
    padding: "4pt 0",
    marginBottom: "9pt",
  },
  detailsItem: {
    display: "flex",
    gap: "4pt",
  },
  detailsLabel: {
    fontWeight: 600,
    color: "#0f172a",
  },

  profileText: {
    fontSize: "9.5pt",
    lineHeight: "1.45",
    margin: 0,
    color: "#334155",
  },

  expEntry: {
    marginBottom: "8pt",
  },
  expTopLine: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: "1pt",
  },
  expRole: {
    fontSize: "10pt",
    fontWeight: 700,
    color: "#0f172a",
  },
  expDate: {
    fontSize: "9pt",
    fontWeight: 600,
    color: "#475569",
  },
  expSubLine: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: "3pt",
  },
  expOrg: {
    fontSize: "9.5pt",
    fontWeight: 600,
    color: "#334155",
  },
  expLocation: {
    fontSize: "8.5pt",
    color: "#64748b",
  },
  bulletList: {
    margin: "0",
    paddingLeft: "12pt",
    color: "#334155",
  },
  bullet: {
    fontSize: "9pt",
    lineHeight: "1.4",
    marginBottom: "2pt",
    paddingLeft: "2pt",
  },

  skillRow: {
    fontSize: "9pt",
    lineHeight: "1.5",
    margin: "0 0 2.5pt 0",
    color: "#334155",
  },
  skillLabel: {
    fontWeight: 700,
    color: "#0f172a",
    display: "inline-block",
    width: "110pt",
  },

  langGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "6pt",
    fontSize: "9pt",
  },
  langItem: {
    display: "flex",
    gap: "4pt",
    alignItems: "baseline",
  },
  langName: {
    fontWeight: 600,
    color: "#0f172a",
  },
  langLevel: {
    fontSize: "8.5pt",
    color: "#64748b",
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
        <header style={S.header}>
          <h1 style={S.headerName}>Shravan Deb</h1>
          <div style={S.headerTitle}>AI/ML Engineer</div>
          <div style={S.headerContact}>
            <span>123 Main Street, Chennai, Tamil Nadu</span>
            <span style={S.separator}>&bull;</span>
            <span>+91 98765 43210</span>
            <span style={S.separator}>&bull;</span>
            <a href="mailto:shravan@email.com" style={S.link}>shravan@email.com</a>
            <span style={S.separator}>&bull;</span>
            <a href="https://linkedin.com/in/shravandeb" target="_blank" rel="noreferrer" style={S.link}>linkedin.com/in/shravandeb</a>
            <span style={S.separator}>&bull;</span>
            <a href="https://github.com/shravandeb" target="_blank" rel="noreferrer" style={S.link}>github.com/shravandeb</a>
          </div>
        </header>

        {/* ── PERSONAL DETAILS ──────────────────────────────── */}
        <div style={S.detailsBar}>
          <div style={S.detailsItem}>
            <span style={S.detailsLabel}>Born:</span>
            <span>15 Mar 2004 (Chennai)</span>
          </div>
          <div style={S.detailsItem}>
            <span style={S.detailsLabel}>Nationality:</span>
            <span>Indian</span>
          </div>
          <div style={S.detailsItem}>
            <span style={S.detailsLabel}>Gender:</span>
            <span>Male</span>
          </div>
          <div style={S.detailsItem}>
            <span style={S.detailsLabel}>Marital Status:</span>
            <span>Single</span>
          </div>
        </div>

        {/* ── PROFILE ───────────────────────────────────────── */}
        <section style={S.section}>
          <h2 style={S.sectionHeader}>Profile</h2>
          <p style={S.profileText}>
            AI/ML engineer with 4+ years of experience building production systems spanning real-time infrastructure, natural language processing, and collaborative analytics. Specialized in deploying intelligent systems at scale — from anomaly detection pipelines processing 12k events/sec to virtual assistants serving 500+ daily users. Focused on the intersection of machine learning, systems engineering, and developer tooling.
          </p>
        </section>

        {/* ── EXPERIENCE ────────────────────────────────────── */}
        <section style={S.section}>
          <h2 style={S.sectionHeader}>Experience</h2>
          
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
        </section>

        {/* ── EDUCATION ─────────────────────────────────────── */}
        <section style={S.section}>
          <h2 style={S.sectionHeader}>Education</h2>
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
        </section>

        {/* ── SKILLS ────────────────────────────────────────── */}
        <section style={S.section}>
          <h2 style={S.sectionHeader}>Skills</h2>
          <div style={S.skillRow}><span style={S.skillLabel}>Languages:</span> Python, Go, TypeScript, C/C++, SQL</div>
          <div style={S.skillRow}><span style={S.skillLabel}>Backend &amp; Infra:</span> Docker, Kubernetes, Prometheus, Grafana, FastAPI</div>
          <div style={S.skillRow}><span style={S.skillLabel}>Cloud &amp; Tooling:</span> AWS, GCP, Git, PostgreSQL, Redis, CI/CD</div>
          <div style={S.skillRow}><span style={S.skillLabel}>Practices:</span> MLOps, System Design, Real-time Data Pipelines, Technical Writing</div>
        </section>

        {/* ── LANGUAGES ─────────────────────────────────────── */}
        <section style={{ ...S.section, marginBottom: 0 }}>
          <h2 style={S.sectionHeader}>Languages</h2>
          <div style={S.langGrid}>
            <div style={S.langItem}>
              <span style={S.langName}>English</span>
              <span style={S.langLevel}>(Fluent)</span>
            </div>
            <div style={S.langItem}>
              <span style={S.langName}>Hindi</span>
              <span style={S.langLevel}>(Native)</span>
            </div>
            <div style={S.langItem}>
              <span style={S.langName}>Bengali</span>
              <span style={S.langLevel}>(Native)</span>
            </div>
            <div style={S.langItem}>
              <span style={S.langName}>Tamil</span>
              <span style={S.langLevel}>(Conversational)</span>
            </div>
          </div>
        </section>
      </div>

      {/* Robust Print + Page Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        body { 
          background: #f1f5f9; 
          margin: 0; 
          padding: 0; 
        }
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          html, body, #__next, main, div {
            background: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            height: auto !important;
            min-height: 0 !important;
            overflow: visible !important;
          }
          .no-print { 
            display: none !important; 
          }
          .resume-page { 
            width: 8.5in !important;
            max-width: 8.5in !important;
            height: 11in !important;
            max-height: 11in !important;
            padding: 0.35in 0.4in !important;
            margin: 0 !important;
            border: none !important;
            box-shadow: none !important;
            overflow: hidden !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
          }
          @page { 
            size: letter portrait; 
            margin: 0in; 
          }
        }
      `}} />
    </>
  );
}