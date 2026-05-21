import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Sparkles } from "lucide-react";

export const Route = createFileRoute("/dashboard/diary")({ component: Diary });

type Msg = { who: "me" | "ai"; text: string };

function Diary() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { who: "ai", text: "Hi, I'm Daily Diary 🌿  I'm here to help you stay productive, organized, and mentally refreshed throughout your workday." },
    { who: "ai", text: "How are you feeling as you start your day?" },
  ]);
  const [val, setVal] = useState("");
  const [typing, setTyping] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { ref.current?.scrollTo({ top: 99999, behavior: "smooth" }); }, [msgs, typing]);

  const send = () => {
    if (!val.trim()) return;
    const me = val.trim();
    setMsgs(m => [...m, { who: "me", text: me }]);
    setVal("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const reply = me.toLowerCase().includes("tired") || me.toLowerCase().includes("stressed")
        ? "Thanks for sharing. Let's lighten today — I'd suggest a 15-min rainfall break at 11, deferring 2 low-priority tasks, and a short walk after lunch. Want me to apply this plan?"
        : "Love that energy. I've scheduled your deepest work block at 10:30 with lo-fi ambience and protected it from notifications. What's the one outcome you'd love today?";
      setMsgs(m => [...m, { who: "ai", text: reply }]);
    }, 900);
  };

  return (
    <div className="space-y-6">
      <div>
        <Badge variant="outline" className="rounded-full"><MessageCircle className="mr-1 h-3 w-3 text-emerald-500" /> Daily Diary AI</Badge>
        <h1 className="mt-2 text-3xl font-bold">Your <span className="text-gradient">workplace companion</span></h1>
      </div>
      <Card className="rounded-2xl p-0 overflow-hidden">
        <div className="border-b border-border/60 p-4 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full gradient-brand text-primary-foreground"><Sparkles className="h-5 w-5" /></div>
          <div>
            <div className="font-semibold">Daily Diary</div>
            <div className="text-xs text-emerald-500">● Online · workplace-tuned</div>
          </div>
        </div>
        <div ref={ref} className="max-h-[55vh] overflow-y-auto p-5 space-y-3">
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.who === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.who==="me"?"gradient-brand text-primary-foreground":"bg-muted"}`}>{m.text}</div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-muted px-4 py-2.5 text-sm">
                <span className="inline-flex gap-1 align-middle">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" style={{ animationDelay: "120ms" }} />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" style={{ animationDelay: "240ms" }} />
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="border-t border-border/60 p-3 flex gap-2">
          <Input value={val} onChange={e => setVal(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Share what's on your mind…" />
          <Button onClick={send} className="rounded-xl gradient-brand text-primary-foreground"><Send className="h-4 w-4" /></Button>
        </div>
      </Card>
      <p className="text-xs text-muted-foreground">Daily Diary may generate inaccurate content. Please review important suggestions.</p>
    </div>
  );
}
