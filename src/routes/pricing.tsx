import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/pricing")({ component: PricingPage });

const plans = [
  { name: "Starter", price: "$0", tag: "Free forever",
    features: ["20 AI requests / day", "Basic Pomodoro & sounds", "Daily Diary (limited)", "Single workspace"],
    cta: "Start free" },
  { name: "Pro", price: "$12", tag: "Most popular", featured: true,
    features: ["Unlimited AI requests", "Full Focus Mode + Spaces", "Adaptive soundscapes", "Smart scheduling & analytics", "Calendar integrations"],
    cta: "Start 14-day trial" },
  { name: "Enterprise", price: "Custom", tag: "For teams",
    features: ["Team collaboration", "AI workflow automation", "Advanced reporting", "SSO + admin controls", "Dedicated success manager"],
    cta: "Talk to sales" },
];

function PricingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="mx-auto max-w-7xl px-6 pt-10 pb-24">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="rounded-full">Pricing</Badge>
          <h1 className="mt-4 text-5xl font-bold sm:text-6xl">Simple plans. <span className="text-gradient">Serious flow.</span></h1>
          <p className="mt-4 text-muted-foreground">Start free. Upgrade when you're ready for unlimited AI and full focus mode.</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {plans.map(p => (
            <Card key={p.name} className={`relative rounded-3xl p-7 transition-all hover:-translate-y-1 ${p.featured ? "border-emerald-500/40 shadow-xl shadow-emerald-500/10 glow-ring" : ""}`}>
              {p.featured && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full gradient-brand text-primary-foreground"><Sparkles className="mr-1 h-3 w-3" /> Recommended</Badge>}
              <div className="text-sm text-muted-foreground">{p.tag}</div>
              <div className="mt-1 text-2xl font-semibold">{p.name}</div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-5xl font-bold tracking-tight">{p.price}</span>
                {p.price !== "Custom" && <span className="text-sm text-muted-foreground">/ month</span>}
              </div>
              <ul className="mt-6 space-y-2.5">
                {p.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm"><Check className="mt-0.5 h-4 w-4 text-emerald-500" /> {f}</li>
                ))}
              </ul>
              <Link to="/signup" search={{ redirect: "/pricing" } as any}>
                <Button className={`mt-7 w-full rounded-xl ${p.featured ? "gradient-brand text-primary-foreground" : ""}`} variant={p.featured ? "default" : "outline"}>{p.cta}</Button>
              </Link>
            </Card>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
