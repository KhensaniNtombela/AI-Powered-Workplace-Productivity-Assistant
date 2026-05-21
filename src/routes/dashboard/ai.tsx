import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Mail, FileText, ListTodo, BookOpen, MessageCircle, Sparkles } from "lucide-react";

export const Route = createFileRoute("/dashboard/ai")({ component: AIToolsHub });

const tools = [
  { to: "/dashboard/email", icon: Mail, t: "Smart Email Generator", d: "Compose perfect emails with tone & audience controls." },
  { to: "/dashboard/meeting", icon: FileText, t: "Meeting Summarizer", d: "Turn transcripts into action items with owners." },
  { to: "/dashboard/planner", icon: ListTodo, t: "AI Task Planner", d: "Prioritize, batch and time-block automatically." },
  { to: "/dashboard/research", icon: BookOpen, t: "Research Assistant", d: "Summarize and extract insights from any source." },
  { to: "/dashboard/diary", icon: MessageCircle, t: "Daily Diary Chatbot", d: "Reflect, plan and recover with workplace AI." },
];

function AIToolsHub() {
  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-3 py-1 text-xs"><Sparkles className="h-3 w-3 text-emerald-500" /> AI Workshop</div>
        <h1 className="mt-2 text-3xl font-bold">Your <span className="text-gradient">AI toolkit</span></h1>
        <p className="text-sm text-muted-foreground">Prompt-engineered tools built for real workplace tasks.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tools.map(t => (
          <Link key={t.to} to={t.to as any}>
            <Card className="group h-full rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="inline-grid h-11 w-11 place-items-center rounded-xl gradient-brand text-primary-foreground"><t.icon className="h-5 w-5" /></div>
              <div className="mt-4 text-lg font-semibold">{t.t}</div>
              <p className="mt-1 text-sm text-muted-foreground">{t.d}</p>
              <div className="mt-4 text-sm font-medium text-emerald-500">Open →</div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
