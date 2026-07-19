import type { Metadata } from "next";
import Link from "next/link";
import NoiseOverlay from "@/components/noise-overlay";
import ScrollProgress from "@/components/scroll-progress";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Kiran AI — Intelligent Virtual Assistant",
  description:
    "Intelligent virtual assistant powered by custom-trained language models.",
  openGraph: {
    title: "Kiran AI — Shravan Deb",
    description:
      "Intelligent virtual assistant powered by custom-trained language models.",
    images: [
      {
        url: "/work/kiran-ai/opengraph-image.svg",
        width: 1200,
        height: 630,
        alt: "Kiran AI — Intelligent Virtual Assistant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiran AI — Shravan Deb",
    images: ["/work/kiran-ai/opengraph-image.svg"],
  },
};

export default function KiranAIPage() {
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
            Chapter 02
          </span>
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.0] tracking-[-0.03em] text-text-1 mb-8">
            Kiran AI
          </h1>
          <p className="text-text-3 text-sm mb-12">
            PyTorch · FastAPI · WebSockets · React · Redis
          </p>

          <div className="aspect-[16/9] bg-surface-2 mb-16">
            <div className="w-full h-full flex items-center justify-center text-text-4 font-mono text-sm uppercase tracking-widest">
              Kiran AI Screenshot
            </div>
          </div>

          <div className="space-y-8 text-text-2 text-base leading-[1.7]">
            <div>
              <h3 className="text-lg font-medium text-text-1 mb-3">Overview</h3>
              <p>
                Kiran AI is an intelligent virtual assistant built on
                custom-trained language models. Unlike generic AI assistants,
                Kiran is designed for deep context awareness — it understands
                user preferences, remembers past interactions, and provides
                responses that feel genuinely helpful rather than generic.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-text-1 mb-3">Challenge</h3>
              <p>
                Building an AI that actually feels intelligent requires solving
                multiple hard problems simultaneously: efficient inference at
                scale, real-time voice interaction, context management across
                sessions, and multi-language support — all while keeping
                response latency under 200ms.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-text-1 mb-3">Solution</h3>
              <p>
                Designed a custom transformer architecture optimized for
                conversational context. Implemented a Redis-backed session
                management system with vector embeddings for long-term memory.
                The voice pipeline uses WebRTC for real-time audio streaming
                with custom VAD (Voice Activity Detection) tuned for natural
                conversation flow.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-text-1 mb-3">Impact</h3>
              <p>
                Processing 10K+ conversations daily with sub-200ms response
                times. Achieved 87% user satisfaction rating in blind tests
                against leading commercial assistants. Open-sourced the core
                inference engine, accumulating 200+ GitHub stars.
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
            <div className="flex items-center justify-between">
              <Link
                href="/work/devmon"
                className="group inline-flex items-center gap-2 text-sm text-text-3 hover:text-text-1 transition-colors"
              >
                <span>← Previous: DevMon</span>
              </Link>
              <Link
                href="/work/prism"
                className="group inline-flex items-center gap-2 text-sm text-text-2 hover:text-text-1 transition-colors"
              >
                <span>Next: Prism</span>
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
