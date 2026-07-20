"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 20,
}: ScrollRevealProps) {
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
        const { isReduced } = context.conditions as { isReduced: boolean; isNormal: boolean };

        const fromVars: gsap.TweenVars = {
          opacity: 0,
          duration: isReduced ? 0.3 : 0.5,
          ease: isReduced ? "power1.out" : "power2.out",
          delay,
        };

        if (!isReduced) {
          switch (direction) {
            case "up":
              fromVars.y = distance;
              break;
            case "down":
              fromVars.y = -distance;
              break;
            case "left":
              fromVars.x = distance;
              break;
            case "right":
              fromVars.x = -distance;
              break;
          }
        }

        ctx = gsap.context(() => {
          gsap.from(el, {
            ...fromVars,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });
        });
      }
    );

    return () => {
      if (ctx) ctx.revert();
      if (mm) mm.revert();
    };
  }, [delay, direction, distance]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
