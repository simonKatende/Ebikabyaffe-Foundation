"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { foundationSignature, sendToFoundation, FOUNDATION_CONTACT_EMAIL } from "@/lib/contactFoundation";
import type { Clan } from "@/lib/clans";

// ── "Help us document your clan" — optional lineage archive contribution ────
//
// Many clans in lib/clanAmasiga.ts / lib/lugaveLineage.ts still have no
// documented Essiga/Emituba/Ennyiriri register (17 clans have none at all —
// see CLAUDE.md). Rather than wait indefinitely on another archive PDF, a
// member who already knows their own Essiga, Omutuba, Olunnyiriri, or Olugja
// can submit it here. Sent silently via app/api/contact/route.ts (Resend) —
// the archive team reviews submissions by hand before adding anything to the
// site's clan data (this is a source to be verified, not something that
// writes to lib/clans.ts directly).

export function LineageArchiveCard({ clan }: { clan: Clan }) {
  const { user } = useAuth();
  const { toast } = useToast();

  const [essiga, setEssiga] = useState("");
  const [omutuba, setOmutuba] = useState("");
  const [olunnyiriri, setOlunnyiriri] = useState("");
  const [olugja, setOlugja] = useState("");
  const [notes, setNotes] = useState("");
  const [sending, setSending] = useState(false);

  const canSubmit =
    essiga.trim() !== "" || omutuba.trim() !== "" || olunnyiriri.trim() !== "" || olugja.trim() !== "";

  async function handleSend() {
    if (!canSubmit || sending) return;
    setSending(true);
    const subject = `[Ebikabyaffe Foundation] Clan lineage info — ${clan.name} — from ${user.name}`;
    const lines = [
      `Clan: ${clan.name}`,
      essiga.trim() && `Essiga lyo (ssiga/branch): ${essiga.trim()}`,
      omutuba.trim() && `Omutuba gwo (lineage): ${omutuba.trim()}`,
      olunnyiriri.trim() && `Olunnyiriri lwo: ${olunnyiriri.trim()}`,
      olugja.trim() && `Olugja lwo: ${olugja.trim()}`,
      notes.trim() && `Additional notes: ${notes.trim()}`,
    ].filter(Boolean);
    const body = `${lines.join("\n")}\n\n${foundationSignature(user.name, user.phone, clan.name)}`;
    const result = await sendToFoundation(subject, body);
    setSending(false);
    if (result.ok) {
      toast(`Your clan lineage information has been sent to ${FOUNDATION_CONTACT_EMAIL} successfully.`);
      setEssiga("");
      setOmutuba("");
      setOlunnyiriri("");
      setOlugja("");
      setNotes("");
    } else {
      toast(result.error ?? "Failed to send. Please try again.");
    }
  }

  const inputClass =
    "w-full border border-eborder rounded px-3 py-2.5 text-[14px] outline-none focus:border-gold bg-white";
  const labelClass = "block text-[11px] uppercase tracking-wide text-muted mb-1";

  return (
    <Card className="mb-3.5">
      <CardHeader>
        <span className="text-[15px] text-gd font-semibold">Help Us Document Your Clan</span>
      </CardHeader>
      <CardBody>
        <p className="text-[13px] text-muted leading-relaxed mb-4">
          Do you know your <strong className="text-gd">Essiga</strong> (ssiga/branch),{" "}
          <strong className="text-gd">Omutuba</strong>, <strong className="text-gd">Olunnyiriri</strong>,
          or <strong className="text-gd">Olugja</strong>? Several clans don&apos;t yet have this
          recorded in our archive — sharing yours helps the Foundation document{" "}
          <strong className="text-gd">{clan.name}</strong> for future generations. Entirely optional,
          and every submission is reviewed before anything is added to the site.
        </p>

        <div className="grid gap-3 mb-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
          <label className="block">
            <span className={labelClass}>Essiga lyo</span>
            <input type="text" value={essiga} onChange={(e) => setEssiga(e.target.value)} className={inputClass} />
          </label>
          <label className="block">
            <span className={labelClass}>Omutuba gwo</span>
            <input type="text" value={omutuba} onChange={(e) => setOmutuba(e.target.value)} className={inputClass} />
          </label>
          <label className="block">
            <span className={labelClass}>Olunnyiriri lwo</span>
            <input type="text" value={olunnyiriri} onChange={(e) => setOlunnyiriri(e.target.value)} className={inputClass} />
          </label>
          <label className="block">
            <span className={labelClass}>Olugja lwo</span>
            <input type="text" value={olugja} onChange={(e) => setOlugja(e.target.value)} className={inputClass} />
          </label>
        </div>

        <label className="block mb-3">
          <span className={labelClass}>Additional notes (optional)</span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="Anything else that would help — village, family name, an elder to contact, etc."
            className={`${inputClass} resize-none`}
          />
        </label>

        <Button variant="gold" size="sm" onClick={handleSend} disabled={!canSubmit || sending}>
          {sending ? "Sending…" : "Send to the Foundation →"}
        </Button>
        <p className="text-[11px] text-muted mt-2.5 leading-relaxed">
          Sent directly to the Foundation&apos;s archive team — no email app required.
        </p>
      </CardBody>
    </Card>
  );
}
