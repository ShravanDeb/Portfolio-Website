import type { Metadata } from "next";
import NoiseOverlay from "@/components/noise-overlay";
import ScrollProgress from "@/components/scroll-progress";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import BackButton from "@/components/back-button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Computer Science student specializing in AI, building intelligent software.",
};

export default function AboutPage() {
  return (
    <>
      <NoiseOverlay />
      <ScrollProgress />
      <Nav />

      <main className="pt-32 pb-48">
        <div className="mx-auto max-w-[720px] px-6">
          <BackButton />
          <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-text-4 block mb-6">
            About
          </span>
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.0] tracking-[-0.03em] text-text-1 mb-16">
            Building Intelligent Software
          </h1>

          <div className="text-text-2 text-base leading-[1.7] space-y-6">
            <p>
              <span className="float-left text-[6rem] font-medium leading-[0.85] tracking-[-0.04em] text-text-1 mr-4 mt-2">
                I
              </span>
              &apos;m Shravan, a Computer Science student specializing in
              Artificial Intelligence with a passion for building software
              that solves real problems. My interests span artificial
              intelligence, backend engineering, full-stack development, and
              modern web technologies. I enjoy transforming ideas into
              products that are reliable, intuitive, and built with users in
              mind.
            </p>
            <p>
              My journey in software development has been driven by curiosity
              and continuous learning. Through academic projects, hackathons,
              and personal initiatives, I have worked on AI-powered
              applications, web platforms, developer tools, and automation
              systems. Every project has helped me strengthen my understanding
              of software engineering, scalable architecture, and product
              development.
            </p>
            <p>
              I am particularly interested in the intersection of artificial
              intelligence and software engineering. I enjoy exploring how
              machine learning can be integrated into real-world applications
              while maintaining performance, reliability, and a great user
              experience. Alongside AI, I continue learning about system
              design, distributed systems, cloud technologies, and modern
              development practices.
            </p>
          </div>

          {/* Pull quote */}
          <div className="my-16 border-l border-border-hi pl-8">
            <p className="text-[2.5rem] font-[200] leading-[1.2] tracking-[-0.02em] text-text-1">
              Great software solves real problems with simplicity.
              It is reliable, intuitive, and built to last.
            </p>
          </div>

          <div className="text-text-2 text-base leading-[1.7] space-y-6">
            <p>
              Outside of development, I spend time reading about software
              architecture, experimenting with emerging AI models and
              frameworks, contributing to open-source projects, and studying
              the engineering decisions behind products that people use every
              day.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-border">
            <div>
              <span className="block text-2xl font-medium text-text-1 tracking-tight">
                8+
              </span>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-text-4">
                Total Systems Built
              </span>
            </div>
            <div>
              <span className="block text-2xl font-medium text-text-1 tracking-tight">
                3
              </span>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-text-4">
                Prod Deployments
              </span>
            </div>
            <div>
              <span className="block text-2xl font-medium text-text-1 tracking-tight">
                23
              </span>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-text-4">
                Technologies Used
              </span>
            </div>
            <div>
              <span className="block text-2xl font-medium text-text-1 tracking-tight">
                50K+
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
