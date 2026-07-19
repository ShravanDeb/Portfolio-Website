import type { Metadata } from "next";
import PrintButton from "@/components/print-button";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Shravan Deb — AI/ML engineer, systems builder, product developer.",
};

const S = {
  page: {
    fontFamily: "Georgia, 'Times New Roman', Times, serif",
    width: "8.5in",
    minHeight: "11in",
    background: "#fff",
    color: "#000",
    margin: "0 auto",
    padding: "0.85in 0.9in",
    fontSize: "10.5pt",
    lineHeight: "1.45",
    WebkitFontSmoothing: "antialiased",
  } as React.CSSProperties,

  header: {
    textAlign: "center" as const,
    marginBottom: "14pt",
  },
  headerName: {
    fontSize: "19.5pt",
    fontWeight: 700,
    margin: 0,
    lineHeight: 1.2,
  },
  headerTitle: {
    fontSize: "19.5pt",
    fontWeight: 400,
    margin: 0,
    lineHeight: 1.2,
  },
  headerContact: {
    fontSize: "10.5pt",
    marginTop: "8pt",
    lineHeight: 1.6,
    color: "#000",
  },

  rule: {
    border: "none",
    borderTop: "1px solid #000",
    margin: "12pt 0",
  },

  detailsGrid: {
    fontSize: "10.5pt",
    lineHeight: 1.5,
    marginBottom: "2pt",
  },
  detailsRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "2pt",
  },
  detailsLabel: {
    flex: "0 0 auto",
    color: "#000",
  },
  detailsValue: {
    flex: "1",
    textAlign: "center" as const,
  },
  detailsValueRight: {
    flex: "0 0 auto",
    textAlign: "right" as const,
  },

  section: {
    marginBottom: "10pt",
  },
  sectionInner: {
    display: "flex",
    gap: "0",
  },
  sectionLeft: {
    flex: "0 0 17%",
    paddingRight: "12pt",
  },
  sectionRight: {
    flex: "1",
  },
  sectionLabel: {
    fontSize: "11pt",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    marginBottom: "0",
  },

  expEntry: {
    marginBottom: "26pt",
  },
  expTopLine: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: "4pt",
  },
  expRole: {
    fontSize: "12.5pt",
    fontWeight: 700,
  },
  expLocation: {
    fontSize: "10.5pt",
    fontWeight: 400,
    flexShrink: 0,
    marginLeft: "8pt",
  },
  expDate: {
    fontSize: "10.5pt",
    color: "#000",
    paddingTop: "2pt",
  },
  bulletList: {
    margin: "3pt 0 0 0",
    padding: 0,
    listStyle: "none",
  },
  bullet: {
    fontSize: "10.5pt",
    lineHeight: 1.45,
    marginBottom: "2pt",
    paddingLeft: "14pt",
    textIndent: "-14pt",
  },

  profileText: {
    fontSize: "10.5pt",
    lineHeight: 1.5,
    margin: 0,
  },

  skillRow: {
    fontSize: "10.5pt",
    lineHeight: 1.5,
    marginBottom: "1pt",
  },
  skillLabel: {
    fontWeight: 700,
  },

  langRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "10.5pt",
    lineHeight: 1.5,
    marginBottom: "1pt",
  },
};

const CONTACT_BLOCK = (
  <>
    123 Main Street, Chennai, Tamil Nadu
    <br />
    +91 98765 43210, shravan@email.com
    <br />
    linkedin.com/in/shravandeb, github.com/shravandeb
  </>
);

export default function ResumePage() {
  return (
    <>
      {/* Screen-only print button */}
      <div className="no-print" style={{ position: "fixed", top: "16px", right: "16px", zIndex: 100 }}>
        <PrintButton />
      </div>

      <div style={S.page}>
        {/* ── HEADER ─────────────────────────────────────────── */}
        <div style={S.header}>
          <p style={S.headerName}>Shravan Deb</p>
          <p style={S.headerTitle}>AI/ML Engineer</p>
          <p style={S.headerContact}>{CONTACT_BLOCK}</p>
        </div>
        <hr style={S.rule} />

        {/* ── PERSONAL DETAILS ──────────────────────────────── */}
        <div style={S.detailsGrid}>
          <div style={S.detailsRow}>
            <span style={{ ...S.detailsLabel, flex: "0 0 28%" }}>Date / Place of birth</span>
            <span style={{ ...S.detailsValue, flex: "1 1 auto", textAlign: "center" }}>
              15 March 2004
              <br />
              Chennai, Tamil Nadu
              <br />
              India
            </span>
            <span style={{ ...S.detailsValueRight, flex: "0 0 22%" }}>Marital status</span>
            <span style={{ ...S.detailsValueRight, flex: "0 0 14%", textAlign: "right" }}>Single</span>
          </div>
          <div style={{ ...S.detailsRow, marginTop: "4pt" }}>
            <span style={{ ...S.detailsLabel, flex: "0 0 28%" }}>Nationality / Gender</span>
            <span style={{ ...S.detailsValue, flex: "1 1 auto", textAlign: "center" }}>
              Indian / Male
            </span>
          </div>
        </div>
        <hr style={S.rule} />

        {/* ── PROFILE ───────────────────────────────────────── */}
        <div style={S.section}>
          <div style={S.sectionInner}>
            <div style={S.sectionLeft}>
              <p style={S.sectionLabel}>Profile</p>
            </div>
            <div style={S.sectionRight}>
              <p style={S.profileText}>
                AI/ML engineer with 4+ years of experience building production
                systems spanning real-time infrastructure, natural language
                processing, and collaborative analytics. Specialized in deploying
                intelligent systems at scale — from anomaly detection pipelines
                processing 12k events/sec to virtual assistants serving 500+
                daily users. Focused on the intersection of machine learning,
                systems engineering, and developer tooling.
              </p>
            </div>
          </div>
        </div>

        {/* ── EXPERIENCE ────────────────────────────────────── */}
        <div style={S.section}>
          <div style={S.sectionInner}>
            <div style={S.sectionLeft}>
              <p style={S.sectionLabel}>Experience</p>
            </div>
            <div style={S.sectionRight}>
              {/* Role 1 */}
              <div style={S.expEntry}>
                <div style={S.expTopLine}>
                  <span style={S.expRole}>ML Engineer Intern — SRM Embedded Research Lab</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4pt" }}>
                  <span style={S.expDate}>Jan 2025 – May 2025</span>
                  <span style={S.expLocation}>Chennai, India</span>
                </div>
                <ul style={S.bulletList}>
                  <li style={S.bullet}>• Designed and deployed a real-time anomaly detection pipeline using PyTorch and Redis Streams, processing 12k+ events/sec across distributed IoT sensors</li>
                  <li style={S.bullet}>• Reduced false positive rate by 38% through custom ensemble architecture combining transformer encoders with statistical process control</li>
                  <li style={S.bullet}>• Built internal CLI tooling in Go for model versioning and A/B deployment, adopted by 4 research teams within first month</li>
                  <li style={S.bullet}>• Authored technical documentation and runbooks adopted as onboarding standard for incoming lab members</li>
                </ul>
              </div>

              {/* Role 2 */}
              <div style={{ ...S.expEntry, marginBottom: "0" }}>
                <div style={S.expTopLine}>
                  <span style={S.expRole}>Frontend Developer — SRM Tech Club</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4pt" }}>
                  <span style={S.expDate}>Aug 2023 – Dec 2023</span>
                  <span style={S.expLocation}>Chennai, India</span>
                </div>
                <ul style={S.bulletList}>
                  <li style={S.bullet}>• Shipped event portal with Next.js serving 2,000+ students across 3 major hackathons</li>
                  <li style={S.bullet}>• Implemented real-time leaderboards via WebSockets, reducing perceived latency from 3s to under 200ms</li>
                  <li style={S.bullet}>• Coordinated design handoff with 2 graphic designers, maintaining a component library used by 3 subsequent event teams</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <hr style={{ ...S.rule, marginTop: "6pt", marginBottom: "10pt" }} />

        {/* ── EDUCATION ─────────────────────────────────────── */}
        <div style={S.section}>
          <div style={S.sectionInner}>
            <div style={S.sectionLeft}>
              <p style={S.sectionLabel}>Education</p>
            </div>
            <div style={S.sectionRight}>
              <div style={{ ...S.expEntry, marginBottom: "0" }}>
                <div style={S.expTopLine}>
                  <span style={S.expRole}>B.Tech Computer Science — AI &amp; Machine Learning</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4pt" }}>
                  <span style={S.expDate}>2022 – 2026</span>
                  <span style={S.expLocation}>SRM IST, Chennai</span>
                </div>
                <ul style={S.bulletList}>
                  <li style={S.bullet}>• CGPA: 8.5 / 10 · Relevant coursework: Deep Learning, NLP, Computer Vision, Distributed Systems</li>
                  <li style={S.bullet}>• Teaching Assistant for Machine Learning (CS6001), 2 semesters, 60+ students per section</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ── SKILLS ────────────────────────────────────────── */}
        <div style={S.section}>
          <div style={S.sectionInner}>
            <div style={S.sectionLeft}>
              <p style={S.sectionLabel}>Skills</p>
            </div>
            <div style={S.sectionRight}>
              <p style={S.skillRow}><span style={S.skillLabel}>Languages: </span>Python, Go, TypeScript, C/C++, SQL</p>
              <p style={S.skillRow}><span style={S.skillLabel}>Backend &amp; Infra: </span>Docker, Kubernetes, Prometheus, Grafana, FastAPI</p>
              <p style={S.skillRow}><span style={S.skillLabel}>Cloud &amp; Tooling: </span>AWS, GCP, Git, PostgreSQL, Redis, CI/CD</p>
              <p style={S.skillRow}><span style={S.skillLabel}>Practices: </span>MLOps, System Design, Real-time Data Pipelines, Technical Writing</p>
            </div>
          </div>
        </div>

        {/* ── LANGUAGES ─────────────────────────────────────── */}
        <div style={S.section}>
          <div style={S.sectionInner}>
            <div style={S.sectionLeft}>
              <p style={S.sectionLabel}>Languages</p>
              <hr style={{ ...S.rule, margin: "6pt 0 0 0" }} />
            </div>
            <div style={S.sectionRight}>
              <div style={S.langRow}>
                <span>English</span>
                <span>Fluent</span>
              </div>
              <div style={S.langRow}>
                <span>Hindi</span>
                <span>Native</span>
              </div>
              <div style={S.langRow}>
                <span>Bengali</span>
                <span>Native</span>
              </div>
              <div style={S.langRow}>
                <span>Tamil</span>
                <span>Conversational</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print + page styles */}
      <style>{`
        body { background: #e5e5e5; margin: 0; }
        @media print {
          body { background: white !important; }
          .no-print { display: none !important; }
          .resume-page { box-shadow: none !important; margin: 0 !important; }
          @page { size: letter portrait; margin: 0; }
        }
      `}</style>
    </>
  );
}
