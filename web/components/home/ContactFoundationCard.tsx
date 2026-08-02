"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { getClan } from "@/lib/clans";
import { FOUNDATION_CONTACT_EMAIL, foundationSignature, sendToFoundation } from "@/lib/contactFoundation";
import {
  fetchMyMessages,
  markReplySeen,
  unseenReplyCount,
} from "@/lib/contactMessages/store";
import type { ContactMessage } from "@/lib/contactMessages/types";

// ── "Have a question, comment, or observation?" — home dashboard ────────────
//
// Sent silently via app/api/contact/route.ts (Resend) — no email client
// popping up. See lib/contactFoundation.ts for the shared send helper (also
// used by the profile page's clan-lineage archive contribution form).
//
// 2026-08: also shows this member's own message history below the form,
// with a reply badge — an email reply typed in the Foundation's personal
// Gmail inbox is invisible to this app, so this is the actual in-app
// notification the member sees once the Foundation admin replies from the
// Foundation Admin console (see lib/contactMessages/store.ts).

const MESSAGE_TYPES = ["Question", "Comment", "Observation"] as const;
type MessageType = (typeof MESSAGE_TYPES)[number];

export function ContactFoundationCard() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [type, setType] = useState<MessageType>("Question");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const [history, setHistory] = useState<ContactMessage[]>([]);
  useEffect(() => {
    if (!user.id) return;
    void fetchMyMessages(user.id).then(setHistory);
  }, [user.id]);
  const unseen = unseenReplyCount(history);

  const [openId, setOpenId] = useState<string | null>(null);
  function toggleOpen(m: ContactMessage) {
    const opening = openId !== m.id;
    setOpenId(opening ? m.id : null);
    if (opening && m.replyBody && !m.replySeenByMember) {
      // Optimistic — the badge should clear the instant it's opened, not
      // wait on the round-trip.
      setHistory((h) => h.map((x) => (x.id === m.id ? { ...x, replySeenByMember: true } : x)));
      void markReplySeen(m.id);
    }
  }

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
      void fetchMyMessages(user.id).then(setHistory);
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
        <div className="flex-1">
          <h3 className="text-[15px] text-gd">Have a Question, Comment, or Observation?</h3>
          <p className="text-[12px] text-muted">Goes straight to the Foundation</p>
        </div>
        {unseen > 0 && (
          <span className="inline-block text-[10px] font-bold px-2 py-1 rounded-full bg-red-600 text-white tracking-[.5px] shrink-0">
            {unseen} new {unseen === 1 ? "reply" : "replies"}
          </span>
        )}
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

        {/* This member's own message history — the actual in-app
            notification for a Foundation reply, since an email reply typed
            in the Foundation's Gmail inbox is otherwise invisible to the
            app. Collapsed rows, click to expand + read the reply (marks it
            seen). */}
        {history.length > 0 && (
          <div className="mt-5 pt-4" style={{ borderTop: "1px solid var(--eborder)" }}>
            <p className="text-[11px] uppercase tracking-wide text-muted mb-2.5">
              Your messages
            </p>
            <div className="flex flex-col gap-2">
              {history.map((m) => {
                const open = openId === m.id;
                const hasUnseenReply = Boolean(m.replyBody) && !m.replySeenByMember;
                return (
                  <div key={m.id} className="border border-eborder rounded-[6px] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => toggleOpen(m)}
                      className="w-full flex items-center gap-2.5 text-left px-3.5 py-2.5 bg-white hover:bg-cream2 transition-colors cursor-pointer border-0"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] text-gd font-semibold truncate">
                          {m.subject.replace(/^\[Ebikabyaffe Foundation\]\s*/, "")}
                        </p>
                        <p className="text-[11px] text-muted">
                          Sent {m.createdAt}
                          {m.replyBody && !hasUnseenReply && <> · Replied {m.repliedAt}</>}
                        </p>
                      </div>
                      {hasUnseenReply ? (
                        <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-red-600 text-white tracking-[.5px] shrink-0">
                          NEW REPLY
                        </span>
                      ) : !m.replyBody ? (
                        <span className="text-[10px] font-bold px-2 py-1 rounded bg-cream2 text-muted border border-eborder tracking-[.5px] shrink-0">
                          AWAITING REPLY
                        </span>
                      ) : null}
                      <span className="text-muted text-[12px] shrink-0">{open ? "▲" : "▼"}</span>
                    </button>
                    {open && (
                      <div className="px-3.5 py-3 bg-cream2 border-t border-eborder">
                        <p className="text-[10.5px] uppercase tracking-[.5px] text-muted mb-1">
                          Your message
                        </p>
                        <p className="text-[13px] text-gd leading-relaxed whitespace-pre-wrap mb-3">
                          {m.message}
                        </p>
                        {m.replyBody ? (
                          <>
                            <p className="text-[10.5px] uppercase tracking-[.5px] text-muted mb-1">
                              Foundation reply · {m.repliedAt}
                            </p>
                            <p className="text-[13px] text-gd leading-relaxed whitespace-pre-wrap">
                              {m.replyBody}
                            </p>
                          </>
                        ) : (
                          <p className="text-[12px] text-muted italic">
                            No reply yet — the Foundation will respond here.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
