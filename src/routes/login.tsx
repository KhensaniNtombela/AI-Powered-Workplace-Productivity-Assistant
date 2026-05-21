import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/logo";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() { return <AuthScreen mode="login" />; }

export function AuthScreen({ mode }: { mode: "login" | "signup" }) {
  const isSignup = mode === "signup";
  return (
    <div className="relative grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-slate-900 lg:block">
        <div className="absolute inset-0 gradient-brand opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.25),transparent_60%)]" />
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <Logo />
          <div>
            <h2 className="text-4xl font-bold">Step into your flow state.</h2>
            <p className="mt-3 max-w-md opacity-90">Plan smarter with AI. Focus deeper with adaptive soundscapes. Recover faster with Daily Diary.</p>
          </div>
          <div className="text-xs opacity-70">© FlowState AI</div>
        </div>
      </div>
      <div className="flex items-center justify-center p-8">
        <Card className="w-full max-w-md rounded-2xl p-8">
          <div className="lg:hidden"><Logo /></div>
          <h1 className="mt-4 text-2xl font-semibold">{isSignup ? "Create your account" : "Welcome back"}</h1>
          <p className="text-sm text-muted-foreground">{isSignup ? "Start your 14-day Pro trial — no credit card." : "Log in to your FlowState workspace."}</p>
          <form className="mt-6 grid gap-3" onSubmit={e => { e.preventDefault(); window.location.href = "/dashboard"; }}>
            {isSignup && (<><Label>Full name</Label><Input placeholder="Ada Lovelace" required /></>)}
            <Label>Work email</Label>
            <Input type="email" placeholder="you@company.com" required />
            <Label>Password</Label>
            <Input type="password" placeholder="••••••••" required />
            <Button className="mt-2 rounded-xl gradient-brand text-primary-foreground">{isSignup ? "Create account" : "Log in"}</Button>
          </form>
          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
          </div>
          <div className="grid gap-2">
            <Button variant="outline" className="rounded-xl">Continue with Google</Button>
            <Link to="/dashboard"><Button variant="ghost" className="w-full rounded-xl">Continue as Guest →</Button></Link>
          </div>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            {isSignup ? (
              <>Already have an account? <Link to="/login" className="text-emerald-500 hover:underline">Log in</Link></>
            ) : (
              <>New to FlowState? <Link to="/signup" className="text-emerald-500 hover:underline">Sign up</Link></>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
