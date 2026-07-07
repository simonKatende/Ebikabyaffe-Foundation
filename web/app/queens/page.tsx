import { redirect } from "next/navigation";

// /queens merged into the Kabaka tab (session 2026-07) — the Nnabagereka,
// Namasole and Lubuga now live as sections on /kabaka, right after the
// Kabaka's own achievements. Keep the old route alive so bookmarks and
// existing links still land right.
export default function QueensPage() {
  redirect("/kabaka");
}
