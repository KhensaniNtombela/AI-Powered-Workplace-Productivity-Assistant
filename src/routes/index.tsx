import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Brain, CalendarCheck2, CheckCircle2, Clock, Headphones, Layers, Sparkles, Zap, Waves, Mountain, Coffee, Moon, TreePine, Building2, Cloud, Mic2, ListTodo, MessageCircle, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingPlayer } from "@/components/floating-player";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[800px] grid-bg opacity-80" />
      <Navbar />
      <Hero />
      <ProductivityOverview />
      <KeyFeatures />
      <FocusSpaces />
      <AiToolsShowcase />
      <SoundscapesSection />
      <CTASection />
      <Footer />
      <FloatingPlayer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pt-12 pb-24 lg:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Badge variant="secondary" className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-emerald-500">
            <Sparkles className="mr-1.5 h-3 w-3" /> Now with Daily Diary AI
          </Badge>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Work <span className="text-gradient">Smarter</span>.<br />
            Focus <span className="text-gradient">Deeper</span>.<br />
            Achieve <span className="text-gradient">Faster</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            FlowState AI is the workplace productivity assistant that plans your day, blocks distractions, and turns scattered work into pure flow — with AI that respects your energy.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/signup">
              <Button size="lg" className="rounded-xl gradient-brand text-primary-foreground shadow-lg shadow-emerald-500/30 hover:opacity-90">
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/dashboard/ai">
              <Button size="lg" variant="outline" className="rounded-xl">
                <Sparkles className="mr-2 h-4 w-4" /> Try AI Assistant
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Free 14-day Pro trial</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> No credit card required</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> SOC 2 ready</div>
          </div>
        </div>

        <HeroPreview />
      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <div className="relative">
      <div className="absolute -inset-8 -z-10 rounded-[40px] gradient-brand opacity-20 blur-3xl" />
      <div className="glass-strong relative rounded-3xl p-3 shadow-2xl shadow-emerald-500/10">
        <div className="rounded-2xl bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </div>
            <Badge className="rounded-full gradient-brand text-primary-foreground">Today · Tuesday</Badge>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <StatTile icon={<CheckCircle2 className="h-4 w-4 text-emerald-500" />} label="Tasks done" value="14" hint="+4 vs yesterday" />
            <StatTile icon={<Clock className="h-4 w-4 text-cyan-500" />} label="Focus hours" value="4h 32m" hint="2 deep sessions" />
            <StatTile icon={<Zap className="h-4 w-4 text-amber-500" />} label="Flow score" value="92" hint="Excellent" />
          </div>
          <div className="mt-4 rounded-xl border border-border/60 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-semibold">Daily Diary AI</div>
              <Badge variant="outline" className="text-[10px]">just now</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              "You usually finish planning faster in the morning. I rescheduled <span className="text-foreground font-medium">3 admin tasks</span> to 4 PM and protected a 90-min deep work block at 10:30."
            </p>
            <div className="mt-3 flex gap-2">
              <Button size="sm" className="rounded-lg gradient-brand text-primary-foreground">Accept plan</Button>
              <Button size="sm" variant="outline" className="rounded-lg">Refine</Button>
            </div>
          </div>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {[
              { c: "bg-emerald-500", t: "Q3 review deck", s: "Done" },
              { c: "bg-amber-500", t: "Email investors", s: "In progress" },
              { c: "bg-red-500", t: "Sign vendor contract", s: "Overdue" },
              { c: "bg-cyan-500", t: "Deep work — spec v2", s: "10:30 AM" },
            ].map((x) => (
              <div key={x.t} className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/40 px-3 py-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${x.c}`} />
                  <span>{x.t}</span>
                </div>
                <span className="text-xs text-muted-foreground">{x.s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute -bottom-6 -left-6 hidden animate-float md:block">
        <div className="glass-strong flex items-center gap-2 rounded-xl px-3 py-2 text-xs">
          <Headphones className="h-4 w-4 text-emerald-500" />
          Rain + Lo-Fi · 28 min left
        </div>
      </div>
      <div className="absolute -right-4 top-10 hidden animate-float md:block" style={{ animationDelay: "1.2s" }}>
        <div className="glass-strong flex items-center gap-2 rounded-xl px-3 py-2 text-xs">
          <Brain className="h-4 w-4 text-cyan-500" />
          Burnout risk · low
        </div>
      </div>
    </div>
  );
}

function StatTile({ icon, label, value, hint }: { icon: React.ReactNode; label: string; value: string; hint: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-gradient-to-br from-muted/40 to-transparent p-3">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{label}</span>{icon}
      </div>
      <div className="mt-1 text-2xl font-semibold tracking-tight">{value}</div>
      <div className="text-[11px] text-muted-foreground">{hint}</div>
    </div>
  );
}

function ProductivityOverview() {
  const cards = [
    { icon: ListTodo, label: "Tasks completed today", value: "14 / 18", color: "emerald" },
    { icon: Clock, label: "Focus hours", value: "4h 32m", color: "cyan" },
    { icon: Zap, label: "Productivity score", value: "92", color: "amber" },
    { icon: CalendarCheck2, label: "Upcoming deadlines", value: "3 this week", color: "rose" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.label} className="glass group rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{c.label}</span>
              <c.icon className="h-4 w-4 text-foreground/60 group-hover:text-foreground" />
            </div>
            <div className="mt-2 text-3xl font-semibold tracking-tight">{c.value}</div>
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full gradient-brand" style={{ width: `${60 + Math.random() * 30}%` }} />
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function KeyFeatures() {
  const features = [
    { icon: Mountain, title: "Focus Environments", desc: "Step into curated worlds — mountain lake, rainy café, cozy night room — that calm the mind and sharpen attention." },
    { icon: Waves, title: "Adaptive Soundscapes", desc: "Mix rain, thunder, theta waves and café ambience with real-time sliders engineered for deep work." },
    { icon: Mic2, title: "Workspace Audio Control", desc: "A floating mini-player keeps Spotify, Apple Music and YouTube one tap away — even in fullscreen focus." },
    { icon: Brain, title: "AI Productivity Assistant", desc: "Daily Diary reflects, plans and coaches you with prompt-engineered intelligence tuned for work." },
    { icon: CalendarCheck2, title: "Smart Planning", desc: "Drag-and-drop tasks, AI scheduling, and a calendar that color-codes done, in-progress and overdue." },
    { icon: Layers, title: "AI Workflow Automation", desc: "Generate emails, summarize meetings, and research topics with executive-grade outputs in seconds." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="outline" className="rounded-full">Capabilities</Badge>
        <h2 className="mt-4 text-4xl font-bold sm:text-5xl">Everything you need to <span className="text-gradient">stay in flow</span></h2>
        <p className="mt-4 text-muted-foreground">A premium productivity OS that blends AI, focus environments and wellbeing into one calm workspace.</p>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <Card key={f.title} className="group relative overflow-hidden rounded-2xl border-border/60 p-6 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full gradient-brand opacity-0 blur-2xl transition-opacity group-hover:opacity-30" />
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border/60 bg-muted/50">
              <f.icon className="h-5 w-5 text-foreground/80" />
            </div>
            <h3 className="text-lg font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            <div className="mt-4 flex items-center text-sm font-medium text-emerald-500 opacity-0 transition-opacity group-hover:opacity-100">
              Explore <ChevronRight className="ml-1 h-4 w-4" />
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function FocusSpaces() {
  const spaces = [
    { name: "Mountain Lake", icon: Mountain, gradient: "from-sky-500 via-cyan-400 to-emerald-400" },
    { name: "Rainy Café", icon: Coffee, gradient: "from-amber-500 via-orange-500 to-rose-500" },
    { name: "Cozy Night Room", icon: Moon, gradient: "from-indigo-600 via-purple-600 to-fuchsia-500" },
    { name: "Sunset Workspace", icon: Cloud, gradient: "from-rose-500 via-orange-400 to-amber-300" },
    { name: "Modern Office", icon: Building2, gradient: "from-slate-700 via-slate-500 to-emerald-400" },
    { name: "Forest Ambience", icon: TreePine, gradient: "from-emerald-700 via-emerald-500 to-lime-400" },
  ];
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Badge variant="outline" className="rounded-full">Focus Spaces</Badge>
          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">Choose your <span className="text-gradient">environment</span></h2>
          <p className="mt-3 max-w-xl text-muted-foreground">Immersive cinematic spaces with ambient motion, a focus timer, floating music and your current task always in view.</p>
        </div>
        <Link to="/dashboard/focus"><Button variant="outline" className="rounded-xl">Open Focus Mode <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {spaces.map((s) => (
          <div key={s.name} className="group relative h-56 overflow-hidden rounded-2xl border border-border/60">
            <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} transition-transform duration-700 group-hover:scale-110`} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),transparent_60%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white">
              <div>
                <div className="text-xs uppercase tracking-widest opacity-80">Ambient · 90 min</div>
                <div className="text-xl font-semibold">{s.name}</div>
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-full bg-white/15 backdrop-blur transition-transform group-hover:scale-110">
                <s.icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AiToolsShowcase() {
  const tools = [
    { icon: Sparkles, title: "Smart Email Generator", desc: "Tone, audience, subject — drafted in seconds." },
    { icon: MessageCircle, title: "Daily Diary Chatbot", desc: "Reflect, plan and decompress with workplace-tuned AI." },
    { icon: Brain, title: "Research Assistant", desc: "Summarize, simplify and surface insights from any text." },
    { icon: ListTodo, title: "Meeting Summarizer", desc: "Action items, owners and deadlines — auto-extracted." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="glass-strong relative overflow-hidden rounded-3xl p-8">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full gradient-brand opacity-30 blur-3xl" />
          <Badge variant="outline" className="rounded-full">AI Tools</Badge>
          <h3 className="mt-3 text-3xl font-bold">Prompt-engineered for <span className="text-gradient">real work</span></h3>
          <p className="mt-3 text-muted-foreground">A focused toolkit instead of a single empty chatbox. Every tool ships with structured prompts, tone controls and exportable outputs.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {tools.map(t => (
              <div key={t.title} className="rounded-2xl border border-border/60 bg-card/60 p-4 transition-colors hover:bg-card">
                <t.icon className="h-5 w-5 text-emerald-500" />
                <div className="mt-2 text-sm font-semibold">{t.title}</div>
                <div className="text-xs text-muted-foreground">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-strong rounded-3xl p-6">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Daily Diary · live preview</div>
          <div className="mt-4 space-y-3">
            <ChatBubble who="ai">Hi, I'm Daily Diary 🌿 — how is your energy this morning?</ChatBubble>
            <ChatBubble who="me">Honestly drained. Three meetings and the deck is unfinished.</ChatBubble>
            <ChatBubble who="ai">Got it. I moved your standup to async, blocked 10:30–12:00 for the deck, and queued a 15-min recovery break with rainfall ambience at 13:00. Want me to draft the async update?</ChatBubble>
            <ChatBubble who="me">Yes please.</ChatBubble>
            <ChatBubble who="ai" typing>Drafting…</ChatBubble>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChatBubble({ who, children, typing }: { who: "me" | "ai"; children: React.ReactNode; typing?: boolean }) {
  const mine = who === "me";
  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${mine ? "gradient-brand text-primary-foreground" : "bg-muted text-foreground"}`}>
        {children}
        {typing && (
          <span className="ml-2 inline-flex gap-1 align-middle">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" style={{ animationDelay: "120ms" }} />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" style={{ animationDelay: "240ms" }} />
          </span>
        )}
      </div>
    </div>
  );
}

function SoundscapesSection() {
  const sounds = ["Rain", "Thunder", "Ocean", "Wind", "White Noise", "Café", "Fireplace", "Theta", "Delta"];
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <Badge variant="outline" className="rounded-full">Adaptive Sound Engine</Badge>
          <h3 className="mt-3 text-4xl font-bold">Mix your <span className="text-gradient">perfect quiet</span></h3>
          <p className="mt-3 max-w-xl text-muted-foreground">Layer ambient textures with brainwave entrainment to enter deep work faster. Each sound is volume-controlled and visually responsive.</p>
        </div>
        <Card className="glass rounded-2xl p-6">
          <div className="grid grid-cols-3 gap-4">
            {sounds.map((s, i) => (
              <div key={s} className="rounded-xl border border-border/60 bg-card/60 p-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">{s}</span>
                  <span className="text-muted-foreground">{20 + i * 7}%</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full gradient-brand" style={{ width: `${20 + i * 7}%` }} />
                </div>
                <div className="mt-2 flex h-6 items-end gap-0.5">
                  {Array.from({ length: 16 }).map((_, k) => (
                    <span key={k} className="w-0.5 rounded-full bg-emerald-500/70 animate-pulse" style={{ height: `${20 + ((k + i) * 11) % 80}%`, animationDelay: `${k * 60}ms` }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="relative overflow-hidden rounded-3xl gradient-brand p-10 text-primary-foreground sm:p-14">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="relative grid items-center gap-6 lg:grid-cols-[1fr_auto]">
          <div>
            <h3 className="text-3xl font-bold sm:text-4xl">Your calmest, most productive workday — starts in one click.</h3>
            <p className="mt-3 max-w-2xl opacity-90">Join thousands of professionals using FlowState AI to plan smarter, focus deeper, and protect their energy.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/signup"><Button size="lg" variant="secondary" className="rounded-xl">Get Started Free</Button></Link>
            <Link to="/pricing"><Button size="lg" variant="outline" className="rounded-xl border-white/40 bg-white/10 text-white hover:bg-white/20">See Pricing</Button></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
