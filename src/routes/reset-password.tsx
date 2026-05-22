import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/reset-password")({ component: ResetPassword });

function ResetPassword() {
  const nav = useNavigate();
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pw !== pw2) { toast.error("Passwords don't match"); return; }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: pw });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Password updated");
    nav({ to: "/login" });
  };

  return (
    <div className="grid min-h-screen place-items-center p-6">
      <Card className="w-full max-w-md rounded-2xl p-8">
        <h1 className="text-2xl font-semibold">Set a new password</h1>
        <p className="text-sm text-muted-foreground">Choose a strong password for your account.</p>
        <form className="mt-6 grid gap-3" onSubmit={submit}>
          <Label>New password</Label>
          <Input type="password" value={pw} onChange={e => setPw(e.target.value)} minLength={6} required />
          <Label>Confirm password</Label>
          <Input type="password" value={pw2} onChange={e => setPw2(e.target.value)} minLength={6} required />
          <Button disabled={loading} className="mt-2 rounded-xl gradient-brand text-primary-foreground">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Update password
          </Button>
        </form>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          <Link to="/login" className="text-emerald-500 hover:underline">Back to login</Link>
        </div>
      </Card>
    </div>
  );
}
