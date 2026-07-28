import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import NoiseOverlay from "@/components/noise-overlay";
import ScrollProgress from "@/components/scroll-progress";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import BackButton from "@/components/back-button";

export const metadata: Metadata = {
  title: "DevMon - Your GitHub, Reimagined",
  description:
    "A collectible credential card scored from your real engineering activity.",
  openGraph: {
    title: "DevMon - Shravan Deb",
    description:
      "A collectible credential card scored from your real engineering activity.",
    images: [
      {
        url: "/work/devmon/opengraph-image.svg",
        width: 1200,
        height: 630,
        alt: "DevMon - Your GitHub, Reimagined",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevMon - Shravan Deb",
    images: ["/work/devmon/opengraph-image.svg"],
  },
};

export default function DevMonPage() {
  return (
    <>
      <NoiseOverlay />
      <ScrollProgress />
      <Nav />

      <main className="pt-24 md:pt-32 pb-32 md:pb-48">
        <div className="mx-auto max-w-[720px] px-6">
          <BackButton />

          <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-text-4 block mb-6">
            Chapter 01
          </span>
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.0] tracking-[-0.03em] text-text-1 mb-4">
            DevMon
          </h1>
          <p className="text-lg text-text-2 mb-3 font-medium tracking-[-0.01em]">
            Your GitHub, reimagined.
          </p>
          <p className="text-text-3 text-sm mb-12">
            A collectible credential card scored from your real engineering activity.
          </p>

          <div className="bg-surface-2 mb-16 overflow-hidden">
            <Image
              src="/work/devmon/hero.png"
              alt="DevMon credential cards in five rarity tiers"
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
                DevMon is an open-source developer credential platform that
                reads your public GitHub activity, processes it through a
                15-metric scoring engine, and produces a cryptographically
                signed, collectible credential card. It turns raw GitHub
                data, commits, PRs, issues, repos, into something shareable
                and verifiable: a trading card for developers, scored on
                engineering behaviour rather than vanity metrics.
              </p>
              <p className="mt-4">
                GitHub profiles give you raw numbers. DevMon gives you a
                story, what kind of developer you actually are, backed by a
                verifiable credential.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-text-1 mb-3">Motivation</h3>
              <p>
                I looked at my own GitHub profile and felt nothing.
              </p>
              <p className="mt-4">
                10,000 commits. Dozens of repos. Years of work. And the profile
                showed... green squares. Numbers without context. I
                couldn&apos;t tell what kind of developer I was from looking
                at it, and neither could anyone else. Recruiters spend
                8 seconds on a GitHub profile and move on. The data was there.
                The story wasn&apos;t.
              </p>
              <p className="mt-4">
                I wanted to build something that takes that raw activity and
                turns it into a credential, something portable, verifiable,
                and actually meaningful. Not another dashboard. Not another
                analytics tool. A card. Something you&apos;d want to share on
                LinkedIn, something that says &ldquo;this is who I am as an
                engineer&rdquo; in a single image.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-text-1 mb-3">The Build</h3>
              <p>
                Built in a focused 2 to 4 week sprint. Started with a simpler
                v1 (basic card generation, fewer metrics) and rebuilt to v2 as
                the full product: the complete scoring engine, premium card
                design, HMAC verification, leaderboard, and documentation.
              </p>
              <p className="mt-4">
                The hardest part was the scoring pipeline. Designing 15 metrics
                that actually mean something, normalising them across wildly
                different GitHub profiles (someone with 50 repos vs. someone
                with 2), and producing rarity tiers that feel earned but not
                random. Every weight, every threshold, every class definition
                went through multiple iterations. The pipeline is pure
                functions, deterministic, testable, no black boxes.
              </p>
              <p className="mt-4">
                Three things I tried and abandoned:
              </p>
              <ul className="mt-2 space-y-2 list-none">
                <li>
                  <strong className="text-text-1">LLM-generated flavour text.</strong> Too
                  expensive, too slow, not deterministic. Replaced with 40
                  handcrafted templates with variable interpolation.
                </li>
                <li>
                  <strong className="text-text-1">Battle/comparison mode.</strong> Comparing
                  two developers&apos; cards. Too complex for v1. Planned for
                  future.
                </li>
                <li>
                  <strong className="text-text-1">Paid tiers.</strong> Considered
                  premium features. Abandoned for philosophy reasons. Zero paid
                  tiers, zero tracking, zero bullshit. Open source under
                  AGPL-3.0.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-text-1 mb-3">How It Works</h3>
              <p>
                A 15-metric normalization pipeline processes your GitHub data
                through a multi-layer scoring engine:
              </p>
              <div className="mt-4 font-mono text-[0.75rem] leading-relaxed text-text-3 bg-surface-2 p-6 overflow-x-auto">
                <pre>{`GitHub GraphQL Fetch
  → 15 Metric Normalization (log/sqrt/logistic/power)
  → 15 Intermediate Components (weighted aggregation)
  → 5 Behavioural Attributes
      (Execution, Impact, Synergy, Mastery, Consistency)
  → Rarity Tier (Common → Rare → Epic → Legendary → Mythic)
  → 12 Developer Classes (PR Titan, Bug Hunter, Night Owl...)
  → 10 Signature Moves (Release Avalanche, Community Catalyst...)
  → 6 Achievements (4-tier system + 3 special)
  → HMAC-SHA-256 Verification Signature`}</pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-text-1 mb-3">Core Features</h3>
              <ul className="list-none space-y-2">
                <li>GitHub OAuth sign-in (read-only scope)</li>
                <li>5 behavioural attributes scored from 15 raw metrics</li>
                <li>12 developer classes (primary + secondary archetype)</li>
                <li>5 rarity tiers with escalating card materials</li>
                <li>HMAC-SHA-256 signed credentials, independently verifiable</li>
                <li>Public verification URLs (<code className="font-mono text-[0.8em] bg-surface-2 px-1.5 py-0.5">/verify/DM-XXXXXX</code>)</li>
                <li>Leaderboard with company filter</li>
                <li>PNG card export (client-side, 2x resolution)</li>
                <li>40 flavour text templates (30 hype, 10 roast)</li>
                <li>Dark/Light theme system</li>
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
                      <td className="py-2 pr-4">Next.js 14 (App Router)</td>
                      <td className="py-2">Server/client split, API routes, metadata/OG</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Language</td>
                      <td className="py-2 pr-4">TypeScript 5.4 (strict)</td>
                      <td className="py-2">Type safety across the scoring pipeline</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Styling</td>
                      <td className="py-2 pr-4">Tailwind CSS 3.4</td>
                      <td className="py-2">Design tokens, utility-first</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Animations</td>
                      <td className="py-2 pr-4">Motion + GSAP</td>
                      <td className="py-2">Card tilt, cursor effects, scroll animations</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Database</td>
                      <td className="py-2 pr-4">Supabase PostgreSQL</td>
                      <td className="py-2">Managed Postgres + Auth, free tier</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Auth</td>
                      <td className="py-2 pr-4">Supabase Auth (GitHub OAuth)</td>
                      <td className="py-2">Session management</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Rate Limiting</td>
                      <td className="py-2 pr-4">Upstash Redis</td>
                      <td className="py-2">Serverless sliding window</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Validation</td>
                      <td className="py-2 pr-4">Zod 4.4</td>
                      <td className="py-2">Runtime schema validation at API boundaries</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Card Export</td>
                      <td className="py-2 pr-4">html-to-image 1.11</td>
                      <td className="py-2">Client-side PNG (avoids server rendering)</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Testing</td>
                      <td className="py-2 pr-4">Vitest 4.1</td>
                      <td className="py-2">Fast unit tests</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Deployment</td>
                      <td className="py-2 pr-4">Vercel</td>
                      <td className="py-2">Serverless hosting</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-text-1 mb-3">Engineering Depth</h3>
              <p>
                The scoring pipeline is entirely pure functions, deterministic,
                testable, no black boxes. Every weight, threshold, and class
                definition is externalised in configuration files under
                <code className="font-mono text-[0.8em] bg-surface-2 px-1.5 py-0.5 ml-1">src/lib/config/</code>,
                making the whole system easy to tune without touching business
                logic.
              </p>
              <ul className="mt-4 list-none space-y-2">
                <li>24-column PostgreSQL schema with 3 indexes, 2 RLS policies, 1 RPC function</li>
                <li>6 API endpoints with sliding-window rate limiting</li>
                <li>Atomic upsert via PostgreSQL RPC (<code className="font-mono text-[0.8em] bg-surface-2 px-1.5 py-0.5">upsert_card_v2</code>) with row-level locking</li>
                <li>Single GraphQL query per generation (efficient, avoids rate limits)</li>
                <li>Client-side PNG export (avoids server rendering overhead)</li>
                <li>Harmony bonus rewards balanced developers over specialists</li>
                <li>Dual card rendering (Desktop 540x840 / Mobile 320x500)</li>
                <li>GSAP custom cursor with magnetic hover effects</li>
                <li>SVG noise texture overlay (feTurbulence at 3% opacity)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-text-1 mb-3">Design Philosophy</h3>
              <p>
                The card aesthetic comes from trading card games: Pokemon TCG,
                sports cards, collectible card culture. The rarity tier system,
                the foil borders on Legendary+, the holographic surface on
                Mythic, the crown assets for leaderboard positions. It all
                comes from that world.
              </p>
              <p className="mt-4">
                But the surface is terminal-native. Dark backgrounds, monospace
                labels, grid patterns, noise texture. The collision of
                &ldquo;premium collectible&rdquo; and &ldquo;developer
                terminal&rdquo; is the visual identity:
                <strong className="text-text-1"> Terminal Collectible</strong>.
              </p>
              <p className="mt-4">
                Every rarity tier has a distinct material:
              </p>
              <ul className="mt-2 list-none space-y-1">
                <li><strong className="text-text-1">Common:</strong> Brushed graphite, barely-there matte grain</li>
                <li><strong className="text-text-1">Rare:</strong> Brushed steel with cool-blue tint</li>
                <li><strong className="text-text-1">Epic:</strong> Anodized titanium with purple sheen</li>
                <li><strong className="text-text-1">Legendary:</strong> Gold-leaf with triple-layer surface</li>
                <li><strong className="text-text-1">Mythic:</strong> Security hologram with prismatic reflections</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-text-1 mb-3">Documentation</h3>
              <ul className="list-none space-y-2">
                <li>README.md (732 lines)</li>
                <li>ARCHITECTURE.md (1,300+ lines)</li>
                <li>DEVELOPER_GUIDE.md (1,400+ lines)</li>
                <li>DESIGN.md (179 lines, locked design system)</li>
                <li>CHANGELOG.md, CONTRIBUTING.md, SECURITY.md, CODE_OF_CONDUCT.md, TRADEMARKS.md</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-text-1 mb-3">What I&apos;d Do Differently</h3>
              <ul className="list-none space-y-2">
                <li>
                  <strong className="text-text-1">Battle/comparison mode.</strong> Planned
                  for v2.1. Two developers compare cards side-by-side.
                </li>
                <li>
                  <strong className="text-text-1">CI/CD pipeline.</strong> No
                  GitHub Actions yet. Manual deployment.
                </li>
                <li>
                  <strong className="text-text-1">E2E tests.</strong> Vitest
                  covers unit tests, but no Playwright E2E yet.
                </li>
                <li>
                  <strong className="text-text-1">i18n.</strong> English only
                  currently.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-16 border-t border-border">
            <div className="flex items-center gap-6 mb-8">
              <Link
                href="https://dev-mon-omega.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-text-3 hover:text-text-1 transition-colors"
              >
                Live Demo →
              </Link>
              <Link
                href="https://github.com/ShravanDeb/DevMon"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-text-3 hover:text-text-1 transition-colors"
              >
                Source Code →
              </Link>
            </div>
            <div className="flex items-center justify-between">
              <Link
                href="/work/hive"
                className="group inline-flex items-center gap-2 text-sm text-text-3 hover:text-text-1 transition-colors"
              >
                <span>Next: Hive</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
