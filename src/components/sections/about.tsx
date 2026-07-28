"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import ScrollReveal from "@/components/scroll-reveal";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const pullQuoteRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

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
                const splitHeading = SplitText.create(headingRef.current, {
                  type: "lines,chars",
                  mask: "lines",
                  linesClass: "heading-line",
                });
                gsap.set(splitHeading.chars, { yPercent: 110 });
                gsap.to(splitHeading.chars, {
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

            if (pullQuoteRef.current) {
              gsap.fromTo(
                pullQuoteRef.current,
                { borderLeftColor: "transparent" },
                {
                  borderLeftColor: "#3f3f46",
                  duration: 0.8,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: pullQuoteRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                  },
                }
              );
            }

            if (dividerRef.current) {
              gsap.fromTo(
                dividerRef.current,
                { scaleX: 0 },
                {
                  scaleX: 1,
                  duration: 0.5,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: dividerRef.current,
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                  },
                }
              );
            }

            const statValues = sectionRef.current?.querySelectorAll(".stat-value");
            if (statValues) {
              gsap.fromTo(
                statValues,
                { opacity: 0, y: isReduced ? 0 : 20 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  stagger: 0.1,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: statValues[0],
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
    <section ref={sectionRef} className="relative z-10 px-6 py-32 md:py-48">
      <div className="mx-auto max-w-[720px]">
        <ScrollReveal>
          <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-text-4 block mb-6">
            About
          </span>
        </ScrollReveal>

        <h2
          ref={headingRef}
          className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.0] tracking-[-0.03em] text-text-1 mb-12 overflow-hidden"
        >
          Building Intelligent Software
        </h2>

        <div className="text-text-2 text-base leading-[1.7] space-y-6">
          <ScrollReveal delay={0.1}>
            <p>
              <span className="float-left text-[6rem] font-medium leading-[0.85] tracking-[-0.04em] text-text-1 mr-4 mt-2">
                I
              </span>
              &apos;m Shravan, a Computer Science student specializing in
              Artificial Intelligence with a passion for building software
              that solves real problems. My interests span artificial
              intelligence, backend engineering, full-stack development, and
              modern web technologies. I enjoy transforming ideas into
              products that are reliable, intuitive, and built with users in
              mind.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p>
              My journey in software development has been driven by curiosity
              and continuous learning. Through academic projects, hackathons,
              and personal initiatives, I have worked on AI-powered
              applications, web platforms, developer tools, and automation
              systems. Every project has helped me strengthen my understanding
              of software engineering, scalable architecture, and product
              development.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p>
              I am particularly interested in the intersection of artificial
              intelligence and software engineering. I enjoy exploring how
              machine learning can be integrated into real-world applications
              while maintaining performance, reliability, and a great user
              experience. Alongside AI, I continue learning about system
              design, distributed systems, cloud technologies, and modern
              development practices.
            </p>
          </ScrollReveal>
        </div>

        <div
          ref={pullQuoteRef}
          className="my-16 border-l border-transparent pl-8"
        >
          <p className="text-[2.5rem] font-[200] leading-[1.2] tracking-[-0.02em] text-text-1">
            Great software solves real problems with simplicity.
            It is reliable, intuitive, and built to last.
          </p>
        </div>

        <div className="text-text-2 text-base leading-[1.7] space-y-6">
          <ScrollReveal delay={0.1}>
            <p>
              Outside of development, I spend time reading about software
              architecture, experimenting with emerging AI models and
              frameworks, contributing to open-source projects, and studying
              the engineering decisions behind products that people use every
              day.
            </p>
          </ScrollReveal>
        </div>

        <div ref={dividerRef} className="my-16 h-px bg-border origin-left" />

        <div className="flex flex-wrap gap-x-12 gap-y-6">
          {[
            { label: "Total Systems Built", value: "8+" },
            { label: "Prod Deployments", value: "3" },
            { label: "Technologies Used", value: "23" },
            { label: "Lines of Code", value: "50K+" },
          ].map((stat) => (
            <div key={stat.label} className="stat-value">
              <span className="block text-2xl font-medium text-text-1 tracking-tight tabular-nums">
                {stat.value}
              </span>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-text-4">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
