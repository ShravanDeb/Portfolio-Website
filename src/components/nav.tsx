"use client";

import Link from "next/link";
import { useTheme } from "@/components/theme-provider";
import { useEffect, useState } from "react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-sm"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1100px] items-center justify-between px-6">
        <Link
          href="/"
          className="text-foreground text-sm font-semibold tracking-tight"
          data-magnetic
        >
          SD
        </Link>
        <nav className="flex items-center gap-6 text-sm text-text-3">
          <Link href="/work" className="transition-colors hover:text-text-1" data-magnetic>
            Work
          </Link>
          <span className="text-border-hi">·</span>
          <Link href="/about" className="transition-colors hover:text-text-1" data-magnetic>
            About
          </Link>
          <span className="text-border-hi">·</span>
          <Link href="/resume" className="transition-colors hover:text-text-1" data-magnetic>
            Resume
          </Link>
          <span className="text-border-hi">·</span>
          <Link href="/contact" className="transition-colors hover:text-text-1" data-magnetic>
            Contact
          </Link>
          <span className="text-border-hi">·</span>
          <AnimatedThemeToggler
            theme={theme}
            onThemeChange={setTheme}
            className="text-text-3 hover:text-text-1 transition-colors"
          />
        </nav>
      </div>
    </header>
  );
}
