"use client";

import { useState } from "react";
import {
  usePanelStore,
  announcementsForSession,
  postAnnouncement,
} from "@/lib/batakaPanel/store";
import { getClan } from "@/lib/clans";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

// Announcements — how the Omutaka's office speaks to its members. This is
// the panel side of the "get notified by your Omutaka" promise the clan
// pages already make; delivery to members' apps arrives with the backend.
export default function AnnouncementsPage() {
  const state = usePanelStore();
  const { toast } = useToast();
  const announcements = announcementsForSession(state);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const isAdmin = state.session?.isAdmin ?? false;
  const clanSlug = state.session?.clanSlug ?? null;

  const inputClass =
    "w-full border border-eborder rounded px-3 py-2.5 text-[14px] outline-none focus:border-gold";

  function handlePost() {
    if (!clanSlug || !title.trim() || !body.trim()) return;
    postAnnouncement(clanSlug, title.trim(), body.trim());
    setTitle("");
    setBody("");
    toast("Announcement posted to your clan's members.");
  }

  return (
    <>
      {!isAdmin && (
        <Card className="mb-4">
          <CardHeader>
            <span className="text-[15px] text-gd font-semibold">
              New Announcement
            </span>
          </CardHeader>
          <CardBody>
            <label className="block mb-3">
              <span className="block text-[11px] uppercase tracking-wide text-muted mb-1">
                Title
              </span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Clan general meeting — Katende, 30 July"
                className={inputClass}
              />
            </label>
            <label className="block mb-3">
              <span className="block text-[11px] uppercase tracking-wide text-muted mb-1">
                Message
              </span>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={4}
                className={inputClass}
              />
            </label>
            <Button
              variant="gold"
              size="sm"
              disabled={!title.trim() || !body.trim()}
              onClick={handlePost}
            >
              Post to clan members →
            </Button>
            <p className="text-[11px] text-muted mt-2 leading-relaxed">
              Demo: in the live system this reaches your clan&apos;s registered
              members in the app (and later by SMS).
            </p>
          </CardBody>
        </Card>
      )}

      {isAdmin && (
        <p className="text-[12.5px] text-muted mb-4 leading-relaxed">
          Announcements are per-clan and posted by each clan&apos;s own office —
          as admin you can read them all below.
        </p>
      )}

      {announcements.length === 0 ? (
        <p className="text-[13px] text-muted text-center py-8">
          No announcements yet.
        </p>
      ) : (
        <div className="flex flex-col gap-2.5">
          {announcements.map((a) => (
            <div
              key={a.id}
              className="bg-white border border-eborder rounded-[6px] px-4 py-3.5"
            >
              <p className="text-[14px] text-gd font-semibold mb-1">{a.title}</p>
              <p className="text-[13px] text-muted leading-relaxed mb-1.5">
                {a.body}
              </p>
              <p className="text-[11px] text-muted">
                {a.at}
                {isAdmin && <> · {getClan(a.clanSlug)?.name} clan</>}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
