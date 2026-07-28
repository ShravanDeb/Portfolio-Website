"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { MagneticCursor } from "@/components/ui/magnetic-cursor";
import SmoothScrollProvider from "@/components/smooth-scroll-provider";
import Preloader from "@/components/preloader";
import CinematicVignette from "@/components/cinematic-vignette";

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isResume = pathname === "/resume";

  useEffect(() => {
    const body = document.body;
    if (isResume) {
      body.style.backgroundColor = "#ffffff";
      body.style.color = "#000000";
    } else {
      body.classList.add("bg-background", "text-foreground", "cursor-none");
    }
    return () => {
      body.style.backgroundColor = "";
      body.style.color = "";
      body.classList.remove("bg-background", "text-foreground", "cursor-none");
    };
  }, [isResume]);

  if (isResume) {
    return (
      <MagneticCursor
        magneticFactor={0.55}
        blendMode="exclusion"
        cursorSize={40}
        contrastBoost={1.5}
        disableOnTouch
      >
        {children}
      </MagneticCursor>
    );
  }

  return (
    <>
      <Preloader />
      <CinematicVignette />
      <ThemeProvider>
        <SmoothScrollProvider>
          <MagneticCursor
            magneticFactor={0.55}
            blendMode="exclusion"
            cursorSize={40}
            contrastBoost={1.5}
            disableOnTouch
          >
            {children}
          </MagneticCursor>
        </SmoothScrollProvider>
      </ThemeProvider>
    </>
  );
}