"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

// ── Milestones as stories, not résumé entries ──
const MILESTONES = [
  {
    year: "2019",
    title: "The First spark",
    institution: "Don Bosco School, Guwahati",
    description:
      "The first time I realised software could create worlds, not just solve equations. A borrowed laptop, a cracked IDE, and the quiet conviction that this was it.",
    motif: "laptop",
    typeScale: 0.88,
  },
  {
    year: "2021",
    title: "Thinking in Systems",
    institution: "Science Stream — PCM",
    description:
      "Physics taught me how the world connects. Mathematics taught me abstraction. But it was late-night YouTube tutorials on machine learning that made everything click.",
    motif: "neural",
    typeScale: 0.92,
  },
  {
    year: "2021",
    title: "Building the Foundation",
    institution: "Institute of Engineering & Technology",
    description:
      "Algorithms became a language. Data structures became architecture. I stopped following tutorials and started building what didn't exist yet.",
    motif: "grid",
    typeScale: 0.96,
  },
  {
    year: "2023",
    title: "Shipping Under Pressure",
    institution: "Independent",
    description:
      "DevMon taught me what production really means. Three AM alerts. Cascading failures. The humbling discovery that building is easy — maintaining is the craft.",
    motif: "server",
    typeScale: 1.0,
  },
  {
    year: "2024",
    title: "Teaching Machines to Speak",
    institution: "Research & Development",
    description:
      "I trained models that understood context, nuance, and ambiguity. Kiran AI wasn't just code — it was the first time a system I built felt alive.",
    motif: "brain",
    typeScale: 1.04,
  },
  {
    year: "2025",
    title: "The Road Ahead",
    institution: "Building & Shipping",
    description:
      "Now I build at the edge of what's possible — where AI meets infrastructure, where resilience meets intelligence. Every system a hypothesis. Every deployment a lesson.",
    motif: "constellation",
    typeScale: 1.08,
  },
];

const TOTAL = MILESTONES.length;

// ── Motif SVGs — almost invisible background symbols ──
function MotifSVG({ type }: { type: string }) {
  const base = "absolute opacity-[0.03] pointer-events-none";
  switch (type) {
    case "laptop":
      return (
        <svg className={`${base} w-40 h-40`} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
          <rect x="20" y="15" width="60" height="40" rx="2" />
          <line x1="15" y1="55" x2="85" y2="55" />
          <line x1="30" y1="55" x2="25" y2="65" />
          <line x1="70" y1="55" x2="75" y2="65" />
          <line x1="25" y1="65" x2="75" y2="65" />
        </svg>
      );
    case "neural":
      return (
        <svg className={`${base} w-40 h-40`} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.4">
          <circle cx="30" cy="25" r="4" /><circle cx="70" cy="25" r="4" />
          <circle cx="20" cy="50" r="4" /><circle cx="50" cy="50" r="4" /><circle cx="80" cy="50" r="4" />
          <circle cx="30" cy="75" r="4" /><circle cx="70" cy="75" r="4" />
          <line x1="30" y1="25" x2="20" y2="50" /><line x1="30" y1="25" x2="50" y2="50" />
          <line x1="70" y1="25" x2="50" y2="50" /><line x1="70" y1="25" x2="80" y2="50" />
          <line x1="20" y1="50" x2="30" y2="75" /><line x1="50" y1="50" x2="30" y2="75" />
          <line x1="50" y1="50" x2="70" y2="75" /><line x1="80" y1="50" x2="70" y2="75" />
        </svg>
      );
    case "grid":
      return (
        <svg className={`${base} w-40 h-40`} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.3">
          {[20, 40, 60, 80].map((v) => (
            <g key={v}>
              <line x1={v} y1="10" x2={v} y2="90" />
              <line x1="10" y1={v} x2="90" y2={v} />
            </g>
          ))}
        </svg>
      );
    case "server":
      return (
        <svg className={`${base} w-40 h-40`} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
          <rect x="25" y="10" width="50" height="18" rx="2" />
          <rect x="25" y="35" width="50" height="18" rx="2" />
          <rect x="25" y="60" width="50" height="18" rx="2" />
          <circle cx="35" cy="19" r="2" /><circle cx="35" cy="44" r="2" /><circle cx="35" cy="69" r="2" />
        </svg>
      );
    case "brain":
      return (
        <svg className={`${base} w-40 h-40`} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.4">
          <path d="M50 15 C30 15, 15 30, 15 50 C15 70, 30 85, 50 85 C70 85, 85 70, 85 50 C85 30, 70 15, 50 15Z" />
          <path d="M50 25 C35 35, 30 50, 50 75" />
          <path d="M50 25 C65 35, 70 50, 50 75" />
          <line x1="25" y1="45" x2="75" y2="45" />
        </svg>
      );
    case "constellation":
      return (
        <svg className={`${base} w-40 h-40`} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.3">
          <circle cx="20" cy="20" r="1.5" fill="currentColor" />
          <circle cx="80" cy="15" r="1.5" fill="currentColor" />
          <circle cx="50" cy="50" r="2" fill="currentColor" />
          <circle cx="15" cy="80" r="1.5" fill="currentColor" />
          <circle cx="85" cy="75" r="1.5" fill="currentColor" />
          <circle cx="60" cy="30" r="1" fill="currentColor" />
          <line x1="20" y1="20" x2="50" y2="50" />
          <line x1="80" y1="15" x2="50" y2="50" />
          <line x1="50" y1="50" x2="15" y2="80" />
          <line x1="50" y1="50" x2="85" y2="75" />
          <line x1="50" y1="50" x2="60" y2="30" />
        </svg>
      );
    default:
      return null;
  }
}

export default function JourneyTimeline() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);
  const spinePulseRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<HTMLDivElement[]>([]);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const connectorRefs = useRef<HTMLDivElement[]>([]);
  const dotRefs = useRef<HTMLDivElement[]>([]);
  const dotRingsRef = useRef<HTMLDivElement[]>([]);
  const yearRefs = useRef<HTMLSpanElement[]>([]);
  const titleRefs = useRef<HTMLHeadingElement[]>([]);
  const institutionRefs = useRef<HTMLSpanElement[]>([]);
  const descRefs = useRef<HTMLParagraphElement[]>([]);
  const motifRefs = useRef<HTMLDivElement[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

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
            isNormal: "(prefers-reduced-motion: no-preference)",
          },
          (context) => {
            const { isReduced, isMobile } = context.conditions as {
              isReduced: boolean;
              isNormal: boolean;
              isMobile: boolean;
              isDesktop: boolean;
            };

            // ── Heading reveal ──
            if (headingRef.current) {
              if (isReduced) {
                gsap.set(headingRef.current, { opacity: 1 });
              } else {
                const split = SplitText.create(headingRef.current, {
                  type: "lines,chars",
                  mask: "lines",
                  linesClass: "tl-heading-line",
                });
                gsap.set(split.chars, { yPercent: 110, opacity: 0 });
                gsap.to(split.chars, {
                  yPercent: 0,
                  opacity: 1,
                  duration: 0.6,
                  ease: "power4.out",
                  stagger: 0.03,
                  scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top 88%",
                    toggleActions: "play none none none",
                  },
                });
              }
            }

            if (eyebrowRef.current) {
              gsap.fromTo(
                eyebrowRef.current,
                { opacity: 0, x: -15 },
                {
                  opacity: 1,
                  x: 0,
                  duration: 0.8,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: eyebrowRef.current,
                    start: "top 88%",
                    toggleActions: "play none none none",
                  },
                }
              );
            }

            if (isReduced || !stickyRef.current || !spineRef.current || !pinWrapRef.current) return;

            // ── Scroll distance: 1 screen per milestone ──
            const vh = window.innerHeight;
            const pinDistance = TOTAL * vh;

            // ── Master timeline ──
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: pinWrapRef.current,
                start: "top top",
                end: `+=${pinDistance}`,
                scrub: 0.8,
                pin: stickyRef.current,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            // ── Spine grows ──
            gsap.set(spineRef.current, { scaleY: 0 });
            tl.to(spineRef.current, { scaleY: 1, duration: 1, ease: "none" }, 0);

            // ── Energy pulse travels down spine ──
            if (spinePulseRef.current) {
              gsap.set(spinePulseRef.current, { top: 0, yPercent: 0, opacity: 0 });
              tl.to(spinePulseRef.current, {
                keyframes: [
                  { yPercent: 20, opacity: 0.8, duration: 0.3 },
                  { yPercent: 80, opacity: 0.8, duration: 0.5 },
                  { yPercent: 100, opacity: 0, duration: 0.2 },
                ],
                ease: "none",
              }, 0);
            }

            // ── Per-milestone choreography ──
            // Timeline budget per segment:
            //   0.00 – 0.15  ARRIVAL (scene appears, settles)
            //   0.15 – 0.25  FOCUS  (dot, connector, ring)
            //   0.25 – 0.45  DISCOVERY (year, title, institution, desc)
            //   0.45 – 0.85  HOLD   (everything readable, glass, motif drift)
            //   0.85 – 1.00  DEPARTURE (scene exits) — last milestone skips this
            for (let i = 0; i < TOTAL; i++) {
              const seg = i / TOTAL;
              const dur = 1 / TOTAL;
              const isLeft = i % 2 === 0;
              const isLast = i === TOTAL - 1;
              const scale = MILESTONES[i].typeScale;

              const scene = sceneRefs.current[i];
              const card = cardRefs.current[i];
              const connector = connectorRefs.current[i];
              const dot = dotRefs.current[i];
              const ring = dotRingsRef.current[i];
              const year = yearRefs.current[i];
              const title = titleRefs.current[i];
              const institution = institutionRefs.current[i];
              const desc = descRefs.current[i];
              const motif = motifRefs.current[i];

              if (!scene) continue;

              // ══════════════════════════════════════
              //  ARRIVAL — clear settle, visible blur
              // ══════════════════════════════════════
              gsap.set(scene, {
                opacity: 0, y: isMobile ? 25 : 50, scale: scale * 0.96,
                filter: "blur(6px)",
              });

              tl.to(scene, {
                opacity: 1, y: 0, scale: scale,
                filter: "blur(0px)",
                duration: dur * 0.12,
                ease: "power4.out",
              }, seg);

              // ══════════════════════════════════════
              //  FOCUS — dot, ring, connector
              // ══════════════════════════════════════
              if (ring) {
                gsap.set(ring, { scale: 0, opacity: 0 });
                tl.to(ring, {
                  scale: 2.5, opacity: 0,
                  duration: dur * 0.3,
                  ease: "power2.out",
                }, seg + dur * 0.05);
              }

              if (dot) {
                gsap.set(dot, { scale: 0.01, opacity: 0 });
                tl.to(dot, {
                  scale: 1, opacity: 1,
                  duration: dur * 0.15,
                  ease: "power3.out",
                }, seg + dur * 0.06);
              }

              if (connector) {
                gsap.set(connector, { opacity: 0, scaleX: 0 });
                tl.to(connector, {
                  opacity: 1, scaleX: 1,
                  duration: dur * 0.2,
                  ease: "power2.out",
                }, seg + dur * 0.08);
              }

              // ══════════════════════════════════════
              //  DISCOVERY — text reveals, NO blur on text
              // ══════════════════════════════════════
              if (year) {
                gsap.set(year, {
                  opacity: 0,
                  x: isMobile ? 0 : (isLeft ? -15 : 15),
                  y: isMobile ? -8 : 0,
                  letterSpacing: "0.25em",
                });
                tl.to(year, {
                  opacity: 1, x: 0, y: 0,
                  letterSpacing: "0.15em",
                  duration: dur * 0.2,
                  ease: "power3.out",
                }, seg + dur * 0.12);
              }

              if (title) {
                gsap.set(title, { opacity: 0, y: 16 });
                tl.to(title, {
                  opacity: 1, y: 0,
                  duration: dur * 0.22,
                  ease: "power3.out",
                }, seg + dur * 0.16);
              }

              if (institution) {
                gsap.set(institution, { opacity: 0, y: 12 });
                tl.to(institution, {
                  opacity: 1, y: 0,
                  duration: dur * 0.18,
                  ease: "power3.out",
                }, seg + dur * 0.20);
              }

              if (desc) {
                gsap.set(desc, { opacity: 0, y: 10 });
                tl.to(desc, {
                  opacity: 1, y: 0,
                  duration: dur * 0.2,
                  ease: "power3.out",
                }, seg + dur * 0.24);
              }

              // ══════════════════════════════════════
              //  HOLD — motif drift, glass effect
              // ══════════════════════════════════════
              if (motif) {
                gsap.set(motif, { opacity: 0, scale: 0.85, y: 20 });
                tl.to(motif, {
                  opacity: 1, scale: 1, y: 0,
                  duration: dur * 0.3,
                  ease: "power1.out",
                }, seg + dur * 0.15);
                tl.to(motif, {
                  y: -10,
                  duration: dur * 0.6,
                  ease: "none",
                }, seg + dur * 0.35);
              }

              if (card) {
                gsap.set(card, { backdropFilter: "blur(0px)", borderColor: "transparent" });
                tl.to(card, {
                  backdropFilter: "blur(12px)",
                  borderColor: "rgba(255,255,255,0.06)",
                  duration: dur * 0.2,
                  ease: "power2.out",
                }, seg + dur * 0.3);
              }

              // ══════════════════════════════════════
              //  DEPARTURE — visible blur, gradual
              // ══════════════════════════════════════
              if (!isLast) {
                const exitSeg = seg + dur * 0.82;
                const exitDur = dur * 0.18;

                tl.to(scene, {
                  opacity: 0,
                  y: isMobile ? -18 : -35,
                  scale: scale * 0.97,
                  filter: "blur(5px)",
                  duration: exitDur,
                  ease: "power2.in",
                }, exitSeg);

                if (card) {
                  tl.to(card, {
                    backdropFilter: "blur(0px)",
                    borderColor: "transparent",
                    duration: exitDur,
                    ease: "power2.in",
                  }, exitSeg);
                }
              }

              // ══════════════════════════════════════
              //  CINEMATIC ENDING
              // ══════════════════════════════════════
              if (isLast) {
                tl.to(scene, {
                  scale: scale * 0.95,
                  opacity: 0.65,
                  filter: "blur(4px)",
                  duration: dur * 0.3,
                  ease: "power2.out",
                }, seg + dur * 0.7);

                if (spinePulseRef.current) {
                  tl.to(spinePulseRef.current, {
                    opacity: 0,
                    duration: dur * 0.25,
                    ease: "power2.in",
                  }, seg + dur * 0.75);
                }
              }
            }
          }
        );
      });
    });

    // ── Cursor micro-interactions ──
    document.addEventListener("mousemove", handleMouseMove);

    const cursorRAF = () => {
      cardRefs.current.forEach((card) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = mouseRef.current.x - cx;
        const dy = mouseRef.current.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 400;

        if (dist < maxDist) {
          const intensity = 1 - dist / maxDist;
          const rotateY = (dx / rect.width) * 1.5 * intensity;
          const rotateX = -(dy / rect.height) * 1.5 * intensity;
          card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
          card.style.transition = "transform 0.18s ease-out";
        } else {
          card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
          card.style.transition = "transform 0.4s ease-out";
        }
      });
      requestAnimationFrame(cursorRAF);
    };
    const rafId = requestAnimationFrame(cursorRAF);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
      if (ctx) ctx.revert();
      if (mm) mm.revert();
    };
  }, [handleMouseMove]);

  return (
    <>
      {/* ── Header ── */}
      <div className="h-screen flex flex-col items-center justify-center px-6">
        <div ref={eyebrowRef} className="mb-6 opacity-0">
          <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-text-4">
            Journey
          </span>
        </div>
        <h2
          ref={headingRef}
          className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.12] tracking-[-0.03em] text-text-1"
        >
          From classroom
          <br />
          to codebase
        </h2>
      </div>

      {/* ── Pin wrapper ── */}
      <div ref={pinWrapRef} className="relative">
        <div ref={stickyRef} className="h-screen w-full">
          <div className="mx-auto max-w-[860px] h-full relative">
            {/* ── Spine ── */}
            <div
              ref={spineRef}
              className="absolute top-0 bottom-0 left-6 md:left-1/2 w-px bg-border-hi origin-top"
              style={{ transform: "translateX(-50%) scaleY(0)" }}
            />

            {/* ── Energy pulse ── */}
            <div
              ref={spinePulseRef}
              className="absolute left-6 md:left-1/2 -translate-x-1/2 w-px h-24 pointer-events-none z-20"
              style={{
                background: "linear-gradient(to bottom, transparent, var(--text-2) 40%, var(--text-1) 50%, var(--text-2) 60%, transparent)",
                opacity: 0,
              }}
            />

            {/* ── Scenes ── */}
            {MILESTONES.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={`${m.year}-${i}`}
                  ref={(el) => { if (el) sceneRefs.current[i] = el; }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <div className="w-full max-w-[780px] relative pl-12 pr-6 md:px-0">
                    {/* Dot */}
                    <div
                      ref={(el) => { if (el) dotRefs.current[i] = el; }}
                      className="absolute left-6 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-text-1 z-10 opacity-0"
                    />
                    {/* Dot ring pulse */}
                    <div
                      ref={(el) => { if (el) dotRingsRef.current[i] = el; }}
                      className="absolute left-6 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 border border-text-3 z-[9] opacity-0"
                    />

                    {/* Connector */}
                    <div
                      ref={(el) => { if (el) connectorRefs.current[i] = el; }}
                      className={`absolute h-px bg-border-hi opacity-0 z-[8] left-6 origin-left ${
                        isLeft
                          ? "md:left-1/2 md:origin-left"
                          : "md:left-auto md:right-1/2 md:origin-right"
                      }`}
                      style={{
                        top: "50%",
                        width: "3.5rem",
                        transform: "scaleX(0)",
                      }}
                    />

                    {/* Content */}
                    <div
                      className={`flex items-center flex-col ${
                        isLeft ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      {/* Card side */}
                      <div
                        className={`w-full md:w-[calc(50%-2.5rem)] pointer-events-auto text-left ${
                          isLeft ? "md:text-right" : "md:text-left"
                        }`}
                      >
                        <div
                          ref={(el) => { if (el) cardRefs.current[i] = el; }}
                          className="inline-block px-5 py-4 rounded-none"
                          style={{ textAlign: "left", willChange: "transform" }}
                        >
                          {/* Motif background */}
                          <div
                            ref={(el) => { if (el) motifRefs.current[i] = el; }}
                            className={`absolute -z-10 opacity-0 top-1/2 -translate-y-1/2 ${
                              isLeft ? "left-[-1.5rem] md:left-auto md:right-[-2rem]" : "left-[-1.5rem] md:left-[-2rem]"
                            }`}
                          >
                            <MotifSVG type={m.motif} />
                          </div>

                          <span
                            ref={(el) => { if (el) yearRefs.current[i] = el; }}
                            className="tl-year font-mono text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-text-4 block mb-2 opacity-0"
                          >
                            {m.year}
                          </span>
                          <h3
                            ref={(el) => { if (el) titleRefs.current[i] = el; }}
                            className="tl-title text-xl md:text-[1.35rem] font-medium text-text-1 tracking-[-0.02em] mb-1 opacity-0"
                          >
                            {m.title}
                          </h3>
                          <span
                            ref={(el) => { if (el) institutionRefs.current[i] = el; }}
                            className="tl-institution block text-[0.8rem] text-text-3 mb-2.5 opacity-0"
                          >
                            {m.institution}
                          </span>
                          <p
                            ref={(el) => { if (el) descRefs.current[i] = el; }}
                            className="tl-description text-text-2 text-[0.82rem] leading-[1.7] max-w-none md:max-w-[320px] opacity-0"
                          >
                            {m.description}
                          </p>
                        </div>
                      </div>

                      {/* Empty half */}
                      <div className="hidden md:block w-[calc(50%-2.5rem)]" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
