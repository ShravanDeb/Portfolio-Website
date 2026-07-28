import type { Metadata } from "next";
import PrintButton from "@/components/print-button";
import React from "react";

export const metadata: Metadata = {
  title: "Resume — Shravan Deb",
  description:
    "Resume of Shravan Deb — AI/ML Engineer, Systems Builder, and Software Developer.",
};

// ── ARCHITECTURAL STYLE SYSTEM ──────────────────────────────────────────
const S = {
  container: {
    minHeight: "100vh",
    background: "#f8fafc",
    padding: "32px 16px",
    display: "flex",
    justifyContent: "center",
  } as React.CSSProperties,

  page: {
    // Modern editorial sans-serif stack; zero external font-loading shifts during print
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    width: "8.5in",
    minHeight: "11in",
    maxHeight: "11in",
    boxSizing: "border-box" as const,
    background: "#ffffff",
    color: "#0f172a", // Deep charcoal for superior readability over harsh #000
    padding: "0.36in 0.45in",
    fontSize: "9.5pt",
    lineHeight: "1.4",
    WebkitFontSmoothing: "antialiased",
    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.04)",
    margin: "0 auto",
    position: "relative" as const,
  } as React.CSSProperties,

  // ── Header Typography
  header: {
    textAlign: "center" as const,
    marginBottom: "10pt",
  },
  headerName: {
    fontSize: "24pt",
    fontWeight: 800,
    margin: "0 0 2pt 0",
    letterSpacing: "-0.6px",
    color: "#0f172a",
    lineHeight: "1.05",
  },
  headerTitle: {
    fontSize: "11pt",
    fontWeight: 600,
    margin: "0 0 5pt 0",
    color: "#1e40af", // Deep editorial indigo accent
    letterSpacing: "0.5px",
    textTransform: "uppercase" as const,
  },
  headerContact: {
    fontSize: "8.5pt",
    lineHeight: "1.4",
    color: "#475569",
    fontWeight: 500,
  },

  // ── Sections & Dividers
  section: {
    marginBottom: "8.5pt",
  },
  sectionHeader: {
    fontSize: "9.5pt",
    fontWeight: 700,
    letterSpacing: "0.09em",
    textTransform: "uppercase" as const,
    color: "#0f172a",
    borderBottom: "1.5px solid #0f172a",
    paddingBottom: "1.5pt",
    marginBottom: "5pt",
  },

  // ── Professional Summary
  profileText: {
    fontSize: "9.2pt",
    lineHeight: "1.45",
    margin: 0,
    color: "#1e293b",
    textAlign: "justify" as const,
  },

  // ── Work & Education Entries
  expEntry: {
    marginBottom: "6.5pt",
  },
  expTopLine: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: "0.5pt",
  },
  expRole: {
    fontSize: "10pt",
    fontWeight: 700,
    color: "#0f172a",
  },
  expDate: {
    fontSize: "8.5pt",
    fontWeight: 600,
    color: "#475569",
    letterSpacing: "0.2px",
  },
  expSubLine: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: "2.5pt",
  },
  expOrg: {
    fontSize: "9.2pt",
    fontWeight: 600,
    color: "#1e40af", // Accent branding mapped to organizations
  },
  expLocation: {
    fontSize: "8.5pt",
    fontStyle: "italic",
    color: "#64748b",
  },

  // ── Scannable Bullets
  bulletList: {
    margin: "0",
    paddingLeft: "14pt",
    color: "#1e293b",
  },
  bullet: {
    fontSize: "9pt",
    lineHeight: "1.38",
    marginBottom: "2pt",
    paddingLeft: "2pt",
  },

  // ── Categorized Skills & Meta
  skillRow: {
    fontSize: "9pt",
    lineHeight: "1.42",
    margin: "0 0 2pt 0",
    color: "#1e293b",
  },
  skillLabel: {
    fontWeight: 700,
    color: "#0f172a",
    display: "inline-block",
    width: "115px",
  },
};

export default function ResumePage() {
  return (
    <>
      {/* Screen-only Print Controls */}
      <div className="no-print" style={{ position: "fixed", top: "16px", right: "16px", zIndex: 100 }}>
        <PrintButton />
      </div>

      <div style={S.container} className="resume-container">
        <main className="resume-page" style={S.page}>
          
          {/* ── HEADER ─────────────────────────────────────────── */}
          <header style={S.header}>
            <h1 style={S.headerName}>Shravan Deb</h1>
            <p style={S.headerTitle}>AI/ML Engineer &amp; Systems Builder</p>
            <div style={S.headerContact}>
              <span>Chennai, Tamil Nadu</span> &bull;{" "}
              <span>+91 98765 43210</span> &bull;{" "}
              <span>shravan@email.com</span>
              <br />
              <span>
                <strong>LinkedIn:</strong> linkedin.com/in/shravandeb
              </span>{" "}
              &bull;{" "}
              <span>
                <strong>GitHub:</strong> github.com/shravandeb
              </span>{" "}
              &bull;{" "}
              <span>
                <strong>Portfolio:</strong> shravandeb.dev
              </span>
            </div>
          </header>

          {/* ── PROFESSIONAL SUMMARY ───────────────────────────── */}
          <section style={S.section}>
            <h2 style={S.sectionHeader}>Professional Summary</h2>
            <p style={S.profileText}>
              AI/ML Engineer specializing in high-throughput backend infrastructure, natural language processing, and scalable real-time systems. Proven track record deploying intelligent production pipelines — from distributed anomaly detection processing <strong>12k+ events/sec</strong> to full-stack platforms serving thousands of active users. Strong focus on the intersection of <strong>machine learning architectures</strong>, <strong>distributed systems</strong>, and developer tooling.
            </p>
          </section>

          {/* ── EXPERIENCE ────────────────────────────────────── */}
          <section style={S.section}>
            <h2 style={S.sectionHeader}>Experience</h2>

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
                <li style={S.bullet}>
                  Designed and deployed a real-time anomaly detection pipeline using <strong>PyTorch</strong> and <strong>Redis Streams</strong>, successfully processing <strong>12k+ events/sec</strong> across distributed IoT telemetry sensors.
                </li>
                <li style={S.bullet}>
                  Reduced false-positive rates by <strong>38%</strong> through a custom ensemble architecture combining <strong>transformer encoders</strong> with statistical process control algorithms.
                </li>
                <li style={S.bullet}>
                  Built internal CLI developer tooling in <strong>Go</strong> for automated model versioning and A/B testing, adopted by <strong>4 concurrent research teams</strong> within the first month of release.
                </li>
                <li style={S.bullet}>
                  Authored comprehensive system architecture runbooks and technical documentation adopted as the standardized onboarding protocol for incoming laboratory engineers.
                </li>
              </ul>
            </div>

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
                <li style={S.bullet}>
                  Shipped a high-concurrency event management portal using <strong>Next.js</strong> and <strong>TypeScript</strong>, reliably serving <strong>2,000+ students</strong> across 3 major university hackathons.
                </li>
                <li style={S.bullet}>
                  Implemented real-time live competition leaderboards via <strong>WebSockets</strong>, reducing perceived data latency from <strong>3 seconds down to under 200ms</strong>.
                </li>
                <li style={S.bullet}>
                  Designed a reusable, highly accessible UI component library styled with modern utility CSS, subsequently adopted to accelerate frontend delivery for 3 future event teams.
                </li>
              </ul>
            </div>
          </section>

          {/* ── EDUCATION ─────────────────────────────────────── */}
          <section style={S.section}>
            <h2 style={S.sectionHeader}>Education</h2>
            <div style={{ ...S.expEntry, marginBottom: 0 }}>
              <div style={S.expTopLine}>
                <span style={S.expRole}>B.Tech in Computer Science &amp; Engineering (AI &amp; Machine Learning)</span>
                <span style={S.expDate}>2022 – 2026</span>
              </div>
              <div style={S.expSubLine}>
                <span style={S.expOrg}>SRM Institute of Science and Technology (SRM IST)</span>
                <span style={S.expLocation}>Chennai, India</span>
              </div>
              <ul style={S.bulletList}>
                <li style={S.bullet}>
                  <strong>Academic Standing:</strong> CGPA: <strong>8.5 / 10.0</strong> &bull; <strong>Core Specializations:</strong> Deep Learning, NLP, Computer Vision, Distributed Systems, Data Structures &amp; Algorithms.
                </li>
                <li style={S.bullet}>
                  <strong>Leadership &amp; Teaching:</strong> Teaching Assistant for Machine Learning (CS6001) across 2 academic semesters, mentoring and grading <strong>60+ undergraduate students</strong> per section.
                </li>
              </ul>
            </div>
          </section>

          {/* ── TECHNICAL SKILLS ──────────────────────────────── */}
          <section style={S.section}>
            <h2 style={S.sectionHeader}>Technical Skills</h2>
            <p style={S.skillRow}>
              <span style={S.skillLabel}>Languages:</span> Python, Go, TypeScript, JavaScript, C/C++, SQL, HTML/CSS
            </p>
            <p style={S.skillRow}>
              <span style={S.skillLabel}>ML &amp; AI:</span> PyTorch, TensorFlow, Scikit-Learn, NLP, Transformers, OpenCV, Pandas, NumPy
            </p>
            <p style={S.skillRow}>
              <span style={S.skillLabel}>Backend &amp; Web:</span> FastAPI, Next.js, React, Node.js, Express, REST APIs, WebSockets, Tailwind CSS
            </p>
            <p style={S.skillRow}>
              <span style={S.skillLabel}>Cloud &amp; Infra:</span> Docker, Kubernetes, AWS, GCP, Git, CI/CD Pipelines, Prometheus, Grafana
            </p>
            <p style={S.skillRow}>
              <span style={S.skillLabel}>Databases:</span> PostgreSQL, MySQL, Redis, MongoDB, Firebase
            </p>
          </section>

          {/* ── CERTIFICATIONS & LANGUAGES ────────────────────── */}
          <section style={{ ...S.section, marginBottom: 0 }}>
            <h2 style={S.sectionHeader}>Certifications &amp; Languages</h2>
            <p style={S.skillRow}>
              <span style={S.skillLabel}>Certifications:</span> Basics of Machine Learning Algorithms (UniAthena / Cambridge International Qualifications, UK — <strong>92% Score</strong>)
            </p>
            <p style={S.skillRow}>
              <span style={S.skillLabel}>Spoken:</span> English (Professional Proficiency), Hindi (Native), Bengali (Native), Tamil (Conversational)
            </p>
          </section>

        </main>
      </div>

      {/* ── BULLETPROOF PRINT STYLES ────────────────────────── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page {
            size: letter portrait;
            margin: 0;
          }
          html, body {
            background: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print {
            display: none !important;
          }
          .resume-container {
            background: transparent !important;
            padding: 0 !important;
            margin: 0 !important;
            display: block !important;
          }
          .resume-page {
            width: 8.5in !important;
            height: 11in !important;
            max-height: 11in !important;
            margin: 0 !important;
            padding: 0.36in 0.45in !important;
            box-shadow: none !important;
            border: none !important;
            overflow: visible !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
          }
        }
      `}} />
    </>
  );
}