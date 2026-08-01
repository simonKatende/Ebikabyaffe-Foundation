"use client";

import { useState } from "react";
import {
  usePanelStore,
  announcementsForSession,
  postAnnouncement,
} from "@/lib/batakaPanel/store";
import { clans, getClan, WAVE_LABELS, type OriginWave } from "@/lib/clans";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

const WAVE_ORDER: OriginWave[] = ["nansangwa", "kintu", "kimera", "later"];

// Announcements — how a clan's own office speaks to its members, OR (2026-08)
// how the Foundation admin can post on behalf of ANY clan when needed. This
// is the panel side of the "get notified by your Omutaka" promise the clan
// pages already make; delivery to members' apps arrives with the backend.
export default function AnnouncementsPage() {
  const state = usePanelStore();
  const { toast } = useToast();
  const announcements = announcementsForSession(state);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  // Admin-only: which clan this announcement is being posted on behalf of.
  const [targetClanSlug, setTargetClanSlug] = useState("");

  const isAdmin = state.session?.isAdmin ?? false;
  const officerClanSlug = state.session?.clanSlug ?? null;
  const postingClanSlug = isAdmin ? targetClanSlug : officerClanSlug;

  const inputClass =
    "w-full border border-eborder rounded px-3 py-2.5 text-[14px] outline-none focus:border-gold";

  function handlePost() {
    if (!postingClanSlug || !title.trim() || !body.trim()) return;
    postAnnouncement(postingClanSlug, title.trim(), body.trim(), isAdmin);
    const clanName = getClan(postingClanSlug)?.name ?? "the clan's";
    setTitle("");
    setBody("");
    if (isAdmin) setTargetClanSlug("");
    toast(
      isAdmin
        ? `Announcement posted to the ${clanName} clan's members, as the Foundation.`
        : "Announcement posted to your clan's members."
    );
  }

  return (
    <>
      <Card className="mb-4">
        <CardHeader>
          <span className="text-[15px] text-gd font-semibold">
            New Announcement
          </span>
        </CardHeader>
        <CardBody>
          {isAdmin && (
            <label className="block mb-3">
              <span className="block text-[11px] uppercase tracking-wide text-muted mb-1">
                Post on behalf of…
              </span>
              <select
                value={targetClanSlug}
                onChange={(e) => setTargetClanSlug(e.target.value)}
                className={inputClass}
              >
                <option value="" disabled>Select a clan…</option>
                {WAVE_ORDER.map((wave) => (
                  <optgroup key={wave} label={WAVE_LABELS[wave].label}>
                    {clans
                      .filter((c) => c.originWave === wave)
                      .map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>
            </label>
          )}
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
            disabled={!postingClanSlug || !title.trim() || !body.trim()}
            onClick={handlePost}
          >
            {isAdmin ? "Post on behalf of this clan →" : "Post to clan members →"}
          </Button>
          <p className="text-[11px] text-muted mt-2 leading-relaxed">
            {isAdmin
              ? "This will be clearly marked to members and to the clan's own office as posted by the Ebikabyaffe Foundation Administration Office, not the clan itself."
              : "Demo: in the live system this reaches your clan's registered members in the app (and later by SMS)."}
          </p>
        </CardBody>
      </Card>

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
              {a.postedByAdmin && (
                <p className="text-[11px] text-royal2 font-semibold mb-1">
                  🏛️ Posted by the Ebikabyaffe Foundation Administration Office
                </p>
              )}
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
