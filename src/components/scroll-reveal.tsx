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
  distance = 30,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay,
    };

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

    const ctx = gsap.context(() => {
      gsap.from(el, {
        ...fromVars,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, [delay, direction, distance]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
