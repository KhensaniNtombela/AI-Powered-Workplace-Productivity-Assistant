import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Music } from "lucide-react";

export const Route = createFileRoute("/dashboard/music")({ component: MusicPage });

const sounds = [
  { name: "Rain", emoji: "🌧" }, { name: "Thunder", emoji: "⛈" }, { name: "Ocean Waves", emoji: "🌊" },
  { name: "Wind", emoji: "🍃" }, { name: "White Noise", emoji: "🌀" }, { name: "Café", emoji: "☕" },
  { name: "Fireplace", emoji: "🔥" }, { name: "Theta Waves", emoji: "🧠" }, { name: "Delta Waves", emoji: "💤" },
];

function MusicPage() {
  const [vals, setVals] = useState<Record<string, number>>(Object.fromEntries(sounds.map((s, i) => [s.name, [40, 0, 25, 0, 0, 60, 30, 0, 0][i] ?? 0])));
  return (
    <div className="space-y-6">
      <div>
        <Badge variant="outline" className="rounded-full"><Music className="mr-1 h-3 w-3 text-emerald-500" /> Music & ASMR</Badge>
        <h1 className="mt-2 text-3xl font-bold">Mix your <span className="text-gradient">perfect quiet</span></h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card className="rounded-2xl p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sounds.map(s => {
              const v = vals[s.name] ?? 0;
              return (
                <div key={s.name} className="rounded-xl border border-border/60 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><span className="text-xl">{s.emoji}</span><span className="text-sm font-medium">{s.name}</span></div>
                    <Button size="icon" variant="ghost" onClick={() => setVals(o => ({ ...o, [s.name]: v ? 0 : 50 }))}>
                      {v ? <Volume2 className="h-4 w-4 text-emerald-500" /> : <VolumeX className="h-4 w-4 text-muted-foreground" />}
                    </Button>
                  </div>
                  <Slider value={[v]} onValueChange={([nv]) => setVals(o => ({ ...o, [s.name]: nv }))} max={100} className="mt-3" />
                  <div className="mt-3 flex h-6 items-end gap-0.5">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <span key={i} className="w-0.5 rounded-full transition-all" style={{
                        height: `${v > 0 ? ((v * (60 + (i*13)%40)) / 100) : 4}%`,
                        background: v > 0 ? "linear-gradient(to top, #10b981, #22d3ee)" : "var(--color-border)",
                      }} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="rounded-2xl p-6">
          <div className="text-sm font-semibold">Connected Services</div>
          <div className="mt-3 grid gap-2">
            {["Spotify","Apple Music","YouTube Music"].map(p => (
              <div key={p} className="flex items-center justify-between rounded-xl border border-border/60 p-3">
                <div className="text-sm">{p}</div>
                <Button size="sm" variant="outline">Connect</Button>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl gradient-brand p-4 text-primary-foreground">
            <div className="text-xs uppercase tracking-widest opacity-80">Now playing</div>
            <div className="mt-1 text-sm font-semibold">Lo-Fi Deep Focus Mix</div>
            <div className="text-xs opacity-80">Adaptive · 32 min</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
