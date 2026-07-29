"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function ResumeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPrint = searchParams.get("print") === "1";

  const handleDownload = async () => {
    try {
      const html2canvas = (await import("html2canvas")).default;
      const jsPDF = (await import("jspdf")).default;

      const element = document.querySelector(".container") as HTMLElement;
      if (!element) throw new Error("Container not found");

      const origBorder = element.style.border;
      element.style.border = "none";

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
      });

      element.style.border = origBorder;

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = pdf.internal.pageSize.getHeight();

      const margin = 7.9;
      const imgW = pdfW - margin * 2;
      const imgH = (canvas.height * imgW) / canvas.width;

      if (imgH > pdfH - margin * 2) {
        const pageContentH = pdfH - margin * 2;
        let remainingH = imgH;
        let srcY = 0;

        while (remainingH > 0) {
          const sliceH = Math.min(pageContentH, remainingH);
          pdf.addImage(
            imgData,
            "JPEG",
            margin,
            margin,
            imgW,
            imgH,
            undefined,
            undefined,
            srcY
          );
          remainingH -= sliceH;
          srcY += sliceH / imgH * canvas.height;
          if (remainingH > 0) pdf.addPage();
        }
      } else {
        pdf.addImage(imgData, "JPEG", margin, margin, imgW, imgH);
      }

      pdf.save("Resume.pdf");
    } catch (e) {
      console.error(e);
      window.print();
    }
  };

  return (
    <div style={{ background: "#fff", margin: 0, padding: 0 }}>
      <style>{`
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        @page { margin: 0; }

        html {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
          background: #ffffff;
        }

        body {
          font-family: "Latin Modern Roman", "Computer Modern", "Times New Roman", Times, serif;
          color: #000000;
          background-color: #ffffff;
          line-height: 1.35;
          font-size: 14px;
          padding: 30px;
          margin: 0;
          -webkit-font-smoothing: antialiased;
        }

        a, a:visited, a:hover, a:active { color: #000000; text-decoration: none; }

        .container { max-width: 800px; margin: 0 auto; border: ${isPrint ? "none" : "0.75pt solid #999"}; padding: 28px; }

        .toolbar {
          display: flex; justify-content: space-between; align-items: center;
          max-width: 800px; margin: 0 auto 16px auto; padding: 0;
        }
        .toolbar-btn {
          display: inline-flex; align-items: center; gap: 5px;
          font-family: inherit; font-size: 12px; color: #000; background: none;
          border: 1px solid #ccc; border-radius: 4px; padding: 6px 12px;
          cursor: pointer; text-decoration: none; transition: border-color 0.15s;
        }
        .toolbar-btn:hover { border-color: #000; }
        .toolbar-btn svg { width: 14px; height: 14px; }

        /* Header Styling */
        header { text-align: center; margin-bottom: 12px; }
        h1 { font-size: 26px; font-weight: normal; margin-bottom: 6px; letter-spacing: 0.5px; }
        .contact-info { font-size: 13.5px; line-height: 1.5; }
        .contact-info a { color: #000000; text-decoration: none; }

        .contact-icon {
          display: inline-block; width: 12px; height: 12px;
          vertical-align: -1.5px; margin-right: 1px; fill: #000;
        }

        /* Section Styling */
        .section-title {
          font-size: 15px; font-weight: bold;
          border-bottom: 1px solid #000000;
          margin-top: 14px; margin-bottom: 6px; padding-bottom: 1px;
        }

        /* Layout Rows */
        .row { display: flex; justify-content: space-between; align-items: baseline; margin-top: 4px; }
        .row .left { text-align: left; }
        .row .right { text-align: right; white-space: nowrap; padding-left: 15px; }

        /* Lists & Bullet Points */
        ul { list-style-type: disc; margin-top: 3px; margin-bottom: 6px; padding-left: 18px; }
        li { margin-bottom: 2px; padding-left: 2px; }

        /* Skills Section Specifics */
        .skills-list { margin-top: 4px; }
        .skills-list div { margin-bottom: 3px; }

        /* SVG Link Icon Styling */
        .link-icon {
          display: inline-block; width: 11px; height: 11px;
          vertical-align: -1px; margin-right: 2px;
          fill: none; stroke: #000; stroke-width: 2;
          stroke-linecap: round; stroke-linejoin: round;
        }

        .project-links { display: inline-flex; align-items: center; gap: 4px; }
        .project-links a {
          color: #000000; text-decoration: none;
          display: inline-flex; align-items: center;
        }

        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          html { background: #fff !important; }
          body {
            padding: 0 !important;
            background: #fff !important; background-color: #fff !important;
            color: #000 !important;
          }
          .container {
            padding: 15px !important;
            border: none !important;
          }
          .toolbar { display: none !important; }
          .magnetic-cursor { display: none !important; }
          ul, .row, li, .skills-list div, header { break-inside: avoid; }
        }
      `}</style>

      {!isPrint && (
        <div className="toolbar">
          <button className="toolbar-btn" onClick={() => router.back()} aria-label="Go back">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back
          </button>
          <button className="toolbar-btn" onClick={handleDownload} aria-label="Download PDF">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
            Download PDF
          </button>
        </div>
      )}

      <div className="container">
        {/* Header */}
        <header>
          <h1>Shravan Kumar Deb</h1>
          <div className="contact-info">
            Assam Science and Technology University &nbsp;|&nbsp;{" "}
            <a href="mailto:shravandeb@gmail.com">shravandeb@gmail.com</a> &nbsp;|&nbsp;{" "}
            <a href="tel:+916307542454">+91 9864451186</a>
            <br />
            <a href="https://shravan-deb.vercel.app" target="_blank" rel="noopener noreferrer" aria-label="Portfolio">
              <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              {" "}Portfolio
            </a> &nbsp;|&nbsp;{" "}
            <a href="https://github.com/ShravanDeb" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              {" "}GitHub
            </a> &nbsp;|&nbsp;{" "}
            <a href="https://www.linkedin.com/in/shravan-kumar-deb-577b1037a" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              {" "}LinkedIn
            </a>
          </div>
        </header>

        {/* Education Section */}
        <div className="section-title">Education</div>
        <div className="row">
          <div className="left"><strong>Assam Science and Technology University:</strong> B.Tech. in Computer Science and Engineering (AI Specialization)</div>
          <div className="right">2025 &ndash; 2029</div>
        </div>
        <div style={{ marginTop: "3px" }}>
          <strong>Kendriya Vidyalaya (OIL) Duliajan:</strong> 12th (77.6%), 10th (92%)
        </div>

        {/* Skills Section */}
<div className="section-title">Skills</div>
<div className="skills-list">
  <div><strong>Programming:</strong> Python, Java, C++, TypeScript, SQL</div>

  <div><strong>Web Development:</strong> Frontend Development, Backend Development, REST APIs, Responsive Design, Authentication</div>

  <div><strong>Artificial Intelligence:</strong> Machine Learning,Generative AI</div>

  <div><strong>Databases:</strong> Relational Databases, NoSQL Databases, Database Design</div>

  <div><strong>Developer Tools:</strong> Git, GitHub, Cloud Deployment</div>

  <div><strong>Core Concepts:</strong> Data Structures & Algorithms, Object-Oriented Programming, DBMS, Operating Systems, Computer Networks</div>
</div>

        {/* Experience Section */}
<div className="section-title">Experience</div>

<div className="row">
  <div className="left">
    <strong>Mrinaljyoti Rehabilitation Centre (MRC) — Social Intern</strong>
  </div>
  <div className="right">Jul 2025</div>
</div>
<ul>
  <li>Completed a 20-day social internship focused on digital transformation and community service initiatives.</li>
  <li>Digitized beneficiary records and assisted in preparing personalized diet charts to improve data organization and accessibility.</li>
  <li>Collaborated with the rehabilitation team to streamline data management and support community outreach activities.</li>
</ul>

<div className="row">
  <div className="left">
    <strong>National Service Scheme (NSS), ASTU — Active Volunteer</strong>
  </div>
  <div className="right">2025 &ndash; Present</div>
</div>
<ul>
  <li>Participate in community service initiatives, awareness campaigns, and campus volunteer programs.</li>
  <li>Contribute to social impact activities promoting education, environmental sustainability, and public welfare.</li>
</ul>

<div className="row">
  <div className="left">
    <strong>Mobius Coding Society, ASTU — Active Member</strong>
  </div>
  <div className="right">2025 &ndash; Present</div>
</div>
<ul>
  <li>Participate in technical workshops, coding sessions, and collaborative software development activities.</li>
  <li>Contribute to hackathons, peer learning sessions, and discussions on AI, web development, and competitive programming.</li>
</ul>

<div className="row">
  <div className="left">
    <strong>Google Developer Groups (GDG) Guwahati — Community Member</strong>
  </div>
  <div className="right">2025 &ndash; Present</div>
</div>
<ul>
  <li>Attend developer conferences, technical workshops, and hands-on sessions on AI, cloud computing, and modern software engineering.</li>
  <li>Engage with the developer community through networking, collaborative learning, and technology-focused events.</li>
</ul>
<div className="row">
  <div className="left">
    <strong>International Association of Engineers (IAENG) — Member</strong>
  </div>
  <div className="right">Nov 2025 – Present</div>
</div>
<ul>
  <li>Member of the IAENG Society of Artificial Intelligence.</li>
  <li>Member of the IAENG Society of Computer Science.</li>
  <li>Member of the IAENG Society of Software Engineering.</li>
</ul>
        {/* Projects Section */}
        <div className="section-title">Projects</div>
        <div className="row">
          <div className="left"><strong>DevMon: A GitHub Credential Card Platform</strong></div>
          <div className="right project-links">
            <a href="https://dev-mon-omega.vercel.app" target="_blank" rel="noopener noreferrer" aria-label="Play DevMon">
              <svg className="link-icon" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
              Live
            </a> &nbsp;|&nbsp;
            <a href="https://github.com/ShravanDeb/DevMon" target="_blank" rel="noopener noreferrer" aria-label="DevMon source code">
              <svg className="link-icon" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
              DevMon
            </a>
          </div>
        </div>
        <ul>
          <li>Built a trading-card-style developer credential platform that scores real GitHub activity across 15 metrics and 5 behavioural attributes.</li>
          <li>Implemented HMAC-SHA-256 signed verification, 12 developer classes, 5 rarity tiers, PNG card export, and a leaderboard with company filtering.</li>
          <li>Stack: Next.js 14, TypeScript, Supabase PostgreSQL, Upstash Redis, Zod, Motion, GSAP. Deployed on Vercel.</li>
        </ul>

        <div className="row">
          <div className="left"><strong>Hive: Campus Collaboration Platform</strong></div>
          <div className="right project-links">
            <a href="https://hive-eight-livid.vercel.app" target="_blank" rel="noopener noreferrer" aria-label="Hive live">
              <svg className="link-icon" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
              Live
            </a> &nbsp;|&nbsp;
            <a href="https://github.com/ShravanDeb/Hive" target="_blank" rel="noopener noreferrer" aria-label="Hive source code">
              <svg className="link-icon" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
              Hive
            </a>
          </div>
        </div>
        <ul>
          <li>Built a platform where college students sign in with institutional Google accounts, create skill-based profiles, post projects, and find teammates.</li>
          <li>Implemented Google OAuth with domain validation, smart matching, real-time notifications, admin console, and GSAP cinematic scroll animations.</li>
          <li>Stack: Next.js 16, TypeScript, Neon PostgreSQL, Prisma, Auth.js, Tailwind CSS, GSAP + Lenis. Deployed on Vercel.</li>
        </ul>

        {/* Certifications Section */}
        <div className="section-title">Certifications & Licences</div>
        <div className="row">
          <div className="left"><strong>UniAthena – Basics of Machine Learning Algorithms</strong></div>
          <div className="right"><a href="https://drive.google.com/file/d/1aBUMn6BLYoLTV1QUhwXFryjuhZRdAt7Y/view?usp=drive_link">View</a></div>
        </div>
        <div className="row">
          <div className="left"><strong>IBM – Web Development Fundamentals</strong></div>
          <div className="right"><a href="https://drive.google.com/file/d/1fW--2AZq7i0GtdgNsBCc1-RTvNa6Sr0Z/view?usp=drive_link">View</a></div>
        </div>
        <div className="row">
          <div className="left"><strong>Databricks – AI Agent Fundamentals</strong></div>
          <div className="right"><a href="https://drive.google.com/file/d/19pyW6vrbdeWp2l0gha14fmU5GDeIK8YD/view?usp=drive_link">View</a></div>
        </div>
        <div className="row">
          <div className="left"><strong>Anthropic – Al Fluency Framework & Foundations</strong></div>
          <div className="right"><a href="https://drive.google.com/file/d/1VTUQ8I3QwtXWFkLp5gZnZfnlbMMfZrTX/view?usp=drive_link">View</a></div>
        </div>
        <div className="row">
          <div className="left"><strong>IAENG – Membership Certificate</strong></div>
          <div className="right"><a href="https://drive.google.com/file/d/1xFAF8_YcS7w7I2jQZ5NJJy5111uBAka2/view?usp=drive_link">View</a></div>
        </div>
        <div className="row">
          <div className="left"><strong>IAENG – Society Membership Certificate</strong></div>
          <div className="right"><a href="https://drive.google.com/file/d/1MHM7htDxDTryw0GWknRKGRl3LGJZOBzA/view?usp=drive_link">View</a></div>
        </div>

 {/* Languages Known Section */}
<div className="section-title">Languages Known</div>
<ul>
  <li><strong>English:</strong> Professional Working Proficiency</li>
  <li><strong>Hindi:</strong> Professional Working Proficiency</li>
  <li><strong>Assamese:</strong> Conversational Proficiency</li>
  <li><strong>Bengali:</strong> (Native) Conversational Proficiency</li>
</ul>

      </div>
    </div>
  );
}

export default function ResumePage() {
  return (
    <Suspense fallback={null}>
      <ResumeContent />
    </Suspense>
  );
}
