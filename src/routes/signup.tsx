import { createFileRoute } from "@tanstack/react-router";
import { AuthScreen } from "./login";

export const Route = createFileRoute("/signup")({
  validateSearch: (s: Record<string, unknown>) => ({
    redirect: typeof s.redirect === "string" ? s.redirect : undefined,
  }),
  component: () => <AuthScreen mode="signup" />,
});
