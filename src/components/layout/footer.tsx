import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Github } from "lucide-react";
import { Logo } from "@/components/logo";

export function Footer() {
  const cols = [
    { title: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
    { title: "AI Tools", links: ["Email Generator", "Meeting Summarizer", "Research Assistant", "Daily Diary"] },
    { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
    { title: "Resources", links: ["Support", "Docs", "Community", "Status"] },
  ];
  return (
    <footer className="relative mt-24 border-t border-border/60 bg-background">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              FlowState AI helps modern professionals focus deeper, plan smarter, and ship faster — with AI that respects your time and energy.
            </p>
            <div className="mt-5 flex gap-2">
              {[Facebook, Instagram, Twitter, Github].map((I, i) => (
                <a key={i} className="grid h-9 w-9 place-items-center rounded-xl border border-border/60 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {cols.map(c => (
            <div key={c.title}>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.title}</h4>
              <ul className="space-y-2">
                {c.links.map(l => <li key={l}><a className="text-sm text-foreground/80 hover:text-foreground">{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <div>© {new Date().getFullYear()} FlowState AI — Work Smarter. Focus Deeper. Achieve Faster.</div>
          <div className="flex gap-4">
            <Link to="/">Privacy Policy</Link>
            <Link to="/">Terms of Use</Link>
            <span>AI-generated content may require human review.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
