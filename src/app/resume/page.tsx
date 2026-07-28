"use client";

import { useRouter } from "next/navigation";

export default function ResumePage() {
  const router = useRouter();

  return (
    <div style={{ background: "#fff", margin: 0, padding: 0 }}>
      <style>{`
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        @page { size: A4; margin: 6mm; }

        html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }

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

        .container { max-width: 800px; margin: 0 auto; }

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
          html, body, :root, #__next, main, div {
            min-height: 0 !important;
            height: auto !important;
            box-shadow: none !important;
          }
          html, body {
            padding: 0 !important; margin: 0 !important;
            background: #fff !important; background-color: #fff !important;
            color: #000 !important;
            overflow: hidden !important;
          }
          .container { 
            max-width: 100% !important; 
            margin: 0 !important; 
            padding: 0 !important;
            page-break-after: avoid !important;
            break-after: avoid !important;
          }
          .container *:last-child {
            margin-bottom: 0 !important;
            padding-bottom: 0 !important;
          }
          .toolbar { display: none !important; }
          .magnetic-cursor { display: none !important; }
          ul, .row, li, .skills-list div, header { break-inside: avoid; }
        }
      `}</style>

      {/* Toolbar — hidden on print */}
      <div className="toolbar">
        <button className="toolbar-btn" onClick={() => router.back()} aria-label="Go back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Back
        </button>
        <button className="toolbar-btn" onClick={() => window.print()} aria-label="Print or save as PDF">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          Download PDF
        </button>
      </div>

      <div className="container">
        {/* Header */}
        <header>
          <h1>Shravan Kumar Deb</h1>
          <div className="contact-info">
            Assam Science and Technology University &nbsp;|&nbsp;{" "}
            <a href="mailto:shubhashish.shukla23b@iiitg.ac.in">shubhashish.shukla23b@iiitg.ac.in</a> &nbsp;|&nbsp;{" "}
            <a href="tel:+916307542454">+91 6307542454</a>
            <br />
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              {" "}LinkedIn
            </a> &nbsp;|&nbsp;{" "}
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              {" "}GitHub
            </a>
          </div>
        </header>

        {/* Education Section */}
        <div className="section-title">Education</div>
        <div className="row">
          <div className="left"><strong>Indian Institute of Information Technology Guwahati:</strong> B.Tech. in Computer Science and Engineering (CGPA: 9.17/10)</div>
          <div className="right">2023 &ndash; 2027</div>
        </div>
        <div style={{ marginTop: "3px" }}>
          <strong>Puranchandra Vidyaniketan, Kanpur:</strong> 12th (95.8%), 10th (89.9%)
        </div>

        {/* Skills Section */}
        <div className="section-title">Skills</div>
        <div className="skills-list">
          <div><strong>Languages:</strong> C++, C, Java, Python, Golang, SQL</div>
          <div><strong>Computer Science:</strong> Algorithms, Data Structures, Blockchain Technology, Neural Networks, Artificial Intelligence, Machine Learning, Operating Systems, Cloud Computing, Computer Networks, Quantum Computing</div>
          <div><strong>Operating Systems:</strong> Linux (Ubuntu, Arch), Windows</div>
          <div><strong>Development Tools:</strong> Git, GitHub, CMake, Gnuplot, ffmpeg</div>
        </div>

        {/* Experience Section */}
        <div className="section-title">Experience</div>
        <div className="row">
          <div className="left"><strong>IIIT Guwahati &mdash; Semester VI Project</strong></div>
          <div className="right">Jan 2026 &ndash; Present</div>
        </div>
        <ul>
          <li>Currently studying and experimenting with <strong>QAOA</strong>-based pathfinding approaches for UAV navigation in simulated environments.</li>
          <li>Analyzing baseline heuristic methods to understand potential improvements in trajectory efficiency and collision avoidance.</li>
        </ul>

        <div className="row">
          <div className="left"><strong>IIIT Guwahati &mdash; Winter Intern</strong></div>
          <div className="right">Dec 2025 &ndash; Present</div>
        </div>
        <ul>
          <li>Contributed to the development of a distributed asset ledger in <strong>Golang</strong>, supporting concurrent operations across multiple simulated nodes.</li>
          <li>Created the database layer to ensure data consistency and integrity under high-concurrency workloads.</li>
        </ul>

        <div className="row">
          <div className="left"><strong>Google Developer Groups on Campus &mdash; Lead</strong></div>
          <div className="right">Aug 2025 &ndash; Present</div>
        </div>
        <ul>
          <li>Led the Google Developer Group on campus, engaging 100+ students through workshops and community events.</li>
          <li>Conducted hands-on sessions on Git, GitHub, and Google Cloud, and co-organized a campus hackathon with strong participation.</li>
        </ul>

        {/* Projects Section */}
        <div className="section-title">Projects</div>
        <div className="row">
          <div className="left"><strong>Trajectory: A Retro 2D RPG Cross-Platform Game in Java</strong></div>
          <div className="right project-links">
            <a href="https://example.com" target="_blank" rel="noopener noreferrer" aria-label="Play Trajectory">
              <svg className="link-icon" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
              Game
            </a> &nbsp;|&nbsp;
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Trajectory source code">
              <svg className="link-icon" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
              Trajectory
            </a>
          </div>
        </div>
        <ul>
          <li>Built a cross-platform retro 2D RPG game with procedurally generated mazes and enemy pathfinding.</li>
          <li>Designed all character sprites and tile textures from scratch, and packaged the game as a <strong>JAR</strong>.</li>
        </ul>

        <div className="row">
          <div className="left"><strong>OpenANN: Autoencoder Neural Network in C++</strong></div>
          <div className="right project-links">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="OpenANN source code">
              <svg className="link-icon" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
              OpenANN
            </a>
          </div>
        </div>
        <ul>
          <li>Implemented an autoencoder neural network from scratch in C++ to understand core machine learning fundamentals.</li>
          <li>Wrote backpropagation and gradient descent logic for training the model.</li>
        </ul>

        <div className="row">
          <div className="left"><strong>Boids: Flocking Simulation</strong></div>
          <div className="right project-links">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Boids source code">
              <svg className="link-icon" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
              Boids
            </a>
          </div>
        </div>
        <ul>
          <li>Simulated flocking behavior using the Boids algorithm in C++.</li>
          <li>Visualized group movement with Gnuplot and generated video output using ffmpeg.</li>
        </ul>

        {/* Coding Profiles Section */}
        <div className="section-title">Coding Profiles</div>
        <ul>
          <li><a href="https://leetcode.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LeetCode profile"><strong>LeetCode</strong></a></li>
          <li><a href="https://codeforces.com/profile/yourusername" target="_blank" rel="noopener noreferrer" aria-label="CodeForces profile"><strong>CodeForces</strong></a></li>
        </ul>

        {/* Team Work Experience Section */}
        <div className="section-title">Team Work Experience</div>
        <ul>
          <li><strong>Event Management Head, Cultural Fest Yuvaan &apos;25:</strong> Managed promotional events that increased participation across major activities.</li>
          <li><strong>Core Team Member, Innovation and Entrepreneurship Cell:</strong> Helped organize workshops and speaker sessions on startups and technology.</li>
          <li><strong>Core Team Member, Tech Fest Entropy &apos;24:</strong> Coordinated &apos;Tech Hunt&apos;, one of the fest&apos;s largest events with 200+ participants.</li>
          <li><strong>Volunteer, Yuvaan &apos;24 &amp; Entropy &apos;24:</strong> Assisted in event operations and logistics.</li>
        </ul>
      </div>
    </div>
  );
}