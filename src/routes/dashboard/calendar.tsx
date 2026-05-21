import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

type Status = "done" | "progress" | "pending";
type Task = { id: string; date: string; title: string; status: Status };

export const Route = createFileRoute("/dashboard/calendar")({ component: CalendarPage });

const today = new Date();
const ymd = (d: Date) => d.toISOString().slice(0, 10);
const initial: Task[] = [
  { id: "1", date: ymd(today), title: "Q3 review deck", status: "done" },
  { id: "2", date: ymd(today), title: "Investor email", status: "progress" },
  { id: "3", date: ymd(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2)), title: "Vendor contract", status: "pending" },
  { id: "4", date: ymd(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5)), title: "Sprint planning", status: "progress" },
];

function CalendarPage() {
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [tasks, setTasks] = useState<Task[]>(initial);
  const [selected, setSelected] = useState(ymd(today));
  const [title, setTitle] = useState("");

  const days = useMemo(() => {
    const first = new Date(cursor);
    const startDay = first.getDay();
    const total = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
    const cells: (Date | null)[] = [];
    for (let i = 0; i < startDay; i++) cells.push(null);
    for (let i = 1; i <= total; i++) cells.push(new Date(cursor.getFullYear(), cursor.getMonth(), i));
    while (cells.length % 7) cells.push(null);
    return cells;
  }, [cursor]);

  const monthLabel = cursor.toLocaleString("default", { month: "long", year: "numeric" });
  const dotColor = (s: Status) => s === "done" ? "bg-emerald-500" : s === "progress" ? "bg-amber-500" : "bg-red-500";

  const dayTasks = tasks.filter(t => t.date === selected);
  const add = () => {
    if (!title.trim()) return;
    setTasks(t => [...t, { id: crypto.randomUUID(), date: selected, title, status: "pending" }]);
    setTitle("");
  };
  const toggle = (id: string) => setTasks(t => t.map(x => x.id === id ? { ...x, status: x.status === "done" ? "pending" : "done" } : x));
  const remove = (id: string) => setTasks(t => t.filter(x => x.id !== id));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Badge variant="outline" className="rounded-full">Calendar</Badge>
          <h1 className="mt-2 text-3xl font-bold">{monthLabel}</h1>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" onClick={() => setCursor(c => new Date(c.getFullYear(), c.getMonth() - 1, 1))}><ChevronLeft className="h-4 w-4" /></Button>
          <Button variant="outline" size="sm" onClick={() => setCursor(new Date(today.getFullYear(), today.getMonth(), 1))}>Today</Button>
          <Button variant="outline" size="icon" onClick={() => setCursor(c => new Date(c.getFullYear(), c.getMonth() + 1, 1))}><ChevronRight className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card className="rounded-2xl p-4">
          <div className="grid grid-cols-7 gap-1 text-center text-[11px] uppercase tracking-wider text-muted-foreground">
            {"Sun Mon Tue Wed Thu Fri Sat".split(" ").map(d => <div key={d} className="py-2">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((d, i) => {
              if (!d) return <div key={i} />;
              const key = ymd(d);
              const dayT = tasks.filter(t => t.date === key);
              const isToday = key === ymd(today);
              const isSel = key === selected;
              return (
                <button key={i} onClick={() => setSelected(key)}
                  className={`aspect-square rounded-xl border p-2 text-left text-xs transition-all hover:border-emerald-500/50 ${isSel ? "border-emerald-500 bg-emerald-500/10" : "border-border/60"}`}>
                  <div className={`text-sm font-medium ${isToday ? "text-emerald-500" : ""}`}>{d.getDate()}</div>
                  <div className="mt-1 flex flex-wrap gap-0.5">
                    {dayT.slice(0,3).map(t => <span key={t.id} className={`h-1.5 w-1.5 rounded-full ${dotColor(t.status)}`} />)}
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        <Card className="rounded-2xl p-5">
          <div className="text-sm text-muted-foreground">{new Date(selected).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}</div>
          <div className="mt-1 text-lg font-semibold">Agenda</div>
          <div className="mt-3 flex gap-2">
            <Input placeholder="Add a task…" value={title} onChange={e => setTitle(e.target.value)} onKeyDown={e => e.key === "Enter" && add()} />
            <Button onClick={add} className="rounded-xl gradient-brand text-primary-foreground"><Plus className="h-4 w-4" /></Button>
          </div>
          <div className="mt-4 space-y-2">
            {dayTasks.length === 0 && <div className="rounded-xl border border-dashed border-border/60 p-4 text-center text-sm text-muted-foreground">No tasks yet.</div>}
            {dayTasks.map(t => (
              <div key={t.id} className="flex items-center justify-between rounded-xl border border-border/60 p-3">
                <button onClick={() => toggle(t.id)} className="flex items-center gap-3 text-left">
                  <span className={`h-2 w-2 rounded-full ${dotColor(t.status)}`} />
                  <span className={`text-sm ${t.status==="done"?"line-through text-muted-foreground":""}`}>{t.title}</span>
                </button>
                <Button size="sm" variant="ghost" onClick={() => remove(t.id)}>✕</Button>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500" />done</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500" />in progress</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-500" />pending</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
