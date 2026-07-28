"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SceneDividerProps {
  height?: string;
}

export default function SceneDivider({ height = "50vh" }: SceneDividerProps) {
  const lineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = lineRef.current;
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

        ctx = gsap.context(() => {
          gsap.fromTo(
            el,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.8,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                toggleActions: isReduced
                  ? "none none none none"
                  : "play none none reverse",
              },
            }
          );
        });
      }
    );

    return () => {
      if (ctx) ctx.revert();
      if (mm) mm.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center"
      style={{ height }}
    >
      <div
        ref={lineRef}
        className="w-24 h-px bg-border origin-center"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
