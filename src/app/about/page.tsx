import type { Metadata } from "next";
import NoiseOverlay from "@/components/noise-overlay";
import ScrollProgress from "@/components/scroll-progress";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "AI/ML engineer and product builder focused on intelligent systems.",
};

export default function AboutPage() {
  return (
    <>
      <NoiseOverlay />
      <ScrollProgress />
      <Nav />

      <main className="pt-32 pb-48">
        <div className="mx-auto max-w-[720px] px-6">
          <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-text-4 block mb-6">
            About
          </span>
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.0] tracking-[-0.03em] text-text-1 mb-16">
            Building at the intersection of AI and infrastructure
          </h1>

          <div className="text-text-2 text-base leading-[1.7] space-y-6">
            <p>
              <span className="float-left text-[6rem] font-medium leading-[0.85] tracking-[-0.04em] text-text-1 mr-4 mt-2">
                I
              </span>
              &apos;m Shravan Deb — a B.Tech Computer Science student
              specializing in AI/ML at SRM Institute of Science and Technology,
              Chennai. I build production systems that sit at the intersection of
              machine learning, real-time infrastructure, and developer
              experience.
            </p>
            <p>
              Over the past four years, I&apos;ve shipped production systems that
              handle thousands of concurrent users, trained models deployed across
              distributed networks, and built tools that developers actually want
              to use. My work spans from low-level systems programming in C/C++
              to training transformer architectures in PyTorch to building
              performant web applications with Next.js.
            </p>
            <p>
              Currently, I&apos;m exploring the space where AI meets
              infrastructure — how we build systems that are not just
              intelligent, but resilient, observable, and honest about their
              limitations. I believe the best technology feels invisible; it
              solves real problems without demanding attention.
            </p>
          </div>

          {/* Pull quote */}
          <div className="my-16 border-l border-border-hi pl-8">
            <p className="text-[2.5rem] font-[200] leading-[1.2] tracking-[-0.02em] text-text-1">
              The best systems are the ones you never have to think about.
            </p>
          </div>

          <div className="text-text-2 text-base leading-[1.7] space-y-6">
            <p>
              When I&apos;m not writing code, you&apos;ll find me reading about
              systems design, experimenting with new ML architectures, or diving
              deep into the internals of tools I use daily. I believe in building
              in public, sharing what I learn, and contributing to the open
              source ecosystem.
            </p>
            <p>
              Previously, I&apos;ve worked on building developer tools, contributing
              to open source projects, and exploring the frontiers of what&apos;s
              possible with modern AI systems. Every project teaches me something
              new about building software that matters.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-border">
            <div>
              <span className="block text-2xl font-medium text-text-1 tracking-tight">
                4+
              </span>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-text-4">
                Years
              </span>
            </div>
            <div>
              <span className="block text-2xl font-medium text-text-1 tracking-tight">
                15+
              </span>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-text-4">
                Projects
              </span>
            </div>
            <div>
              <span className="block text-2xl font-medium text-text-1 tracking-tight">
                500+
              </span>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-text-4">
                GitHub Stars
              </span>
            </div>
            <div>
              <span className="block text-2xl font-medium text-text-1 tracking-tight">
                100K+
              </span>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-text-4">
                Lines of Code
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
