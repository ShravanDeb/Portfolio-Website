export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between">
        <span className="text-text-4 text-xs">
          &copy; {new Date().getFullYear()} Shravan Deb
        </span>
        <span className="text-text-4 text-xs">Built with care</span>
      </div>
    </footer>
  );
}
