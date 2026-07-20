"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const skillCategories = [
  {
    category: "Languages",
    skills: "Python, TypeScript, C/C++, Java, SQL, Solidity, HTML/CSS",
  },
  {
    category: "ML / AI",
    skills:
      "PyTorch, TensorFlow, scikit-learn, NumPy, Pandas, Hugging Face, LangChain, OpenAI API",
  },
  {
    category: "Infrastructure",
    skills:
      "Docker, Kubernetes, AWS, GCP, Terraform, CI/CD, GitHub Actions",
  },
  {
    category: "Databases",
    skills: "PostgreSQL, MongoDB, Redis, Pinecone, Weaviate, ChromaDB",
  },
  {
    category: "Frameworks",
    skills: "Next.js, React, Node.js, FastAPI, Flask, Express, Tailwind CSS",
  },
  {
    category: "Tools",
    skills: "Git, VS Code, Figma, Notion, Linear, Grafana, Datadog",
  },
  {
    category: "Specialties",
    skills:
      "RAG Pipelines, LLM Fine-tuning, Real-time Systems, Distributed Computing, API Design",
  },
];

export default function SkillList() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let ctx: gsap.Context;
    let mm = gsap.matchMedia();

    document.fonts.ready.then(() => {
      ctx = gsap.context(() => {
        mm.add(
          {
            isReduced: "(prefers-reduced-motion: reduce)",
            isNormal: "(prefers-reduced-motion: no-preference)",
          },
          (context) => {
            const { isReduced } = context.conditions as { isReduced: boolean; isNormal: boolean };

            if (headingRef.current) {
              if (isReduced) {
                gsap.fromTo(headingRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });
              } else {
                const splitH = SplitText.create(headingRef.current, {
                  type: "lines,chars",
                  mask: "lines",
                });
                gsap.set(splitH.chars, { yPercent: 110 });
                gsap.to(splitH.chars, {
                  yPercent: 0,
                  duration: 0.5,
                  ease: "power4.out",
                  stagger: 0.02,
                  scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                  },
                });
              }
            }

            const rows = sectionRef.current?.querySelectorAll(".skill-row");
            if (rows) {
              gsap.fromTo(
                rows,
                { opacity: 0, x: isReduced ? 0 : -20 },
                {
                  opacity: 1,
                  x: 0,
                  duration: 0.5,
                  stagger: 0.06,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: rows[0],
                    start: "top 88%",
                    toggleActions: "play none none reverse",
                  },
                }
              );
            }
          }
        );
      }, sectionRef);
    });

    return () => {
      if (ctx) ctx.revert();
      if (mm) mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-6 py-32 md:py-48 border-t border-border"
    >
      <div className="mx-auto max-w-[1100px]">
        <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-text-4 block mb-6">
          Skills
        </span>
        <h2
          ref={headingRef}
          className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.0] tracking-[-0.03em] text-text-1 mb-16 overflow-hidden"
        >
          Capabilities
        </h2>

        <div className="space-y-0">
          {skillCategories.map((cat) => (
            <div
              key={cat.category}
              className="skill-row grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8 py-6 border-b border-border group"
            >
              <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-text-4 group-hover:text-text-2 transition-colors">
                {cat.category}
              </span>
              <span className="text-text-2 text-sm leading-relaxed group-hover:text-text-1 transition-colors">
                {cat.skills}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
