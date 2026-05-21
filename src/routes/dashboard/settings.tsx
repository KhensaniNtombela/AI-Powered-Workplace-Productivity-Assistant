import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/components/theme-provider";

export const Route = createFileRoute("/dashboard/settings")({ component: SettingsPage });

function SettingsPage() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="space-y-6">
      <div>
        <Badge variant="outline" className="rounded-full">Settings</Badge>
        <h1 className="mt-2 text-3xl font-bold">Tune your <span className="text-gradient">workspace</span></h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-2xl p-6 space-y-4">
          <div className="font-semibold">Profile</div>
          <div><Label>Full name</Label><Input defaultValue="Ada Lovelace" /></div>
          <div><Label>Work email</Label><Input defaultValue="ada@flowstate.ai" /></div>
          <Button className="rounded-xl gradient-brand text-primary-foreground">Save changes</Button>
        </Card>
        <Card className="rounded-2xl p-6 space-y-4">
          <div className="font-semibold">Preferences</div>
          <Row label="Dark mode" desc="Toggle the global theme">
            <Switch checked={theme === "dark"} onCheckedChange={(v) => setTheme(v ? "dark" : "light")} />
          </Row>
          <Row label="Daily snapshot popup" desc="Show every morning"><Switch defaultChecked /></Row>
          <Row label="Burnout detection" desc="Send wellbeing nudges"><Switch defaultChecked /></Row>
          <Row label="AI suggestions in calendar" desc="Auto-time-block from AI plan"><Switch defaultChecked /></Row>
        </Card>
        <Card className="rounded-2xl p-6 lg:col-span-2">
          <div className="font-semibold">Responsible AI</div>
          <p className="mt-2 text-sm text-muted-foreground">FlowState AI uses structured prompts and human-in-the-loop guardrails. We never train on your private workspace data and clearly disclose AI-generated content throughout the app.</p>
        </Card>
      </div>
    </div>
  );
}

function Row({ label, desc, children }: any) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border/60 p-3">
      <div><div className="text-sm font-medium">{label}</div><div className="text-xs text-muted-foreground">{desc}</div></div>
      {children}
    </div>
  );
}
