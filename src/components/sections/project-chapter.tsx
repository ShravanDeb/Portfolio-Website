"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ShineBorder } from "@/components/ui/shine-border";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface ProjectChapterProps {
  number: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
  imageSrc: string;
  imageAlt: string;
  layout: "image-left" | "image-right" | "full-width";
  isFlagship?: boolean;
  annotation?: string;
}

export default function ProjectChapter({
  number,
  title,
  description,
  tags,
  href,
  imageSrc,
  imageAlt,
  layout,
  isFlagship = false,
  annotation = "[STATUS: PROD // VERIF: OK]",
}: ProjectChapterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

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
            const toggleBehavior = isFlagship ? "play none none none" : "play none none reverse";

            if (imageRef.current) {
              if (!isReduced) {
                gsap.fromTo(
                  imageRef.current,
                  { y: 80 },
                  {
                    y: -80,
                    ease: "none",
                    scrollTrigger: {
                      trigger: sectionRef.current,
                      start: "top bottom",
                      end: "bottom top",
                      scrub: 0.4,
                    },
                  }
                );
              }

              gsap.fromTo(
                imageRef.current,
                { clipPath: isReduced ? "none" : "inset(100% 0 0 0)", opacity: isReduced ? 0 : 1 },
                {
                  clipPath: "inset(0% 0 0 0)",
                  opacity: 1,
                  duration: 1.2,
                  ease: "power4.out",
                  scrollTrigger: {
                    trigger: imageRef.current,
                    start: "top 85%",
                    toggleActions: toggleBehavior,
                  },
                }
              );
            }

            if (numberRef.current) {
              gsap.fromTo(
                numberRef.current,
                { opacity: 0, scale: isReduced ? 1 : 0.8 },
                {
                  opacity: 0.5,
                  scale: 1,
                  duration: 1.5,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: toggleBehavior,
                  },
                }
              );
            }

            if (titleRef.current) {
              if (isReduced) {
                gsap.fromTo(titleRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 });
              } else {
                const splitTitle = SplitText.create(titleRef.current, {
                  type: "lines,chars",
                  mask: "lines",
                  linesClass: "title-line",
                  charsClass: "title-char",
                });

                gsap.set(splitTitle.chars, { yPercent: 110 });
                gsap.to(splitTitle.chars, {
                  yPercent: 0,
                  duration: 0.8,
                  ease: "power4.out",
                  stagger: 0.02,
                  scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 85%",
                    toggleActions: toggleBehavior,
                  },
                });
              }
            }

            if (textRef.current) {
              gsap.fromTo(
                textRef.current,
                { opacity: 0, y: isReduced ? 0 : 30 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: "power3.out",
                  delay: 0.3,
                  scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 88%",
                    toggleActions: toggleBehavior,
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
  }, [isFlagship]);

  const imageElement = (
    <div ref={imageRef} className="relative overflow-hidden group/img" data-cursor="project">
      <div className="relative aspect-[16/10] bg-surface-2 group">
        <div className="absolute inset-0 flex items-center justify-center text-text-4 font-mono text-sm uppercase tracking-widest transition-opacity duration-500 group-hover:opacity-50">
          {imageAlt}
        </div>
        <div className="absolute inset-0 border border-border-hi opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <ShineBorder shineColor={["#3f3f46", "#fafafa"]} duration={10} borderWidth={1} />
    </div>
  );

  const textElement = (
    <div ref={textRef} className="flex flex-col justify-center group/text">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-text-4">
          Chapter {number}
        </span>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-text-3 opacity-0 group-hover/text:opacity-100 transition-opacity duration-300 border border-border px-1.5 py-0.5 rounded bg-surface-2/50">
          {annotation}
        </span>
      </div>
      <h2
        ref={titleRef}
        className="text-3xl md:text-4xl font-medium tracking-[-0.02em] text-text-1 mb-4 overflow-hidden"
      >
        {title}
      </h2>
      <p className="text-text-2 text-sm leading-relaxed mb-6 max-w-[400px]">
        {description}
      </p>
      <p className="text-text-4 text-sm mb-8">
        {tags.join(" · ")}
      </p>
      <Link
        href={href}
        className="group inline-flex items-center gap-2 text-sm text-text-2 transition-colors hover:text-text-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text-1 w-max"
      >
        <span>View</span>
        <span className="transition-transform group-hover:translate-x-1">
          →
        </span>
      </Link>
    </div>
  );

  if (layout === "full-width") {
    return (
      <section ref={sectionRef} className="relative px-6">
        <div className="mx-auto max-w-[1100px]">
          <div className="relative">
            <span
              ref={numberRef}
              className="absolute -top-16 left-0 text-[clamp(6rem,15vw,14rem)] font-[100] leading-[0.85] tracking-[-0.05em] text-text-4 pointer-events-none select-none z-0 opacity-0"
            >
              {number}
            </span>
            <div className="relative z-10">
              {imageElement}
              <div className="mt-8 max-w-[600px]">{textElement}</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative px-6">
      <div className="mx-auto max-w-[1100px]">
        <div className="relative">
          <span
            ref={numberRef}
            className="absolute -top-16 left-0 text-[clamp(6rem,15vw,14rem)] font-[100] leading-[0.85] tracking-[-0.05em] text-text-4 pointer-events-none select-none z-0 opacity-0"
          >
            {number}
          </span>
          <div
            className={`relative z-10 grid gap-8 md:gap-12 ${
              layout === "image-left"
                ? "md:grid-cols-[65fr_35fr]"
                : "md:grid-cols-[35fr_65fr]"
            }`}
          >
            {layout === "image-left" ? (
              <>
                {imageElement}
                {textElement}
              </>
            ) : (
              <>
                {textElement}
                {imageElement}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
