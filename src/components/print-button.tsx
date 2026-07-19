"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-text-3 hover:text-text-1 transition-colors print:hidden"
    >
      Print / Save PDF →
    </button>
  );
}
