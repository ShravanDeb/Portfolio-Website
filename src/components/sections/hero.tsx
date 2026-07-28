"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import SpecularButton from "@/components/ui/specular-button";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentWrapRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const orbRefs = useRef<HTMLDivElement[]>([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: PointerEvent) => {
    mouseRef.current = {
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    };
  }, []);

  useEffect(() => {
    let ctx: gsap.Context;
    let mm = gsap.matchMedia();

    gsap.set([eyebrowRef.current, subtitleRef.current, linksRef.current, lineRef.current, scrollIndicatorRef.current], {
      opacity: 0,
    });

    const startAnimation = () => {
      document.fonts.ready.then(() => {
        ctx = gsap.context(() => {
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

              if (!nameRef.current) return;

              if (isReduced) {
                gsap.to(
                  [
                    nameRef.current,
                    eyebrowRef.current,
                    subtitleRef.current,
                    linksRef.current,
                    lineRef.current,
                  ],
                  {
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "power2.out",
                  }
                );
                return;
              }

              const splitName = SplitText.create(nameRef.current, {
                type: "chars",
                charsClass: "name-char",
              });

              gsap.set(splitName.chars, { yPercent: 110 });

              const tl = gsap.timeline();

              tl.to(splitName.chars, {
              yPercent: 0,
              duration: 0.6,
              ease: "power4.out",
              stagger: 0.025,
            })
              .fromTo(
                eyebrowRef.current,
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" },
                "-=0.6"
              )
              .fromTo(
                subtitleRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
                "-=0.4"
              )
              .fromTo(
                linksRef.current,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
                "-=0.3"
              )
              .fromTo(
                lineRef.current,
                { scaleX: 0 },
                { scaleX: 1, duration: 0.5, ease: "power2.out" },
                "-=0.6"
              );

            gsap.to(nameRef.current, {
              y: -60,
              opacity: 0,
              scale: 0.96,
              filter: "blur(3px)",
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "center center",
                end: "bottom top",
                scrub: 0.3,
              },
            });

            gsap.to(subtitleRef.current, {
              y: -30,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 0.3,
              },
            });

            gsap.fromTo(
              scrollIndicatorRef.current,
              { opacity: 0 },
              { opacity: 1, duration: 1, delay: 3.2, ease: "power2.out" }
            );

            gsap.to(scrollIndicatorRef.current, {
              y: 8,
              repeat: -1,
              yoyo: true,
              duration: 1.5,
              ease: "power1.inOut",
            }            );
          }
        );
      }, sectionRef);
    });
    };

    // If preloader already completed (returning via client nav), start immediately
    if (window.__preloaderDone) {
      startAnimation();
    } else {
      window.addEventListener("preloader-complete", startAnimation);
    }
    window.addEventListener("pointermove", handleMouseMove);

    const orbTarget = [{ x: 0.3, y: 0.4 }, { x: 0.7, y: 0.3 }, { x: 0.5, y: 0.7 }];
    const orbCurrent = [{ x: 0.3, y: 0.4 }, { x: 0.7, y: 0.3 }, { x: 0.5, y: 0.7 }];

    const animateOrbs = () => {
      const t = Date.now() * 0.0003;
      for (let i = 0; i < 3; i++) {
        orbTarget[i].x = 0.3 + 0.4 * Math.sin(t + i * 2.1);
        orbTarget[i].y = 0.3 + 0.4 * Math.cos(t * 0.7 + i * 1.7);
        orbCurrent[i].x += (orbTarget[i].x - orbCurrent[i].x) * 0.008;
        orbCurrent[i].y += (orbTarget[i].y - orbCurrent[i].y) * 0.008;
        if (orbRefs.current[i]) {
          orbRefs.current[i].style.left = `${orbCurrent[i].x * 100}%`;
          orbRefs.current[i].style.top = `${orbCurrent[i].y * 100}%`;
        }
      }
      rafRef.current = requestAnimationFrame(animateOrbs);
    };
    rafRef.current = requestAnimationFrame(animateOrbs);

    const animatePerspective = () => {
      if (contentWrapRef.current) {
        const mx = (mouseRef.current.x - 0.5) * 3;
        const my = (mouseRef.current.y - 0.5) * -2;
        contentWrapRef.current.style.transform = `perspective(1200px) rotateY(${mx}deg) rotateX(${my}deg)`;
      }
      requestAnimationFrame(animatePerspective);
    };
    const perspRaf = requestAnimationFrame(animatePerspective);

    return () => {
      if (!window.__preloaderDone) {
        window.removeEventListener("preloader-complete", startAnimation);
      }
      window.removeEventListener("pointermove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(perspRaf);
      if (ctx) ctx.revert();
      if (mm) mm.revert();
    };
  }, [handleMouseMove]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center px-6 blueprint-grid overflow-hidden"
    >
      <div
        ref={(el) => {
          if (el) orbRefs.current[0] = el;
        }}
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.035]"
        style={{
          background: "radial-gradient(circle, var(--text-1) 0%, transparent 70%)",
          filter: "blur(80px)",
          left: "30%",
          top: "40%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        ref={(el) => {
          if (el) orbRefs.current[1] = el;
        }}
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.025]"
        style={{
          background: "radial-gradient(circle, var(--text-2) 0%, transparent 70%)",
          filter: "blur(100px)",
          left: "70%",
          top: "30%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        ref={(el) => {
          if (el) orbRefs.current[2] = el;
        }}
        className="absolute w-[350px] h-[350px] rounded-full pointer-events-none opacity-[0.03]"
        style={{
          background: "radial-gradient(circle, var(--text-3) 0%, transparent 70%)",
          filter: "blur(90px)",
          left: "50%",
          top: "65%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div
        ref={contentWrapRef}
        className="mx-auto w-full max-w-[1100px]"
        style={{ willChange: "transform" }}
      >
        <div className="max-w-[720px]">
          <div ref={eyebrowRef} className="mb-6 opacity-0">
            <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-text-4">
              AI/ML Engineer & Product Builder
            </span>
          </div>
          <h1
            ref={nameRef}
            className="mb-8 text-[clamp(3rem,9vw,8rem)] font-medium leading-[0.88] tracking-[-0.04em] text-text-1 overflow-hidden"
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
            <Link
              href="/work"
              className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text-1"
            >
              <SpecularButton size="md" radius={0} className="hero-btn">
                Work
              </SpecularButton>
            </Link>
            <Link
              href="/contact"
              className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text-1"
            >
              <SpecularButton size="md" radius={0} className="hero-btn">
                Contact
              </SpecularButton>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 origin-left">
        <div ref={lineRef} className="h-px bg-border" />
      </div>

      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 pointer-events-none"
      >
        <div className="w-px h-10 bg-gradient-to-b from-text-4 to-transparent" />
      </div>
    </section>
  );
}
