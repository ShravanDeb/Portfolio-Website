"use client";

import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";

export interface GlobeLocation {
  name: string;
  shortName: string;
  lat: number;
  lon: number;
  /** ISO 3166-1 alpha-2 code (e.g. "US", "JP", "FR"), used to look up the
   * flag image. If omitted, no flag is shown for this location. */
  countryCode?: string;
  /** IANA timezone (e.g. "Asia/Kolkata", "Europe/London") for live clock. */
  tz?: string;
}

interface GlobeProps {
  className?: string;
  locations: GlobeLocation[];
  activeLocation?: GlobeLocation;
  onLocationChange?: (location: GlobeLocation) => void;
}

interface Angles {
  phi: number;
  theta: number;
}

function locationToAngles(lat: number, lon: number): Angles {
  return {
    phi: Math.PI - ((lon * Math.PI) / 180 - Math.PI / 2),
    theta: Math.PI / 2 - (lat * Math.PI) / 180,
  };
}

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255,
      ]
    : [0, 0, 0];
}

// Define explicit configurations for both theme states
const GLOBE_CONFIGS = {
  // Explicitly using existing configuration for light mode
  light: {
    dark: 1,
    diffuse: 1.2,
    mapBrightness: 1.2,
    mapBaseBrightness: 0.05,
    baseColor: [1, 1, 1] as [number, number, number],
    markerColor: [1, 1, 1] as [number, number, number],
    glowColor: hexToRgb("#09090b"),
    tooltipBg: "rgba(9, 9, 11, 0.92)",
    tooltipBorder: "rgba(63, 63, 70, 0.5)",
    tooltipText: "#fafafa",
    tooltipSubtext: "#a1a1aa",
    markerDot: "#fafafa",
  },
  // Explicitly using white base with black dots for dark mode
  dark: {
    dark: 0,
    diffuse: 1.2,
    mapBrightness: 6,
    mapBaseBrightness: 0,
    baseColor: [1, 1, 1] as [number, number, number],
    markerColor: [0, 0, 0] as [number, number, number],
    glowColor: hexToRgb("#ffffff"),
    tooltipBg: "rgba(255, 255, 255, 0.92)",
    tooltipBorder: "rgba(228, 228, 231, 0.8)",
    tooltipText: "#09090b",
    tooltipSubtext: "#52525b",
    markerDot: "#09090b",
  },
};

const TWO_PI = Math.PI * 2;
const IDLE_THETA = 0.15;
const AUTO_SPEED = 0.003;
const FOCUS_MIN_MS = 1800;
const FOCUS_MAX_MS = 3200;
const HOLD_MS = 800;
const RESUME_MS = 1200;

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeInQuad(t: number): number {
  return t * t;
}

function forwardDelta(from: number, to: number): number {
  const d = ((to - from) % TWO_PI + TWO_PI) % TWO_PI;
  return d < 0.001 ? TWO_PI : d;
}

const GLOBE_R = 0.8;
const MARKER_ELEVATION = 0.05;

function latLonTo3D(lat: number, lon: number): [number, number, number] {
  const latRad = (lat * Math.PI) / 180;
  const lonRad = (lon * Math.PI) / 180 - Math.PI;
  const cosLat = Math.cos(latRad);
  return [
    -cosLat * Math.cos(lonRad),
    Math.sin(latRad),
    cosLat * Math.sin(lonRad),
  ];
}

interface ScreenPoint {
  x: number;
  y: number;
  visible: boolean;
}

function projectToScreen(
  lat: number,
  lon: number,
  phi: number,
  theta: number,
  aspect: number
): ScreenPoint {
  const r = GLOBE_R + MARKER_ELEVATION;
  const [x0, y0, z0] = latLonTo3D(lat, lon);
  const px = x0 * r;
  const py = y0 * r;
  const pz = z0 * r;

  const cx = Math.cos(theta);
  const cy = Math.cos(phi);
  const sx = Math.sin(theta);
  const sy = Math.sin(phi);

  const rx = cy * px + sy * pz;
  const ry = sy * sx * px + cx * py - cy * sx * pz;
  const rz = -sy * cx * px + sx * py + cy * cx * pz;

  return {
    x: (rx / aspect + 1) / 2,
    y: (-ry + 1) / 2,
    visible: rz >= 0 || rx * rx + ry * ry >= GLOBE_R * GLOBE_R,
  };
}

export default function Globe({
  className = "",
  locations,
  activeLocation,
  onLocationChange,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);
  const activeLocationRef = useRef(activeLocation);

  // Theme detection state
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const phiRef = useRef<number | null>(null);
  const thetaRef = useRef<number | null>(null);
  const modeRef = useRef<"auto" | "drag" | "focus" | "hold" | "resume">("auto");

  const focusFromPhiRef = useRef(0);
  const focusToPhiRef = useRef(0);
  const focusStartRef = useRef(0);
  const focusDurRef = useRef(2000);

  const holdStartRef = useRef(0);
  const resumeStartRef = useRef(0);

  const dragStartXRef = useRef(0);
  const dragPhiRef = useRef(0);

  // Watch DOM for automatic theme switching without page refreshes
  useEffect(() => {
    const checkTheme = () => {
      const isDark =
        document.documentElement.classList.contains("dark") ||
        document.documentElement.getAttribute("data-theme") === "dark";
      setTheme(isDark ? "dark" : "light");
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "style"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    activeLocationRef.current = activeLocation;
    if (!activeLocation || !globeRef.current || phiRef.current === null) return;

    const { phi: targetPhi } = locationToAngles(
      activeLocation.lat,
      activeLocation.lon
    );
    const delta = forwardDelta(phiRef.current, targetPhi);

    focusFromPhiRef.current = phiRef.current;
    focusToPhiRef.current = phiRef.current + delta;
    focusStartRef.current = performance.now();
    focusDurRef.current =
      FOCUS_MIN_MS + (delta / TWO_PI) * (FOCUS_MAX_MS - FOCUS_MIN_MS);
    modeRef.current = "focus";
  }, [activeLocation]);

  // Re-instantiate globe when locations change OR when the theme changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = 0;
    let raf = 0;
    let destroyed = false;

    function readWidth() {
      if (canvas!.parentElement) {
        width = canvas!.parentElement.offsetWidth;
      }
    }

    function start() {
      if (destroyed || !canvas) return;

      const initPhi = activeLocation
        ? locationToAngles(activeLocation.lat, activeLocation.lon).phi
        : 0;

      // Preserve existing rotation angles if switching themes mid-spin
      if (phiRef.current === null) phiRef.current = initPhi;
      if (thetaRef.current === null) thetaRef.current = IDLE_THETA;

      const currentConfig = GLOBE_CONFIGS[theme];

      globeRef.current = createGlobe(canvas, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: phiRef.current,
        theta: thetaRef.current,
        dark: currentConfig.dark,
        diffuse: currentConfig.diffuse,
        mapSamples: 16000,
        mapBrightness: currentConfig.mapBrightness,
        mapBaseBrightness: currentConfig.mapBaseBrightness,
        baseColor: currentConfig.baseColor,
        markerColor: currentConfig.markerColor,
        glowColor: currentConfig.glowColor,
        opacity: 1,
      });

      const update = (now: number) => {
        raf = requestAnimationFrame(update);

        if (modeRef.current !== "drag" && thetaRef.current !== null) {
          thetaRef.current += (IDLE_THETA - thetaRef.current) * 0.08;
        }

        if (phiRef.current !== null) {
          if (modeRef.current === "auto") {
            phiRef.current += AUTO_SPEED;
          } else if (modeRef.current === "focus") {
            const elapsed = now - focusStartRef.current;
            const progress = Math.min(elapsed / focusDurRef.current, 1);
            const eased = easeInOutCubic(progress);

            phiRef.current =
              focusFromPhiRef.current +
              (focusToPhiRef.current - focusFromPhiRef.current) * eased;

            if (progress >= 1) {
              phiRef.current = focusToPhiRef.current;
              holdStartRef.current = now;
              modeRef.current = "hold";
            }
          } else if (modeRef.current === "hold") {
            if (now - holdStartRef.current >= HOLD_MS) {
              resumeStartRef.current = now;
              modeRef.current = "resume";
            }
          } else if (modeRef.current === "resume") {
            const elapsed = now - resumeStartRef.current;
            const progress = Math.min(elapsed / RESUME_MS, 1);
            const rampedSpeed = AUTO_SPEED * easeInQuad(progress);

            phiRef.current += rampedSpeed;

            if (progress >= 1) {
              modeRef.current = "auto";
            }
          }
        }

        if (globeRef.current && phiRef.current !== null && thetaRef.current !== null) {
          globeRef.current.update({
            phi: phiRef.current,
            theta: thetaRef.current,
            width: width * 2,
            height: width * 2,
          });
        }

        const loc = activeLocationRef.current;
        if (loc && markerRef.current && phiRef.current !== null && thetaRef.current !== null) {
          const { x, y, visible } = projectToScreen(
            loc.lat,
            loc.lon,
            phiRef.current,
            thetaRef.current,
            1
          );
          markerRef.current.style.left = `${x * 100}%`;
          markerRef.current.style.top = `${y * 100}%`;
          markerRef.current.style.opacity = visible ? "1" : "0";
        } else if (markerRef.current) {
          markerRef.current.style.opacity = "0";
        }
      };

      raf = requestAnimationFrame(update);

      setTimeout(() => {
        canvas.style.opacity = "1";
      }, 50);
    }

    readWidth();

    if (width > 0) {
      start();
    } else {
      const ro = new ResizeObserver(() => {
        readWidth();
        if (width > 0) {
          ro.disconnect();
          start();
        }
      });
      ro.observe(canvas);

      return () => {
        destroyed = true;
        ro.disconnect();
        cancelAnimationFrame(raf);
        globeRef.current?.destroy();
        globeRef.current = null;
      };
    }

    return () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      globeRef.current?.destroy();
      globeRef.current = null;
    };
  }, [locations, theme]); // Added 'theme' to trigger seamless re-initialization

  const handlePointerDown = (e: React.PointerEvent) => {
    if (phiRef.current === null) return;
    modeRef.current = "drag";
    dragStartXRef.current = e.clientX;
    dragPhiRef.current = phiRef.current;
    canvasRef.current!.style.cursor = "grabbing";
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (modeRef.current !== "drag" || phiRef.current === null) return;
    const dx = e.clientX - dragStartXRef.current;
    phiRef.current = dragPhiRef.current + dx / 200;
  };

  const handlePointerUp = () => {
    if (modeRef.current === "drag") {
      modeRef.current = "auto";
    }
    canvasRef.current!.style.cursor = "grab";
  };

  const activeStyles = GLOBE_CONFIGS[theme];

  return (
    <div className={className} style={{ position: "relative" }}>
      <canvas
        ref={canvasRef}
        className="aspect-square w-full opacity-0 transition-opacity duration-1000 [contain:layout_paint_size]"
        style={{ cursor: "grab", borderRadius: "50%" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      />
      <div
        ref={markerRef}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, 8px)",
          opacity: 0,
          pointerEvents: "none",
          zIndex: 10,
          transition: "opacity 0.3s ease",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: -4,
            width: 6,
            height: 6,
            transform: "translateX(-50%)",
            borderRadius: "50%",
            backgroundColor: activeStyles.markerDot,
            boxShadow: "0 0 6px 1px rgba(150, 150, 150, 0.25)",
            transition: "background-color 0.3s ease",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: -4,
              borderRadius: "50%",
              border: `1px solid ${activeStyles.markerDot}`,
              opacity: 0.4,
              animation: "globe-pulse 2.4s cubic-bezier(0, 0, 0.2, 1) infinite",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "5px 10px",
            backgroundColor: activeStyles.tooltipBg,
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: `1px solid ${activeStyles.tooltipBorder}`,
            whiteSpace: "nowrap",
            transition: "background-color 0.3s ease, border-color 0.3s ease",
          }}
        >
          {activeLocation?.countryCode && (
            <img
              src={`https://flagcdn.com/w40/${activeLocation.countryCode.toLowerCase()}.png`}
              alt=""
              width={16}
              height={11}
              style={{ objectFit: "cover", display: "block", flexShrink: 0 }}
            />
          )}
          <span
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: activeStyles.tooltipSubtext,
              transition: "color 0.3s ease",
            }}
          >
            {activeLocation?.shortName}
          </span>
          <div
            style={{
              width: 1,
              height: 8,
              backgroundColor: activeStyles.tooltipBorder,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: 11,
              color: activeStyles.tooltipText,
              fontWeight: 500,
              letterSpacing: "-0.01em",
              transition: "color 0.3s ease",
            }}
          >
            {activeLocation?.name}
          </span>
        </div>
      </div>
    </div>
  );
}
