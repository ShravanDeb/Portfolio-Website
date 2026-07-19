import SmoothScrollProvider from "@/components/smooth-scroll-provider";
import NoiseOverlay from "@/components/noise-overlay";
import ScrollProgress from "@/components/scroll-progress";
import Nav from "@/components/nav";
import Hero from "@/components/sections/hero";
import ProjectChapter from "@/components/sections/project-chapter";
import SkillMarquee from "@/components/sections/skill-marquee";
import GlobeSection from "@/components/sections/globe-section";
import About from "@/components/sections/about";
import InvertedContact from "@/components/sections/contact";
import Footer from "@/components/footer";

const projects = [
  {
    number: "01",
    title: "DevMon",
    description:
      "Real-time system monitoring and alerting platform. Processes thousands of metrics per second, providing instant visibility into infrastructure health.",
    tags: ["Python", "Go", "Prometheus", "Grafana", "Kubernetes"],
    href: "/work/devmon",
    imageSrc: "/images/devmon.jpg",
    imageAlt: "DevMon dashboard",
    layout: "image-left" as const,
    annotation: "[STATUS: PROD // LANG: Python, Go // VERIF: OK]",
  },
  {
    number: "02",
    title: "Kiran AI",
    description:
      "Intelligent virtual assistant powered by custom-trained language models. Features real-time voice interaction, context-aware responses, and multi-language support.",
    tags: ["PyTorch", "FastAPI", "WebSockets", "React", "Redis"],
    href: "/work/kiran-ai",
    imageSrc: "/images/kiran.jpg",
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
    imageSrc: "/images/prism.jpg",
    imageAlt: "Prism analytics view",
    layout: "full-width" as const,
    isFlagship: true,
    annotation: "[STATUS: PROD // LANG: TypeScript // VERIF: OK]",
  },
];

export default function Home() {
  return (
    <SmoothScrollProvider>
      <NoiseOverlay />
      <ScrollProgress />
      <Nav />

      <main>
        <Hero />

        <section className="py-32 md:py-48 space-y-32 md:space-y-48">
          {projects.map((project) => (
            <ProjectChapter key={project.number} {...project} />
          ))}
        </section>

        <SkillMarquee />
        <GlobeSection />
        <About />
        <InvertedContact />
      </main>

      <Footer />
    </SmoothScrollProvider>
  );
}
