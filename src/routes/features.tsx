import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/features")({ component: FeaturesPage });

const groups = [
  {
    title: "Focus Mode",
    items: [
      ["Pomodoro Timer", "Classic 25/5 with adaptive AI tuning"],
      ["Deep Work Sessions", "Distraction-free fullscreen flow"],
      ["Ambient Sounds", "Curated soundscapes engineered for focus"],
      ["Virtual Focus Spaces", "Cinematic environments with motion"],
      ["Synced Co-working", "Body-double sessions with peers"],
      ["Distraction Blocking", "Smart app + tab silencing"],
    ],
  },
  {
    title: "Planner",
    items: [
      ["AI Task Planner", "Prioritization, batching, time blocking"],
      ["Calendar Management", "Drag-and-drop, color-coded states"],
      ["Smart Notes", "Live AI capture & summarization"],
      ["Smart Scheduling", "Find the perfect time for everyone"],
      ["Time Tracking", "Effortless, automatic, private"],
      ["Goal Planning", "Quarterly OKRs to daily steps"],
    ],
  },
  {
    title: "AI Tools",
    items: [
      ["Smart Email Generator", "Tone + audience aware"],
      ["Meeting Summarizer", "Action items, owners, deadlines"],
      ["Research Assistant", "Extracts insights from any source"],
      ["Daily Diary Chatbot", "Reflect, plan, recover"],
      ["Productivity Insights", "Personal trends & recommendations"],
    ],
  },
  {
    title: "Wellness & Flow",
    items: [
      ["Mood Tracking", "Lightweight, private check-ins"],
      ["Burnout Detection", "Early warning system"],
      ["Smart Break Suggestions", "Right time, right intensity"],
      ["Relaxation Sounds", "Theta + delta wave library"],
      ["Focus Analytics", "Understand your peak hours"],
    ],
  },
];

function FeaturesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="mx-auto max-w-7xl px-6 pt-10 pb-20">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="rounded-full">Features</Badge>
          <h1 className="mt-4 text-5xl font-bold sm:text-6xl">The complete <span className="text-gradient">flow toolkit</span></h1>
          <p className="mt-4 text-muted-foreground">Every capability in FlowState AI — built around productivity, focus and wellbeing.</p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {groups.map(g => (
            <Card key={g.title} className="rounded-2xl p-6">
              <h2 className="text-xl font-semibold">{g.title}</h2>
              <div className="mt-4 grid gap-2">
                {g.items.map(([t, d]) => (
                  <div key={t} className="flex items-start justify-between rounded-xl border border-border/60 p-3 transition-colors hover:bg-accent">
                    <div>
                      <div className="text-sm font-medium">{t}</div>
                      <div className="text-xs text-muted-foreground">{d}</div>
                    </div>
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
