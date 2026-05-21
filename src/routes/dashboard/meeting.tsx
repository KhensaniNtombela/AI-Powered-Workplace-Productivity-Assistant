import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, FileText, Upload, Wand2 } from "lucide-react";

export const Route = createFileRoute("/dashboard/meeting")({ component: MeetingSum });

const sample = `Alex: We need to ship the v2 spec by Friday. Priya: I can take ownership of the API doc.
Maya: Concerned about scope — what about voice notes? Alex: Move voice notes to v2.1.
Decision: Cut voice notes from v2. Priya owns API doc. QA window Wed-Thu.`;

function MeetingSum() {
  const [text, setText] = useState(sample);
  const [out, setOut] = useState<null | { points: string[]; decisions: string[]; actions: { who: string; what: string; when: string; pri: string }[] }>(null);
  const run = () => {
    setOut({
      points: ["v2 ship date is Friday", "Voice notes deferred to v2.1", "QA window: Wed–Thu"],
      decisions: ["Cut voice notes from v2", "Priya owns API documentation"],
      actions: [
        { who: "Priya", what: "Write API documentation for v2 endpoints", when: "Thu", pri: "High" },
        { who: "Alex", what: "Update spec & notify stakeholders", when: "Wed", pri: "High" },
        { who: "Maya", what: "Prepare QA test plan", when: "Tue", pri: "Med" },
      ],
    });
  };
  return (
    <div className="space-y-6">
      <div>
        <Badge variant="outline" className="rounded-full"><FileText className="mr-1 h-3 w-3 text-emerald-500" /> Meeting Summarizer</Badge>
        <h1 className="mt-2 text-3xl font-bold">Turn meetings into <span className="text-gradient">action</span></h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-2xl p-6">
          <div className="flex items-center justify-between"><div className="font-semibold">Transcript</div>
            <Button size="sm" variant="outline"><Upload className="mr-2 h-3.5 w-3.5" /> Upload</Button>
          </div>
          <Textarea rows={16} value={text} onChange={e => setText(e.target.value)} className="mt-3 font-mono text-sm" />
          <Button onClick={run} className="mt-4 w-full rounded-xl gradient-brand text-primary-foreground"><Wand2 className="mr-2 h-4 w-4" /> Generate summary</Button>
        </Card>
        <Card className="rounded-2xl p-6">
          {!out ? (
            <div className="grid h-full place-items-center text-sm text-muted-foreground">Your AI summary will appear here.</div>
          ) : (
            <div className="space-y-5">
              <Section title="Key points" items={out.points} />
              <Section title="Decisions" items={out.decisions} highlight />
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Action items</div>
                <div className="space-y-2">
                  {out.actions.map(a => (
                    <div key={a.what} className="flex items-start justify-between rounded-xl border border-border/60 p-3">
                      <div>
                        <div className="text-sm font-medium">{a.what}</div>
                        <div className="text-xs text-muted-foreground">{a.who} · due {a.when}</div>
                      </div>
                      <Badge className={`${a.pri==="High"?"bg-red-500":"bg-amber-500"} text-white`}>{a.pri}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function Section({ title, items, highlight }: { title: string; items: string[]; highlight?: boolean }) {
  return (
    <div>
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</div>
      <ul className="space-y-1.5">
        {items.map(i => (
          <li key={i} className={`flex items-start gap-2 rounded-lg p-2 text-sm ${highlight ? "bg-emerald-500/10 text-foreground" : ""}`}>
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500 shrink-0" /> {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
