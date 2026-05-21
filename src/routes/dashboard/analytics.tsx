import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, RadialBar, RadialBarChart, Cell, PieChart, Pie } from "recharts";

export const Route = createFileRoute("/dashboard/analytics")({ component: Analytics });

const focus = [{ d: "Mon", h: 2.4 }, { d: "Tue", h: 3.1 }, { d: "Wed", h: 4.2 }, { d: "Thu", h: 3.6 }, { d: "Fri", h: 4.5 }, { d: "Sat", h: 1.4 }, { d: "Sun", h: 2.1 }];
const tasks = [{ d: "Mon", done: 8, pending: 3 }, { d: "Tue", done: 11, pending: 2 }, { d: "Wed", done: 14, pending: 4 }, { d: "Thu", done: 9, pending: 5 }, { d: "Fri", done: 13, pending: 2 }, { d: "Sat", done: 4, pending: 1 }, { d: "Sun", done: 5, pending: 2 }];
const split = [
  { name: "Deep Work", value: 38, fill: "var(--color-chart-1)" },
  { name: "Meetings", value: 26, fill: "var(--color-chart-2)" },
  { name: "Admin", value: 18, fill: "var(--color-chart-3)" },
  { name: "Comms", value: 18, fill: "var(--color-chart-5)" },
];
const score = [{ name: "score", value: 92, fill: "var(--color-chart-1)" }];

function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <Badge variant="outline" className="rounded-full">Analytics</Badge>
        <h1 className="mt-2 text-3xl font-bold">Your <span className="text-gradient">flow performance</span></h1>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Tasks completed", "84", "+12%"],
          ["Focus hours", "19h 24m", "+8%"],
          ["Avg flow score", "87", "+3"],
          ["Burnout risk", "Low", "stable"],
        ].map(([l, v, t]) => (
          <Card key={l} className="rounded-2xl p-5">
            <div className="text-xs text-muted-foreground">{l}</div>
            <div className="mt-1 text-2xl font-semibold">{v}</div>
            <div className="text-xs text-emerald-500">{t}</div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="rounded-2xl p-6 lg:col-span-2">
          <div className="mb-3 font-semibold">Focus hours this week</div>
          <div className="h-64">
            <ResponsiveContainer><AreaChart data={focus}>
              <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.6} /><stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="d" /><YAxis />
              <Tooltip contentStyle={{ background: "var(--color-card)", borderRadius: 12, border: "1px solid var(--color-border)" }} />
              <Area type="monotone" dataKey="h" stroke="var(--color-chart-1)" fill="url(#g)" strokeWidth={2} />
            </AreaChart></ResponsiveContainer>
          </div>
        </Card>

        <Card className="rounded-2xl p-6">
          <div className="mb-3 font-semibold">Productivity score</div>
          <div className="h-64">
            <ResponsiveContainer><RadialBarChart innerRadius="70%" outerRadius="100%" data={score} startAngle={90} endAngle={-270}>
              <RadialBar dataKey="value" cornerRadius={20} background />
            </RadialBarChart></ResponsiveContainer>
          </div>
          <div className="-mt-32 text-center">
            <div className="text-4xl font-bold">92</div>
            <div className="text-xs text-muted-foreground">Excellent</div>
          </div>
        </Card>

        <Card className="rounded-2xl p-6 lg:col-span-2">
          <div className="mb-3 font-semibold">Tasks completed vs pending</div>
          <div className="h-64">
            <ResponsiveContainer><BarChart data={tasks}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="d" /><YAxis />
              <Tooltip contentStyle={{ background: "var(--color-card)", borderRadius: 12, border: "1px solid var(--color-border)" }} />
              <Bar dataKey="done" fill="var(--color-chart-1)" radius={[8,8,0,0]} />
              <Bar dataKey="pending" fill="var(--color-chart-4)" radius={[8,8,0,0]} />
            </BarChart></ResponsiveContainer>
          </div>
        </Card>

        <Card className="rounded-2xl p-6">
          <div className="mb-3 font-semibold">Time split</div>
          <div className="h-64">
            <ResponsiveContainer><PieChart>
              <Pie data={split} innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {split.map((s, i) => <Cell key={i} fill={s.fill} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "var(--color-card)", borderRadius: 12, border: "1px solid var(--color-border)" }} />
            </PieChart></ResponsiveContainer>
          </div>
          <div className="mt-3 space-y-1 text-xs">
            {split.map(s => <div key={s.name} className="flex items-center justify-between"><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: s.fill }} />{s.name}</span><span className="text-muted-foreground">{s.value}%</span></div>)}
          </div>
        </Card>
      </div>

      <Card className="rounded-2xl border-emerald-500/30 bg-emerald-500/5 p-6">
        <div className="text-sm font-semibold">AI insights</div>
        <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
          <li>• Your most productive hours are 9–12. Protect them.</li>
          <li>• Wednesdays show 28% more focus output — schedule big bets here.</li>
          <li>• Reduce 3 short meetings on Thursdays to recover 1h 10m of focus time.</li>
        </ul>
      </Card>
    </div>
  );
}
