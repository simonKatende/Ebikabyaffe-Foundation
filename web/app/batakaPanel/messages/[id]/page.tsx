"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { usePanelStore } from "@/lib/batakaPanel/store";
import { fetchMessagesForAdmin, replyToMessage } from "@/lib/contactMessages/store";
import type { AdminContactMessage } from "@/lib/contactMessages/types";
import { getClan } from "@/lib/clans";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

// One "send to the Foundation" message's full detail + reply form —
// admin-only, see app/batakaPanel/messages/page.tsx's header comment.
export default function MessageDetailPage() {
  const { id } = useParams<{ id: string }>();
  const panelState = usePanelStore();
  const { toast } = useToast();
  const isAdmin = panelState.session?.isAdmin ?? false;

  const [all, setAll] = useState<AdminContactMessage[] | null>(null);
  useEffect(() => {
    if (!isAdmin) return;
    void fetchMessagesForAdmin().then(setAll);
  }, [isAdmin]);
  function refetch() {
    void fetchMessagesForAdmin().then(setAll);
  }
  const message = all?.find((m) => m.id === id);

  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);

  if (!isAdmin) {
    return (
      <p className="text-[13px] text-muted text-center py-10">
        Messages sent to the Foundation are reviewed by the Foundation admin,
        not by clan officers.
      </p>
    );
  }

  if (!message) {
    return (
      <p className="text-[13px] text-muted text-center py-10">
        Message not found.{" "}
        <Link href="/batakaPanel/messages" className="text-royal2">
          Back to messages
        </Link>
      </p>
    );
  }

  const clan = message.clanSlug ? getClan(message.clanSlug) : undefined;
  const inputClass =
    "w-full border border-eborder rounded px-3 py-2.5 text-[14px] outline-none focus:border-gold";

  return (
    <>
      <Link
        href="/batakaPanel/messages"
        className="inline-block text-[12px] text-royal2 no-underline hover:underline mb-3"
      >
        ← All messages
      </Link>

      {/* The original message */}
      <Card className="mb-3.5">
        <CardHeader>
          <div className="w-11 h-11 rounded-[8px] bg-cream2 border border-eborder flex items-center justify-center text-[20px] shrink-0">
            ✉️
          </div>
          <div className="flex-1">
            <h2 className="text-[16px] text-gd font-semibold">{message.subject}</h2>
            <p className="text-[12px] text-muted">
              {message.senderName}
              {message.senderVerified && <VerifiedBadge size={11} className="mx-0.5" />}
              {clan && <> · {clan.name} clan</>}
              {message.senderPhone && <> · {message.senderPhone}</>} · {message.createdAt}
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <p className="text-[13.5px] text-gd leading-relaxed whitespace-pre-wrap">
            {message.message}
          </p>
        </CardBody>
      </Card>

      {/* Reply record / form */}
      <Card>
        <CardHeader>
          <span className="text-[15px] text-gd font-semibold">Reply</span>
        </CardHeader>
        <CardBody>
          {message.replyBody && (
            <div className="mb-4 bg-cream2 border border-eborder rounded-[6px] px-4 py-3">
              <p className="text-[10.5px] uppercase tracking-[.5px] text-muted mb-1">
                Replied {message.repliedAt} · {message.replyByLabel}
              </p>
              <p className="text-[13.5px] text-gd leading-relaxed whitespace-pre-wrap">
                {message.replyBody}
              </p>
            </div>
          )}

          <label className="block mb-3">
            <span className="block text-[11px] uppercase tracking-wide text-muted mb-1">
              {message.replyBody ? "Send another reply" : "Write a reply"}
            </span>
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              rows={4}
              placeholder="Your reply — the member will see this next time they sign in."
              className={`${inputClass} resize-none`}
            />
          </label>

          <Button
            variant="gold"
            size="sm"
            disabled={!reply.trim() || sending}
            onClick={async () => {
              setSending(true);
              await replyToMessage(message.id, reply.trim());
              setSending(false);
              setReply("");
              refetch();
              toast("Reply sent — the member will see it next time they sign in.");
            }}
          >
            {sending ? "Sending…" : "Send reply"}
          </Button>
        </CardBody>
      </Card>
    </>
  );
}
