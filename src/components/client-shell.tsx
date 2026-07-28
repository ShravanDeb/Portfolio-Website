"use client";

import { usePathname } from "next/navigation";
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

  if (isResume) {
    return <>{children}</>;
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