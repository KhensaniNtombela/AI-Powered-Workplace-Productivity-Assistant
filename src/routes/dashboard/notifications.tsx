import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, BellOff, Calendar, Sparkles } from "lucide-react";

export const Route = createFileRoute("/dashboard/notifications")({ component: NotificationsPage });

const items = [
  { I: Calendar, t: "Deep work block starting in 15 minutes", time: "Now", kind: "deadline" },
  { I: Sparkles, t: "Daily Diary suggests rescheduling vendor call", time: "10m", kind: "ai" },
  { I: Bell, t: "Meeting reminder: Design sync at 1:00 PM", time: "45m", kind: "meeting" },
  { I: Bell, t: "Task overdue: Sign vendor contract", time: "2h", kind: "task" },
  { I: Sparkles, t: "Burnout signal detected — consider a recovery break", time: "Yesterday", kind: "ai" },
];

function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <Badge variant="outline" className="rounded-full">Notifications</Badge>
          <h1 className="mt-2 text-3xl font-bold">Your <span className="text-gradient">smart inbox</span></h1>
        </div>
        <Button variant="outline" className="rounded-xl"><BellOff className="mr-2 h-4 w-4" /> Snooze all</Button>
      </div>
      <Card className="rounded-2xl p-4">
        <div className="divide-y divide-border/60">
          {items.map((it, i) => (
            <div key={i} className="flex items-center justify-between gap-3 py-3">
              <div className="flex items-start gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-muted"><it.I className="h-4 w-4" /></div>
                <div>
                  <div className="text-sm font-medium">{it.t}</div>
                  <div className="text-xs text-muted-foreground">{it.time} · {it.kind}</div>
                </div>
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost">Snooze</Button>
                <Button size="sm" variant="outline">Dismiss</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
