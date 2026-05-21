import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BookOpen, Lightbulb, Sparkles, Wand2 } from "lucide-react";

export const Route = createFileRoute("/dashboard/research")({ component: Research });

function Research() {
  const [topic, setTopic] = useState("Adoption of AI productivity tools in mid-market SaaS");
  const [source, setSource] = useState("Mid-market SaaS companies are increasingly adopting AI productivity tools, with 64% piloting them in 2025…");
  const [out, setOut] = useState<{ summary: string; insights: string[]; simple: string } | null>(null);

  const run = () => setOut({
    summary: `Executive summary: ${topic}. The market is rapidly maturing. Key drivers are time-saving for IC work, asynchronous collaboration, and ROI clarity. Vendors win on integration depth and trust.`,
    insights: [
      "Pilot-to-deploy conversion improves when AI is embedded in existing tools.",
      "Wellbeing features (focus mode, break suggestions) increase retention by 22%.",
      "Buyers prioritize data residency and audit trails over raw model power.",
    ],
    simple: "Companies are quickly trying AI to save time. The ones that stick around are the ones that fit into existing tools and protect privacy.",
  });

  return (
    <div className="space-y-6">
      <div>
        <Badge variant="outline" className="rounded-full"><BookOpen className="mr-1 h-3 w-3 text-emerald-500" /> Research Assistant</Badge>
        <h1 className="mt-2 text-3xl font-bold">Make sense of <span className="text-gradient">anything</span></h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-2xl p-6 space-y-3">
          <Input value={topic} onChange={e => setTopic(e.target.value)} placeholder="Research topic" />
          <Textarea rows={12} value={source} onChange={e => setSource(e.target.value)} placeholder="Paste article or notes…" />
          <div className="flex gap-2">
            <Button onClick={run} className="rounded-xl gradient-brand text-primary-foreground"><Wand2 className="mr-2 h-4 w-4" /> Generate insights</Button>
            <Button variant="outline" onClick={run} className="rounded-xl"><Lightbulb className="mr-2 h-4 w-4" /> Explain simply</Button>
          </div>
        </Card>
        <Card className="rounded-2xl p-6">
          {!out ? <div className="grid h-full place-items-center text-sm text-muted-foreground">Insights will appear here.</div> : (
            <div className="space-y-5">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Executive summary</div>
                <p className="mt-2 text-sm">{out.summary}</p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Key insights</div>
                <ul className="mt-2 space-y-2">
                  {out.insights.map(i => <li key={i} className="flex items-start gap-2 rounded-lg border border-border/60 p-3 text-sm"><Sparkles className="mt-0.5 h-4 w-4 text-emerald-500 shrink-0" />{i}</li>)}
                </ul>
              </div>
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
                <div className="text-xs font-semibold">Explain simply</div>
                <p className="mt-1 text-sm text-muted-foreground">{out.simple}</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
