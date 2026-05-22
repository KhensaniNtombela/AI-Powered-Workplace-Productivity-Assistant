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
import { toast } from "sonner";

export const Route = createFileRoute("/support")({ component: SupportPage });

const faqs: [string, string][] = [
  ["What is FlowState AI?", "FlowState AI is an AI workplace productivity assistant that helps you plan your day, focus deeply, and reflect on your work — all in one calm, premium workspace."],
  ["Can I use FlowState AI without signing up?", "You can browse most pages without an account, but personalised features (Dashboard, Daily Diary, analytics) require a free account."],
  ["Does Daily Diary store my conversations?", "Yes, for signed-in users, conversations are stored securely in your account so you can revisit them. You can clear history any time from Settings."],
  ["What AI models power FlowState?", "We use a curated mix of best-in-class LLMs (Gemini, GPT-5) through our AI gateway, with structured prompt engineering tuned for workplace tasks."],
  ["Is my data safe?", "Yes. We follow SOC 2-ready practices, encrypt your data in transit and at rest, and apply Responsible-AI guardrails on every tool."],
  ["Can I connect Spotify, Apple Music or YouTube Music?", "Yes — the Music & ASMR page opens your service of choice in a new tab so you can keep your account and playlists."],
  ["How does the Focus Mode work?", "Pick Deep Work, Pomodoro or Sprint, choose an environment and ambient sounds, and the AI helps you protect uninterrupted time."],
  ["What's included in the free plan?", "20 AI requests/day, the core Pomodoro & ambient sound library, and a limited Daily Diary — perfect to try the workflow."],
  ["Can I cancel anytime?", "Yes — plans are monthly with no commitment. Cancel from Settings → Billing and you keep access until the period ends."],
  ["Do you offer team or enterprise plans?", "Yes. Our Enterprise tier adds team collaboration, SSO, admin controls and a dedicated success manager."],
];

function SupportPage() {
  const [q, setQ] = useState("");
  const filtered = faqs.filter(([title, body]) =>
    (title + " " + body).toLowerCase().includes(q.toLowerCase())
  );
  const [sending, setSending] = useState(false);

  const submitContact = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Your message has been delivered.");
    }, 600);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-24">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="rounded-full"><LifeBuoy className="mr-1 h-3 w-3" /> Support</Badge>
          <h1 className="mt-4 text-5xl font-bold">How can we <span className="text-gradient">help?</span></h1>
          <div className="relative mx-auto mt-6 max-w-lg">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search FAQs, guides, troubleshooting…" className="h-12 rounded-xl pl-9" />
          </div>
          {q && <div className="mt-2 text-xs text-muted-foreground">{filtered.length} result{filtered.length !== 1 && "s"}</div>}
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
            {filtered.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">No matching FAQ. Try a different search term, or contact our team.</p>
            ) : (
              <Accordion type="single" collapsible className="mt-3">
                {filtered.map(([title, body]) => (
                  <AccordionItem key={title} value={title}>
                    <AccordionTrigger className="text-left">{title}</AccordionTrigger>
                    <AccordionContent>{body}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </Card>
          <Card className="rounded-2xl p-6">
            <div className="flex items-center gap-2"><MessageSquare className="h-5 w-5 text-emerald-500" /><h2 className="text-xl font-semibold">Contact our team</h2></div>
            <form className="mt-4 grid gap-3" onSubmit={submitContact}>
              <Input name="name" placeholder="Your name" required />
              <Input name="email" type="email" placeholder="Email" required />
              <Textarea name="message" placeholder="How can we help?" rows={5} required />
              <Button disabled={sending} className="rounded-xl gradient-brand text-primary-foreground">{sending ? "Sending…" : "Send message"}</Button>
            </form>
          </Card>
        </div>
      </section>
      <Footer />
    </div>
  );
}
