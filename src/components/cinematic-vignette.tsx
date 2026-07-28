export default function CinematicVignette() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9998]"
      style={{
        background:
          "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.25) 100%)",
      }}
      aria-hidden="true"
    />
  );
}
