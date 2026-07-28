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
import HeroSlideshow from "@/components/hero-slideshow";

const projects = [
  {
    number: "01",
    title: "DevMon",
    description:
      "Your GitHub, reimagined. A collectible credential card scored from your real engineering activity.",
    tags: ["Next.js", "TypeScript", "Supabase", "Redis", "Tailwind"],
    href: "/work/devmon",
    imageSrc: "/work/devmon/hero2.png",
    imageAlt: "DevMon credential cards",
    layout: "image-left" as const,
    annotation: "[STATUS: LIVE // STACK: Next.js, TypeScript // SIG: HMAC-SHA-256]",
  },
  {
    number: "02",
    title: "Hive",
    description:
      "Join the Hive. Build Together. Campus collaboration that actually ships.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Auth.js"],
    href: "/work/hive",
    imageSrc: "/work/hive/hero.png",
    imageAlt: "Hive collaboration platform",
    layout: "image-right" as const,
    annotation: "[STATUS: LIVE // STACK: Next.js, Prisma // DEPLOY: Vercel]",
  },
];

const runmeImages = [
  { src: "/work/runme/hero.png", alt: "RunMe screenshot 1" },
  { src: "/work/runme/hero2.png", alt: "RunMe screenshot 2" },
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
            <ProjectChapter
              number="03"
              title="RunMe"
              description="Still building. Check back soon."
              tags={["Coming Soon"]}
              href="#"
              imageSrc=""
              imageAlt="RunMe"
              layout="full-width"
              isFlagship
              annotation="[STATUS: IN DEV // PROGRESS: BUILDING]"
              hideCta
              imageElement={
                <div className="relative overflow-hidden rounded-xl md:rounded-none border border-border/40 md:border-transparent bg-surface-2 shadow-2xl md:shadow-none">
                  <HeroSlideshow images={runmeImages} interval={5000} />
                </div>
              }
            />
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
