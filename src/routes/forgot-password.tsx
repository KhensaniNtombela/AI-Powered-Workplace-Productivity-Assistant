import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Mail, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/forgot-password")({ component: ForgotPassword });

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    setSent(true);
  };

  return (
    <div className="grid min-h-screen place-items-center p-6">
      <Card className="w-full max-w-md rounded-2xl p-8">
        <Link to="/login"><Button variant="ghost" size="sm" className="mb-3 -ml-2 rounded-xl gap-1"><ArrowLeft className="h-4 w-4" /> Back to login</Button></Link>
        {sent ? (
          <div className="text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full gradient-brand text-primary-foreground"><Mail className="h-5 w-5" /></div>
            <h1 className="mt-4 text-2xl font-semibold">Check your inbox</h1>
            <p className="mt-2 text-sm text-muted-foreground">We sent a password-reset link to <b>{email}</b>.</p>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-semibold">Forgot password</h1>
            <p className="text-sm text-muted-foreground">We'll email you a reset link.</p>
            <form className="mt-6 grid gap-3" onSubmit={submit}>
              <Label>Email</Label>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
              <Button disabled={loading} className="mt-2 rounded-xl gradient-brand text-primary-foreground">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Send reset link
              </Button>
            </form>
          </>
        )}
      </Card>
    </div>
  );
}
