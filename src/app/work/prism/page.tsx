import type { Metadata } from "next";
import Link from "next/link";
import NoiseOverlay from "@/components/noise-overlay";
import ScrollProgress from "@/components/scroll-progress";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Prism — Collaborative Analytics",
  description:
    "Collaborative analytics platform that turns raw data into actionable insights.",
  openGraph: {
    title: "Prism — Shravan Deb",
    description:
      "Collaborative analytics platform that turns raw data into actionable insights.",
    images: [
      {
        url: "/work/prism/opengraph-image.svg",
        width: 1200,
        height: 630,
        alt: "Prism — Collaborative Analytics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prism — Shravan Deb",
    images: ["/work/prism/opengraph-image.svg"],
  },
};

export default function PrismPage() {
  return (
    <>
      <NoiseOverlay />
      <ScrollProgress />
      <Nav />

      <main className="pt-24 md:pt-32 pb-32 md:pb-48">
        <div className="mx-auto max-w-[720px] px-6">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-text-3 hover:text-text-1 transition-colors mb-16"
          >
            <span>←</span>
            <span>Back to Work</span>
          </Link>

          <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-text-4 block mb-6">
            Chapter 03
          </span>
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.0] tracking-[-0.03em] text-text-1 mb-8">
            Prism
          </h1>
          <p className="text-text-3 text-sm mb-12">
            Next.js · PostgreSQL · DuckDB · Tailwind CSS · Vercel
          </p>

          <div className="aspect-[16/9] bg-surface-2 mb-16">
            <div className="w-full h-full flex items-center justify-center text-text-4 font-mono text-sm uppercase tracking-widest">
              Prism Screenshot
            </div>
          </div>

          <div className="space-y-8 text-text-2 text-base leading-[1.7]">
            <div>
              <h3 className="text-lg font-medium text-text-1 mb-3">Overview</h3>
              <p>
                Prism is a collaborative analytics platform designed for teams
                that need real-time dashboards without the complexity of
                traditional BI tools. It connects to any data source and
                provides instant, shareable insights through a clean, fast
                interface.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-text-1 mb-3">Challenge</h3>
              <p>
                Most analytics tools force a tradeoff: either you get powerful
                but complex tools (Tableau, Looker) or simple but limited ones
                (Google Analytics). Teams needed something that could handle
                real SQL queries with sub-second response times while being
                accessible to non-technical stakeholders.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-text-1 mb-3">Solution</h3>
              <p>
                Built a DuckDB-powered query engine that runs analytics directly
                in the browser for small datasets, with automatic fallback to
                server-side execution for large ones. The collaborative layer
                uses CRDTs for real-time cursor sharing and annotation, making
                it possible for teams to explore data together without stepping
                on each other&apos;s queries.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-text-1 mb-3">Impact</h3>
              <p>
                Used by 12 teams across 3 organizations. Average query response
                time under 800ms for 95th percentile. Reduced time from question
                to insight from hours to seconds for non-technical users.
              </p>
            </div>
          </div>

          <div className="mt-16 pt-16 border-t border-border">
            <div className="flex items-center gap-6 mb-8">
              <Link
                href="#"
                className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-text-3 hover:text-text-1 transition-colors"
              >
                Live Demo →
              </Link>
              <Link
                href="#"
                className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-text-3 hover:text-text-1 transition-colors"
              >
                Source Code →
              </Link>
            </div>
            <div>
              <Link
                href="/work/kiran-ai"
                className="group inline-flex items-center gap-2 text-sm text-text-3 hover:text-text-1 transition-colors"
              >
                <span>← Previous: Kiran AI</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
