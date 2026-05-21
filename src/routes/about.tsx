import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Sparkles, Target, Users } from "lucide-react";

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="mx-auto max-w-5xl px-6 pt-10 pb-24">
        <Badge variant="outline" className="rounded-full">About</Badge>
        <h1 className="mt-4 text-5xl font-bold">We build calm software for <span className="text-gradient">demanding work.</span></h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          FlowState AI exists to give knowledge workers a workspace that respects their attention. Our mission is to make deep work the default — with AI that assists, never overwhelms.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {[
            { I: Target, t: "Our mission", d: "Help every professional reach flow daily through focus environments, AI planning and wellbeing tools." },
            { I: Sparkles, t: "AI philosophy", d: "Tools, not toys. Structured prompts beat empty chatboxes — every AI surface ships with guardrails." },
            { I: Shield, t: "Responsible AI", d: "Privacy by default, transparent limitations, human-in-the-loop on every important decision." },
            { I: Users, t: "The team", d: "A small distributed team of engineers, designers and researchers who care deeply about craft." },
          ].map(({ I, t, d }) => (
            <Card key={t} className="rounded-2xl p-6">
              <I className="h-5 w-5 text-emerald-500" />
              <div className="mt-3 text-lg font-semibold">{t}</div>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </Card>
          ))}
        </div>

        <Card className="mt-10 rounded-2xl border-emerald-500/30 bg-emerald-500/5 p-6">
          <div className="text-sm font-semibold">Responsible AI notice</div>
          <p className="mt-1 text-sm text-muted-foreground">FlowState AI may generate inaccurate or incomplete content. Always review AI outputs before sharing or acting on them. We never train on your private workspace data.</p>
        </Card>
      </section>
      <Footer />
    </div>
  );
}
