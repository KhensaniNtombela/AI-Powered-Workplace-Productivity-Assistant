import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listNotes from "./tools/list-notes";
import createNote from "./tools/create-note";
import deleteNote from "./tools/delete-note";
import getProfile from "./tools/get-profile";

// The OAuth issuer MUST be the direct Supabase host. On publish, SUPABASE_URL
// is rewritten to the `.lovable.cloud` proxy, which mcp-js rejects (RFC 8414).
// VITE_SUPABASE_PROJECT_ID is inlined by Vite at build time.
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "flowstate-ai-mcp",
  title: "FlowState AI",
  version: "0.1.0",
  instructions:
    "Tools for FlowState AI — a workplace productivity assistant. Use `get_my_profile` to identify the user, `list_notes`/`create_note`/`delete_note` to manage their personal notes.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [getProfile, listNotes, createNote, deleteNote],
});
