import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Bell, Globe, Moon, Search, Sun, Menu, X, Sparkles, ChevronDown, ArrowLeft, LogOut } from "lucide-react";
import { Logo } from "@/components/logo";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const featureGroups = [
  { title: "Focus Mode", accent: "from-emerald-400 to-cyan-400", items: ["Pomodoro Timer", "Deep Work Sessions", "Ambient Sounds", "Virtual Focus Spaces", "Synced Co-working", "Distraction Blocking"] },
  { title: "Planner", accent: "from-cyan-400 to-blue-500", items: ["AI Task Planner", "Calendar Management", "Smart Notes", "Smart Scheduling", "Time Tracking", "Goal Planning"] },
  { title: "AI Tools", accent: "from-amber-400 to-pink-500", items: ["Smart Email Generator", "Meeting Summarizer", "Research Assistant", "Daily Diary Chatbot", "Productivity Insights"] },
  { title: "Wellness & Flow", accent: "from-fuchsia-400 to-emerald-400", items: ["Mood Tracking", "Burnout Detection", "Smart Break Suggestions", "Relaxation Sounds", "Focus Analytics"] },
];

type NavLink = { to: string; label: string; mega?: boolean };
const navLinks: NavLink[] = [
  { to: "/", label: "Home" },
  { to: "/features", label: "Features", mega: true },
  { to: "/pricing", label: "Pricing" },
  { to: "/support", label: "Support" },
  { to: "/about", label: "About" },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const { location } = useRouterState();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setMegaOpen(false); }, [location.pathname]);

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/" });
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-3"}`}>
      <div className="mx-auto max-w-7xl px-4">
        <div className={`glass flex items-center gap-3 rounded-2xl px-3 py-2 transition-shadow ${scrolled ? "shadow-xl shadow-black/5" : ""}`}>
          <Logo compact />
          {!isHome && (
            <Link to="/" className="ml-1 hidden sm:inline-flex">
              <Button variant="ghost" size="sm" className="rounded-xl gap-1">
                <ArrowLeft className="h-4 w-4" /> Back home
              </Button>
            </Link>
          )}
          <nav className="ml-4 hidden items-center gap-1 lg:flex">
            {navLinks.map((l) =>
              l.mega ? (
                <div
                  key={l.to}
                  className="relative"
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                >
                  <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground">
                    {l.label} <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  {megaOpen && <MegaMenu />}
                </div>
              ) : (
                <Link
                  key={l.to}
                  to={l.to}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground [&.active]:text-foreground [&.active]:bg-accent"
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {l.label}
                </Link>
              ),
            )}
          </nav>

          <div className="ml-auto flex items-center gap-1.5">
            <div className="relative hidden md:block">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search anything…" className="h-9 w-44 rounded-xl border-transparent bg-muted/60 pl-8 focus-visible:w-56 focus-visible:bg-background transition-all" />
            </div>
            <Button variant="ghost" size="icon" className="rounded-xl"><Bell className="h-4 w-4" /></Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-xl"><Globe className="h-4 w-4" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-xl">
                {["English","Français","Español","Português","العربية","中文","Deutsch"].map(l => (
                  <DropdownMenuItem key={l}>{l}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" className="rounded-xl" onClick={toggle}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <div className="ml-1 hidden items-center gap-1.5 sm:flex">
              {user ? (
                <>
                  <Link to="/dashboard">
                    <Button size="sm" className="rounded-xl gradient-brand text-primary-foreground">
                      <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Dashboard
                    </Button>
                  </Link>
                  <Button size="sm" variant="ghost" className="rounded-xl" onClick={signOut}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login"><Button variant="ghost" size="sm" className="rounded-xl">Login</Button></Link>
                  <Link to="/signup">
                    <Button size="sm" className="rounded-xl gradient-brand text-primary-foreground shadow-md shadow-emerald-500/20 hover:opacity-90">
                      <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
            <Button variant="ghost" size="icon" className="rounded-xl lg:hidden" onClick={() => setMobileOpen(v => !v)}>
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {mobileOpen && (
          <div className="glass mt-2 rounded-2xl p-3 lg:hidden">
            <div className="flex flex-col">
              {navLinks.map(l => (
                <Link key={l.to} to={l.to} className="rounded-lg px-3 py-2 text-sm hover:bg-accent">{l.label}</Link>
              ))}
              <div className="mt-2 flex gap-2">
                {user ? (
                  <>
                    <Link to="/dashboard" className="flex-1"><Button className="w-full rounded-xl gradient-brand text-primary-foreground">Dashboard</Button></Link>
                    <Button variant="outline" className="rounded-xl" onClick={signOut}><LogOut className="h-4 w-4" /></Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="flex-1"><Button variant="outline" className="w-full rounded-xl">Login</Button></Link>
                    <Link to="/signup" className="flex-1"><Button className="w-full rounded-xl gradient-brand text-primary-foreground">Sign Up</Button></Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function MegaMenu() {
  return (
    <div className="absolute left-1/2 top-full z-40 w-[860px] -translate-x-1/2 pt-3 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="glass-strong grid grid-cols-4 gap-6 rounded-2xl p-6 shadow-2xl shadow-black/10">
        {featureGroups.map((g) => (
          <div key={g.title}>
            <div className="mb-3 flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full bg-gradient-to-r ${g.accent}`} />
              <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{g.title}</h4>
            </div>
            <ul className="space-y-1.5">
              {g.items.map((i) => (
                <li key={i}>
                  <a className="block rounded-md px-2 py-1 text-sm text-foreground/85 transition-colors hover:bg-accent hover:text-foreground">{i}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="col-span-4 mt-2 flex items-center justify-between rounded-xl gradient-brand p-4 text-primary-foreground">
          <div>
            <div className="text-sm font-semibold">Start a Deep Work session in one click</div>
            <div className="text-xs opacity-80">Adaptive soundscapes · synced co-working · AI-paced timer</div>
          </div>
          <Link to="/signup"><Button size="sm" variant="secondary" className="rounded-lg">Get started →</Button></Link>
        </div>
      </div>
    </div>
  );
}
