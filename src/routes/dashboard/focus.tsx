import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pause, Play, RotateCcw, X, Music } from "lucide-react";

export const Route = createFileRoute("/dashboard/focus")({ component: Focus });

const modes = [
  { key: "deep", label: "Deep Work", min: 90 },
  { key: "pomo", label: "Pomodoro", min: 25 },
  { key: "sprint", label: "Sprint", min: 15 },
];

const quotes = [
  "The successful warrior is the average man, with laser-like focus.",
  "Where attention goes, energy flows.",
  "Slow is smooth. Smooth is fast.",
  "Discipline equals freedom.",
];

function Focus() {
  const nav = useNavigate();
  const [mode, setMode] = useState(modes[0]);
  const [left, setLeft] = useState(mode.min * 60);
  const [running, setRunning] = useState(false);
  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);
  const total = mode.min * 60;
  const t = useRef<number | null>(null);

  useEffect(() => { setLeft(mode.min * 60); setRunning(false); }, [mode]);
  useEffect(() => {
    if (!running) { if (t.current) clearInterval(t.current); return; }
    t.current = window.setInterval(() => setLeft(l => Math.max(0, l - 1)), 1000);
    return () => { if (t.current) clearInterval(t.current); };
  }, [running]);

  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  const pct = ((total - left) / total) * 100;
  const r = 140;
  const c = 2 * Math.PI * r;

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* animated background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,#0ea5e9_0%,transparent_50%),radial-gradient(circle_at_70%_80%,#10b981_0%,transparent_55%),radial-gradient(circle_at_50%_50%,#0f172a_0%,#020617_100%)]" />
      <div className="absolute inset-0 -z-10 opacity-20 dot-grid" />
      <div className="absolute -top-32 left-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl animate-float" />

      <div className="flex items-center justify-between p-6">
        <div className="text-sm font-medium tracking-wide opacity-80">FlowState · Focus Mode</div>
        <Button variant="ghost" size="icon" onClick={() => nav({ to: "/dashboard" })} className="text-white hover:bg-white/10"><X className="h-5 w-5" /></Button>
      </div>

      <div className="flex flex-col items-center px-6 pb-12 pt-4">
        <div className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 p-1 backdrop-blur">
          {modes.map(m => (
            <button key={m.key} onClick={() => setMode(m)} className={`rounded-full px-4 py-1.5 text-sm transition-colors ${mode.key===m.key?"bg-white text-slate-900":"text-white/80 hover:text-white"}`}>{m.label}</button>
          ))}
        </div>

        <div className="relative">
          <svg width={320} height={320} className="-rotate-90">
            <circle cx={160} cy={160} r={r} stroke="rgba(255,255,255,0.1)" strokeWidth={10} fill="none" />
            <circle cx={160} cy={160} r={r} stroke="url(#grad)" strokeWidth={10} strokeLinecap="round" fill="none"
                    strokeDasharray={c} strokeDashoffset={c - (c * pct) / 100} className="transition-[stroke-dashoffset] duration-700" />
            <defs>
              <linearGradient id="grad" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-[11px] uppercase tracking-[0.3em] text-white/60">Current task</div>
            <div className="mt-1 text-sm font-semibold">Deep work — spec v2</div>
            <div className="mt-4 font-display text-6xl font-bold tabular-nums tracking-tight">{mm}:{ss}</div>
            <div className="mt-2 text-xs text-white/60">{mode.label} session</div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2">
          <Button variant="ghost" onClick={() => setLeft(mode.min * 60)} className="text-white hover:bg-white/10"><RotateCcw className="h-4 w-4" /></Button>
          <Button onClick={() => setRunning(r => !r)} className="rounded-full px-8 py-6 text-base gradient-brand text-primary-foreground shadow-2xl shadow-emerald-500/40">
            {running ? <><Pause className="mr-2 h-5 w-5" /> Pause</> : <><Play className="mr-2 h-5 w-5" /> Start</>}
          </Button>
          <Button variant="ghost" className="text-white hover:bg-white/10"><Music className="h-4 w-4" /></Button>
        </div>

        <p className="mt-10 max-w-md text-center text-sm italic text-white/70">"{quote}"</p>

        {/* mini player */}
        <div className="mt-10 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 backdrop-blur">
          <div className="h-9 w-9 rounded-lg gradient-brand" />
          <div className="text-xs">
            <div className="font-semibold">Rainfall · Theta Waves</div>
            <div className="text-white/60">Adaptive · 28 min left</div>
          </div>
          <div className="flex gap-0.5">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="w-0.5 rounded-full bg-emerald-400" style={{ height: `${8 + (i*7)%18}px`, animation: `pulse 1.4s ${i*80}ms infinite` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
