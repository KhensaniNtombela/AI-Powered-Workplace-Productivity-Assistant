import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Music, Play, Pause, ExternalLink } from "lucide-react";
import { usePlayer } from "@/components/player-provider";
import { TRACKS, AMBIENT_URLS, ENVIRONMENTS } from "@/lib/audio-library";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/music")({ component: MusicPage });

const ambientList = Object.keys(AMBIENT_URLS).map(name => ({
  name, emoji: ({ Rain: "🌧", Thunder: "⛈", "Ocean Waves": "🌊", Wind: "🍃", "White Noise": "🌀", "Café": "☕", Fireplace: "🔥", "Theta Waves": "🧠", "Delta Waves": "💤" } as Record<string,string>)[name] ?? "🎵",
}));

const services: { name: string; url: string }[] = [
  { name: "Spotify", url: "https://open.spotify.com" },
  { name: "Apple Music", url: "https://music.apple.com" },
  { name: "YouTube Music", url: "https://music.youtube.com" },
];

function MusicPage() {
  const player = usePlayer();
  const nav = useNavigate();
  const [env, setEnv] = useState<string | null>(null);

  const playEnv = (name: string) => {
    const e = ENVIRONMENTS.find(x => x.name === name);
    if (!e) return;
    // stop all current ambient
    Object.keys(player.ambient).forEach(s => player.setAmbient(s, 0));
    e.mix.forEach(({ sound, vol }) => player.setAmbient(sound, vol, AMBIENT_URLS[sound]));
    setEnv(name);
    toast.success(`Playing: ${name}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <Badge variant="outline" className="rounded-full"><Music className="mr-1 h-3 w-3 text-emerald-500" /> Music & ASMR</Badge>
        <h1 className="mt-2 text-3xl font-bold">Mix your <span className="text-gradient">perfect quiet</span></h1>
      </div>

      {/* Environments */}
      <Card className="rounded-2xl p-6">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <div className="text-lg font-semibold">Choose your environment</div>
            <div className="text-xs text-muted-foreground">One tap to layer the perfect mix.</div>
          </div>
          {env && <Button variant="outline" size="sm" onClick={() => { Object.keys(player.ambient).forEach(s => player.setAmbient(s, 0)); setEnv(null); }}>Stop ambience</Button>}
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ENVIRONMENTS.map(e => (
            <button key={e.name} onClick={() => playEnv(e.name)} className={`group relative h-32 overflow-hidden rounded-xl border ${env===e.name ? "border-emerald-500" : "border-border/60"}`}>
              <img src={e.cover} alt={e.name} className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-2 left-3 text-left text-white">
                <div className="text-[10px] uppercase tracking-widest opacity-80">Ambient</div>
                <div className="text-sm font-semibold">{e.name}</div>
              </div>
              {env === e.name && <div className="absolute right-2 top-2 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-semibold text-white">Playing</div>}
            </button>
          ))}
        </div>
      </Card>

      {/* Tracks */}
      <Card className="rounded-2xl p-6">
        <div className="mb-4 text-lg font-semibold">Focus tracks</div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TRACKS.map(t => {
            const isCurrent = player.current?.id === t.id;
            return (
              <div key={t.id} className="overflow-hidden rounded-xl border border-border/60">
                <div className="relative h-28">
                  <img src={t.cover} alt={t.title} className="absolute inset-0 h-full w-full object-cover" />
                  <button onClick={() => isCurrent ? player.toggle() : player.play(t)} className="absolute inset-0 grid place-items-center bg-black/30 text-white opacity-0 transition-opacity hover:opacity-100">
                    {isCurrent && player.playing ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                  </button>
                  {isCurrent && <div className="absolute right-2 top-2 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-semibold text-white">{player.playing ? "Playing" : "Paused"}</div>}
                </div>
                <div className="p-3">
                  <div className="truncate text-sm font-semibold">{t.title}</div>
                  <div className="truncate text-xs text-muted-foreground">{t.artist}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* ASMR sliders */}
        <Card className="rounded-2xl p-6">
          <div className="mb-4 text-lg font-semibold">ASMR & soundscapes</div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ambientList.map(s => {
              const v = player.ambient[s.name] ?? 0;
              return (
                <div key={s.name} className="rounded-xl border border-border/60 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><span className="text-xl">{s.emoji}</span><span className="text-sm font-medium">{s.name}</span></div>
                    <Button size="icon" variant="ghost" onClick={() => player.setAmbient(s.name, v ? 0 : 50, AMBIENT_URLS[s.name])}>
                      {v ? <Volume2 className="h-4 w-4 text-emerald-500" /> : <VolumeX className="h-4 w-4 text-muted-foreground" />}
                    </Button>
                  </div>
                  <Slider value={[v]} onValueChange={([nv]) => player.setAmbient(s.name, nv, AMBIENT_URLS[s.name])} max={100} className="mt-3" />
                </div>
              );
            })}
          </div>
        </Card>

        {/* Services */}
        <Card className="rounded-2xl p-6">
          <div className="text-sm font-semibold">Connected services</div>
          <p className="mt-1 text-xs text-muted-foreground">Open your library in a new tab and keep listening alongside FlowState.</p>
          <div className="mt-3 grid gap-2">
            {services.map(p => (
              <div key={p.name} className="flex items-center justify-between rounded-xl border border-border/60 p-3">
                <div className="text-sm">{p.name}</div>
                <Button size="sm" variant="outline" onClick={() => window.open(p.url, "_blank")}>
                  <ExternalLink className="mr-1 h-3.5 w-3.5" /> Connect
                </Button>
              </div>
            ))}
          </div>
          {player.current && (
            <div className="mt-6 rounded-2xl gradient-brand p-4 text-primary-foreground">
              <div className="text-xs uppercase tracking-widest opacity-80">Now playing</div>
              <div className="mt-1 text-sm font-semibold">{player.current.title}</div>
              <div className="text-xs opacity-80">{player.current.artist}</div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
