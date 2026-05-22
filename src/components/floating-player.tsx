import { useEffect, useState } from "react";
import { Music, Pause, Play, SkipBack, SkipForward, Volume2, X, Minus } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { usePlayer } from "@/components/player-provider";

export function FloatingPlayer() {
  const { current, playing, loading, volume, minimised, setVolume, setMinimised, toggle, stop, progress } = usePlayer();
  const [, force] = useState(0);
  useEffect(() => { const id = setInterval(() => force(n => n + 1), 1000); return () => clearInterval(id); }, []);

  // Don't render anything until a track has been chosen
  if (!current) return null;

  if (minimised) {
    return (
      <button onClick={() => setMinimised(false)} className="fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full gradient-brand text-primary-foreground shadow-xl">
        <Music className="h-5 w-5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 w-[320px] overflow-hidden rounded-2xl glass-strong shadow-2xl shadow-black/20">
      <div className="relative h-24 gradient-brand">
        {current.cover && (
          <img src={current.cover} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.35),transparent_60%)]" />
        <div className="absolute right-2 top-2 flex gap-1">
          <button onClick={() => setMinimised(true)} title="Minimise" className="rounded-md p-1 text-white/90 hover:bg-white/10"><Minus className="h-4 w-4" /></button>
          <button onClick={stop} title="Close" className="rounded-md p-1 text-white/90 hover:bg-white/10"><X className="h-4 w-4" /></button>
        </div>
        <div className="absolute bottom-2 left-3 text-white">
          <div className="text-xs uppercase tracking-widest opacity-80">Now playing · {current.source ?? "Local"}</div>
          <div className="text-sm font-semibold truncate max-w-[220px]">{current.title}</div>
        </div>
      </div>
      <div className="p-3">
        <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full gradient-brand transition-all" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button className="grid h-8 w-8 place-items-center rounded-lg hover:bg-accent opacity-50"><SkipBack className="h-4 w-4" /></button>
            <button onClick={toggle} disabled={loading} className="grid h-9 w-9 place-items-center rounded-full gradient-brand text-primary-foreground">
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <button className="grid h-8 w-8 place-items-center rounded-lg hover:bg-accent opacity-50"><SkipForward className="h-4 w-4" /></button>
          </div>
          <div className="flex items-center gap-2 pl-2">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <Slider value={[volume]} onValueChange={([v]) => setVolume(v)} max={100} step={1} className="w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
