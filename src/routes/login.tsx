import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import { Logo } from "@/components/logo";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>) => ({
    verify: s.verify === "1" ? "1" : undefined,
    redirect: typeof s.redirect === "string" ? s.redirect : undefined,
  }),
  component: LoginPage,
});

function LoginPage() {
  return <AuthScreen mode="login" />;
}

export function AuthScreen({ mode }: { mode: "login" | "signup" }) {
  const isSignup = mode === "signup";
  const navigate = useNavigate();
  const search = (useSearch({ strict: false }) as { verify?: string; redirect?: string }) ?? {};
  const back = search.redirect || "/";
  const dest = search.redirect || "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignup) {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: {
            emailRedirectTo: `${window.location.origin}/login`,
            data: { display_name: name || email.split("@")[0] },
          },
        });
        if (error) throw error;
        setSent(true);
        toast.success("Check your inbox to verify your email");
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (!data.user?.email_confirmed_at && !data.user?.confirmed_at) {
          await supabase.auth.signOut();
          toast.error("Please verify your email before signing in");
          setSent(true);
          return;
        }
        toast.success("Welcome back");
        // Use full navigation so query strings in `dest` (e.g. OAuth consent) survive.
        window.location.href = dest;
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const google = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: `${window.location.origin}${dest}` });
    if (result.error) { toast.error("Google sign-in failed"); setLoading(false); return; }
    if (result.redirected) return;
    navigate({ to: dest as any });
  };

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
      <div className="flex flex-col p-6 sm:p-8">
        <div>
          <Link to={back as any}>
            <Button variant="ghost" size="sm" className="rounded-xl gap-1">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <Card className="w-full max-w-md rounded-2xl p-8">
            <div className="lg:hidden"><Logo /></div>

            {sent ? (
              <div className="text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full gradient-brand text-primary-foreground"><Mail className="h-5 w-5" /></div>
                <h1 className="mt-4 text-2xl font-semibold">Verify your email</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  We sent a verification link to <b>{email}</b>. Click it to activate your account, then come back to log in.
                </p>
                <Button className="mt-6 w-full rounded-xl gradient-brand text-primary-foreground" onClick={() => navigate({ to: "/login" })}>
                  Back to login
                </Button>
              </div>
            ) : (
              <>
                <h1 className="mt-4 text-2xl font-semibold">{isSignup ? "Create your account" : "Welcome back"}</h1>
                <p className="text-sm text-muted-foreground">
                  {isSignup ? "Start your 14-day Pro trial — no credit card." : "Log in to your FlowState workspace."}
                </p>
                {search.verify === "1" && (
                  <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-700 dark:text-emerald-400">
                    Email verified — please log in.
                  </div>
                )}
                <form className="mt-6 grid gap-3" onSubmit={submit}>
                  {isSignup && (<>
                    <Label>Full name</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ada Lovelace" required />
                  </>)}
                  <Label>Email</Label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
                  <div className="flex items-center justify-between">
                    <Label>Password</Label>
                    {!isSignup && <Link to="/forgot-password" className="text-xs text-emerald-500 hover:underline">Forgot password?</Link>}
                  </div>
                  <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={6} placeholder="••••••••" required />
                  <Button disabled={loading} className="mt-2 rounded-xl gradient-brand text-primary-foreground">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isSignup ? "Create account" : "Log in"}
                  </Button>
                </form>
                <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid gap-2">
                  <Button variant="outline" className="rounded-xl" onClick={google} disabled={loading}>Continue with Google</Button>
                </div>
                <div className="mt-6 text-center text-sm text-muted-foreground">
                  {isSignup ? (
                    <>Already have an account? <Link to="/login" search={{ redirect: search.redirect } as any} className="text-emerald-500 hover:underline">Log in</Link></>
                  ) : (
                    <>New to FlowState? <Link to="/signup" search={{ redirect: search.redirect } as any} className="text-emerald-500 hover:underline">Sign up</Link></>
                  )}
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
