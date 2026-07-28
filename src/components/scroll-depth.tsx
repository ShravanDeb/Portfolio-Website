"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollDepthProps {
  children: ReactNode;
  className?: string;
}

export default function ScrollDepth({ children, className = "" }: ScrollDepthProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ctx: gsap.Context;
    let mm = gsap.matchMedia();

    mm.add(
      {
        isReduced: "(prefers-reduced-motion: reduce)",
        isNormal: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { isReduced } = context.conditions as {
          isReduced: boolean;
          isNormal: boolean;
        };

        if (isReduced) return;

        ctx = gsap.context(() => {
          gsap.fromTo(
            el,
            {
              scale: 0.97,
              filter: "blur(2px)",
            },
            {
              scale: 1,
              filter: "blur(0px)",
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                end: "top 40%",
                scrub: 0.5,
              },
            }
          );

          gsap.to(el, {
            scale: 0.985,
            filter: "blur(1.5px)",
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "bottom 60%",
              end: "bottom top",
              scrub: 0.5,
            },
          });
        });
      }
    );

    return () => {
      if (ctx) ctx.revert();
      if (mm) mm.revert();
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform, filter" }}>
      {children}
    </div>
  );
}
