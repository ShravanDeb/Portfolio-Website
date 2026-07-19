"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import ScrollReveal from "@/components/scroll-reveal";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function InvertedContact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);

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
                gsap.fromTo(headingRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 });
              } else {
                const splitH = SplitText.create(headingRef.current, {
                  type: "lines,chars",
                  mask: "lines",
                });
                gsap.set(splitH.chars, { yPercent: 110 });
                gsap.to(splitH.chars, {
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
            }

            if (emailRef.current) {
              gsap.fromTo(
                emailRef.current,
                { backgroundSize: "0% 1px" },
                {
                  backgroundSize: "100% 1px",
                  duration: 1,
                  ease: "power2.inOut",
                  scrollTrigger: {
                    trigger: emailRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
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
    <section ref={sectionRef} className="bg-background inverted-section px-6 py-32 md:py-48">
      <div className="mx-auto max-w-[720px]">
        <ScrollReveal>
          <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-text-4 block mb-6">
            Get in touch
          </span>
        </ScrollReveal>

        <h2
          ref={headingRef}
          className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.0] tracking-[-0.03em] text-foreground mb-8 overflow-hidden"
        >
          Let&apos;s work together
        </h2>

        <ScrollReveal delay={0.15}>
          <p className="text-text-3 text-base leading-relaxed mb-12 max-w-[480px]">
            I&apos;m always interested in hearing about new projects,
            collaborations, or opportunities to build something meaningful.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <a
            ref={emailRef}
            href="mailto:hello@shravandeb.com"
            className="inline-block text-[clamp(1.65rem,4.5vw,4rem)] font-medium tracking-[-0.02em] text-foreground hover:text-text-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground transition-colors break-all sm:break-normal"
            style={{
              backgroundImage:
                "linear-gradient(to right, currentColor 100%, transparent 100%)",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "0 100%",
              backgroundSize: "0% 1px",
              paddingBottom: "4px",
            }}
          >
            hello@shravandeb.com
          </a>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-16 flex flex-wrap gap-x-8 gap-y-2">
            {[
              { label: "GitHub", href: "https://github.com/shravan20" },
              { label: "LinkedIn", href: "https://linkedin.com/in/shravandeb" },
              { label: "X", href: "https://x.com/shravandeb" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-3 text-sm hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
