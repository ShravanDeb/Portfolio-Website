import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import NoiseOverlay from "@/components/noise-overlay";
import ScrollProgress from "@/components/scroll-progress";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import BackButton from "@/components/back-button";

export const metadata: Metadata = {
  title: "Hive - Join the Hive. Build Together.",
  description:
    "Campus collaboration platform where college students find teammates, build projects, and ship products that matter.",
  openGraph: {
    title: "Hive - Shravan Deb",
    description:
      "Campus collaboration platform where college students find teammates, build projects, and ship products that matter.",
    images: [
      {
        url: "/work/hive/opengraph-image.svg",
        width: 1200,
        height: 630,
        alt: "Hive - Join the Hive. Build Together.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hive - Shravan Deb",
    images: ["/work/hive/opengraph-image.svg"],
  },
};

export default function HivePage() {
  return (
    <>
      <NoiseOverlay />
      <ScrollProgress />
      <Nav />

      <main className="pt-24 md:pt-32 pb-32 md:pb-48">
        <div className="mx-auto max-w-[720px] px-6">
          <BackButton />

          <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-text-4 block mb-6">
            Chapter 02
          </span>
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.0] tracking-[-0.03em] text-text-1 mb-4">
            Hive
          </h1>
          <p className="text-lg text-text-2 mb-3 font-medium tracking-[-0.01em]">
            Join the Hive. Build Together.
          </p>
          <p className="text-text-3 text-sm mb-12">
            Where college students find teammates, build projects, and ship products that matter.
          </p>

          <div className="bg-surface-2 mb-16 overflow-hidden">
            <Image
              src="/work/hive/hero.png"
              alt="Hive campus collaboration platform"
              width={2400}
              height={1350}
              className="w-full h-auto"
              priority
              unoptimized
            />
          </div>

          <div className="space-y-10 text-text-2 text-base leading-[1.7]">
            <div>
              <h3 className="text-lg font-medium text-text-1 mb-3">Overview</h3>
              <p>
                Hive is a campus collaboration platform where college students
                find teammates, build projects, and ship products that matter.
                Students sign in with their institutional Google account, create
                a profile with skills and department, then post projects
                describing what they are building and who they need. Others
                browse the explorer, apply to projects, or get invited directly.
                An admin console handles user management, student ID
                verification, allowed email lists, and abuse logs. Real-time
                notifications, bookmarks, events, and email alerts keep
                everything connected.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-text-1 mb-3">Motivation</h3>
              <p>
                I kept seeing the same pattern every semester. Students with
                great ideas but no team. They would post in WhatsApp groups,
                nothing would happen, and ideas would die before they shipped.
              </p>
              <p className="mt-4">
                Existing tools are either too scattered (WhatsApp, Discord),
                too hackathon-focused (Devpost), or not built for ongoing
                collaboration (LinkedIn). None of them solve the actual
                problem: finding the right people for a specific project at
                your specific college.
              </p>
              <p className="mt-4">
                Hive exists to fix that. Not with another social network. Not
                with a job board. With a focused platform where students post
                what they are building, describe who they need, and find the
                exact people who complement their skills. One profile, one
                project post, one collaboration. That is the entire idea.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-text-1 mb-3">The Build</h3>
              <p>
                Built in a focused 1 to 2 week sprint. Full-stack monolith
                with Next.js App Router for server components and API routes.
                Prisma ORM talks to a serverless Neon PostgreSQL database.
                Auth.js handles Google OAuth with institutional email domain
                validation. Everything deployed serverless on Vercel.
              </p>
              <p className="mt-4">
                The hardest part was authentication. Specifically, getting the
                institutional email validation flow right, building the student
                ID verification system with admin review, and making Google
                OAuth work end-to-end with Vercel deployment. Authentication
                always looks simple until you try to do something slightly
                non-standard with it.
              </p>
              <p className="mt-4">
                One thing that bit me: the build script originally used
                PowerShell syntax (Out-Null) which does not work on
                Vercel&apos;s Linux environment. Fixed by rewriting to
                bash-compatible commands and adding a postinstall hook for
                Prisma generation. Small thing, but it cost me a few hours
                of staring at failed deployments.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-text-1 mb-3">How It Works</h3>
              <div className="font-mono text-[0.75rem] leading-relaxed text-text-3 bg-surface-2 p-6 overflow-x-auto">
                <pre>{`Student signs in with institutional Google account
  → Auth.js validates domain (.edu / .ac.in)
  → Profile created with skills + department
  → Project posted with required skills + team size
  → Explorer surfaces matching projects
  → Other students apply or get invited
  → Real-time notification inbox updates
  → Admin reviews ID verifications + abuse logs
  → Email alerts via Gmail SMTP`}</pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-text-1 mb-3">Core Features</h3>
              <ul className="list-none space-y-2">
                <li>Google OAuth with institutional email domain validation</li>
                <li>Student profiles with skills, department, year, GitHub, LinkedIn</li>
                <li>Project explorer with filters (department, skills, status, recency)</li>
                <li>Skill-based smart matching recommendations</li>
                <li>Project listings with required skills and team size</li>
                <li>One-click application system with accept/decline</li>
                <li>Direct invitations to specific students</li>
                <li>Real-time notification inbox</li>
                <li>Student ID verification with admin review</li>
                <li>Admin console (user management, abuse logs, allowed emails)</li>
                <li>Events and hackathons surfaced on dashboard</li>
                <li>Bookmarks for saving interesting projects</li>
                <li>Interest-based communities</li>
                <li>Email notifications via Gmail SMTP</li>
                <li>Dark mode with system preference detection</li>
                <li>Cinematic UI with GSAP scroll animations</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-text-1 mb-3">Tech Stack</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="py-2 pr-4 text-text-1 font-medium">Layer</th>
                      <th className="py-2 pr-4 text-text-1 font-medium">Technology</th>
                      <th className="py-2 text-text-1 font-medium">Why</th>
                    </tr>
                  </thead>
                  <tbody className="text-text-3">
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Framework</td>
                      <td className="py-2 pr-4">Next.js 16 (App Router)</td>
                      <td className="py-2">Server components, API routes, streaming</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Language</td>
                      <td className="py-2 pr-4">TypeScript 5.x</td>
                      <td className="py-2">Type safety across the full stack</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Styling</td>
                      <td className="py-2 pr-4">Tailwind CSS 4.x</td>
                      <td className="py-2">Utility-first, design tokens</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Animations</td>
                      <td className="py-2 pr-4">GSAP 3.15 + Lenis 1.3</td>
                      <td className="py-2">Scroll-triggered cinematic animations, smooth scroll</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Database</td>
                      <td className="py-2 pr-4">PostgreSQL (Neon)</td>
                      <td className="py-2">Serverless Postgres, scales to zero</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">ORM</td>
                      <td className="py-2 pr-4">Prisma 6.x</td>
                      <td className="py-2">Type-safe queries, migration system</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Auth</td>
                      <td className="py-2 pr-4">Auth.js v5 (NextAuth)</td>
                      <td className="py-2">Google OAuth, JWT sessions</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Email</td>
                      <td className="py-2 pr-4">Gmail SMTP (Nodemailer)</td>
                      <td className="py-2">Free, reliable for low-volume transactional email</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">UI Components</td>
                      <td className="py-2 pr-4">Radix UI + shadcn/ui</td>
                      <td className="py-2">Accessible primitives, composable</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Deployment</td>
                      <td className="py-2 pr-4">Vercel</td>
                      <td className="py-2">Serverless, edge-optimized</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-text-1 mb-3">Engineering Depth</h3>
              <p>
                Prisma was chosen for its type-safe query builder and migration
                system. The schema models users, projects, applications,
                invitations, notifications, bookmarks, events, and communities.
                Neon provides serverless PostgreSQL that scales to zero when
                idle, keeping costs minimal during development.
              </p>
              <p className="mt-4">
                Auth.js handles Google OAuth with a custom callback that
                validates the user&apos;s email domain against allowed
                institutional patterns (.edu, .ac.in). Students without
                institutional email go through a manual ID verification flow
                reviewed by admins. JWT sessions keep the auth layer
                stateless.
              </p>
              <p className="mt-4">
                The admin console is a separate route group with role-based
                access control. It handles user management, student ID
                verification reviews, abuse logs, and allowed email list
                management. Email alerts go out via Gmail SMTP for
                verification results and admin notifications.
              </p>
              <ul className="mt-4 list-none space-y-2">
                <li>Prisma schema with 10+ models covering users, projects, applications, notifications</li>
                <li>Serverless Neon PostgreSQL with connection pooling</li>
                <li>Institutional email domain validation (.edu, .ac.in)</li>
                <li>Manual student ID verification with admin review workflow</li>
                <li>Role-based admin console with full user and content management</li>
                <li>Real-time notification inbox for applications and invitations</li>
                <li>Gmail SMTP integration for transactional email</li>
                <li>Responsive design from 320px to 4K</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-text-1 mb-3">Design Philosophy</h3>
              <p>
                The design started with a simple observation: award-winning
                portfolio sites use cinematic scroll experiences to tell
                stories. I wanted to try that approach for a product landing
                page. Near-black monochrome palette chosen because I hate
                orange accent colors. Three typefaces (Bricolage Grotesque,
                Manrope, Space Grotesk) for typographic hierarchy.
              </p>
              <p className="mt-4">
                GSAP ScrollTrigger powers a pinned timeline on the landing
                page. Lenis handles smooth scrolling throughout. The
                combination creates a cinematic feel without sacrificing
                performance. Every section breathes with intentional spacing,
                scroll-triggered reveals, and a rhythm that guides the eye.
              </p>
              <p className="mt-4">
                Dark mode is system-aware with a manual toggle. The UI
                adapts from 320px mobile to 4K displays. Radix UI primitives
                ensure accessibility is built in, not bolted on.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-text-1 mb-3">What I&apos;d Do Differently</h3>
              <ul className="list-none space-y-2">
                <li>
                  <strong className="text-text-1">Direct messaging.</strong> Students
                  need to communicate without leaving the platform. Planned
                  for next iteration.
                </li>
                <li>
                  <strong className="text-text-1">AI-powered recommendations.</strong> Skill
                  matching could be smarter with ML-based project teammate
                  suggestions.
                </li>
                <li>
                  <strong className="text-text-1">Mobile apps.</strong> React
                  Native or Expo for iOS and Android. Students live on their
                  phones.
                </li>
                <li>
                  <strong className="text-text-1">Calendar integration.</strong> Sync
                  project deadlines and events with Google Calendar.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-16 border-t border-border">
            <div className="flex items-center gap-6 mb-8">
              <Link
                href="https://hive-eight-livid.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-text-3 hover:text-text-1 transition-colors"
              >
                Live Demo →
              </Link>
              <Link
                href="https://github.com/ShravanDeb/Hive"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-text-3 hover:text-text-1 transition-colors"
              >
                Source Code →
              </Link>
            </div>
            <div className="flex items-center justify-between">
              <Link
                href="/work/devmon"
                className="group inline-flex items-center gap-2 text-sm text-text-3 hover:text-text-1 transition-colors"
              >
                <span>← Previous: DevMon</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
