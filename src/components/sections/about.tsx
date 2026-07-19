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
    const ctx = gsap.context(() => {
      // Heading SplitText mask reveal
      if (headingRef.current) {
        const splitHeading = SplitText.create(headingRef.current, {
          type: "lines,chars",
          mask: "lines",
          linesClass: "heading-line",
        });
        gsap.set(splitHeading.chars, { yPercent: 110 });
        gsap.to(splitHeading.chars, {
          yPercent: 0,
          duration: 0.8,
          ease: "power4.out",
          stagger: 0.02,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Pull quote border animation
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

      // Divider line animation
      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: dividerRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Stats counter animation
      const statValues = sectionRef.current?.querySelectorAll(".stat-value");
      if (statValues) {
        gsap.fromTo(
          statValues,
          { opacity: 0, y: 20 },
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
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-6 py-32 md:py-48">
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
          A builder of intelligent systems
        </h2>

        <div className="text-text-2 text-base leading-[1.7] space-y-6">
          <ScrollReveal delay={0.1}>
            <p>
              <span className="float-left text-[6rem] font-medium leading-[0.85] tracking-[-0.04em] text-text-1 mr-4 mt-2">
                I
              </span>
              &apos;m Shravan — a computer science student specializing in AI/ML
              who builds systems that work at scale. My work sits at the
              intersection of machine learning, real-time infrastructure, and
              developer experience.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p>
              Over the past four years, I&apos;ve shipped production systems that
              handle thousands of concurrent users, trained models deployed across
              distributed networks, and built tools that other developers actually
              want to use. I believe the best technology feels invisible — it
              solves real problems without demanding attention.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p>
              Currently exploring the space where AI meets infrastructure — how
              we build systems that are not just intelligent, but resilient,
              observable, and honest about their limitations.
            </p>
          </ScrollReveal>
        </div>

        {/* Pull quote */}
        <div
          ref={pullQuoteRef}
          className="my-16 border-l border-transparent pl-8"
        >
          <p className="text-[2.5rem] font-[200] leading-[1.2] tracking-[-0.02em] text-text-1">
            The best systems are the ones you never have to think about.
          </p>
        </div>

        <div className="text-text-2 text-base leading-[1.7] space-y-6">
          <ScrollReveal delay={0.1}>
            <p>
              When I&apos;m not writing code, you&apos;ll find me reading about
              systems design, experimenting with new ML architectures, or diving
              deep into the internals of tools I use daily. I believe in building
              in public, sharing what I learn, and contributing to the open source
              ecosystem.
            </p>
          </ScrollReveal>
        </div>

        {/* Animated divider */}
        <div ref={dividerRef} className="my-16 h-px bg-border origin-left" />

        {/* Stats */}
        <div className="flex flex-wrap gap-x-12 gap-y-4">
          {[
            { label: "Years", value: "4+" },
            { label: "Projects", value: "15+" },
            { label: "GitHub Stars", value: "500+" },
            { label: "Lines of Code", value: "100K+" },
          ].map((stat) => (
            <div key={stat.label} className="stat-value">
              <span className="block text-2xl font-medium text-text-1 tracking-tight">
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
