"use client";

import Link from "next/link";
import { useTheme } from "@/components/theme-provider";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

const NAV_LINKS = [
  { href: "/work", label: "01 — Work" },
  { href: "/about", label: "02 — About" },
  { href: "/resume", label: "03 — Resume" },
  { href: "/contact", label: "04 — Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const menuTlRef = useRef<gsap.core.Timeline | null>(null);
  const isAnimating = useRef(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLAnchorElement[]>([]);
  const footerRef = useRef<HTMLDivElement>(null);
  const menuLabelRef = useRef<HTMLSpanElement>(null);
  const closeLabelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Build GSAP timeline once
  useEffect(() => {
    if (!overlayRef.current || !panelRef.current) return;

    const items = navItemsRef.current.filter(Boolean);
    const tl = gsap.timeline({
      paused: true,
      onStart: () => {
        overlayRef.current!.style.pointerEvents = "auto";
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.width = "100%";
      },
      onComplete: () => { isAnimating.current = false; },
      onReverseComplete: () => {
        isAnimating.current = false;
        overlayRef.current!.style.pointerEvents = "none";
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        const y = parseInt(document.body.style.top || "0", 10);
        if (y) window.scrollTo(0, -y);
      },
    });

    // Phase 1: Panel sweeps up from bottom
    tl.fromTo(panelRef.current,
      { scaleY: 0, transformOrigin: "bottom" },
      { scaleY: 1, duration: 0.5, ease: "power4.inOut" },
      0,
    );

    // Phase 2: Nav items stagger up from below
    tl.fromTo(items,
      { yPercent: 120, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.45,
        stagger: 0.06,
        ease: "power3.out",
      },
      0.25,
    );

    // Phase 3: Footer fades in
    if (footerRef.current) {
      tl.fromTo(footerRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
        0.5,
      );
    }

    // Label crossfade
    tl.fromTo(menuLabelRef.current,
      { opacity: 1, y: 0 },
      { opacity: 0, y: -8, duration: 0.15, ease: "power2.in" },
      0,
    );
    tl.fromTo(closeLabelRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" },
      0.1,
    );

    menuTlRef.current = tl;
    return () => { tl.revert(); };
  }, []);

  const toggleMenu = () => {
    if (isAnimating.current) return;
    const tl = menuTlRef.current;
    if (!tl) return;

    isAnimating.current = true;
    if (menuOpen) {
      tl.timeScale(1.8).reverse();
    } else {
      tl.timeScale(1).play();
    }
    setMenuOpen((o) => !o);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-sm"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-[1100px] items-center justify-between px-6">
        {/* ── Logo ── */}
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
                {link.label.split("— ")[1]}
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

        {/* ── Mobile menu trigger ── */}
        <button
          onClick={toggleMenu}
          className="md:hidden relative flex items-center gap-2 h-8"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span className="relative w-5 h-3 flex flex-col justify-between">
            <span className={`block h-px bg-text-1 origin-center transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[5px]" : ""}`} />
            <span className={`block h-px bg-text-1 transition-all duration-200 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block h-px bg-text-1 origin-center transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[5px]" : ""}`} />
          </span>
          <span className="relative overflow-hidden h-4">
            <span
              ref={menuLabelRef}
              className="absolute inset-0 text-[0.7rem] font-mono uppercase tracking-[0.15em] text-text-3 whitespace-nowrap leading-4"
            >
              Menu
            </span>
            <span
              ref={closeLabelRef}
              className="absolute inset-0 text-[0.7rem] font-mono uppercase tracking-[0.15em] text-text-3 whitespace-nowrap leading-4 opacity-0"
            >
              Close
            </span>
          </span>
        </button>
      </div>

      {/* ── Full-screen overlay ── */}
      <div
        ref={overlayRef}
        className="md:hidden fixed inset-0 top-14 z-40 pointer-events-none"
        style={{ pointerEvents: "none" }}
      >
        <div
          ref={panelRef}
          className="absolute inset-0 bg-background flex flex-col"
          style={{ transform: "scaleY(0)", transformOrigin: "bottom" }}
        >
          {/* Nav links */}
          <nav className="flex-1 flex flex-col justify-center px-8">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                ref={(el) => { if (el) navItemsRef.current[i] = el; }}
                href={link.href}
                onClick={toggleMenu}
                className="block py-3 text-[clamp(2rem,7vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em] text-text-1 opacity-0 hover:text-text-2 active:scale-[0.97] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Footer row */}
          <div
            ref={footerRef}
            className="px-8 pb-8 pt-6 border-t border-border flex items-center justify-between text-text-4 text-[0.7rem] font-mono uppercase tracking-[0.12em] opacity-0"
          >
            <span>© {new Date().getFullYear()}</span>
            <AnimatedThemeToggler
              theme={theme}
              onThemeChange={setTheme}
              className="text-text-3 hover:text-text-1 transition-colors"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
