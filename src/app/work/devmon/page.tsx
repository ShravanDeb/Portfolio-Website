import type { Metadata } from "next";
import Link from "next/link";
import NoiseOverlay from "@/components/noise-overlay";
import ScrollProgress from "@/components/scroll-progress";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "DevMon - Real-time System Monitoring",
  description:
    "Real-time system monitoring and alerting platform built for modern infrastructure.",
  openGraph: {
    title: "DevMon - Shravan Deb",
    description:
      "Real-time system monitoring and alerting platform built for modern infrastructure.",
    images: [
      {
        url: "/work/devmon/opengraph-image.svg",
        width: 1200,
        height: 630,
        alt: "DevMon - Real-time System Monitoring",
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
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-text-3 hover:text-text-1 transition-colors mb-16"
          >
            <span>←</span>
            <span>Back to Work</span>
          </Link>

          <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-text-4 block mb-6">
            Chapter 01
          </span>
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.0] tracking-[-0.03em] text-text-1 mb-8">
            DevMon
          </h1>
          <p className="text-text-3 text-sm mb-12">
            Python · Go · Prometheus · Grafana · Kubernetes
          </p>

          <div className="aspect-[16/9] bg-surface-2 mb-16">
            <div className="w-full h-full flex items-center justify-center text-text-4 font-mono text-sm uppercase tracking-widest">
              DevMon Screenshot
            </div>
          </div>

          <div className="space-y-8 text-text-2 text-base leading-[1.7]">
            <div>
              <h3 className="text-lg font-medium text-text-1 mb-3">Overview</h3>
              <p>
                DevMon is a real-time system monitoring and alerting platform
                designed for modern cloud infrastructure. It processes thousands
                of metrics per second, providing instant visibility into system
                health across distributed environments.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-text-1 mb-3">Challenge</h3>
              <p>
                Existing monitoring solutions were either too expensive for
                startups or too complex to set up. Teams needed something that
                could be deployed in minutes, not weeks - and actually provided
                actionable insights, not just dashboards full of numbers.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-text-1 mb-3">Solution</h3>
              <p>
                Built a lightweight agent-based system that automatically
                discovers services, collects metrics, and provides intelligent
                alerting. The backend is written in Go for performance, with a
                Python-based ML pipeline that learns normal behavior patterns and
                detects anomalies before they become incidents.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-text-1 mb-3">Impact</h3>
              <p>
                Deployed across 50+ production environments. Reduced mean time
                to detection (MTTD) by 73% and mean time to resolution (MTTR)
                by 45% compared to previous monitoring setups.
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
