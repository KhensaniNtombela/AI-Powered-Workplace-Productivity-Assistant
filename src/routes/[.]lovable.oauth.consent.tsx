import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { Loader2, ShieldCheck } from "lucide-react";

// Beta helper types — tiny local wrapper for the auth.oauth namespace.
type OAuthDetails = {
  client?: { name?: string; client_id?: string; redirect_uris?: string[] };
  scope?: string;
  redirect_url?: string;
  redirect_to?: string;
};
type OAuthResult = { redirect_url?: string; redirect_to?: string };

function oauth() {
  return (supabase.auth as unknown as {
    oauth: {
      getAuthorizationDetails: (id: string) => Promise<{ data: OAuthDetails | null; error: { message: string } | null }>;
      approveAuthorization: (id: string) => Promise<{ data: OAuthResult | null; error: { message: string } | null }>;
      denyAuthorization: (id: string) => Promise<{ data: OAuthResult | null; error: { message: string } | null }>;
    };
  }).oauth;
}

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id: typeof s.authorization_id === "string" ? s.authorization_id : "",
  }),
  beforeLoad: async ({ search, location }) => {
    if (!search.authorization_id) throw new Error("Missing authorization_id");
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      const next = location.pathname + location.searchStr;
      throw redirect({ to: "/login", search: { redirect: next } as never });
    }
  },
  loader: async ({ location }) => {
    const authorizationId = new URLSearchParams(location.search).get("authorization_id")!;
    const { data, error } = await oauth().getAuthorizationDetails(authorizationId);
    if (error) throw new Error(error.message);
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) {
      window.location.href = immediate;
    }
    return data;
  },
  component: Consent,
  errorComponent: ({ error }) => (
    <main className="grid min-h-screen place-items-center p-6">
      <Card className="max-w-md rounded-2xl p-6 text-sm">
        <div className="font-semibold">Could not load this authorization request</div>
        <p className="mt-2 text-muted-foreground">{String((error as Error)?.message ?? error)}</p>
      </Card>
    </main>
  ),
});

function Consent() {
  const details = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function decide(approve: boolean) {
    setBusy(true);
    setError(null);
    const { data, error } = approve
      ? await oauth().approveAuthorization(authorization_id)
      : await oauth().denyAuthorization(authorization_id);
    if (error) { setBusy(false); setError(error.message); return; }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) { setBusy(false); setError("No redirect returned by the authorization server."); return; }
    window.location.href = target;
  }

  const clientName = details?.client?.name ?? "an app";

  return (
    <main className="grid min-h-screen place-items-center bg-background p-6">
      <Card className="w-full max-w-md rounded-2xl p-8">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-2.5 py-1 text-xs">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Secure
          </div>
        </div>
        <h1 className="mt-6 text-2xl font-semibold">Connect {clientName} to FlowState AI</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {clientName} will be able to call FlowState AI's enabled tools while you are signed in. This does not bypass FlowState AI's permissions or backend policies.
        </p>
        <ul className="mt-5 space-y-2 text-sm">
          <li className="rounded-xl border border-border/60 p-3">Read and manage your notes</li>
          <li className="rounded-xl border border-border/60 p-3">Read your profile (name and email)</li>
        </ul>
        {error && <p role="alert" className="mt-4 rounded-xl bg-red-500/10 p-3 text-sm text-red-500">{error}</p>}
        <div className="mt-6 flex gap-2">
          <Button
            disabled={busy}
            onClick={() => decide(true)}
            className="flex-1 rounded-xl gradient-brand text-primary-foreground"
          >
            {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Approve
          </Button>
          <Button
            disabled={busy}
            variant="outline"
            onClick={() => decide(false)}
            className="flex-1 rounded-xl"
          >
            Cancel
          </Button>
        </div>
      </Card>
    </main>
  );
}
