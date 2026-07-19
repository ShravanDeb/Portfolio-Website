"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export interface GlobeLocation {
  name: string;
  shortName: string;
  lat: number;
  lon: number;
  countryCode: string;
}

interface GlobeProps {
  className?: string;
  locations: GlobeLocation[];
  activeLocation: GlobeLocation;
  onLocationChange: (location: GlobeLocation) => void;
}

function interpolateLatLon(
  from: [number, number],
  to: [number, number],
  t: number
): [number, number] {
  const lat = from[0] + (to[0] - from[0]) * t;
  let dLon = to[1] - from[1];
  if (dLon > 180) dLon -= 360;
  if (dLon < -180) dLon += 360;
  const lon = from[1] + dLon * t;
  return [lat, lon];
}

const TWO_PI = Math.PI * 2;

function forwardDelta(from: number, to: number): number {
  const d = ((to - from) % TWO_PI + TWO_PI) % TWO_PI;
  return d < 0.001 ? TWO_PI : d;
}

function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export default function Globe({
  className = "",
  locations,
  activeLocation,
  onLocationChange,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const phiRef = useRef(0);
  const thetaRef = useRef(0.2);
  const targetPhiRef = useRef<number | null>(null);
  const targetThetaRef = useRef<number | null>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const prevLocationRef = useRef<GlobeLocation>(activeLocation);
  const activeLocationRef = useRef(activeLocation);

  const arcAnimRef = useRef<{
    active: boolean;
    startTime: number;
    duration: number;
    from: [number, number];
    to: [number, number];
  }>({
    active: false,
    startTime: 0,
    duration: 1400,
    from: [activeLocation.lat, activeLocation.lon],
    to: [activeLocation.lat, activeLocation.lon],
  });

  useEffect(() => {
    activeLocationRef.current = activeLocation;
  }, [activeLocation]);

  useEffect(() => {
    if (prevLocationRef.current.shortName !== activeLocation.shortName) {
      arcAnimRef.current = {
        active: true,
        startTime: performance.now(),
        duration: 1400,
        from: [prevLocationRef.current.lat, prevLocationRef.current.lon],
        to: [activeLocation.lat, activeLocation.lon],
      };

      const targetLonRad = -(activeLocation.lon * Math.PI) / 180;
      const targetLatRad = (activeLocation.lat * Math.PI) / 180 * 0.4;

      let dPhi = targetLonRad - phiRef.current;
      while (dPhi > Math.PI) dPhi -= TWO_PI;
      while (dPhi < -Math.PI) dPhi += TWO_PI;
      targetPhiRef.current = phiRef.current + dPhi;
      targetThetaRef.current = targetLatRad;

      prevLocationRef.current = activeLocation;
    }
  }, [activeLocation]);

  useEffect(() => {
    let globe: ReturnType<typeof createGlobe> | null = null;
    let rafId: number;

    const onResize = () => {
      if (canvasRef.current) {
        const width = canvasRef.current.offsetWidth;
        const dpr = Math.min(window.devicePixelRatio, 2);
        canvasRef.current.width = width * dpr;
        canvasRef.current.height = width * dpr;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    if (canvasRef.current) {
      const width = canvasRef.current.offsetWidth;
      const dpr = Math.min(window.devicePixelRatio, 2);

      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: dpr,
        width: width * dpr,
        height: width * dpr,
        phi: phiRef.current,
        theta: thetaRef.current,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.1, 0.1, 0.12],
        markerColor: [1, 1, 1],
        glowColor: [0.08, 0.08, 0.1],
        markers: locations.map((loc) => ({
          location: [loc.lat, loc.lon] as [number, number],
          size: loc.shortName === activeLocationRef.current.shortName ? 0.08 : 0.04,
        })),
        arcs: [],
        arcColor: [1, 1, 1],
        arcWidth: 1.2,
        arcHeight: 0.25,
      });

      const update = (now: number) => {
        rafId = requestAnimationFrame(update);

        const isDark =
          document.documentElement.classList.contains("dark") ||
          window.matchMedia("(prefers-color-scheme: dark)").matches;

        const oppositeColor: [number, number, number] = isDark ? [1, 1, 1] : [0.1, 0.1, 0.1];

        if (pointerInteracting.current === null && targetPhiRef.current !== null) {
          let dPhi = targetPhiRef.current - phiRef.current;
          while (dPhi > Math.PI) dPhi -= TWO_PI;
          while (dPhi < -Math.PI) dPhi += TWO_PI;
          phiRef.current += dPhi * 0.04;

          const dTheta = (targetThetaRef.current || 0) - thetaRef.current;
          thetaRef.current += dTheta * 0.04;
        }

        if (pointerInteracting.current === null && targetPhiRef.current === null) {
          phiRef.current += 0.003;
        }

        let currentArcs: { from: [number, number]; to: [number, number] }[] = [];

        if (arcAnimRef.current.active) {
          const elapsed = now - arcAnimRef.current.startTime;
          const progress = Math.min(1, elapsed / arcAnimRef.current.duration);

          if (progress < 1) {
            const easeT = easeInOutQuad(progress);
            const headT = Math.min(1, easeT / 0.75);
            const tailT = Math.max(0, (easeT - 0.55) / 0.45);

            const currentFrom = interpolateLatLon(
              arcAnimRef.current.from,
              arcAnimRef.current.to,
              tailT
            );
            const currentTo = interpolateLatLon(
              arcAnimRef.current.from,
              arcAnimRef.current.to,
              headT
            );

            currentArcs = [{ from: currentFrom, to: currentTo }];
          } else {
            arcAnimRef.current.active = false;
          }
        }

        globe?.update({
          phi: phiRef.current,
          theta: thetaRef.current,
          baseColor: isDark ? [0.1, 0.1, 0.12] : [0.9, 0.9, 0.92],
          markerColor: oppositeColor,
          arcColor: oppositeColor,
          markers: locations.map((loc) => ({
            location: [loc.lat, loc.lon] as [number, number],
            size: loc.shortName === activeLocationRef.current.shortName ? 0.08 : 0.04,
          })),
          arcs: currentArcs,
        });
      };

      rafId = requestAnimationFrame(update);

      setTimeout(() => {
        if (canvasRef.current) canvasRef.current.style.opacity = "1";
      }, 50);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
      if (globe) globe.destroy();
    };
  }, [locations]);

  const onPointerDown = (e: React.PointerEvent) => {
    pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
  };

  const onPointerUp = () => {
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (pointerInteracting.current !== null) {
      const delta = e.clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      phiRef.current += delta * 0.005;
      targetPhiRef.current = null;
    }
  };

  return (
    <div className={`relative aspect-square w-full flex items-center justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerOut={onPointerUp}
        onPointerMove={onPointerMove}
        className="h-full w-full cursor-grab select-none opacity-0 transition-opacity duration-500"
        style={{ width: "100%", height: "100%", contain: "layout paint size" }}
      />
    </div>
  );
}
