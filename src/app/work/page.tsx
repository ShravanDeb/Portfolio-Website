import type { Metadata } from "next";
import NoiseOverlay from "@/components/noise-overlay";
import ScrollProgress from "@/components/scroll-progress";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import BackButton from "@/components/back-button";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects and case studies.",
};

const projects = [
  {
    number: "01",
    title: "DevMon",
    description: "Your GitHub, reimagined. A collectible credential scored from real engineering activity.",
    tags: ["Next.js", "TypeScript", "Supabase", "Redis"],
    href: "/work/devmon",
    imageAlt: "DevMon",
  },
  {
    number: "02",
    title: "Hive",
    description: "Join the Hive. Build Together. Campus collaboration that actually ships.",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Auth.js"],
    href: "/work/hive",
    imageAlt: "Hive",
  },
  {
    number: "03",
    title: "RunMe",
    description: "Still building. Check back soon.",
    tags: ["Coming Soon"],
    href: "#",
    imageAlt: "RunMe",
  },
];

export default function WorkPage() {
  return (
    <>
      <NoiseOverlay />
      <ScrollProgress />
      <Nav />

      <main className="pt-24 md:pt-32 pb-32 md:pb-48">
        <div className="mx-auto max-w-[1100px] px-6">
          <BackButton />
          <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-text-4 block mb-6">
            Work
          </span>
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.0] tracking-[-0.03em] text-text-1 mb-16 md:mb-24">
            Selected projects
          </h1>

          <div className="space-y-0">
            {projects.map((project) => (
              project.href === "#" ? (
                <div
                  key={project.number}
                  className="block py-8 md:py-12 border-b border-border opacity-60"
                >
                  <div className="grid grid-cols-[40px_1fr] md:grid-cols-[80px_1fr_200px] gap-4 md:gap-8 items-start">
                    <span className="font-mono text-text-4 text-sm">
                      {project.number}
                    </span>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em] text-text-1 mb-2">
                        {project.title}
                      </h2>
                      <p className="text-text-3 text-sm">
                        {project.description}
                      </p>
                    </div>
                    <div className="hidden md:block text-right">
                      <p className="text-text-4 text-sm mb-2">
                        {project.tags.join(" · ")}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={project.number}
                  href={project.href}
                  className="group block py-8 md:py-12 border-b border-border active:opacity-60 transition-opacity"
                >
                  <div className="grid grid-cols-[40px_1fr] md:grid-cols-[80px_1fr_200px] gap-4 md:gap-8 items-start">
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
                    <div className="hidden md:block text-right">
                      <p className="text-text-4 text-sm mb-2">
                        {project.tags.join(" · ")}
                      </p>
                      <span className="text-text-3 text-sm group-hover:text-text-1 transition-colors inline-flex items-center gap-2">
                        View <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                    </div>
                  </div>
                </a>
              )
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
