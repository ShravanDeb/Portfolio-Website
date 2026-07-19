import type { Metadata } from "next";
import NoiseOverlay from "@/components/noise-overlay";
import ScrollProgress from "@/components/scroll-progress";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on AI, engineering, and building systems.",
  alternates: {
    types: {
      "application/rss+xml": [
        {
          title: "Shravan Deb — Blog",
          url: "/blog/rss",
        },
      ],
    },
  },
};

export default function BlogPage() {
  return (
    <>
      <NoiseOverlay />
      <ScrollProgress />
      <Nav />

      <main className="pt-32 pb-48">
        <div className="mx-auto max-w-[720px] px-6">
          <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-text-4 block mb-6">
            Blog
          </span>
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.0] tracking-[-0.03em] text-text-1 mb-8">
            Writing
          </h1>
          <p className="text-text-2 text-base leading-relaxed mb-24 max-w-[480px]">
            Thoughts on AI, engineering, and the process of building systems
            that matter. Coming soon.
          </p>

          <div className="border-t border-border pt-12">
            <p className="text-text-4 text-sm">
              No articles published yet. Check back soon.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
