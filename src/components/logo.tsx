import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`group flex items-center gap-2 ${className}`}>
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl gradient-brand text-primary-foreground shadow-lg shadow-emerald-500/20 transition-transform group-hover:scale-105">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v3" />
          <path d="M12 19v3" />
          <path d="M4.2 4.2l2.1 2.1" />
          <path d="M17.7 17.7l2.1 2.1" />
          <path d="M2 12h3" />
          <path d="M19 12h3" />
          <path d="M9 12l2 2 4-4" />
        </svg>
        <span className="absolute -inset-0.5 -z-10 rounded-xl bg-gradient-to-br from-emerald-400/40 to-cyan-400/30 blur-md opacity-70 group-hover:opacity-100" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-bold tracking-tight text-foreground">FlowState <span className="text-gradient">AI</span></span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">work · focus · flow</span>
      </span>
    </Link>
  );
}
