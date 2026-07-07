import { redirect } from "next/navigation";

// /bataka merged into the Clans tab as its Bataka view (session 10).
// Keep the old route alive so bookmarks and existing links still land right.
export default function BatakaPage() {
  redirect("/clans?view=bataka");
}
