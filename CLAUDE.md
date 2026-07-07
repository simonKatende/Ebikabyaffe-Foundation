# Ebikabyaffe Foundation — Project Guide

> **Session 11 handoff (Flagship Project → real 3-project structure · Kiganda→Buganda pass · Kooti ya Kisekwa added as 3rd /clans view + Bataka data fixes · /queens merged into /kabaka · nav tabs renamed/reordered — read this first, nothing left mid-task):**
> **[.claude/handoff-2026-07-07-s11.md](.claude/handoff-2026-07-07-s11.md)**
>
> Session 10 handoff (Bataka merged into Clans · totem photos + lightbox · /abalangira split out · /katikkiro + /amasaza merged into new /abakungu · real Foundation content + launch videos added to home page · footer/hero layout fixes):
> **[.claude/handoff-2026-07-07-s10.md](.claude/handoff-2026-07-07-s10.md)**
>
> Session 9 handoff (Kabaka/Katikkiro/Queens tabs built):
> **[.claude/handoff-2026-07-06-s9.md](.claude/handoff-2026-07-06-s9.md)**
>
> Session 8 handoff (/bataka built + reworked to title-led Mutaka cards):
> **[.claude/handoff-2026-07-05-s8.md](.claude/handoff-2026-07-05-s8.md)**
>
> Session 7 handoff (Lugave deep page + /amasaza tab + hero images):
> **[.claude/handoff-2026-07-04-s7.md](.claude/handoff-2026-07-04-s7.md)**
>
> Session 6 handoff (/roots removed):
> **[.claude/handoff-2026-07-03-s6.md](.claude/handoff-2026-07-03-s6.md)**
>
> Session 5 handoff (56 clans + v3 alignment + Picjumbo hero + Omutaka step):
> **[.claude/handoff-2026-07-03-s5.md](.claude/handoff-2026-07-03-s5.md)**
>
> Session 4 handoff (/give page built + full project write-up):
> **[.claude/handoff-2026-06-25-s4.md](.claude/handoff-2026-06-25-s4.md)**
>
> Session 3 handoff (clans data + 8-step roots funnel):
> **[.claude/handoff-2026-06-24-s3.md](.claude/handoff-2026-06-24-s3.md)**
>
> Session 2 handoff (roots page built):
> **[.claude/handoff-2026-06-24-s2.md](.claude/handoff-2026-06-24-s2.md)**
>
> Session 1 handoff (full file map + design tokens):
> **[.claude/handoff-2026-06-24.md](.claude/handoff-2026-06-24.md)**

---

## Quick start (every session)

```powershell
# Refresh PATH first (required after a fresh terminal opens)
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

Set-Location "c:\Users\EBIKABYAFFE\Dev Projects\Ebikabyaffe-Foundation\web"
npm run dev
# → http://localhost:3000
```

---

## Project structure

| Path | Purpose |
|------|---------|
| `web/` | Next.js 16.2.9 app (App Router, TypeScript, Tailwind, Turbopack) |
| `web/app/globals.css` | All CSS design tokens + hero animation keyframes |
| `web/app/layout.tsx` | Root layout: AuthProvider → ToastProvider → Nav → main → Footer |
| `web/context/AuthContext.tsx` | isLoggedIn, lang, login, logout, toggleLang |
| `web/lib/clans.ts` | **56 clans**, 18 Amasaza, getClan(), WAVE_LABELS, getClansByWave() |
| `web/lib/bataka.ts` | Bataka status layer (31 confirmed / 3 disputed / 22 unconfirmed) + office notes — feeds the Bataka view of /clans |
| `web/lib/clanImages.ts` | Totem photo registry: src/alt/credit per clan (omuziro + akabbiro) — UI falls back to totemEmoji when absent |
| `prototype-v3.html` | **Current reference prototype** — v3 Heritage Encyclopedia direction |
| `prototype-v2.html` | Previous reference — do not overwrite `prototype.html` |

---

## Build status

| Route | Status |
|-------|--------|
| `/` | ✅ Landing (real Commons hero photos, linked slides/stats) + **About/Leadership/Three-Pillars/Flagship-Project/Recent-Activity sections below the hero** (source: Ebikabyaffe_Foundation PDF), with **embedded launch videos** (tap-to-play, `YouTubeEmbed` component) in the About and Flagship sections + Dashboard (Explore row). **Flagship Project is now three sub-sections** (Project I/II/III, source: Ebikabyaffe_Foundation_Proposal PDF): Ekikakyo (Clan Fund), the Wakivule Pilot School (kept, video intact), and the Sacco (Fraternity Sacco) — each CTA deep-links to its matching card on `/give` |
| `/clans` | ✅ 56 clans · **three views**: Ebika grid (default) + Bataka (`?view=bataka`, title-led Mutaka cards) + Kooti ya Kisekwa (`?view=kisekwa`, the traditional Court of Clans) via ClanViewTabs · **real totem photos** (43 tiles; emoji fallback for abstract totems) |
| `/clans/[slug]` | ✅ Mmamba + Lugave deep pages (photo heroes) · all others → GenericClanDetail with totem-photo hero + Omuziro/Akabbiro gallery + credits |
| `/kabaka` | ✅ Throne page — hero portrait + king-list + role/achievements + quick reference (source: Kabaka PDF) · royal-clan detail moved to `/abalangira` (cross-linked) · **now also carries the former `/queens` page** (2026-07): Three Women/Three Crowns table → Nnabagereka origins → current Nnabagereka bio/achievements → Namasole → Lubuga → why women held such power, inserted after the Kabaka's own achievements section and before Symbols/Succession; Quick Reference table expanded with Nnabagereka/Namasole/Lubuga rows |
| `/abalangira` | ✅ Royal clan (Olulyo Olulangira) — full reference page: titles, governance, birth/naming/succession, marriage customs, ranking of royal women (source: Abalangira_naAbambejja PDF, in full — not condensed) |
| `/abakungu` | ✅ **Replaces `/katikkiro` AND `/amasaza`** (2026-07) — "Abakungu ba Ssaabasajja," the Kabaka's network of representative chiefs, administratively headed by the Katikkiro. Order: Katikkiro profile (Ddamula portrait, officeholders, Mayiga bio) → Ssaabasajja-honorific explainer → Kabaka→Katikkiro→Ssaza→Gombolola→Muluka→Kyalo hierarchy card → Katikkiro achievements/challenges → **What Are the Amasaza? + Origins & the "Lost Counties"** → named chiefs in Buluuli/Kooki/elsewhere → **the 18-county `AmasazaGrid` (reused component) + Ssese special case + Masaza Cup** → named Ssaza chiefs kingdom-wide → UK diaspora structure → quick reference (source: Katikkiro PDF + Amasaza PDF + Abakungu_ba_Ssaabasajja PDF) |
| `/give` | ✅ **Three campaign cards** via switcher chips + `?campaign=<id>` deep link (`wakivule` real raised/goal stats · `ekikakyo` aim list, no invented numbers · `sacco` real fee/share/donation figures + contact note) + one-time form + Busuulu tiers + transparency placeholder |
| `/bataka` | ✅ **Merged into /clans** — route now redirects to `/clans?view=bataka` (nav tab removed; Clans sub reads "Ebika, Bataka & Court") |
| `/queens` | ✅ **Merged into `/kabaka`** (2026-07) — route now redirects to `/kabaka` (nav tab removed; Kabaka sub reads "Throne & Queens") |
| `/profile` | ⬜ **Next to build** — the last Phase 1 route. Account settings + verification badge |

---

## Key rules

- The Next.js app lives in `web/` (not `app/`) to avoid App Router naming conflict.
- `"use client"` required on any component that uses hooks or browser events.
- Design system colors come from CSS vars (`--gd`, `--gold`, `--royal`, etc.) mapped to Tailwind via `@theme inline` in globals.css.
- Logo at `web/components/LogoSVG.tsx` is a placeholder. Real logo → `web/public/logo.svg` → use `next/image`.
- Hero slider images: set `src` in `web/components/home/HeroSlider.tsx` slides array; place files in `web/public/images/`.
- Follow **prototype-v3.html** for all new UI decisions.

---

## Critical data facts (do not regress)

- `clan.totemEmoji` is the emoji field — **not** `clan.totem` (old name, removed)
- **Mmamba Akabbiro = Muguya** — NOT sheep/Ndiga (was wrong, now corrected)
- **nkere is NOT a clan** — Kikere (frog) is only the Akabbiro of Ffumbe
- Documented Amasiga exist for **Lugave** (17, per 2021 clan archive), **Njaza** (20), **Njovu** (7), **Nswaswa** (6) only
- **56 clans** total — any hardcoded "43" or "52" anywhere is a stale reference
- **Busiro Saza Chief = Ssebwana; Mugema = Nkima clan head** — two different titles
- Amasaza carry `headquarters` / `acquired` / `history` fields (source: Amasaza PDFs)
- **Lugave: Ndugwa succession is decided by the clan council** — not father-to-son
- Hero slider images are CC BY-SA — the on-slide `credit` line must stay
- **Totem photos in `web/public/images/totems/` are Wikimedia Commons (CC BY / CC BY-SA / GFDL / PD)** — the credit strings in `clanImages.ts` must stay rendered on clan detail pages; grid carries a collective attribution line. Abstract totems (rainwater, heart, Babiito lines, unverified species) intentionally have NO photo entry — never force one
- **Bataka status layer in `web/lib/bataka.ts`** — a living record: 31 confirmed / 3 disputed / 22 unconfirmed; disputed entries are snapshots, not settled facts
- **Bataka current-holder names now show on the collapsed Mutaka card** (`/clans?view=bataka`), not just when expanded — sourced from `clan.currentHead` in `clans.ts`
- **No verified photos exist yet for real Bataka officeholders** (as of 2026-07 research) — Buganda Kingdom's own official clan pages (buganda.or.ug) carry no personal photos, only totem emblems; a promising-looking "Ttabamiruka w'Abataka 2022" YouTube series turned out to be a distinct UK/Ireland diaspora event with its own different representatives (zero name matches to any current-holder in our data) — do not reuse those clips/thumbnails as photos of the Uganda-based Bataka Council members. A group-shot news thumbnail of the 2024 Mpologoma installation was also rejected: multiple people in frame, no per-person caption. **Rule: only add a real person's photo when a source explicitly, individually captions that specific named person** — same bar as Kabaka/Katikkiro/Queens photos, just much harder to satisfy for private clan heads
- **Mpologoma and Kiwere current-holder names were stale and have been corrected** (2026-07): both predecessors died and were succeeded by their sons — Mpologoma → Erukaana Lukanga (35th head, installed Aug 2024); Kiwere → Alexander Basajjabaka Sserwadda. See notes in `bataka.ts`
- **Lugave (Ndugwa Grace Ssemakula) and Nkejje have documented leadership disputes** — noted in `bataka.ts` but status kept "confirmed" (Kingdom-recognised) per the existing pattern used for Ngeye/Kasujja's similar historical dispute
- **Mugema (Nkima) is currently vacant** — do not invent a currentHead
- **Lukato has TWO co-recognised titleholders** (Magunda / Lyongera)
- **Bataka ≠ Ssaza chiefs** — clan authority is personal, county authority is territorial; some titles overlap in name (e.g. Kasujju)
- The Bataka view (`/clans?view=bataka`) sorts cards by **title**, not clan name — that ordering is the point; the old `/bataka` route must keep redirecting there
- `formatUGX(n)` helper lives inside `GiveContent.tsx` — not in utils.ts
- **Naming convention (user rule):** the reigning king is always written with his titles — **Ssabasajja Kabaka Ronald Muwenda Mutebi II**; deceased kings take **Ssekabaka**; the Katikkiro always carries **Owek.** (Owekitiibwa) — e.g. Owek. Charles Peter Mayiga
- Kabaka/Katikkiro photos in `web/public/images/kabaka/` + `katikkiro/` are Wikimedia Commons CC BY-SA 4.0 (except `mayiga-portrait.jpg`, CC0) — on-page credit captions must stay
- Queens photos still live in `web/public/images/queens/` (folder untouched by the merge below) — the two Nnabagereka portraits are CC0 and are now rendered on `/kabaka` instead of a standalone `/queens` page; credit captions must stay. `coronation-anniversary.jpg` (CC BY-SA 4.0) was not carried over into the merged page and is currently unused — left in place rather than deleted, since deleting media wasn't part of the merge request
- **Buganda has THREE queens, not one** — Nnabagereka (consort, 20th-century title), Namasole (mother, ancient), Lubuga/Nnalinya (sister, ancient). Nnabagereka birth year: this project follows **1962** (sources conflict with 1964)
- **`/queens` is merged into `/kabaka`** (2026-07, session following the Bataka→Clans and Katikkiro/Amasaza→Abakungu merges) — old route now redirects (`app/queens/page.tsx`, same pattern as `/bataka`). The three royal-women sections sit right after the Kabaka's own achievements section and before Symbols/Succession; the Kabaka page's Quick Reference table absorbed the Nnabagereka/Namasole/Lubuga rows in place of the old single "Queen consort" row. `/abalangira`'s companion-links grid no longer links to `/queens` separately — its `/kabaka` link now covers both
- **Current Namasole is provisional** — successor to Margaret Siwoza not confirmed; do not invent a name (same living-record rule as vacant Mugema)
- **Royal clan (Olulyo Olulangira) is patrilineal, not matrilineal** — a widely repeated misconception. Membership/succession eligibility passes strictly father-to-child; maternal-clan influence is politics/sentiment, not clan law. Covered in depth on the dedicated **`/abalangira`** page (source: `Abalangira_naAbambejja.pdf`) — do not re-add this content to `/kabaka`, it was deliberately split out
- **Ssabalangira** = delegated head of the royal clan (holds the Ssegulira Ennume staff of office) — distinct from the Katikkiro (head of state/Abakungu government, see `/abakungu`) and from Ssabataka (a Kabaka title over the ordinary-clan Bataka council, see `/bataka`)
- A son of an Omumbejja (princess) is customarily styled **Saava** — but belongs to his own father's clan, not Olulyo Olulangira (patrilineal rule holds even here)
- Princesses (Abambejja) were traditionally barred from marrying/bearing children c. 1750s–1880; princes/princesses were barred from marrying each other by design (agreed at the Hill of Nnono) to spread royal kinship across ordinary clans
- **"Ssaabasajja" has two distinct senses, deliberately kept separate on `/abakungu`**: (1) a royal honorific for the Kabaka himself ("Ssaabasajja Kabaka"); (2) informally, the whole network of chiefs installed in his name ("Abakungu ba Ssaabasajja"). "Omwami wa Ssaabasajja Kabaka" is just the everyday formal term for a sitting **Ssaza (county) chief** kingdom-wide — not a separate or exotic office confined to contested territories
- **`/katikkiro` and `/amasaza` no longer exist as their own routes** (both merged into `/abakungu`, 2026-07) — the Katikkiro (Owek. Charles Peter Mayiga) is the *administrative head* of the Abakungu ba Ssaabasajja network (holds the Ddamula, presides over the Lukiiko, heads the civil service), and the 18 Amasaza are the territorial units that network's Ssaza chiefs administer, so they now live on one page; update any new cross-links to point at `/abakungu`, not `/katikkiro` or `/amasaza`
- The full hierarchy on `/abakungu` is: **Kabaka (Ssaabasajja) → Katikkiro → Ssaza chiefs (Owessaza) → Gombolola chiefs → Muluka chiefs → Kyalo (village) headmen** — the Kyalo tier comes from the Amasaza PDF's 4-level county table (Ssaza/Gombolola/Muluka/Kyalo), merged with the Abakungu PDF's Kabaka→Katikkiro framing so neither hierarchy explanation is duplicated
- **Buluuli and Kooki are contested-authority territories** — Buluuli has a rival Bunyoro-Kitara ("Ssabaluuli") claim; Kooki has its own hereditary Kamuswaga (Apollo Ssansa Kabumbuli II) with historically uneven relations to Mengo. Named chiefs there are a living record, not an exhaustive roster — the source PDF is explicit that no single master roster of Abakungu ba Ssaabasajja exists publicly
- **The 18 Amasaza is down from a peak of 20** — Buyaga and Bugangaizi were transferred from Bunyoro in 1900 and returned via the 1964 "Lost Counties" referendum; do not present a "20 counties" or "43/52 clans"-style stale count anywhere
- **`AmasazaGrid.tsx` (in `web/components/clans/`) and the `amasaza` array/`Ssaza` type in `clans.ts` are still live** — they're now rendered inside `/abakungu` rather than a standalone `/amasaza` page. Don't delete them as "unused"
- **Ssabalangira Godfrey Kikulwe Musanje died 3 Feb 2026 (age 76)** — Prince Frederick Sunday Kateregga (former Deputy Ssabalangira) is **Interim** Ssabalangira pending a substantive appointment. Reflected on `/abalangira`; treat as a living record, not settled — do not name a permanent successor without a new source
- **Ebikabyaffe Foundation's real-world affiliation/leadership is now on the home page** (`HomeLanding.tsx`, logged-out state only) — About/Mission, 6-person Leadership roster, "Three Pillars of Buganda" (each pillar links to its already-built page: `/abalangira`, `/clans?view=bataka`, `/abakungu`), the Wakivule flagship-school project, and a Recent Activity note on the Jan 2025 SHIPU meeting. Source: `Ebikabyaffe_Foundation.pdf`. This is real organizational content (not mock data) — treat leadership names/roles as load-bearing facts, not placeholder copy
- **The "Three Pillars" framing is a useful cross-check**: Abalangira n'Abambejja/Ssabalangira, Ebika bya Buganda/Omukulembeza w'Olukiiko lwa Bataka (currently Omutaka Augustine Kizito Mutumba), and Abakungu ba Ssaabasajja/Katikkiro — each pillar already has a dedicated page; if a future doc updates one pillar's current holder, update the corresponding `PILLARS` entry in `HomeLanding.tsx` too, not just the pillar's own page
- **`web/components/ui/YouTubeEmbed.tsx`** — reusable tap-to-play video component (thumbnail + play button → swaps to a `youtube-nocookie.com` iframe with `autoplay=1` on click, nothing loads off-site until tapped). Used on the home page for the Foundation launch video (`A9fa60aNhQA`, About section) and the Wakivule school launch video (`3CEUzFGR3Fo`, Flagship Project section). Reuse this component for any future embedded video rather than a raw `<iframe>` or an outbound link
- **The "Agali awamu" hero trust-bar block (`HomeLanding.tsx`) is fully removed** (2026-07, follow-up to the badge-row removal) — the global site `Footer.tsx` motto ("Okutumbula n'okusitula Ebikabyaffe") is now the only motto on the home page; the small "Agali awamu" tagline under the logo in `Nav.tsx` is a separate, unrelated element and was not touched
- **Hero section (`HomeLanding.tsx`) reserves `paddingBottom: 110px`** on the 100vh hero `<section>` — without it, the vertically-centered content stack (badge/headline/lede/CTAs/stats bar) can grow tall enough to crowd into the same bottom zone where `HeroSlider` prints its place-name caption, dot nav, and progress bar, visually covering them. Don't remove this padding when editing hero content; if the stats bar or CTAs grow taller, increase it rather than deleting it
- **Ebikabyaffe Foundation runs three interconnected projects, not one** (source: `Ebikabyaffe_Foundation_Proposal.pdf`, 2026-07): **I. Ekikakyo** (the Clan Fund — modern extension of Akasolya/Olukiiko lw'Ekika/Obutaka, aiming for "one clan, one school" across all 56 clans), **II. the Pilot School** in Wakivule Village, **Kikyusa Sub-County** (not "Town Council" — corrected 2026-07), Luwero District, and **III. the Sacco** (Ebikabyaffe Foundation Fraternity Sacco, the financial arm — real fixed figures: UGX 10,000 one-time membership fee, UGX 20,000/share, any-amount voluntary donations). All three are reflected as "Project I/II/III" on the home page's Flagship section and as three cards on `/give` (switcher chips + `?campaign=ekikakyo|wakivule|sacco` deep link)
- **`Campaign` type in `GiveContent.tsx` now has optional funding-stats fields** (`raisedUGX`/`donorCount`/`goalUGX`/`milestonePct`/`milestoneNote`) — only Wakivule has real tracked numbers and shows the raised/donor/progress-bar block. Ekikakyo has no fundraising target in the source doc, so it renders an `aims` bullet list instead — **never invent a raised/goal number for it**. The Sacco has real fixed figures (fee/share/donation) via `saccoStats`, not a progress bar, plus a `contactNote` pointing to real Foundation/Sacco officials for membership + share registration (no online membership flow exists — don't fabricate one)
- **Nav tab labels were renamed 2026-07 (user request, cosmetic only — no page content changed)**: order is now Home → **Ssabasajja Kabaka** (was "Kabaka") → **Abalangira n'Abambejja** (was "Abalangira") → **Ebika bya Baganda** (was "Clans") → **Abakungu ba Ssaabasajja** (was "Abakungu") → Give → Profile. Sub-captions (e.g. "Throne & Queens", "Ebika, Bataka & Court") are unchanged. Note the deliberate spelling split: single-*a* "Ssabasajja Kabaka" for the king's own honorific vs. double-*a* "Ssaabasajja" in "Abakungu ba Ssaabasajja" for the chiefs' network — both spellings are attested in the source PDFs and each page's own hero already used one consistently; the nav now matches each page rather than picking one spelling site-wide
- **Kooti ya Kisekwa (`/clans?view=kisekwa`) added 2026-07** (source: `Kooti_ya_Kisekwa.pdf`) — Buganda's apex traditional court for clan headship/succession/Obutaka disputes, sitting at Bulange, Mengo. This is the institution `web/lib/bataka.ts`'s Ngeye and Nvubu notes already referenced by name ("the Kisekwa clan court") without explaining — this page is that explainer. Landmark rulings covered: Ndiga (2020, installed Lwomwa Luggya Bbosa Tabula), Ngeye (2016, Kabaka-on-appeal), Mmamba/Gabunga (2025, confirmed James Mubiru as 38th Gabunga), and Engeye/Kalindaluzzi (2026) — the last is flagged as a possibly-distinct clan/spelling from Ngeye, not silently linked, since the source doesn't confirm they're the same. **Ndiga moved from unconfirmed to confirmed in `bataka.ts`** as a direct result (31 confirmed / 3 disputed / 22 unconfirmed, was 30/3/23) — its `currentHead` in `clans.ts` was empty before this PDF named one
