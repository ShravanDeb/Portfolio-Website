"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import BlurText from "@/components/ui/blur-text";
import { NumberTicker } from "@/components/ui/number-ticker";
import SpotlightCard from "@/components/ui/spotlight-card";
import LogoLoop from "@/components/ui/logo-loop";
import {
  SiPython,
  SiTypescript,
  SiPytorch,
  SiTensorflow,
  SiNextdotjs,
  SiReact,
  SiNodedotjs,
  SiFastapi,
  SiDocker,
  SiKubernetes,
  SiPostgresql,
  SiRedis,
  SiGraphql,
  SiTailwindcss,
  SiGit,
  SiGithubactions,
  SiLangchain,
  SiMongodb,
  SiSocketdotio,
  SiHuggingface,
} from "react-icons/si";
import { TbCloud, TbDatabase } from "react-icons/tb";

const allLogos = [
  { node: <SiPython />, title: "Python" },
  { node: <SiTypescript />, title: "TypeScript" },
  { node: <SiPytorch />, title: "PyTorch" },
  { node: <SiTensorflow />, title: "TensorFlow" },
  { node: <SiNextdotjs />, title: "Next.js" },
  { node: <SiReact />, title: "React" },
  { node: <SiNodedotjs />, title: "Node.js" },
  { node: <SiFastapi />, title: "FastAPI" },
  { node: <SiDocker />, title: "Docker" },
  { node: <SiKubernetes />, title: "Kubernetes" },
  { node: <TbCloud />, title: "AWS" },
  { node: <SiPostgresql />, title: "PostgreSQL" },
  { node: <SiRedis />, title: "Redis" },
  { node: <SiGraphql />, title: "GraphQL" },
  { node: <SiTailwindcss />, title: "Tailwind CSS" },
  { node: <SiGit />, title: "Git" },
  { node: <SiGithubactions />, title: "CI/CD" },
  { node: <TbDatabase />, title: "Pinecone" },
  { node: <SiLangchain />, title: "LangChain" },
  { node: <SiMongodb />, title: "MongoDB" },
  { node: <SiSocketdotio />, title: "WebSockets" },
  { node: <SiHuggingface />, title: "Hugging Face" },
];

const capabilities = [
  {
    colSpan: "lg:col-span-7",
    tag: "01 // COGNITIVE SYSTEMS",
    label: "ML & Artificial Intelligence",
    description:
      "Training, fine-tuning, and deploying models at scale. I bridge the gap between heavy AI research and production-ready, low-latency inference endpoints.",
    coreStack: [
      { node: <SiPytorch />, title: "PyTorch" },
      { node: <SiTensorflow />, title: "TensorFlow" },
      { node: <SiLangchain />, title: "LangChain" },
      { node: <SiHuggingface />, title: "Hugging Face" },
    ],
    ecosystem: ["Python", "OpenAI API", "RAG Pipelines", "NumPy", "Pandas", "scikit-learn"],
  },
  {
    colSpan: "lg:col-span-5",
    tag: "02 // INFRASTRUCTURE & DEVOPS",
    label: "Cloud Architecture",
    description:
      "Cloud-native systems, containerization, and automated CI/CD. Building distributed, self-healing topologies designed for zero-downtime resilience.",
    coreStack: [
      { node: <SiDocker />, title: "Docker" },
      { node: <SiKubernetes />, title: "Kubernetes" },
      { node: <TbCloud />, title: "AWS" },
      { node: <SiGithubactions />, title: "GitHub Actions" },
    ],
    ecosystem: ["GCP", "Terraform", "Distributed Systems", "Linux", "Grafana"],
  },
  {
    colSpan: "lg:col-span-5",
    tag: "03 // DATA & PERSISTENCE",
    label: "Data Pipelines & Vectors",
    description:
      "Pipelines, real-time processing, and analytics. Engineering high-throughput data streams and vector embeddings for semantic similarity search.",
    coreStack: [
      { node: <SiPostgresql />, title: "PostgreSQL" },
      { node: <SiRedis />, title: "Redis" },
      { node: <TbDatabase />, title: "Pinecone" },
      { node: <SiMongodb />, title: "MongoDB" },
    ],
    ecosystem: ["Weaviate", "ChromaDB", "SQL", "Data Pipelines", "Prisma"],
  },
  {
    colSpan: "lg:col-span-7",
    tag: "04 // PRODUCT ENGINEERING",
    label: "Full-Stack Development",
    description:
      "End-to-end product development with modern frameworks. Crafting intuitive, high-concurrency web applications using type-safe enterprise runtimes.",
    coreStack: [
      { node: <SiNextdotjs />, title: "Next.js" },
      { node: <SiReact />, title: "React" },
      { node: <SiTypescript />, title: "TypeScript" },
      { node: <SiFastapi />, title: "FastAPI" },
      { node: <SiNodedotjs />, title: "Node.js" },
    ],
    ecosystem: ["Tailwind CSS", "GraphQL", "WebSockets", "Express", "Git"],
  },
];

export default function SkillMarquee() {
  return (
    <section className="py-28 md:py-40 border-t border-border overflow-hidden relative bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,0,0,0.02),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.03),transparent)]">
      <div className="mx-auto max-w-[1100px] px-6 mb-10 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-text-1 opacity-40" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-text-1" />
              </span>
              <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-text-3">
                Engineering Craft
              </span>
            </div>
            <BlurText
              text="How I Build."
              className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.03em] text-text-1"
              delay={100}
              direction="top"
              stepDuration={0.4}
            />
          </div>
          <p className="text-text-3 text-sm md:text-base max-w-[420px] leading-relaxed">
            I combine deep technical foundations in machine learning with modern distributed systems architecture to ship resilient, user-centric software.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1100px] px-6 mb-12 relative z-10">
        <div className="flex flex-wrap items-center gap-8 md:gap-16 border-t border-b border-border py-6">
          <div className="flex items-baseline gap-2">
            <NumberTicker
              value={23}
              className="text-2xl md:text-3xl font-medium tracking-tight text-text-1 tabular-nums"
            />
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-text-4">
              Technologies
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <NumberTicker
              value={4}
              className="text-2xl md:text-3xl font-medium tracking-tight text-text-1 tabular-nums"
            />
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-text-4">
              Domains
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <NumberTicker
              value={3}
              className="text-2xl md:text-3xl font-medium tracking-tight text-text-1 tabular-nums"
            />
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-text-4">
              Prod Deployments
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1100px] px-6 mb-16 relative z-10">
        <LogoLoop
          logos={allLogos}
          speed={35}
          direction="left"
          logoHeight={22}
          gap={64}
          hoverSpeed={10}
          scaleOnHover
          className="text-text-4 hover:text-text-2 transition-colors duration-500 opacity-75 hover:opacity-100"
          ariaLabel="Technology stack"
        />
      </div>

      <div className="mx-auto max-w-[1100px] px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
          {capabilities.map((cat, idx) => (
            <BlurFade
              key={cat.label}
              delay={0.1 + idx * 0.1}
              inView
              direction="up"
              offset={16}
              blur="8px"
              duration={0.6}
              className={`${cat.colSpan} flex`}
            >
              <SpotlightCard
                spotlightColor="rgba(120, 120, 120, 0.15)"
                className="w-full flex flex-col justify-between p-8 md:p-10 rounded-[28px] border border-black/[0.08] dark:border-white/[0.08] bg-zinc-50/80 dark:bg-zinc-950/60 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] hover:border-black/[0.18] dark:hover:border-white/[0.18] transition-[border-color,box-shadow] duration-300 [cubic-bezier(0.23,1,0.32,1)]"
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-4 mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.015]">
                      <span className="h-1 w-1 rounded-full bg-text-4" />
                      <span className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.15em] text-text-4">
                        {cat.tag}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-medium text-text-1 tracking-tight mb-3">
                    {cat.label}
                  </h3>

                  <div className="mb-8 max-w-[500px]">
                    <BlurText
                      text={cat.description}
                      className="text-sm text-text-3 leading-relaxed"
                      delay={60}
                      direction="top"
                      stepDuration={0.3}
                      animateBy="words"
                    />
                  </div>
                </div>

                <div className="space-y-6 pt-6 border-t border-black/[0.06] dark:border-white/[0.06] relative z-10">
                  <div>
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-text-4 block mb-3">
                      Daily Drivers
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {cat.coreStack.map((item) => (
                        <div
                          key={item.title}
                          tabIndex={0}
                          className="group/pill relative inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.08] text-text-3 hover:text-text-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text-1 transition-[background-color,border-color,box-shadow,transform,color] duration-300 [cubic-bezier(0.23,1,0.32,1)] shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-default"
                        >
                          <span className="text-base text-text-2 group-hover/pill:text-text-1 group-hover/pill:scale-110 transition-[transform,color] duration-300 [cubic-bezier(0.23,1,0.32,1)]">
                            {item.node}
                          </span>
                          <span className="font-mono text-[0.75rem] tracking-tight font-medium text-text-2 group-hover/pill:text-text-1">
                            {item.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-text-4 block mb-2.5">
                      Supporting Ecosystem
                    </span>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {cat.ecosystem.map((tool) => (
                        <span
                          key={tool}
                          className="font-mono text-[0.7rem] px-2.5 py-1 rounded-md bg-black/[0.03] dark:bg-white/[0.015] border border-black/[0.05] dark:border-white/[0.04] text-text-4"
                        >
                          +{tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
