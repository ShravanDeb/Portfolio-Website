import {
  Document, Page, View, Text, Link, StyleSheet, Font, Svg, Path,
} from "@react-pdf/renderer";

Font.register({
  family: "Latin Modern Roman",
  fonts: [
    { src: "public/fonts/lmroman10-regular.otf", fontWeight: 400 },
    { src: "public/fonts/lmroman10-bold.otf", fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Latin Modern Roman",
    fontSize: 14,
    lineHeight: 1.35,
    color: "#000000",
  },
  header: { textAlign: "center", marginBottom: 12 },
  name: { fontSize: 26, fontWeight: 400, marginBottom: 6, letterSpacing: 0.5 },
  contactRow: { flexDirection: "row", justifyContent: "center", alignItems: "center", fontSize: 13.5 },
  contactLink: { color: "#000000", textDecoration: "none", flexDirection: "row", alignItems: "center" },
  icon: { width: 12, height: 12, marginRight: 3, marginLeft: 3 },
  linkIcon: { width: 11, height: 11, marginRight: 2 },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 700,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    marginTop: 14,
    marginBottom: 6,
    paddingBottom: 1,
  },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginTop: 4 },
  left: { textAlign: "left", flex: 1, paddingRight: 15 },
  right: { textAlign: "right", flexShrink: 0 },
  bulletBlock: { marginTop: 3, marginBottom: 6, paddingLeft: 18 },
  bulletRow: { flexDirection: "row", marginBottom: 2 },
  bullet: { width: 14, fontSize: 14 },
  bulletText: { flex: 1, fontSize: 14 },
  skillsList: { marginTop: 4 },
  skillItem: { marginBottom: 3, fontSize: 14 },
  projectLinks: { flexDirection: "row", gap: 4, alignItems: "center" },
  bold: { fontWeight: 700 },
});

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.bulletRow}>
      <Text style={styles.bullet}>•</Text>
      <Text style={styles.bulletText}>{children}</Text>
    </View>
  );
}

function Skill({ label, items }: { label: string; items: string }) {
  return (
    <Text style={styles.skillItem}>
      <Text style={styles.bold}>{label}:</Text> {items}
    </Text>
  );
}

export default function ResumePDF() {
  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>Shravan Kumar Deb</Text>
          <View style={styles.contactRow}>
            <Text>Assam Science and Technology University | </Text>
            <Link src="mailto:shravandeb@gmail.com" style={{ color: "#000", textDecoration: "none" }}>shravandeb@gmail.com</Link>
            <Text> | +91 9864451186</Text>
          </View>

          <View style={[styles.contactRow, { marginTop: 2 }]}>
            <Link src="https://shravan-deb.vercel.app" style={styles.contactLink}>
              <Svg viewBox="0 0 24 24" style={styles.icon}>
                <Path d="M12 2L2 7l10 5 10-5-10-5z" fill="#000" />
                <Path d="M2 17l10 5 10-5" fill="none" stroke="#000" strokeWidth="2" />
                <Path d="M2 12l10 5 10-5" fill="none" stroke="#000" strokeWidth="2" />
              </Svg>
              <Text>Portfolio</Text>
            </Link>
            <Text> | </Text>

            <Link src="https://github.com/ShravanDeb" style={styles.contactLink}>
              <Svg viewBox="0 0 24 24" style={styles.icon}>
                <Path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="#000"/>
              </Svg>
              <Text>GitHub</Text>
            </Link>
            <Text> | </Text>

            <Link src="https://www.linkedin.com/in/shravan-kumar-deb-577b1037a" style={styles.contactLink}>
              <Svg viewBox="0 0 24 24" style={styles.icon}>
                <Path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#000"/>
              </Svg>
              <Text>LinkedIn</Text>
            </Link>
          </View>
        </View>

        {/* Education */}
        <View style={styles.sectionTitle}><Text>Education</Text></View>
        <View style={styles.row}>
          <Text style={styles.left}>
            <Text style={styles.bold}>Assam Science and Technology University:</Text> B.Tech. in Computer Science and Engineering (AI Specialization)
          </Text>
          <Text style={styles.right}>2025 – 2029</Text>
        </View>
        <Text style={{ marginTop: 3, fontSize: 14 }}>
          <Text style={styles.bold}>Kendriya Vidyalaya (OIL) Duliajan:</Text> 12th (77.6%), 10th (92%)
        </Text>

        {/* Skills */}
        <View style={styles.sectionTitle}><Text>Skills</Text></View>
        <View style={styles.skillsList}>
          <Skill label="Programming" items="Python, Java, C++, TypeScript, SQL" />
          <Skill label="Web Development" items="Frontend Development, Backend Development, REST APIs, Responsive Design, Authentication" />
          <Skill label="Artificial Intelligence" items="Machine Learning, Generative AI" />
          <Skill label="Databases" items="Relational Databases, NoSQL Databases, Database Design" />
          <Skill label="Developer Tools" items="Git, GitHub, Cloud Deployment" />
          <Skill label="Core Concepts" items="Data Structures & Algorithms, Object-Oriented Programming, DBMS, Operating Systems, Computer Networks" />
        </View>

        {/* Experience */}
        <View style={styles.sectionTitle}><Text>Experience</Text></View>

        <View style={styles.row}>
          <Text style={styles.left}><Text style={styles.bold}>Mrinaljyoti Rehabilitation Centre (MRC) — Social Intern</Text></Text>
          <Text style={styles.right}>Jul 2025</Text>
        </View>
        <View style={styles.bulletBlock}>
          <Bullet>Completed a 20-day social internship focused on digital transformation and community service initiatives.</Bullet>
          <Bullet>Digitized beneficiary records and assisted in preparing personalized diet charts to improve data organization and accessibility.</Bullet>
          <Bullet>Collaborated with the rehabilitation team to streamline data management and support community outreach activities.</Bullet>
        </View>

        <View style={styles.row}>
          <Text style={styles.left}><Text style={styles.bold}>National Service Scheme (NSS), ASTU — Active Volunteer</Text></Text>
          <Text style={styles.right}>2025 – Present</Text>
        </View>
        <View style={styles.bulletBlock}>
          <Bullet>Participate in community service initiatives, awareness campaigns, and campus volunteer programs.</Bullet>
          <Bullet>Contribute to social impact activities promoting education, environmental sustainability, and public welfare.</Bullet>
        </View>

        <View style={styles.row}>
          <Text style={styles.left}><Text style={styles.bold}>Mobius Coding Society, ASTU — Active Member</Text></Text>
          <Text style={styles.right}>2025 – Present</Text>
        </View>
        <View style={styles.bulletBlock}>
          <Bullet>Participate in technical workshops, coding sessions, and collaborative software development activities.</Bullet>
          <Bullet>Contribute to hackathons, peer learning sessions, and discussions on AI, web development, and competitive programming.</Bullet>
        </View>

        <View style={styles.row}>
          <Text style={styles.left}><Text style={styles.bold}>Google Developer Groups (GDG) Guwahati — Community Member</Text></Text>
          <Text style={styles.right}>2025 – Present</Text>
        </View>
        <View style={styles.bulletBlock}>
          <Bullet>Attend developer conferences, technical workshops, and hands-on sessions on AI, cloud computing, and modern software engineering.</Bullet>
          <Bullet>Engage with the developer community through networking, collaborative learning, and technology-focused events.</Bullet>
        </View>

        <View style={styles.row}>
          <Text style={styles.left}><Text style={styles.bold}>International Association of Engineers (IAENG) — Member</Text></Text>
          <Text style={styles.right}>Nov 2025 – Present</Text>
        </View>
        <View style={styles.bulletBlock}>
          <Bullet>Member of the IAENG Society of Artificial Intelligence.</Bullet>
          <Bullet>Member of the IAENG Society of Computer Science.</Bullet>
          <Bullet>Member of the IAENG Society of Software Engineering.</Bullet>
        </View>

        {/* Projects */}
        <View style={styles.sectionTitle}><Text>Projects</Text></View>

        <View style={styles.row}>
          <Text style={styles.left}><Text style={styles.bold}>DevMon: A GitHub Credential Card Platform</Text></Text>
          <View style={[styles.right, styles.projectLinks]}>
            <Link src="https://dev-mon-omega.vercel.app" style={styles.contactLink}>
              <Svg viewBox="0 0 24 24" style={styles.linkIcon}>
                <Path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
                <Path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
              </Svg>
              <Text>Live</Text>
            </Link>
            <Text> | </Text>
            <Link src="https://github.com/ShravanDeb/DevMon" style={styles.contactLink}>
              <Svg viewBox="0 0 24 24" style={styles.linkIcon}>
                <Path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
                <Path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
              </Svg>
              <Text>DevMon</Text>
            </Link>
          </View>
        </View>
        <View style={styles.bulletBlock}>
          <Bullet>Built a trading-card-style developer credential platform that scores real GitHub activity across 15 metrics and 5 behavioural attributes.</Bullet>
          <Bullet>Implemented HMAC-SHA-256 signed verification, 12 developer classes, 5 rarity tiers, PNG card export, and a leaderboard with company filtering.</Bullet>
          <Bullet>Stack: Next.js 14, TypeScript, Supabase PostgreSQL, Upstash Redis, Zod, Motion, GSAP. Deployed on Vercel.</Bullet>
        </View>

        <View style={styles.row}>
          <Text style={styles.left}><Text style={styles.bold}>Hive: Campus Collaboration Platform</Text></Text>
          <View style={[styles.right, styles.projectLinks]}>
            <Link src="https://hive-eight-livid.vercel.app" style={styles.contactLink}>
               <Svg viewBox="0 0 24 24" style={styles.linkIcon}>
                <Path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
                <Path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
              </Svg>
              <Text>Live</Text>
            </Link>
            <Text> | </Text>
            <Link src="https://github.com/ShravanDeb/Hive" style={styles.contactLink}>
               <Svg viewBox="0 0 24 24" style={styles.linkIcon}>
                <Path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
                <Path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
              </Svg>
              <Text>Hive</Text>
            </Link>
          </View>
        </View>
        <View style={styles.bulletBlock}>
          <Bullet>Built a platform where college students sign in with institutional Google accounts, create skill-based profiles, post projects, and find teammates.</Bullet>
          <Bullet>Implemented Google OAuth with domain validation, smart matching, real-time notifications, admin console, and GSAP cinematic scroll animations.</Bullet>
          <Bullet>Stack: Next.js 16, TypeScript, Neon PostgreSQL, Prisma, Auth.js, Tailwind CSS, GSAP + Lenis. Deployed on Vercel.</Bullet>
        </View>

        {/* Certifications - forced to start on a new page */}
        <View style={styles.sectionTitle} break><Text>Certifications & Licences</Text></View>

        <View style={styles.row}><Text style={styles.left}><Text style={styles.bold}>UniAthena – Basics of Machine Learning Algorithms</Text></Text><Link src="https://drive.google.com/file/d/1aBUMn6BLYoLTV1QUhwXFryjuhZRdAt7Y/view" style={styles.contactLink}>View</Link></View>
        <View style={styles.row}><Text style={styles.left}><Text style={styles.bold}>IBM – Web Development Fundamentals</Text></Text><Link src="https://drive.google.com/file/d/1fW--2AZq7i0GtdgNsBCc1-RTvNa6Sr0Z/view" style={styles.contactLink}>View</Link></View>
        <View style={styles.row}><Text style={styles.left}><Text style={styles.bold}>Databricks – AI Agent Fundamentals</Text></Text><Link src="https://drive.google.com/file/d/19pyW6vrbdeWp2l0gha14fmU5GDeIK8YD/view" style={styles.contactLink}>View</Link></View>
        <View style={styles.row}><Text style={styles.left}><Text style={styles.bold}>Anthropic – AI Fluency Framework & Foundations</Text></Text><Link src="https://drive.google.com/file/d/1VTUQ8I3QwtXWFkLp5gZnZfnlbMMfZrTX/view" style={styles.contactLink}>View</Link></View>
        <View style={styles.row}><Text style={styles.left}><Text style={styles.bold}>IAENG – Membership Certificate</Text></Text><Link src="https://drive.google.com/file/d/1xFAF8_YcS7w7I2jQZ5NJJy5111uBAka2/view" style={styles.contactLink}>View</Link></View>
        <View style={styles.row}><Text style={styles.left}><Text style={styles.bold}>IAENG – Society Membership Certificate</Text></Text><Link src="https://drive.google.com/file/d/1MHM7htDxDTryw0GWknRKGRl3LGJZOBzA/view" style={styles.contactLink}>View</Link></View>

        {/* Languages */}
        <View style={styles.sectionTitle}><Text>Languages Known</Text></View>
        <View style={styles.bulletBlock}>
          <Bullet><Text style={styles.bold}>English:</Text> Professional Working Proficiency</Bullet>
          <Bullet><Text style={styles.bold}>Hindi:</Text> Professional Working Proficiency</Bullet>
          <Bullet><Text style={styles.bold}>Assamese:</Text> Conversational Proficiency</Bullet>
          <Bullet><Text style={styles.bold}>Bengali:</Text> (Native) Conversational Proficiency</Bullet>
        </View>
      </Page>
    </Document>
  );
}
