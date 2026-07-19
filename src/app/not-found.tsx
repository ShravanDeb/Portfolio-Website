import Link from "next/link";
import NoiseOverlay from "@/components/noise-overlay";

export default function NotFound() {
  return (
    <>
      <NoiseOverlay />
      <main className="min-h-screen flex flex-col justify-center px-6">
        <div className="mx-auto w-full max-w-[1100px]">
          <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-text-4 block mb-6">
            404
          </span>
          <h1 className="text-[clamp(3.5rem,10vw,9rem)] font-medium leading-[0.88] tracking-[-0.04em] text-text-1 mb-8">
            Not found
          </h1>
          <p className="text-text-2 text-base leading-relaxed mb-12 max-w-[480px]">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-text-2 hover:text-text-1 transition-colors"
          >
            <span>Return home</span>
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>
      </main>
    </>
  );
}
