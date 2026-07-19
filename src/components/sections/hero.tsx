"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import SpecularButton from "@/components/ui/specular-button";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!nameRef.current) return;

      // Split name into chars for mask reveal
      const splitName = SplitText.create(nameRef.current, {
        type: "chars",
        charsClass: "name-char",
      });

      // Set initial state: chars hidden below clip mask
      gsap.set(splitName.chars, { yPercent: 110 });

      // Build entrance timeline
      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(splitName.chars, {
        yPercent: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.025,
      })
        .fromTo(
          eyebrowRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          linksRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.2, ease: "power2.inOut" },
          "-=0.6"
        );

      // Scroll-triggered exit: name fades and scales down as you scroll
      gsap.to(nameRef.current, {
        y: -60,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          end: "bottom top",
          scrub: true,
        },
      });

      // Parallax on entire hero content
      gsap.to(subtitleRef.current, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Scroll indicator fades in
      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          delay: 2,
          ease: "power2.out",
        }
      );
      gsap.to(scrollIndicatorRef.current, {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "power1.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center px-6 blueprint-grid overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1100px]">
        <div className="max-w-[720px]">
          <div ref={eyebrowRef} className="mb-6 opacity-0">
            <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-text-4">
              AI/ML Engineer & Product Builder
            </span>
          </div>
          <h1
            ref={nameRef}
            className="mb-8 text-[clamp(3.5rem,10vw,9rem)] font-medium leading-[0.88] tracking-[-0.04em] text-text-1 overflow-hidden"
          >
            Shravan Deb
          </h1>
          <div ref={subtitleRef} className="mb-12 opacity-0">
            <p className="text-text-2 text-base leading-relaxed max-w-[480px]">
              Building intelligent systems that bridge research and production.
              Currently focused on AI infrastructure, real-time collaboration,
              and developer tooling.
            </p>
          </div>
          <div ref={linksRef} className="flex items-center gap-6 opacity-0">
            <Link href="/work">
              <SpecularButton
                size="md"
                radius={0}
                className="hero-btn"
              >
                Work
              </SpecularButton>
            </Link>
            <Link href="/contact">
              <SpecularButton
                size="md"
                radius={0}
                className="hero-btn"
              >
                Contact
              </SpecularButton>
            </Link>
          </div>
        </div>
      </div>

      {/* Animated line */}
      <div className="absolute bottom-0 left-0 right-0 origin-left">
        <div ref={lineRef} className="h-px bg-border" />
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-text-4">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-text-4 to-transparent" />
      </div>
    </section>
  );
}
