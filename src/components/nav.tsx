"use client";

import Link from "next/link";
import { useTheme } from "@/components/theme-provider";
import { useEffect, useState } from "react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

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

        {/* ── Desktop nav ── */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-text-3">
          {NAV_LINKS.map((link, i) => (
            <span key={link.href} className="flex items-center gap-6">
              {i > 0 && <span className="text-border-hi">·</span>}
              <Link href={link.href} className="transition-colors hover:text-text-1" data-magnetic>
                {link.label}
              </Link>
            </span>
          ))}
          <span className="text-border-hi">·</span>
          <AnimatedThemeToggler
            theme={theme}
            onThemeChange={setTheme}
            className="text-text-3 hover:text-text-1 transition-colors"
          />
        </nav>

        {/* ── Mobile hamburger ── */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span className={`block w-5 h-px bg-text-1 transition-all duration-300 ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`block w-5 h-px bg-text-1 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-text-1 transition-all duration-300 ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* ── Mobile menu overlay ── */}
      <div
        className={`md:hidden fixed inset-0 top-16 bg-background/95 backdrop-blur-md transition-all duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-10 text-2xl text-text-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="transition-colors hover:text-text-1"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4">
            <AnimatedThemeToggler
              theme={theme}
              onThemeChange={setTheme}
              className="text-text-3 hover:text-text-1 transition-colors"
            />
          </div>
        </nav>
      </div>
    </header>
  );
}
