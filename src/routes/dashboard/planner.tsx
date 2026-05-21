import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Sparkles } from "lucide-react";

type Status = "todo" | "doing" | "done";
type Task = { id: string; title: string; pri: "High" | "Med" | "Low"; status: Status };

const seed: Task[] = [
  { id: "1", title: "Draft v2 spec outline", pri: "High", status: "doing" },
  { id: "2", title: "Email investors recap", pri: "High", status: "todo" },
  { id: "3", title: "Review onboarding deck", pri: "Med", status: "todo" },
  { id: "4", title: "Async standup update", pri: "Low", status: "done" },
  { id: "5", title: "Sign vendor contract", pri: "High", status: "todo" },
  { id: "6", title: "Sketch dashboard variants", pri: "Med", status: "doing" },
];

export const Route = createFileRoute("/dashboard/planner")({ component: Planner });

function Planner() {
  const [tasks, setTasks] = useState<Task[]>(seed);
  const [title, setTitle] = useState("");
  const cols: { key: Status; label: string; color: string }[] = [
    { key: "todo", label: "To do", color: "bg-cyan-500" },
    { key: "doing", label: "In progress", color: "bg-amber-500" },
    { key: "done", label: "Done", color: "bg-emerald-500" },
  ];

  const add = () => {
    if (!title.trim()) return;
    setTasks(t => [...t, { id: crypto.randomUUID(), title, pri: "Med", status: "todo" }]);
    setTitle("");
  };

  const move = (id: string, dir: -1 | 1) => {
    setTasks(t => t.map(x => {
      if (x.id !== id) return x;
      const order: Status[] = ["todo", "doing", "done"];
      const i = order.indexOf(x.status);
      return { ...x, status: order[Math.max(0, Math.min(2, i + dir))] };
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Badge variant="outline" className="rounded-full">AI Task Planner</Badge>
          <h1 className="mt-2 text-3xl font-bold">Kanban for <span className="text-gradient">focused execution</span></h1>
        </div>
        <Button variant="outline" className="rounded-xl"><Sparkles className="mr-2 h-4 w-4" /> AI re-prioritize</Button>
      </div>
      <Card className="rounded-2xl p-4">
        <div className="flex gap-2">
          <Input placeholder="Add a task and press Enter…" value={title} onChange={e => setTitle(e.target.value)} onKeyDown={e => e.key === "Enter" && add()} />
          <Button onClick={add} className="rounded-xl gradient-brand text-primary-foreground"><Plus className="h-4 w-4" /></Button>
        </div>
      </Card>
      <div className="grid gap-4 lg:grid-cols-3">
        {cols.map(c => (
          <Card key={c.key} className="rounded-2xl p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${c.color}`} /><span className="font-semibold">{c.label}</span></div>
              <Badge variant="outline">{tasks.filter(t => t.status === c.key).length}</Badge>
            </div>
            <div className="space-y-2">
              {tasks.filter(t => t.status === c.key).map(t => (
                <div key={t.id} className="group rounded-xl border border-border/60 p-3 transition-all hover:shadow-md">
                  <div className="flex items-start justify-between">
                    <div className="text-sm font-medium">{t.title}</div>
                    <Badge className={`${t.pri==="High"?"bg-red-500":t.pri==="Med"?"bg-amber-500":"bg-cyan-500"} text-white text-[10px]`}>{t.pri}</Badge>
                  </div>
                  <div className="mt-3 flex justify-between gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button size="sm" variant="ghost" onClick={() => move(t.id, -1)}>←</Button>
                    <Button size="sm" variant="ghost" onClick={() => move(t.id, 1)}>→</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
