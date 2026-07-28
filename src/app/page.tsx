import NoiseOverlay from "@/components/noise-overlay";
import ScrollProgress from "@/components/scroll-progress";
import Nav from "@/components/nav";
import Hero from "@/components/sections/hero";
import ProjectChapter from "@/components/sections/project-chapter";
import SkillMarquee from "@/components/sections/skill-marquee";
import GlobeSection from "@/components/sections/globe-section";
import JourneyTimeline from "@/components/sections/journey-timeline";
import About from "@/components/sections/about";
import InvertedContact from "@/components/sections/contact";
import Footer from "@/components/footer";
import SceneDivider from "@/components/scene-divider";
import ScrollDepth from "@/components/scroll-depth";

const projects = [
  {
    number: "01",
    title: "DevMon",
    description:
      "A collectible credential card scored from your real GitHub activity. 15 metrics, 5 rarity tiers, cryptographically signed.",
    tags: ["Next.js", "TypeScript", "Supabase", "Redis", "Tailwind"],
    href: "/work/devmon",
    imageSrc: "",
    imageAlt: "DevMon live preview",
    layout: "image-left" as const,
    annotation: "[STATUS: LIVE // STACK: Next.js, TypeScript // SIG: HMAC-SHA-256]",
    iframeSrc: "https://dev-mon-omega.vercel.app",
  },
  {
    number: "02",
    title: "Kiran AI",
    description:
      "Intelligent virtual assistant powered by custom-trained language models. Features real-time voice interaction, context-aware responses, and multi-language support.",
    tags: ["PyTorch", "FastAPI", "WebSockets", "React", "Redis"],
    href: "/work/kiran-ai",
    imageSrc: "",
    imageAlt: "Kiran AI interface",
    layout: "image-right" as const,
    annotation: "[STATUS: PROD // LANG: Python, React // VERIF: OK]",
  },
  {
    number: "03",
    title: "Prism",
    description:
      "Collaborative analytics platform that turns raw data into actionable insights. Built for teams that need real-time dashboards without the complexity.",
    tags: ["Next.js", "PostgreSQL", "DuckDB", "Tailwind CSS", "Vercel"],
    href: "/work/prism",
    imageSrc: "",
    imageAlt: "Prism analytics view",
    layout: "full-width" as const,
    isFlagship: true,
    annotation: "[STATUS: PROD // LANG: TypeScript // VERIF: OK]",
  },
];

export default function Home() {
  return (
    <>
      <NoiseOverlay />
      <ScrollProgress />
      <Nav />

      <main>
        <Hero />

        <SceneDivider />

        <ScrollDepth>
          <section className="py-20 md:py-48 space-y-32 md:space-y-48">
            {projects.map((project) => (
              <ProjectChapter key={project.number} {...project} />
            ))}
          </section>
        </ScrollDepth>

        <SceneDivider />

        <ScrollDepth>
          <SkillMarquee />
        </ScrollDepth>

        <SceneDivider />

        <ScrollDepth>
          <GlobeSection />
        </ScrollDepth>

        <SceneDivider />

        <JourneyTimeline />

        <SceneDivider />

        <ScrollDepth>
          <About />
        </ScrollDepth>

        <SceneDivider height="30vh" />

        <InvertedContact />
      </main>

      <Footer />
    </>
  );
}
