import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import NoiseOverlay from "@/components/noise-overlay";
import ScrollProgress from "@/components/scroll-progress";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import BackButton from "@/components/back-button";

export const metadata: Metadata = {
  title: "DevMon - Developer Credential Platform",
  description:
    "A collectible credential card scored from your real GitHub activity.",
  openGraph: {
    title: "DevMon - Shravan Deb",
    description:
      "A collectible credential card scored from your real GitHub activity.",
    images: [
      {
        url: "/work/devmon/opengraph-image.svg",
        width: 1200,
        height: 630,
        alt: "DevMon - Developer Credential Platform",
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
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.0] tracking-[-0.03em] text-text-1 mb-8">
            DevMon
          </h1>
          <p className="text-text-3 text-sm mb-12">
            Next.js 14 · TypeScript · React 18 · Tailwind CSS · Supabase · Upstash Redis · Vitest
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

          <div className="space-y-8 text-text-2 text-base leading-[1.7]">
            <div>
              <h3 className="text-lg font-medium text-text-1 mb-3">Overview</h3>
              <p>
                DevMon is an open-source project that takes your public GitHub
                activity through a GraphQL API, scores it across 15 different
                metrics, and turns the whole thing into a collectible credential
                card. Think of it like a trading card, but the stats on it are
                pulled from your actual engineering work. Each card gets
                cryptographically signed with HMAC-SHA-256 so it can be verified
                independently. The card shows your profile across 5 behavioural
                attributes, 12 developer classes, 10 signature moves, and 5
                rarity tiers from Common to Mythic.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-text-1 mb-3">Challenge</h3>
              <p>
                GitHub profiles give you raw numbers, commits, repos, stars, PRs,
                but none of that tells you what kind of developer someone
                actually is. Platforms like LeetCode and HackerRank test you in
                isolation, but your real work is sitting on GitHub. And
                recruiters spend about 8 seconds on a profile before moving on.
                I wanted to build something that turns that raw activity into
                something you can actually share and verify.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-text-1 mb-3">Solution</h3>
              <p>
                The whole thing is a pure-function scoring pipeline written in
                TypeScript. It pulls data from GitHub&apos;s GraphQL API, then
                normalizes 15 metrics using different curves (log, sqrt,
                logistic, power). Those get combined into 15 intermediate
                components through weighted aggregation, which then produce 5
                behavioural attributes: Execution, Impact, Synergy, Mastery, and
                Consistency. From there it picks a rarity tier (Common, Rare,
                Epic, Legendary, Mythic), assigns one of 12 developer classes
                like PR Titan or Bug Hunter, calculates 10 signature moves,
                unlocks up to 6 achievements, and signs the whole credential with
                HMAC-SHA-256.
              </p>
              <p className="mt-4">
                Some things I was deliberate about. All weights, thresholds, and
                class definitions live in a config file so the whole pipeline is
                easy to tweak. Database writes use atomic upserts through a
                PostgreSQL RPC function with SELECT FOR UPDATE to avoid race
                conditions. OAuth is strictly read-only (read:user and user:email
                only), so the app never touches your code or repos. Rate limiting
                runs on Upstash Redis and degrades gracefully if Redis
                isn&apos;t set up. And there is zero analytics, zero tracking, no
                LLM API calls, and no paid tiers.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-text-1 mb-3">Impact</h3>
              <ul className="list-none space-y-2">
                <li>15-metric scoring pipeline with 5 normalization curves</li>
                <li>24-column PostgreSQL schema with 3 indexes, 2 RLS policies, 1 RPC function</li>
                <li>6 API endpoints with sliding-window rate limiting</li>
                <li>HMAC-SHA-256 cryptographic verification on every credential</li>
                <li>40 flavour text templates with variable interpolation</li>
                <li>Dual card rendering (Desktop 540x840 / Mobile 320x500) with 3D tilt</li>
                <li>Theme system (Dark/Light) with CSS custom properties</li>
                <li>GSAP custom cursor with magnetic hover effects</li>
                <li>1,300+ lines of architecture documentation</li>
              </ul>
              <p className="mt-4">
                Currently at v2.0.0, fully deployed and open source.
              </p>
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
                href="/work/kiran-ai"
                className="group inline-flex items-center gap-2 text-sm text-text-3 hover:text-text-1 transition-colors"
              >
                <span>Next: Kiran AI</span>
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