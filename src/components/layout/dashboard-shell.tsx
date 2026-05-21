import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LayoutGrid, Mail, FileText, ListTodo, BookOpen, MessageCircle, Calendar, Focus, Music, BarChart3, Bell, Settings, Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

const items = [
  { to: "/dashboard", label: "Overview", icon: LayoutGrid, exact: true },
  { to: "/dashboard/ai", label: "AI Tools", icon: Mail },
  { to: "/dashboard/email", label: "Email Generator", icon: Mail },
  { to: "/dashboard/meeting", label: "Meeting Summary", icon: FileText },
  { to: "/dashboard/planner", label: "Task Planner", icon: ListTodo },
  { to: "/dashboard/research", label: "Research", icon: BookOpen },
  { to: "/dashboard/diary", label: "Daily Diary", icon: MessageCircle },
  { to: "/dashboard/calendar", label: "Calendar", icon: Calendar },
  { to: "/dashboard/focus", label: "Focus Mode", icon: Focus },
  { to: "/dashboard/music", label: "Music & ASMR", icon: Music },
  { to: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();
  const { theme, toggle } = useTheme();
  useEffect(() => { setOpen(false); }, [location.pathname]);

  const isFocus = location.pathname === "/dashboard/focus";

  if (isFocus) return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-background">
      {/* sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-border/60 bg-sidebar transition-transform lg:static lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-16 items-center px-5 border-b border-border/60"><Logo /></div>
        <nav className="space-y-1 p-3 overflow-y-auto h-[calc(100vh-4rem)] scrollbar-none">
          {items.map(it => {
            const active = it.exact ? location.pathname === it.to : location.pathname.startsWith(it.to);
            return (
              <Link key={it.to} to={it.to as any}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${active ? "gradient-brand text-primary-foreground shadow-md shadow-emerald-500/20" : "text-foreground/80 hover:bg-accent hover:text-foreground"}`}>
                <it.icon className="h-4 w-4" /> {it.label}
              </Link>
            );
          })}
          <div className="mt-6 rounded-xl glass p-3 text-xs">
            <div className="font-semibold">Upgrade to Pro</div>
            <p className="mt-1 text-muted-foreground">Unlimited AI, full focus mode and analytics.</p>
            <Link to="/pricing"><Button size="sm" className="mt-3 w-full rounded-lg gradient-brand text-primary-foreground">Upgrade</Button></Link>
          </div>
        </nav>
      </aside>

      {/* main */}
      <div className="flex flex-1 flex-col lg:pl-0">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/60 bg-background/80 px-4 backdrop-blur">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(o => !o)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <div className="ml-auto flex items-center gap-2">
            <Link to="/"><Button variant="ghost" size="sm" className="rounded-xl">↩ Home</Button></Link>
            <Button variant="ghost" size="icon" className="rounded-xl" onClick={toggle}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <div className="grid h-9 w-9 place-items-center rounded-full gradient-brand text-xs font-bold text-primary-foreground">AL</div>
          </div>
        </header>
        <main className="flex-1 p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
