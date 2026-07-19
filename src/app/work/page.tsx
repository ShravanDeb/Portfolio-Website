import type { Metadata } from "next";
import NoiseOverlay from "@/components/noise-overlay";
import ScrollProgress from "@/components/scroll-progress";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects and case studies.",
};

const projects = [
  {
    number: "01",
    title: "DevMon",
    description: "Real-time system monitoring and alerting platform.",
    tags: ["Python", "Go", "Prometheus", "Grafana"],
    href: "/work/devmon",
    imageAlt: "DevMon",
  },
  {
    number: "02",
    title: "Kiran AI",
    description: "Intelligent virtual assistant with custom LLMs.",
    tags: ["PyTorch", "FastAPI", "WebSockets"],
    href: "/work/kiran-ai",
    imageAlt: "Kiran AI",
  },
  {
    number: "03",
    title: "Prism",
    description: "Collaborative analytics platform for data teams.",
    tags: ["Next.js", "PostgreSQL", "DuckDB"],
    href: "/work/prism",
    imageAlt: "Prism",
  },
];

export default function WorkPage() {
  return (
    <>
      <NoiseOverlay />
      <ScrollProgress />
      <Nav />

      <main className="pt-32 pb-48">
        <div className="mx-auto max-w-[1100px] px-6">
          <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-text-4 block mb-6">
            Work
          </span>
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.0] tracking-[-0.03em] text-text-1 mb-24">
            Selected projects
          </h1>

          <div className="space-y-0">
            {projects.map((project, index) => (
              <a
                key={project.number}
                href={project.href}
                className="group block py-12 border-b border-border"
              >
                <div className="grid grid-cols-1 md:grid-cols-[80px_1fr_200px] gap-4 md:gap-8 items-start">
                  <span className="font-mono text-text-4 text-sm">
                    {project.number}
                  </span>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em] text-text-1 mb-2 group-hover:text-text-2 transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-text-3 text-sm">
                      {project.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-text-4 text-sm mb-2">
                      {project.tags.join(" · ")}
                    </p>
                    <span className="text-text-3 text-sm group-hover:text-text-1 transition-colors inline-flex items-center gap-2">
                      View <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
