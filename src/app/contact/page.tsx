import type { Metadata } from "next";
import NoiseOverlay from "@/components/noise-overlay";
import ScrollProgress from "@/components/scroll-progress";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Shravan Deb.",
};

export default function ContactPage() {
  return (
    <>
      <NoiseOverlay />
      <ScrollProgress />
      <Nav />

      <main className="pt-32 pb-48">
        <div className="mx-auto max-w-[720px] px-6">
          <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-text-4 block mb-6">
            Contact
          </span>
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.0] tracking-[-0.03em] text-text-1 mb-8">
            Get in touch
          </h1>
          <p className="text-text-2 text-base leading-relaxed mb-16 max-w-[480px]">
            I&apos;m always interested in hearing about new projects,
            collaborations, or opportunities to build something meaningful.
            Drop me a line and I&apos;ll get back to you.
          </p>

          <div className="space-y-12">
            <div>
              <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-text-4 block mb-3">
                Email
              </span>
              <a
                href="mailto:hello@shravandeb.com"
                className="text-2xl md:text-3xl font-medium tracking-[-0.02em] text-text-1 hover:text-text-3 transition-colors"
              >
                hello@shravandeb.com
              </a>
            </div>

            <div className="py-12 border-t border-border">
              <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-text-4 block mb-6">
                Elsewhere
              </span>
              <div className="space-y-4">
                {[
                  {
                    label: "GitHub",
                    href: "https://github.com/shravan20",
                    handle: "@shravan20",
                  },
                  {
                    label: "LinkedIn",
                    href: "https://linkedin.com/in/shravandeb",
                    handle: "/in/shravandeb",
                  },
                  {
                    label: "X",
                    href: "https://x.com/shravandeb",
                    handle: "@shravandeb",
                  },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-3 border-b border-border group"
                  >
                    <span className="text-text-2 group-hover:text-text-1 transition-colors">
                      {link.label}
                    </span>
                    <span className="text-text-4 text-sm">
                      {link.handle}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
