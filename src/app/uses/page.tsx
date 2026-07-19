import type { Metadata } from "next";
import NoiseOverlay from "@/components/noise-overlay";
import ScrollProgress from "@/components/scroll-progress";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Uses",
  description: "Software, hardware, and tools I use daily.",
};

const sections = [
  {
    title: "Editor",
    items: [
      { name: "VS Code", detail: "Primary editor with Vim keybindings" },
      { name: "Cursor", detail: "AI-assisted coding when needed" },
      { name: "Warp", detail: "Terminal with modern UX" },
    ],
  },
  {
    title: "Development",
    items: [
      { name: "Git", detail: "Version control, obviously" },
      { name: "GitHub", detail: "Code hosting and CI/CD" },
      { name: "Docker", detail: "Containerized development environments" },
      { name: "Postman", detail: "API testing and documentation" },
    ],
  },
  {
    title: "AI / ML",
    items: [
      { name: "PyTorch", detail: "Primary ML framework" },
      { name: "Jupyter", detail: "Exploratory analysis and prototyping" },
      { name: "Weights & Biases", detail: "Experiment tracking" },
      { name: "Hugging Face", detail: "Model hub and transformers" },
    ],
  },
  {
    title: "Productivity",
    items: [
      { name: "Notion", detail: "Notes, documentation, project management" },
      { name: "Linear", detail: "Issue tracking and project planning" },
      { name: "Figma", detail: "Design and prototyping" },
    ],
  },
  {
    title: "Hardware",
    items: [
      { name: "MacBook Pro M3", detail: "Primary development machine" },
      { name: "LG UltraFine 5K", detail: "External display" },
      { name: "Keychron Q1", detail: "Mechanical keyboard" },
      { name: "Logitech MX Master 3S", detail: "Mouse" },
    ],
  },
];

export default function UsesPage() {
  return (
    <>
      <NoiseOverlay />
      <ScrollProgress />
      <Nav />

      <main className="pt-32 pb-48">
        <div className="mx-auto max-w-[720px] px-6">
          <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-text-4 block mb-6">
            Uses
          </span>
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.0] tracking-[-0.03em] text-text-1 mb-8">
            Software & hardware
          </h1>
          <p className="text-text-2 text-base leading-relaxed mb-24 max-w-[480px]">
            A curated list of tools and gear I use daily. Inspired by{' '}
            <a
              href="https://uses.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-1 hover:text-text-3 transition-colors underline underline-offset-4 decoration-border-hi"
            >
              uses.tech
            </a>
            .
          </p>

          <div className="space-y-16">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-text-4 mb-6">
                  {section.title}
                </h2>
                <div className="space-y-0">
                  {section.items.map((item) => (
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
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
