import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { toast } from "sonner";

export type Track = {
  id: string;
  title: string;
  artist?: string;
  url: string;
  cover?: string;
  source?: "Local" | "Spotify" | "Apple Music" | "YouTube Music";
};

type PlayerCtx = {
  current: Track | null;
  playing: boolean;
  loading: boolean;
  volume: number;
  minimised: boolean;
  progress: number;
  play: (t: Track) => void;
  toggle: () => void;
  stop: () => void;
  setVolume: (v: number) => void;
  setMinimised: (v: boolean) => void;
  // ambient sounds (loops)
  ambient: Record<string, number>; // name -> volume 0-100
  setAmbient: (name: string, vol: number, url?: string) => void;
};

const Ctx = createContext<PlayerCtx | null>(null);

const ambientRefs: Record<string, HTMLAudioElement> = {};

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [current, setCurrent] = useState<Track | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [volume, setVolumeState] = useState(60);
  const [minimised, setMinimised] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ambient, setAmbientState] = useState<Record<string, number>>({});

  const play = useCallback((t: Track) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
    setLoading(true);
    setCurrent(t);
    setMinimised(false);
    const a = new Audio(t.url);
    a.crossOrigin = "anonymous";
    a.volume = volume / 100;
    audioRef.current = a;
    a.addEventListener("canplay", () => { setLoading(false); setPlaying(true); a.play().catch(() => {}); }, { once: true });
    a.addEventListener("error", () => { setLoading(false); setPlaying(false); toast.error("Could not load audio"); });
    a.addEventListener("timeupdate", () => { if (a.duration) setProgress((a.currentTime / a.duration) * 100); });
    a.addEventListener("ended", () => { setPlaying(false); setProgress(0); });
    a.load();
  }, [volume]);

  const toggle = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) { a.play().catch(() => {}); setPlaying(true); }
    else { a.pause(); setPlaying(false); }
  }, []);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    if (audioRef.current) audioRef.current.src = "";
    setPlaying(false);
    setCurrent(null);
  }, []);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (audioRef.current) audioRef.current.volume = v / 100;
  }, []);

  const setAmbient = useCallback((name: string, vol: number, url?: string) => {
    let a = ambientRefs[name];
    if (vol === 0) {
      if (a) { a.pause(); a.src = ""; delete ambientRefs[name]; }
      setAmbientState(s => ({ ...s, [name]: 0 }));
      return;
    }
    if (!a && url) {
      a = new Audio(url);
      a.loop = true;
      a.crossOrigin = "anonymous";
      ambientRefs[name] = a;
      a.play().catch(() => toast.error(`Could not play ${name}`));
    }
    if (a) a.volume = Math.min(1, vol / 100);
    setAmbientState(s => ({ ...s, [name]: vol }));
  }, []);

  useEffect(() => () => {
    audioRef.current?.pause();
    Object.values(ambientRefs).forEach(a => a.pause());
  }, []);

  return (
    <Ctx.Provider value={{ current, playing, loading, volume, minimised, progress, play, toggle, stop, setVolume, setMinimised, ambient, setAmbient }}>
      {children}
    </Ctx.Provider>
  );
}

export function usePlayer() {
  const c = useContext(Ctx);
  if (!c) throw new Error("usePlayer must be inside PlayerProvider");
  return c;
}
