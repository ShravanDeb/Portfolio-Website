import type { Metadata } from "next";
import NoiseOverlay from "@/components/noise-overlay";
import ScrollProgress from "@/components/scroll-progress";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Colophon",
  description: "About this website.",
};

export default function ColophonPage() {
  return (
    <>
      <NoiseOverlay />
      <ScrollProgress />
      <Nav />

      <main className="pt-32 pb-48">
        <div className="mx-auto max-w-[720px] px-6">
          <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-text-4 block mb-6">
            Colophon
          </span>
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.0] tracking-[-0.03em] text-text-1 mb-16">
            About this site
          </h1>

          <div className="text-text-2 text-base leading-[1.7] space-y-6">
            <p>
              This portfolio is built with Next.js, Tailwind CSS, and GSAP. It
              uses Geist and Geist Mono for typography. The design follows a
              monochromatic editorial approach — no accent colors, no gradients,
              no decorative effects. Just type, layout, and motion.
            </p>
            <p>
              The film grain texture is achieved through an SVG noise filter
              applied as a fixed overlay. The blueprint grid lines in the hero
              are CSS repeating gradients at very low opacity. Both add tactile
              depth without breaking the monochrome constraint.
            </p>
          </div>

          <div className="mt-16 space-y-12">
            <div>
              <h2 className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-text-4 mb-6">
                Stack
              </h2>
              <div className="space-y-0">
                {[
                  { name: "Next.js", detail: "App Router, Turbopack" },
                  { name: "Tailwind CSS", detail: "Utility-first styling" },
                  { name: "GSAP", detail: "Scroll-triggered animations" },
                  { name: "Framer Motion", detail: "Scroll progress indicator" },
                  { name: "Geist", detail: "Primary typeface" },
                  { name: "Vercel", detail: "Deployment and hosting" },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="flex flex-col md:flex-row md:items-center gap-1 md:gap-8 py-4 border-b border-border"
                  >
                    <span className="text-text-1 text-sm font-medium min-w-[180px]">
                      {item.name}
                    </span>
                    <span className="text-text-3 text-sm">
                      {item.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-text-4 mb-6">
                Design Principles
              </h2>
              <div className="text-text-2 text-base leading-[1.7] space-y-4">
                <p>
                  Pure monochrome. Color lives only inside project media. The
                  interface itself uses black, charcoal, zinc, and white — nothing
                  else.
                </p>
                <p>
                  Editorial typography. Headlines at weight 500 with tight
                  tracking. Eyebrow labels in monospace uppercase. Drop caps on
                  long-form content.
                </p>
                <p>
                  Asymmetric layouts. Not centered 12-column grids. The content
                  breathes with deliberate whitespace and intentional imbalance.
                </p>
                <p>
                  Motion with purpose. Four animation types: text reveal,
                  parallax, sequential fade, and border transition. No
                  decorative effects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
