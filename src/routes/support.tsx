import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LifeBuoy, MessageSquare, Search, Sparkles } from "lucide-react";

export const Route = createFileRoute("/support")({ component: SupportPage });

const faqs = [
  ["Can I use FlowState AI without signing up?", "Yes — Guest mode unlocks core tools with daily request limits and no saved history."],
  ["Does Daily Diary store my conversations?", "Only for signed-in users, and always encrypted. You can clear history any time."],
  ["What AI models power FlowState?", "We blend best-in-class LLMs with structured prompt engineering tuned for workplace tasks."],
  ["Is FlowState safe for sensitive work?", "Yes. SOC 2 ready, regional data residency, and Responsible-AI guardrails on every tool."],
  ["Can I bring my own music?", "Connect Spotify, Apple Music or YouTube Music to the floating workspace player."],
];

function SupportPage() {
  const [q, setQ] = useState("");
  const filtered = faqs.filter(([t]) => t.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-24">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="rounded-full"><LifeBuoy className="mr-1 h-3 w-3" /> Support</Badge>
          <h1 className="mt-4 text-5xl font-bold">How can we <span className="text-gradient">help?</span></h1>
          <div className="relative mx-auto mt-6 max-w-lg">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search articles, guides, troubleshooting…" className="h-12 rounded-xl pl-9" />
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[
            { t: "Getting Started", d: "Sign in, set up your workspace, run your first focus session." },
            { t: "AI Tools", d: "Email, meeting, research and Daily Diary — prompts and tips." },
            { t: "Billing", d: "Plans, invoices, upgrades, refunds." },
          ].map(c => (
            <Card key={c.t} className="rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-xl">
              <Sparkles className="h-5 w-5 text-emerald-500" />
              <div className="mt-3 text-lg font-semibold">{c.t}</div>
              <div className="text-sm text-muted-foreground">{c.d}</div>
            </Card>
          ))}
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <Card className="rounded-2xl p-6">
            <h2 className="text-xl font-semibold">Frequently asked</h2>
            <Accordion type="single" collapsible className="mt-3">
              {filtered.map(([q, a]) => (
                <AccordionItem key={q} value={q}>
                  <AccordionTrigger>{q}</AccordionTrigger>
                  <AccordionContent>{a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
          <Card className="rounded-2xl p-6">
            <div className="flex items-center gap-2"><MessageSquare className="h-5 w-5 text-emerald-500" /><h2 className="text-xl font-semibold">Contact our team</h2></div>
            <form className="mt-4 grid gap-3" onSubmit={e => { e.preventDefault(); alert("Thanks — we'll be in touch."); }}>
              <Input placeholder="Your name" required />
              <Input type="email" placeholder="Work email" required />
              <Textarea placeholder="How can we help?" rows={5} required />
              <Button className="rounded-xl gradient-brand text-primary-foreground">Send message</Button>
            </form>
          </Card>
        </div>
      </section>
      <Footer />
    </div>
  );
}
