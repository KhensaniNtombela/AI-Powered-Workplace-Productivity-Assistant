import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Bell, Brain, Calendar, CheckCircle2, Clock, Flame, ListTodo, Sparkles, TrendingUp, Zap } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from "recharts";

export const Route = createFileRoute("/dashboard/")({ component: Overview });

const focusData = [
  { d: "Mon", v: 2.4 }, { d: "Tue", v: 3.1 }, { d: "Wed", v: 4.2 },
  { d: "Thu", v: 3.6 }, { d: "Fri", v: 4.5 }, { d: "Sat", v: 1.4 }, { d: "Sun", v: 2.1 },
];

function Overview() {
  const [snapOpen, setSnapOpen] = useState(false);
  useEffect(() => { const t = setTimeout(() => setSnapOpen(true), 600); return () => clearTimeout(t); }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Badge variant="outline" className="rounded-full">Tuesday, today</Badge>
          <h1 className="mt-2 text-3xl font-bold">Good morning, Ada ☀️</h1>
          <p className="text-sm text-muted-foreground">You're in a 3-day flow streak. Let's make today count.</p>
        </div>
        <div className="flex gap-2">
          <Link to="/dashboard/focus"><Button className="rounded-xl gradient-brand text-primary-foreground"><Zap className="mr-2 h-4 w-4" /> Start Focus</Button></Link>
          <Link to="/dashboard/planner"><Button variant="outline" className="rounded-xl"><Sparkles className="mr-2 h-4 w-4" /> AI Plan my day</Button></Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Stat icon={CheckCircle2} label="Tasks completed" value="14 / 18" trend="+22%" tint="emerald" />
        <Stat icon={Clock} label="Focus hours" value="4h 32m" trend="+0.8h" tint="cyan" />
        <Stat icon={Zap} label="Productivity score" value="92" trend="Excellent" tint="amber" />
        <Stat icon={Calendar} label="Upcoming deadlines" value="3" trend="this week" tint="rose" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="rounded-2xl p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Weekly focus hours</div>
              <div className="text-2xl font-semibold">19h 24m <span className="text-sm font-normal text-emerald-500">+12%</span></div>
            </div>
            <TrendingUp className="h-5 w-5 text-emerald-500" />
          </div>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={focusData}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="d" axisLine={false} tickLine={false} className="text-xs" />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="v" stroke="var(--color-chart-1)" strokeWidth={2} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="rounded-2xl p-6">
          <div className="flex items-center gap-2"><Brain className="h-5 w-5 text-emerald-500" /><div className="font-semibold">AI Suggestions</div></div>
          <ul className="mt-3 space-y-3 text-sm">
            <Suggestion>You usually finish planning tasks faster in the morning — I moved them to 9 AM.</Suggestion>
            <Suggestion>You seem overloaded today. Consider rescheduling the vendor call.</Suggestion>
            <Suggestion>A 12-min rainfall break at 2 PM will boost afternoon focus.</Suggestion>
          </ul>
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs">
            <Flame className="h-4 w-4 text-amber-500" /> Burnout risk: <b>Low</b> · 3-day streak protected.
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="rounded-2xl p-6 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <div className="font-semibold flex items-center gap-2"><ListTodo className="h-4 w-4" /> Today's tasks</div>
            <Badge variant="outline">5 of 8 done</Badge>
          </div>
          <div className="space-y-2">
            {[
              { t: "Finish Q3 review deck", s: "done" },
              { t: "Reply to investor email thread", s: "progress" },
              { t: "Sign vendor contract", s: "overdue" },
              { t: "Deep work — spec v2", s: "scheduled" },
              { t: "Async standup update", s: "scheduled" },
            ].map(x => <TaskRow key={x.t} {...x} />)}
          </div>
        </Card>

        <Card className="rounded-2xl p-6">
          <div className="font-semibold flex items-center gap-2"><Bell className="h-4 w-4" /> Upcoming</div>
          <div className="mt-3 space-y-3 text-sm">
            {[
              ["10:30 AM", "Deep work block"],
              ["1:00 PM", "Design sync"],
              ["3:30 PM", "1:1 with Maya"],
              ["Tomorrow", "Vendor contract due"],
            ].map(([t, d]) => (
              <div key={t} className="flex items-center justify-between rounded-xl border border-border/60 p-3">
                <div>
                  <div className="text-xs text-muted-foreground">{t}</div>
                  <div className="font-medium">{d}</div>
                </div>
                <Button size="sm" variant="ghost">Open</Button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Dialog open={snapOpen} onOpenChange={setSnapOpen}>
        <DialogContent className="rounded-2xl glass-strong sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Today's Productivity Snapshot</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="rounded-xl border border-border/60 p-3 text-sm">
              <div className="flex items-center justify-between"><span className="text-muted-foreground">Yesterday</span><Badge className="gradient-brand text-primary-foreground">Flow 92</Badge></div>
              <div className="mt-2">You completed <b>14 tasks</b> in <b>4h 32m</b> of focus. Great consistency.</div>
            </div>
            <div className="rounded-xl border border-border/60 p-3">
              <div className="text-sm font-semibold">Unfinished from yesterday</div>
              {["Reply to investor thread", "Review onboarding deck"].map(t => (
                <label key={t} className="mt-2 flex items-center gap-2 text-sm"><Checkbox /> {t}</label>
              ))}
            </div>
            <Progress value={62} className="h-2" />
            <div className="text-xs text-muted-foreground">Today's planned focus: <b>3h 45m</b></div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setSnapOpen(false)}>Snooze</Button>
              <Button className="gradient-brand text-primary-foreground" onClick={() => setSnapOpen(false)}>Start the day</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Suggestion({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 rounded-xl border border-border/60 p-3">
      <Sparkles className="mt-0.5 h-4 w-4 text-emerald-500 shrink-0" />
      <span className="text-foreground/90">{children}</span>
    </li>
  );
}

function Stat({ icon: I, label, value, trend, tint }: any) {
  const colors: Record<string, string> = {
    emerald: "text-emerald-500", cyan: "text-cyan-500", amber: "text-amber-500", rose: "text-rose-500",
  };
  return (
    <Card className="rounded-2xl p-5">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{label}</span><I className={`h-4 w-4 ${colors[tint]}`} />
      </div>
      <div className="mt-1 text-3xl font-semibold tracking-tight">{value}</div>
      <div className={`text-xs ${colors[tint]}`}>{trend}</div>
    </Card>
  );
}

function TaskRow({ t, s }: { t: string; s: "done" | "progress" | "overdue" | "scheduled" }) {
  const dot: Record<string, string> = { done: "bg-emerald-500", progress: "bg-amber-500", overdue: "bg-red-500", scheduled: "bg-cyan-500" };
  const label: Record<string, string> = { done: "Done", progress: "In progress", overdue: "Overdue", scheduled: "Scheduled" };
  return (
    <div className="flex items-center justify-between rounded-xl border border-border/60 px-3 py-2.5">
      <div className="flex items-center gap-3">
        <Checkbox checked={s === "done"} />
        <span className={`text-sm ${s === "done" ? "line-through text-muted-foreground" : ""}`}>{t}</span>
      </div>
      <div className="flex items-center gap-2 text-xs">
        <span className={`h-2 w-2 rounded-full ${dot[s]}`} />
        <span className="text-muted-foreground">{label[s]}</span>
      </div>
    </div>
  );
}
