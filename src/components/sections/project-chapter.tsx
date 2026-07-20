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
            isMobile: "(max-width: 767px)",
            isDesktop: "(min-width: 768px)",
            isReduced: "(prefers-reduced-motion: reduce)",
          },
          (context) => {
            const { isMobile, isDesktop, isReduced } = context.conditions as {
              isMobile: boolean;
              isDesktop: boolean;
              isReduced: boolean;
            };

            const toggleBehavior = isFlagship ? "play none none none" : "play none none reverse";

            if (isDesktop && imageRef.current) {
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
                  duration: 0.6,
                  ease: "power4.out",
                  scrollTrigger: {
                    trigger: imageRef.current,
                    start: "top 85%",
                    toggleActions: toggleBehavior,
                  },
                }
              );
            }

            if (isMobile && imageRef.current) {
              gsap.fromTo(
                imageRef.current,
                { scale: 0.96, opacity: 0.7, borderColor: "rgba(255, 255, 255, 0.05)" },
                {
                  scale: 1,
                  opacity: 1,
                  borderColor: "rgba(255, 255, 255, 0.25)",
                  duration: 0.6,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: imageRef.current,
                    start: "top 75%",
                    end: "bottom 25%",
                    toggleActions: "play reverse play reverse",
                  },
                }
              );
            }

            if (isDesktop && numberRef.current) {
              gsap.fromTo(
                numberRef.current,
                { opacity: 0, scale: isReduced ? 1 : 0.8 },
                {
                  opacity: 0.22,
                  scale: 1,
                  duration: 0.8,
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
                gsap.fromTo(titleRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });
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
                  duration: 0.5,
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
                { opacity: 0, y: isReduced ? 0 : isMobile ? 15 : 30 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  ease: "power3.out",
                  delay: isMobile ? 0.1 : 0.3,
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
    <div
      ref={imageRef}
      className="relative overflow-hidden group/img rounded-xl md:rounded-none border border-border/40 md:border-transparent bg-surface-2 shadow-2xl md:shadow-none transition-transform duration-500 active:scale-[0.98] md:active:scale-100"
      data-cursor="project"
    >
      <div className="relative aspect-[4/3] md:aspect-[16/10] bg-surface-2 group">
        <div className="absolute inset-0 flex items-center justify-center text-text-4 font-mono text-xs md:text-sm uppercase tracking-widest transition-opacity duration-500 group-hover:opacity-50">
          {imageAlt}
        </div>
        <div className="absolute inset-0 border border-border-hi opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <ShineBorder shineColor={["#3f3f46", "#fafafa"]} duration={10} borderWidth={1} />
    </div>
  );

  const textElement = (
    <div
      ref={textRef}
      className="flex flex-col justify-center group/text border-l border-border/60 pl-5 md:border-l-0 md:pl-0 mt-6 md:mt-0"
    >
      <div className="hidden md:flex items-center gap-3 mb-4">
        <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-text-4">
          Chapter {number}
        </span>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-text-3 opacity-0 group-hover/text:opacity-100 transition-opacity duration-300 border border-border px-1.5 py-0.5 rounded bg-surface-2/50">
          {annotation}
        </span>
      </div>

      <h2
        ref={titleRef}
        className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-[-0.02em] text-text-1 mb-3 md:mb-4 overflow-hidden"
      >
        {title}
      </h2>
      <p className="text-text-2 text-sm leading-relaxed mb-6 max-w-none md:max-w-[400px]">
        {description}
      </p>
      <div className="flex flex-wrap gap-1.5 md:gap-2 mb-8">
        {tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[0.65rem] md:text-xs text-text-3 bg-surface-2/60 md:bg-transparent px-2 py-0.5 md:p-0 rounded border border-border/40 md:border-transparent"
          >
            #{tag}
          </span>
        ))}
      </div>
      <Link
        href={href}
        className="group inline-flex items-center justify-between md:justify-start gap-3 text-sm font-medium text-text-1 md:text-text-2 transition-[color,transform] duration-300 [cubic-bezier(0.23,1,0.32,1)] hover:text-text-1 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text-1 w-full md:w-max py-2.5 md:py-0 px-4 md:px-0 rounded-lg md:rounded-none bg-surface-2 md:bg-transparent border border-border/60 md:border-transparent"
      >
        <span>View Case Study</span>
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </div>
  );

  const desktopWatermark = (
    <span
      ref={numberRef}
      className={`hidden md:block absolute -top-16 text-[clamp(6rem,15vw,14rem)] font-[100] leading-[0.85] tracking-[-0.05em] text-text-4 pointer-events-none select-none z-0 opacity-0 ${
        layout === "image-right" ? "right-0 left-auto" : "left-0"
      }`}
    >
      {number}
    </span>
  );

  const mobileHeaderLedger = (
    <div className="flex md:hidden items-baseline justify-between mb-4 border-b border-border/40 pb-3">
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-3xl font-light tracking-tight text-text-2">
          {number}
        </span>
        <span className="font-mono text-[0.6rem] uppercase tracking-widest text-text-4">
          // Case Study
        </span>
      </div>
      <span className="font-mono text-[0.55rem] uppercase tracking-[0.1em] text-text-3 border border-border/60 px-1.5 py-0.5 rounded bg-surface-2">
        PROD
      </span>
    </div>
  );

  if (layout === "full-width") {
    return (
      <section ref={sectionRef} className="relative px-6">
        <div className="mx-auto max-w-[1100px]">
          <div className="relative">
            {desktopWatermark}
            <div className="relative z-10">
              {mobileHeaderLedger}
              {imageElement}
              <div className="mt-2 md:mt-8 max-w-[600px]">{textElement}</div>
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
          {desktopWatermark}
          <div
            className={`relative z-10 grid gap-4 md:gap-12 ${
              layout === "image-left"
                ? "md:grid-cols-[65fr_35fr]"
                : "md:grid-cols-[35fr_65fr]"
            }`}
          >
            <div className={layout === "image-right" ? "md:order-last" : ""}>
              {mobileHeaderLedger}
              {imageElement}
            </div>
            <div className={layout === "image-right" ? "md:order-first" : ""}>
              {textElement}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
