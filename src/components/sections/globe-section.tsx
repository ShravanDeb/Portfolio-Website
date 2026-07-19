"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Globe, { type GlobeLocation } from "@/components/ui/globe";

gsap.registerPlugin(ScrollTrigger);

const LOCATIONS: GlobeLocation[] = [
  { name: "Guwahati, India", shortName: "IN", lat: 26.1445, lon: 91.7362, countryCode: "in" },
  { name: "London, UK", shortName: "UK", lat: 51.5074, lon: -0.1278, countryCode: "gb" },
  { name: "Washington, US", shortName: "US", lat: 38.9072, lon: -77.0369, countryCode: "us" },
];

export default function GlobeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const [activeLocation, setActiveLocation] = useState<GlobeLocation>(LOCATIONS[0]);

  const handleLocationClick = useCallback((loc: GlobeLocation) => {
    setActiveLocation(loc);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (subtextRef.current) {
        gsap.fromTo(
          subtextRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: subtextRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative px-6 py-32 md:py-48">
      <div className="mx-auto max-w-[1100px]">
        <div className="grid gap-16 md:grid-cols-2 md:items-center">
          {/* Text */}
          <div>
            <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-text-4 block mb-6">
              Availability
            </span>
            <h2
              ref={headingRef}
              className="text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-text-1 mb-6"
            >
              Available
              <br />
              globally
            </h2>
            <p
              ref={subtextRef}
              className="text-text-3 text-sm leading-relaxed max-w-[380px] mb-10"
            >
              Adaptable across time zones. Based in Guwahati, India — working
              with teams across the UK and US. Ready for international projects.
            </p>

            {/* Time zone rows */}
            <div className="flex flex-col gap-4">
              {LOCATIONS.map((loc) => (
                <button
                  key={loc.shortName}
                  onClick={() => handleLocationClick(loc)}
                  className={`group flex items-center gap-4 text-left transition-colors ${
                    activeLocation.shortName === loc.shortName
                      ? "text-text-1"
                      : "text-text-4 hover:text-text-2"
                  }`}
                >
                  <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.15em] w-8">
                    {loc.shortName}
                  </span>
                  <span
                    className={`h-px transition-all duration-300 ${
                      activeLocation.shortName === loc.shortName
                        ? "w-8 bg-text-1"
                        : "w-3 bg-text-4 group-hover:w-5 group-hover:bg-text-2"
                    }`}
                  />
                  <span className="text-sm">{loc.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Globe */}
          <div className="flex justify-center">
            <Globe
              className="w-full max-w-[420px]"
              locations={LOCATIONS}
              activeLocation={activeLocation}
              onLocationChange={setActiveLocation}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
