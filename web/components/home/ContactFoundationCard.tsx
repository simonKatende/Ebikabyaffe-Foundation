"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { getClan } from "@/lib/clans";
import { FOUNDATION_CONTACT_EMAIL, foundationSignature, sendToFoundation } from "@/lib/contactFoundation";

// ── "Have a question, comment, or observation?" — home dashboard ────────────
//
// Sent silently via app/api/contact/route.ts (Resend) — no email client
// popping up. See lib/contactFoundation.ts for the shared send helper (also
// used by the profile page's clan-lineage archive contribution form).

const MESSAGE_TYPES = ["Question", "Comment", "Observation"] as const;
type MessageType = (typeof MESSAGE_TYPES)[number];

export function ContactFoundationCard() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [type, setType] = useState<MessageType>("Question");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSend() {
    if (!message.trim() || sending) return;
    setSending(true);
    const clanName = user.clanSlug ? getClan(user.clanSlug)?.name : undefined;
    const subject = `[Ebikabyaffe Foundation] ${type} from ${user.name}`;
    const body = `${message.trim()}\n\n${foundationSignature(user.name, user.phone, clanName)}`;
    const result = await sendToFoundation(subject, body);
    setSending(false);
    if (result.ok) {
      toast(`Your ${type.toLowerCase()} has been sent to ${FOUNDATION_CONTACT_EMAIL} successfully.`);
      setMessage("");
    } else {
      toast(result.error ?? "Failed to send. Please try again.");
    }
  }

  const inputClass =
    "w-full border border-eborder rounded px-3 py-2.5 text-[14px] outline-none focus:border-gold bg-white";
  const labelClass = "block text-[11px] uppercase tracking-wide text-muted mb-1";

  return (
    <Card>
      <CardHeader>
        <span className="text-[20px]">✉️</span>
        <div>
          <h3 className="text-[15px] text-gd">Have a Question, Comment, or Observation?</h3>
          <p className="text-[12px] text-muted">Goes straight to the Foundation</p>
        </div>
      </CardHeader>
      <CardBody>
        <label className="block mb-3">
          <span className={labelClass}>Type</span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as MessageType)}
            className={inputClass}
          >
            {MESSAGE_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="block mb-3">
          <span className={labelClass}>Your message</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="Type your question, comment, or observation here…"
            className={`${inputClass} resize-none`}
          />
        </label>
        <Button variant="gold" size="sm" onClick={handleSend} disabled={!message.trim() || sending}>
          {sending ? "Sending…" : "Send to the Foundation →"}
        </Button>
        <p className="text-[11px] text-muted mt-2.5 leading-relaxed">
          Sent directly to the Foundation — no email app required.
        </p>
      </CardBody>
    </Card>
  );
}
