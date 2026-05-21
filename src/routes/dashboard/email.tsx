import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Copy, Download, Sparkles, Wand2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/email")({ component: EmailGen });

function EmailGen() {
  const [tone, setTone] = useState("formal");
  const [audience, setAudience] = useState("client");
  const [topic, setTopic] = useState("Following up on the Q3 proposal and confirming next steps");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      const greet: Record<string, string> = { client: "Hi Alex,", manager: "Hi Priya,", team: "Hey team,", hr: "Hi HR team," };
      const toneOpen: Record<string, string> = {
        formal: "I hope this message finds you well.",
        friendly: "Hope you're having a great week!",
        persuasive: "I wanted to share an opportunity I think you'll find compelling.",
        executive: "Quick update on where we stand and what I need from you.",
        urgent: "Time-sensitive — could use your input today.",
      };
      setSubject(`${tone === "urgent" ? "[Action needed] " : ""}${topic.split(" ").slice(0, 6).join(" ")}…`);
      setBody(
        `${greet[audience]}\n\n${toneOpen[tone]}\n\n${topic}. Below is a brief summary and the proposed next steps:\n\n• Recap of the current status\n• Two options with trade-offs\n• A clear recommendation and timeline\n\nCould you confirm by end of week? Happy to jump on a 15-minute call if helpful.\n\nBest,\nAda`,
      );
      setLoading(false);
    }, 700);
  };

  const copy = () => { navigator.clipboard.writeText(`${subject}\n\n${body}`); toast.success("Copied to clipboard"); };

  return (
    <div className="space-y-6">
      <div>
        <Badge variant="outline" className="rounded-full"><Sparkles className="mr-1 h-3 w-3 text-emerald-500" /> AI Email Generator</Badge>
        <h1 className="mt-2 text-3xl font-bold">Draft a <span className="text-gradient">professional email</span></h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-2xl p-6">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["formal","friendly","persuasive","executive","urgent"].map(o => <SelectItem key={o} value={o}>{o[0].toUpperCase()+o.slice(1)}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Audience</Label>
                <Select value={audience} onValueChange={setAudience}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["client","manager","team","hr"].map(o => <SelectItem key={o} value={o}>{o.toUpperCase()}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>What is this email about?</Label>
              <Textarea rows={5} value={topic} onChange={e => setTopic(e.target.value)} />
            </div>
            <Button onClick={generate} className="rounded-xl gradient-brand text-primary-foreground" disabled={loading}>
              <Wand2 className="mr-2 h-4 w-4" /> {loading ? "Generating…" : "Generate email"}
            </Button>
            <p className="text-xs text-muted-foreground">AI-generated content may require human review.</p>
          </div>
        </Card>
        <Card className="rounded-2xl p-6">
          <div className="mb-2 flex items-center justify-between">
            <Label>Subject</Label>
            <div className="flex gap-1">
              <Button size="sm" variant="ghost" onClick={copy}><Copy className="h-3.5 w-3.5" /></Button>
              <Button size="sm" variant="ghost"><Download className="h-3.5 w-3.5" /></Button>
            </div>
          </div>
          <Input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject will appear here…" />
          <Label className="mt-4 block">Body</Label>
          <Textarea rows={14} value={body} onChange={e => setBody(e.target.value)} placeholder="Your generated email…" className="font-mono text-sm" />
          <div className="mt-3 flex flex-wrap gap-2">
            {["Make it shorter","More confident","Add a CTA","Translate to Spanish"].map(s => (
              <Button key={s} size="sm" variant="outline" className="rounded-full">{s}</Button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
