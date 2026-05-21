import { useEffect, useState } from "react";
import { Music, Pause, Play, SkipBack, SkipForward, Volume2, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export function FloatingPlayer() {
  const [playing, setPlaying] = useState(true);
  const [open, setOpen] = useState(true);
  const [vol, setVol] = useState([60]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setProgress(p => (p + 0.6) % 100), 600);
    return () => clearInterval(id);
  }, [playing]);

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full gradient-brand text-primary-foreground shadow-xl animate-pulse-ring">
        <Music className="h-5 w-5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 w-[320px] overflow-hidden rounded-2xl glass-strong shadow-2xl shadow-black/20">
      <div className="relative h-24 gradient-brand">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.35),transparent_60%)]" />
        <button onClick={() => setOpen(false)} className="absolute right-2 top-2 rounded-md p-1 text-white/80 hover:bg-white/10"><X className="h-4 w-4" /></button>
        <div className="absolute bottom-2 left-3 text-white">
          <div className="text-xs uppercase tracking-widest opacity-80">Now Playing · Spotify</div>
          <div className="text-sm font-semibold">Lo-Fi Deep Focus Mix</div>
        </div>
      </div>
      <div className="p-3">
        <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full gradient-brand transition-all" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button className="grid h-8 w-8 place-items-center rounded-lg hover:bg-accent"><SkipBack className="h-4 w-4" /></button>
            <button onClick={() => setPlaying(p => !p)} className="grid h-9 w-9 place-items-center rounded-full gradient-brand text-primary-foreground">
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <button className="grid h-8 w-8 place-items-center rounded-lg hover:bg-accent"><SkipForward className="h-4 w-4" /></button>
          </div>
          <div className="flex items-center gap-2 pl-2">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <Slider value={vol} onValueChange={setVol} max={100} step={1} className="w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
