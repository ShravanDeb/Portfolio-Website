import type { Metadata } from "next";
import NoiseOverlay from "@/components/noise-overlay";
import ScrollProgress from "@/components/scroll-progress";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Now",
  description: "What I'm currently working on.",
};

export default function NowPage() {
  return (
    <>
      <NoiseOverlay />
      <ScrollProgress />
      <Nav />

      <main className="pt-32 pb-48">
        <div className="mx-auto max-w-[720px] px-6">
          <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-text-4 block mb-6">
            Now
          </span>
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.0] tracking-[-0.03em] text-text-1 mb-8">
            What I&apos;m doing now
          </h1>
          <p className="text-text-4 text-sm mb-16">
            Last updated July 2025
          </p>

          <div className="text-text-2 text-base leading-[1.7] space-y-6">
            <p>
              Focused on building production AI systems - specifically working on
              improving RAG pipeline performance and exploring multi-agent
              architectures for complex task decomposition.
            </p>
            <p>
              Finishing up my B.Tech in Computer Science (AI specialization) at
              SRM IST, Chennai. Coursework is wrapping up; thesis work is
              centered on efficient inference for real-time AI applications.
            </p>
            <p>
              Contributing to open source projects in the ML infrastructure
              space. Recently submitted a PR to improve caching strategies in a
              popular vector database library.
            </p>
            <p>
              Reading: &quot;Designing Data-Intensive Applications&quot; by Martin
              Kleppmann for the third time. Every re-read reveals something new.
            </p>
          </div>

          <div className="mt-16 py-12 border-t border-border">
            <p className="text-text-4 text-sm">
              This page is inspired by{' '}
              <a
                href="https://sive.rs/now"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-2 hover:text-text-1 transition-colors underline underline-offset-4 decoration-border-hi"
              >
                Derek Sivers&apos; /now page
              </a>{' '}
              movement.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
