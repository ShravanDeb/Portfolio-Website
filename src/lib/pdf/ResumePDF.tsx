import { Document, Page, View, Text, Link, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: "28px",
    fontFamily: "Latin Modern Roman",
    fontSize: "14px",
    lineHeight: 1.35,
    color: "#000000",
  },
  header: {
    textAlign: "center",
    marginBottom: "12px",
  },
  name: {
    fontSize: "26px",
    fontWeight: 400,
    marginBottom: "6px",
    letterSpacing: "0.5px",
  },
  contactInfo: {
    fontSize: "13.5px",
    lineHeight: 1.5,
  },
  contactLink: {
    color: "#000000",
    textDecoration: "none",
  },
  sectionTitle: {
    fontSize: "15px",
    fontWeight: 700,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    borderBottomStyle: "solid",
    marginTop: "14px",
    marginBottom: "6px",
    paddingBottom: "1px",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: "4px",
  },
  left: {
    textAlign: "left",
    flex: 1,
  },
  right: {
    textAlign: "right",
    whiteSpace: "nowrap",
    paddingLeft: "15px",
  },
  bulletBlock: {
    marginTop: "3px",
    marginBottom: "6px",
    paddingLeft: "18px",
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: "2px",
    paddingLeft: "2px",
  },
  bullet: {
    width: "14px",
    fontSize: "14px",
  },
  bulletText: {
    flex: 1,
    fontSize: "14px",
  },
  skillsList: {
    marginTop: "4px",
  },
  skillItem: {
    marginBottom: "3px",
    fontSize: "14px",
  },
  projectLinks: {
    flexDirection: "row",
    gap: "2px",
    alignItems: "center",
  },
  projectLink: {
    color: "#000000",
    textDecoration: "none",
    fontSize: "14px",
  },
  certRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: "4px",
  },
  certLink: {
    color: "#000000",
    textDecoration: "none",
    fontSize: "14px",
  },
});

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.bulletRow}>
      <Text style={styles.bullet}>{"\u2022"}</Text>
      <Text style={styles.bulletText}>{children}</Text>
    </View>
  );
}

function Skill({ label, items }: { label: string; items: string }) {
  return (
    <Text style={styles.skillItem}>
      <Text style={{ fontWeight: 700 }}>{label}:</Text>
      {" "}{items}
    </Text>
  );
}

function HeaderBlock() {
  return (
    <View style={styles.header}>
      <Text style={styles.name}>Shravan Kumar Deb</Text>
      <Text style={styles.contactInfo}>
        Assam Science and Technology University{" | "}shravandeb@gmail.com{" | "}+91 9864451186
      </Text>
      <Text style={[styles.contactInfo, { marginTop: "2px" }]}>
        <Link src="https://shravan-deb.vercel.app" style={styles.contactLink}>Portfolio</Link>
        {" \u2022 "}
        <Link src="https://github.com/ShravanDeb" style={styles.contactLink}>GitHub</Link>
        {" \u2022 "}
        <Link src="https://www.linkedin.com/in/shravan-kumar-deb-577b1037a" style={styles.contactLink}>LinkedIn</Link>
      </Text>
    </View>
  );
}

export default function ResumePDF() {
  return (
    <Document>
      {/* Page 1: Header, Education, Skills, Experience */}
      <Page size="A4" style={styles.page}>
        <HeaderBlock />

        <View style={styles.sectionTitle}><Text>Education</Text></View>
        <View style={styles.row}>
          <Text style={styles.left}>
            <Text style={{ fontWeight: 700 }}>Assam Science and Technology University:</Text>
            {" "}B.Tech. in Computer Science and Engineering (AI Specialization)
          </Text>
          <Text style={styles.right}>2025 \u2013 2029</Text>
        </View>
        <Text style={{ marginTop: "3px", fontSize: "14px" }}>
          <Text style={{ fontWeight: 700 }}>Kendriya Vidyalaya (OIL) Duliajan:</Text>
          {" "}12th (77.6%), 10th (92%)
        </Text>

        <View style={styles.sectionTitle}><Text>Skills</Text></View>
        <View style={styles.skillsList}>
          <Skill label="Programming" items="Python, Java, C++, TypeScript, SQL" />
          <Skill label="Web Development" items="Frontend Development, Backend Development, REST APIs, Responsive Design, Authentication" />
          <Skill label="Artificial Intelligence" items="Machine Learning, Generative AI" />
          <Skill label="Databases" items="Relational Databases, NoSQL Databases, Database Design" />
          <Skill label="Developer Tools" items="Git, GitHub, Cloud Deployment" />
          <Skill label="Core Concepts" items="Data Structures & Algorithms, Object-Oriented Programming, DBMS, Operating Systems, Computer Networks" />
        </View>

        <View style={styles.sectionTitle}><Text>Experience</Text></View>

        <View style={styles.row}>
          <Text style={styles.left}><Text style={{ fontWeight: 700 }}>Mrinaljyoti Rehabilitation Centre (MRC) \u2014 Social Intern</Text></Text>
          <Text style={styles.right}>Jul 2025</Text>
        </View>
        <View style={styles.bulletBlock}>
          <Bullet>Completed a 20-day social internship focused on digital transformation and community service initiatives.</Bullet>
          <Bullet>Digitized beneficiary records and assisted in preparing personalized diet charts to improve data organization and accessibility.</Bullet>
          <Bullet>Collaborated with the rehabilitation team to streamline data management and support community outreach activities.</Bullet>
        </View>

        <View style={styles.row}>
          <Text style={styles.left}><Text style={{ fontWeight: 700 }}>National Service Scheme (NSS), ASTU \u2014 Active Volunteer</Text></Text>
          <Text style={styles.right}>2025 \u2013 Present</Text>
        </View>
        <View style={styles.bulletBlock}>
          <Bullet>Participate in community service initiatives, awareness campaigns, and campus volunteer programs.</Bullet>
          <Bullet>Contribute to social impact activities promoting education, environmental sustainability, and public welfare.</Bullet>
        </View>

        <View style={styles.row}>
          <Text style={styles.left}><Text style={{ fontWeight: 700 }}>Mobius Coding Society, ASTU \u2014 Active Member</Text></Text>
          <Text style={styles.right}>2025 \u2013 Present</Text>
        </View>
        <View style={styles.bulletBlock}>
          <Bullet>Participate in technical workshops, coding sessions, and collaborative software development activities.</Bullet>
          <Bullet>Contribute to hackathons, peer learning sessions, and discussions on AI, web development, and competitive programming.</Bullet>
        </View>

        <View style={styles.row}>
          <Text style={styles.left}><Text style={{ fontWeight: 700 }}>Google Developer Groups (GDG) Guwahati \u2014 Community Member</Text></Text>
          <Text style={styles.right}>2025 \u2013 Present</Text>
        </View>
        <View style={styles.bulletBlock}>
          <Bullet>Attend developer conferences, technical workshops, and hands-on sessions on AI, cloud computing, and modern software engineering.</Bullet>
          <Bullet>Engage with the developer community through networking, collaborative learning, and technology-focused events.</Bullet>
        </View>

        <View style={styles.row}>
          <Text style={styles.left}><Text style={{ fontWeight: 700 }}>International Association of Engineers (IAENG) \u2014 Member</Text></Text>
          <Text style={styles.right}>Nov 2025 \u2013 Present</Text>
        </View>
        <View style={styles.bulletBlock}>
          <Bullet>Member of the IAENG Society of Artificial Intelligence.</Bullet>
          <Bullet>Member of the IAENG Society of Computer Science.</Bullet>
          <Bullet>Member of the IAENG Society of Software Engineering.</Bullet>
        </View>
      </Page>

      {/* Page 2: Projects, Certifications, Languages */}
      <Page size="A4" style={styles.page}>
        <View style={styles.sectionTitle}><Text>Projects</Text></View>

        <View style={styles.row}>
          <Text style={styles.left}><Text style={{ fontWeight: 700 }}>DevMon: A GitHub Credential Card Platform</Text></Text>
          <View style={styles.projectLinks}>
            <Link src="https://dev-mon-omega.vercel.app" style={styles.projectLink}>Live</Link>
            <Text>{" | "}</Text>
            <Link src="https://github.com/ShravanDeb/DevMon" style={styles.projectLink}>DevMon</Link>
          </View>
        </View>
        <View style={styles.bulletBlock}>
          <Bullet>Built a trading-card-style developer credential platform that scores real GitHub activity across 15 metrics and 5 behavioural attributes.</Bullet>
          <Bullet>Implemented HMAC-SHA-256 signed verification, 12 developer classes, 5 rarity tiers, PNG card export, and a leaderboard with company filtering.</Bullet>
          <Bullet>Stack: Next.js 14, TypeScript, Supabase PostgreSQL, Upstash Redis, Zod, Motion, GSAP. Deployed on Vercel.</Bullet>
        </View>

        <View style={styles.row}>
          <Text style={styles.left}><Text style={{ fontWeight: 700 }}>Hive: Campus Collaboration Platform</Text></Text>
          <View style={styles.projectLinks}>
            <Link src="https://hive-eight-livid.vercel.app" style={styles.projectLink}>Live</Link>
            <Text>{" | "}</Text>
            <Link src="https://github.com/ShravanDeb/Hive" style={styles.projectLink}>Hive</Link>
          </View>
        </View>
        <View style={styles.bulletBlock}>
          <Bullet>Built a platform where college students sign in with institutional Google accounts, create skill-based profiles, post projects, and find teammates.</Bullet>
          <Bullet>Implemented Google OAuth with domain validation, smart matching, real-time notifications, admin console, and GSAP cinematic scroll animations.</Bullet>
          <Bullet>Stack: Next.js 16, TypeScript, Neon PostgreSQL, Prisma, Auth.js, Tailwind CSS, GSAP + Lenis. Deployed on Vercel.</Bullet>
        </View>

        <View style={styles.sectionTitle}><Text>Certifications & Licences</Text></View>

        <View style={styles.certRow}>
          <Text style={{ fontSize: "14px" }}><Text style={{ fontWeight: 700 }}>UniAthena \u2013 Basics of Machine Learning Algorithms</Text></Text>
          <Link src="https://drive.google.com/file/d/1aBUMn6BLYoLTV1QUhwXFryjuhZRdAt7Y/view" style={styles.certLink}>View</Link>
        </View>
        <View style={styles.certRow}>
          <Text style={{ fontSize: "14px" }}><Text style={{ fontWeight: 700 }}>IBM \u2013 Web Development Fundamentals</Text></Text>
          <Link src="https://drive.google.com/file/d/1fW--2AZq7i0GtdgNsBCc1-RTvNa6Sr0Z/view" style={styles.certLink}>View</Link>
        </View>
        <View style={styles.certRow}>
          <Text style={{ fontSize: "14px" }}><Text style={{ fontWeight: 700 }}>Databricks \u2013 AI Agent Fundamentals</Text></Text>
          <Link src="https://drive.google.com/file/d/19pyW6vrbdeWp2l0gha14fmU5GDeIK8YD/view" style={styles.certLink}>View</Link>
        </View>
        <View style={styles.certRow}>
          <Text style={{ fontSize: "14px" }}><Text style={{ fontWeight: 700 }}>Anthropic \u2013 AI Fluency Framework & Foundations</Text></Text>
          <Link src="https://drive.google.com/file/d/1VTUQ8I3QwtXWFkLp5gZnZfnlbMMfZrTX/view" style={styles.certLink}>View</Link>
        </View>
        <View style={styles.certRow}>
          <Text style={{ fontSize: "14px" }}><Text style={{ fontWeight: 700 }}>IAENG \u2013 Membership Certificate</Text></Text>
          <Link src="https://drive.google.com/file/d/1xFAF8_YcS7w7I2jQZ5NJJy5111uBAka2/view" style={styles.certLink}>View</Link>
        </View>
        <View style={styles.certRow}>
          <Text style={{ fontSize: "14px" }}><Text style={{ fontWeight: 700 }}>IAENG \u2013 Society Membership Certificate</Text></Text>
          <Link src="https://drive.google.com/file/d/1MHM7htDxDTryw0GWknRKGRl3LGJZOBzA/view" style={styles.certLink}>View</Link>
        </View>

        <View style={styles.sectionTitle}><Text>Languages Known</Text></View>
        <View style={styles.bulletBlock}>
          <Bullet><Text style={{ fontWeight: 700 }}>English:</Text> Professional Working Proficiency</Bullet>
          <Bullet><Text style={{ fontWeight: 700 }}>Hindi:</Text> Professional Working Proficiency</Bullet>
          <Bullet><Text style={{ fontWeight: 700 }}>Assamese:</Text> Conversational Proficiency</Bullet>
          <Bullet><Text style={{ fontWeight: 700 }}>Bengali:</Text> (Native) Conversational Proficiency</Bullet>
        </View>
      </Page>
    </Document>
  );
}
