---
title: Ebikabyaffe Foundation — Member Mobilization Web App, Design Spec
date: 2026-05-10
status: Draft for Foundation review
authors: Simon Katende, with Claude (brainstorming)
audience: Ebikabyaffe Foundation leadership, Council of Clan Heads, project developers, Claude Design (for mockups)
---

# Ebikabyaffe Foundation — Member Mobilization Web App

## Executive summary

This is the design specification for a responsive web application commissioned by the Ebikabyaffe Foundation, an organization endorsed by the Buganda Council of Clan Heads (Olukiiko lw'Abataka). The app's role is to mobilize Baganda — both in Uganda and across the diaspora — around their clan identity, in service of three Foundation goals: building credible membership numbers for cultural and political lobbying, raising recurring donations to support Bataka work and the Foundation's pilot school project in Wakivule, Luwero, and strengthening the day-to-day governance and visibility of the Bataka.

The product is **not** primarily a fundraising platform. It is a heritage discovery experience that grows naturally into a community and giving platform. The user's first encounter is *"Reclaim who you are — discover your clan, your roots, your people."* Donations and lobbying weight emerge as outcomes of belonging, not as upfront asks. This positioning is what the design optimizes for, and it is what we believe will earn aspirational endorsement from the Buganda Kingdom over time.

## Goals

The Foundation has three operational goals for the app:

1. **Mobilize members at scale** — recruit a credible base of self-identified clan members across all 52 Buganda clans, both in Uganda and in the diaspora, so that the Foundation can speak with demonstrable authority on cultural matters.
2. **Generate sustainable funding** — convert engaged members into one-time donors and, more importantly, into recurring sustainers (Busuulu) whose monthly contributions fund the school, the Bataka, and Foundation operations.
3. **Strengthen the Bataka** — give clan heads a digital channel to verify members, reach their clan, post calls to action, and be publicly visible as authorities — without replacing their traditional role.

Underneath these is an implicit fourth goal: **earn the Buganda Kingdom's endorsement** by producing a product so dignified, accurate, and useful that Mengo wants its name associated with it.

## Success criteria

The Foundation will judge the app a success if, twelve months after launch, the following are true:

- **Leading metric (year-one obsession):** total registered members across all clans is on a trajectory the Foundation considers credible for lobbying purposes. The Foundation should set the specific number; this spec recommends an initial public target be agreed before launch and tracked openly.
- **Lagging metric — verified depth:** a meaningful share of registered members (suggested floor: 15-25%) have completed lineage details and a smaller share (suggested floor: 5%) are Bataka-verified. The verified subtotal is the number used in any high-stakes external claim.
- **Lagging metric — donations:** total donations raised in UGX and foreign currency, reported quarterly through the public transparency dashboard.
- **Lagging metric — recurring sustainers:** number of active Busuulu (recurring) donors, broken down by tier. This is the most important predictor of long-term sustainability and becomes the year-two leading metric.

These four metrics, together, tell the Foundation whether the app is doing its job. They are designed as a funnel: registrations feed verification, verification feeds donations, donations feed recurring.

## Audience

The app is designed around two co-primary audiences whose needs differ enough to create real design tension. Both must be served.

**Baganda in Uganda, ages 20-55** — working-age clan members in Kampala, Wakiso, Mukono, and upcountry towns. Smartphone-using, mobile-money-comfortable. Pay in UGX. Default language Luganda. Connectivity is mobile-first, often on 3G; data is cost-sensitive, so payload size matters. They are likely to know their clan but may not know their *siga* or *mutuba*. They give in smaller amounts but more frequently, especially when the cause is concrete (a school roof, a clan event).

**Diaspora Baganda** — Buganda living in the UK, US, Canada, the Gulf, South Africa, and elsewhere. Earn in foreign currency. Often emotionally invested in heritage but disconnected from day-to-day clan life. May not speak fluent Luganda — their children rarely do. Pay by card, Apple Pay, Google Pay, PayPal. Default language English. Connectivity is excellent. They give larger amounts, more episodically, and respond strongly to identity narratives ("This is who you are; this is where you come from").

**Where the audiences diverge** — the design must accommodate Luganda-first vs. English-first labelling (auto-detected by locale, one-tap toggle visible everywhere), UGX vs. foreign-currency payment rails (with both surfaced cleanly), connectivity assumptions (everything must work on slow 3G), and donation amount presets (UGX 5K-50K vs. $20-$100). Where they converge — and what the entire app rests on — is the longing to know who you are, and to belong to something meaningful.

## Endorsement and authority

The app launches as an **Ebikabyaffe Foundation product, endorsed by the Buganda Council of Clan Heads.** The endorsement of the Buganda Kingdom (Mengo) is **aspirational** — to be earned through the design quality, accuracy, and impact of the app itself, rather than presumed up front.

This shapes the visual and narrative posture:

- The Foundation's name and the Council of Clan Heads' endorsement appear on every public page footer.
- Clan symbols, totems, individual Bataka names and photos may be used, with each Omutaka's consent.
- The Buganda Kingdom crest, Kabaka imagery, and royal seals are **not** used until formally cleared by Mengo.
- Where an Omutaka has actively contributed to a clan page, the page credits them ("Curated with the Office of the Omutaka of [clan name]"). Where they have not, the credit is omitted — the app does not claim what isn't true.

The product is built so that, when kingdom endorsement is later granted, the additional trust signals slot in cleanly without redesign.

## Primary hook (positioning)

The headline value proposition is **identity and lineage paired with cultural learning**: *"Reclaim who you are."*

The mechanical insight that drives this — and that is the heart of the design — is that **most Baganda do not know their omuziro, akabbiro, siga, or mutuba in any depth**. This is especially true for diaspora and for younger Ugandans. A traditional sign-up form that demands these details before granting access would lose nearly all such users.

We invert the flow. **The user provides their clan; the app teaches them their heritage.** The act of signing up is itself the value delivery. Lineage detail is filled in progressively, over weeks and months, as the user learns what to fill in. This positioning means the app must launch with a credible, beautiful, accurate canonical clan reference covering all 52 Buganda clans. That reference, separately from the app, becomes a permanent cultural asset of the Foundation.

Donations and lobbying flow from belonging. They are not the hook.

## Information architecture

The app has six top-level destinations. Labels are English-first, with Luganda names as descriptive subtitles in the navigation:

1. **Home** *(Awaka)* — pre-login: landing page with the headline value prop and clan picker; post-login: personal dashboard with clan card, latest Bataka calls, donation prompts tied to active causes, and the cultural learning module of the week. Pre-login content is public; post-login content is personal.

2. **Clans** *(Ebika)* — fully public, browseable grid of all 52 clans, each with a deep page (omuziro, akabbiro, sigas, mutubas, taboos, sacred sites, origin story, current Omutaka, notable historical members). The wedge: every clan page is publicly shareable, SEO-discoverable, and quotable. Anyone — including non-Baganda — can browse.

3. **Roots** *(Ennono)* — auth-only. The user's personal lineage profile, family tree builder, and cultural learning library (proverbs, folktales, customs reference). The progressive sign-up unfolds here.

4. **Give** *(Wereeza)* — primarily public; auth required for donor history. The donation hub with one-time, recurring (Busuulu), and earmark options. Houses the public transparency dashboard, per-campaign impact logs, and donor recognition.

5. **Bataka** — fully public directory of all clan heads with territories, current work, and contact for clan matters. Hosts calls to action and convening events. Builds Bataka authority by making them visible.

6. **Profile** *(Profile)* — auth-only. Account settings, language toggle, notification preferences, verification status, donation history, account export and deletion.

### Design principles built into the IA

**Public is the front door.** Home, Clans, Give, and Bataka are all reachable without an account. Sign-up is for retention and personalization, not gatekeeping. This unlocks shareability, SEO, and the ability to bring journalists, government officials, and curious diaspora children into the experience without friction.

**The membership counter is on every public page footer.** *"847,213 Baganda across 52 clans"* — visible everywhere, updated live. It is the lobbying signal, the social proof, and the implicit "you're not alone" message all at once.

**Verified depth is shown alongside total membership.** The counter elaborates on hover: *"Of which X,XXX are Bataka-verified."* This honest distinction is what makes the lobbying claim credible.

### URL structure

Public pages use clean, shareable URLs:

- `/` — landing
- `/clans` — clan grid
- `/clans/mmamba` — Mmamba clan page (the shareable artifact)
- `/clans/mmamba/sigas/nkima` — siga deep dive
- `/bataka` — directory
- `/bataka/[name]` — individual Omutaka profile
- `/give` — donation page
- `/give/wakivule-school` — specific campaign
- `/give/transparency` — public transparency dashboard

Authenticated pages:

- `/home` — personal dashboard
- `/roots` — personal lineage and learning
- `/me` — profile and settings
- `/admin` — admin entry (separate auth, role-based)

## User flows (the five that matter most)

The app has many flows, but five do nearly all the work. If these five are excellent, everything else follows.

### Flow 1 — First-time visitor: curiosity to claimed clan

The single most important flow. Converts a stranger into a clan member in under three minutes.

1. **Landing (`/`).** Hero with one promise: *"Reclaim who you are. Discover your clan, your roots, your people."* Below: the live membership counter, a single CTA — "Find your clan" — and a footer of trust signals (Council of Clan Heads endorsement, Foundation registration, transparency link).
2. **Clan grid (`/clans`).** A visual grid of all 52 clans, each tile showing the clan name and an illustrated totem. Search box at top: "Type your clan." Public, shareable, indexed.
3. **Clan page (`/clans/mmamba`).** The emotional payoff. Hero with the totem, the clan name, an opening line of the origin story. Scrolling sections: omuziro and akabbiro, sigas, mutubas, taboos, sacred sites, current Omutaka with photo, notable historical members. Designed to look beautiful even to a stranger.
4. **"Save your clan" prompt.** Mid-scroll on the clan page, a soft inline CTA: *"This is your clan. Save your profile to learn more, get notified about your Omutaka, and join 23,481 Mmamba already here."* The per-clan number sharpens belonging. Tapping opens the sign-up modal.
5. **Light sign-up modal.** Three fields: full name, phone number, and the clan is pre-filled. Phone OTP for verification. Optional: email (recommended for diaspora). Total time: under 60 seconds. **No password** — OTP login keeps friction low for both audiences.
6. **Welcome screen.** *"Welcome, Mubbi. Your omuziro is the Lungfish."* A single dignified moment of recognition. Then three soft choices: explore your roots, see Bataka calls, or support the clan.

**Target conversion:** ≥ 8% of clan-page visits ending in sign-up. (High benchmark for any sign-up funnel; achievable because the clan page itself is the value.)

### Flow 2 — Returning member: the personalized dashboard (`/home`)

What the member sees every time they open the app. Designed so the member always finds something new in 10 seconds — otherwise they don't come back.

A single scrollable feed with these blocks, in order:

1. **Your clan card** — totem, your name, verification status, *"X members in your clan."*
2. **Bataka call to action** — if there is an active call ("Bataka are meeting Parliament on land law, May 15 — add your voice"), it is the most prominent block. RSVP and Support-this-work are inline actions.
3. **Active fundraising tile** — current campaign with a live progress bar: *"UGX 47M of UGX 120M — 1,832 donors this month."* One-tap give.
4. **Cultural learning of the week** — a proverb, a 90-second folktale audio, a short video on a custom. Refreshes weekly. The "always something new."
5. **From your clan** — Omutaka or Foundation posts specific to the user's clan, when they exist.

The dashboard is intentionally **not** a social feed. No member-generated posts in v1 — moderation overhead is too high and risks misalignment with the app's dignified tone. Content is curated by Bataka and the Foundation.

### Flow 3 — Donation: one-time and recurring (`/give`)

Designed to feel like *contributing to something*, not buying.

**One-time donation:**

- Amount selection with presets that adapt to detected currency: UGX 5K / 10K / 25K / 50K / custom for Ugandan visitors; $10 / $25 / $50 / $100 / custom for diaspora.
- Designation: General Fund (default), Wakivule School, Bataka Work, Cultural Heritage.
- Optional toggles: *"Donate in honor of my Omutaka"* (adds the Omutaka's name to a recognition wall), *"Show my name on the donor wall,"* *"Make this anonymous."*
- Payment: MTN Mobile Money / Airtel Money for UGX (via Flutterwave); card / Apple Pay / Google Pay for foreign currency (via Stripe, with Flutterwave as fallback).
- Receipt screen with a single inline question: *"Make this monthly Busuulu and become a Mukulu w'Ekika? Join 1,247 sustaining members."*

**Recurring (Busuulu) flow:**

Tier reveal — the four donor tiers, with culturally meaningful names tied to monthly amounts:

| Tier name | Translation | Monthly amount | Recognition |
|---|---|---|---|
| **Omwana w'Ekika** | Child of the Clan | UGX 5,000 (~$1.50) | Tier badge in profile |
| **Omugabo** | The Contributor | UGX 20,000 (~$5) | Tier badge; named on monthly donor list |
| **Mukulu w'Ekika** | Elder of the Clan | UGX 50,000 (~$13) | Name on permanent donor wall, both digital and physical at Foundation premises |
| **Olukiiko lw'Ebikabyaffe** | Council of Our Heritage | UGX 200,000 (~$55) | Inner circle: named in Foundation impact reports; annual hand-signed letter from the Council of Clan Heads |

(Tier names are committed to spec; the Foundation should bless and may push back.)

Auto-debit setup: card token (diaspora — robust) or mobile money standing order (Uganda — see *Risk 4* in Phase 2). Manage in Profile: pause, change amount, cancel.

### Flow 4 — Progressive sign-up: building your roots (`/roots`)

After light sign-up, the Roots tab is where the relationship deepens. The frame is **learning, not form-filling**.

The page opens: *"We've started your clan profile. Discover more about who you are."*

A series of cards, completed in any order:

- *"Do you know your siga?"* If yes, pick from the list (each option shows a one-line description). If no, *"Explore the sigas of Mmamba"* — educational journey, no pressure to fill.
- Same flow for **mutuba**.
- *"Add your lineage"* — optional family tree builder, starting with "your father's name" and going back. **Private by default.**
- *"Verify with your Omutaka"* — once siga and lineage are filled, generate a verification request the Omutaka receives in their admin panel. Once approved, the member's profile shows a *verified* badge and counts toward verified-member statistics.

Each completed step quietly unlocks something — a new piece of cultural content, a deeper tier of the family tree, eligibility for clan-specific posts. **Gamification through learning, not points.**

### Flow 5 — Bataka call to action: convening into action

When an Omutaka uses the admin panel to post a call, the system:

- Sends push notification (PWA-installed users) and email to all relevant members — kingdom-wide or specific to one or more clans.
- Pins a banner on the home dashboard for those members.
- Creates a dedicated page (`/calls/[id]`) with full context: what's happening, why it matters, how the member can act. Two prominent actions in v1: **RSVP** ("I'll be there") and **Support this work** (donation prompt tied to the call).
- After the event, the Omutaka or Foundation appends a follow-up: *"Here is what we did, here is what changed, here is what's next."* This closes the loop and is genuinely under-used by most movement apps. Members who see follow-ups are far more likely to act on the next call.

(The send-a-letter-to-MP feature is deferred to v2 — it raises the political profile of the Foundation in ways that should be staged carefully.)

---

## Content model

Every screen in this app sits on these data objects. The shape matters because the **Clan reference is itself a permanent cultural asset of the Foundation** — even if the app died tomorrow, the curated Buganda clan database would survive. That framing should shape how it is built: well-structured, exportable, version-controlled.

What follows describes entities at the level of fields and relationships, not database types — those are implementation details for the developer.

### Entity 1 — Clan (the canonical reference; ~52 records, mostly read-only)

The Foundation's curated record for each Buganda clan. Public.

- `id`, `slug` (e.g., `mmamba`), `name_luganda`, `name_english_translation`
- `omuziro` (primary totem) — name, illustration, brief description, taboo around it
- `akabbiro` (secondary totem) — same fields
- `origin_story` (long-form, markdown — multiple paragraphs)
- `notable_history` (long-form)
- `mizizo` (taboos) — list of structured items: name + explanation
- `sacred_sites` — list of items: name, location (district/village), significance, optional photo
- `notable_members` — list of historical figures: name, period, contribution, optional photo
- `current_omutaka_id` — foreign key to the Bataka entity
- `member_count`, `verified_member_count`, `total_donations_attributed` — computed, live
- `content_completeness` (0-100, internal) — drives "showcase" badges on deep clan pages and prompts the Foundation to fill gaps

Nested under each clan:

- **Siga** (sub-clan branch) — `id`, `clan_id`, `name`, `description`, `lineage_notes`. Multiple per clan.
- **Mutuba** (lineage unit) — `id`, `siga_id`, `name`, `description`. Multiple per siga.

### Entity 2 — Member (the user)

Most fields start empty and fill in progressively.

- `id`, `phone` (E.164, primary identifier), `name_full`, `email` (optional)
- `clan_id` — required at sign-up
- `clan_change_history` — append-only list of `{previous_clan_id, changed_at, reason}`. Clan is editable but rate-limited to once per 12 months.
- `siga_id`, `mutuba_id` — optional, populated during progressive sign-up
- `father_name`, `mother_clan`, `paternal_grandfather`, `maternal_grandfather` — optional family tree seed
- `verification_status` — enum: `self_declared` / `lineage_provided` / `bataka_verified`
- `verified_by_bataka_id`, `verified_at` — populated when an Omutaka approves
- `locale` — `lg` or `en` (auto-detected, user-overridable)
- `country_detected` — for currency and payment defaults
- `donor_tier` — computed from active recurring subscription
- `notification_preferences` — push on/off, email on/off, per-category
- `created_at`, `last_active_at`

**Privacy by default:** only `name_full`, `clan_id`, `verification_status`, and `donor_tier` are visible to other members in any context. Phone, email, and lineage are private unless the member opts in.

### Entity 3 — Donation

Every gift, one-time or recurring.

- `id`, `member_id` (nullable — anonymous donations allowed), `amount`, `currency`, `usd_equivalent` (snapshot at donation time, for unified reporting)
- `designation` — enum: `general` / `school_wakivule` / `bataka_work` / `cultural_heritage` / specific `campaign_id`
- `recognition_mode` — enum: `public_named` / `anonymous` / `in_honor_of_omutaka`
- `honored_omutaka_id` — when "in honor of" is selected
- `payment_method` — enum: `mtn_momo` / `airtel_money` / `card` / `flutterwave_card` / `bank_transfer` / `paypal` / `apple_pay` / `google_pay`
- `payment_provider_ref` — receipt/transaction ID from the processor
- `subscription_id` — if part of a recurring schedule, otherwise null
- `status` — enum: `pending` / `succeeded` / `failed` / `refunded`
- `created_at`

### Entity 4 — Subscription (recurring donations)

Separated from individual donations because subscriptions have lifecycle.

- `id`, `member_id`, `monthly_amount`, `currency`, `tier` (computed: `omwana` / `omugabo` / `mukulu` / `olukiiko`)
- `payment_method`, `payment_provider_token` — tokenized for re-charging
- `status` — enum: `active` / `paused` / `cancelled` / `payment_failed`
- `started_at`, `cancelled_at`, `last_charged_at`, `next_charge_at`
- `total_lifetime_value` — computed

### Entity 5 — Bataka (Omutaka public profile)

- `id`, `name_full`, `clan_id`, `siga_id` (some Bataka are at siga level)
- `title` (e.g., "Omutaka of Mmamba", "Ssabataka")
- `bio` (long-form), `photo`
- `years_serving`, `notable_work` (list)
- `contact_for_clan_matters` — phone or office contact, public
- `is_active` — boolean

A separate internal `BatakaUser` object handles admin login (kept distinct from the public profile so Bataka credentials are not exposed in the public directory).

### Entity 6 — Call to action

Posted by Bataka or Foundation; pushed to relevant members.

- `id`, `title`, `body` (rich text), `cover_image`
- `posted_by` — enum: `foundation` / specific `bataka_id`
- `audience` — enum: `kingdom_wide` / list of `clan_ids`
- `event_date`, `event_location` (nullable — not all calls have an event)
- `cta_type` — enum: `rsvp` / `donate` / `attend_event` / `info_only`
- `linked_campaign_id` — optional reference to a fundraising campaign
- `published_at`, `expires_at`
- `rsvp_count`, `donation_count_attributed` — computed
- `follow_up_post` — optional rich-text appended after the event closes the loop

### Entity 7 — Campaign (fundraising)

Earmarks donations to specific causes.

- `id`, `name`, `description`, `cover_image`
- `target_amount`, `currency`, `total_raised` — computed
- `start_date`, `end_date` (optional)
- `transparency_log` — append-only list of "where this money went" entries: date, amount, description, optional photo or receipt link
- `status` — enum: `active` / `completed` / `paused`

### Entity 8 — Cultural content item

The "learning of the week" stuff and the broader heritage library.

- `id`, `type` (`proverb` / `folktale` / `custom` / `historical_event` / `language_lesson`)
- `title`, `body` (rich text), `audio_url`, `video_url` (both optional)
- `clan_ids` (optional — null means kingdom-wide)
- `published_at`, `featured_until` — drives "of the week" rotation

### Relationships worth highlighting

- **Clan ← Member** is many-to-one. A member can change clan but only once per 12 months, and the change history is permanent. Verification status resets on change.
- **Bataka ← Member** for verification creates an auditable trust chain: every verified member has a specific Omutaka who approved them, on a specific date.
- **Donation → Campaign**: every gift is traceable to where it went, including general-fund gifts (allocated transparently in the Foundation's impact log).

## Trust, transparency, and giving architecture

Because the giving model is **central pool to the Foundation**, the design must compensate with radical transparency. Members do not get to direct individual donations; in exchange, they get to see exactly what the money does. This trade-off only works if transparency is rigorously executed.

### The public transparency dashboard (`/give/transparency`)

Reachable from every donation page, every receipt, and the public footer. Browseable by anyone — donor, journalist, sceptic.

- Top of page: a single big number — *"UGX 247,891,000 raised since launch · Last updated [date]."*
- **By campaign** — a bar chart breakdown across General Fund, Wakivule School, Bataka Work, Cultural Heritage. Each segment links to its campaign page.
- **By outflow** — *where the money has gone*, presented as entries from the transparency log: date, amount, description, optional photo or receipt link. Append-only — entries are never edited or deleted. This is the core trust mechanism.
- **NGO Bureau registration**, latest annual financial report (PDF link), auditor name.

Operational ratio disclosure (programs vs. operations vs. fundraising %) is **deliberately omitted** in v1 — to be revisited in v2 when ratios stabilize.

### Per-campaign pages (e.g., `/give/wakivule-school`)

Every campaign has a public page used both for fundraising and for impact closure. Three sections:

1. **The story** — what we are raising for, why it matters, what success looks like. Photos, target amount, deadline.
2. **Live progress** — total raised, donor count, days left. Donor wall (named donors, scrollable; anonymous count summarized: *"+ 1,247 anonymous gifts"*).
3. **Impact updates** — append-only milestone log: *"Foundation laid, March 2026," "Roof completed, July 2026,"* each with date and photos.

After a campaign closes, the page persists as public proof of what the Foundation delivers.

### Donor receipts and reporting

Three touchpoints per donor:

1. **Immediate receipt** — email and in-app, at moment of donation. Includes amount, designation, transaction ID, tax-deductibility statement (jurisdiction-aware: Uganda NGO Bureau citation for local donors; if the Foundation later obtains US 501(c)(3) equivalency or UK charity status, those details surface for diaspora — flagged as v2).
2. **Monthly impact email** — sent to all donors who gave that month. Subject: *"Here is what your gift did in [month]."* Body: 2-3 highlights from the impact log, photo, totals raised vs. spent that month. Replaces the typical NGO fundraising appeal: *report first, ask only when there's a real call to action*.
3. **Annual statement** — sent in January, summarizes total given that year, designations, and tier status. Doubles as a tax document for those who need one.

### Donor recognition

Tiers (Omwana, Omugabo, Mukulu, Olukiiko) are visible on member profiles and the public donor wall. Three additional recognition mechanisms:

- **In honor of my Omutaka** *(included in v1)* — a donation can be made in honor of the donor's Omutaka. The Omutaka's profile then shows: *"Honored by 247 donors this year."* This binds the Bataka into the funding loop without making them ask for money themselves.
- **Permanent donor wall** — Mukulu w'Ekika and Olukiiko members are listed with consent on a permanent page, organized by clan. A status object — your name alongside the elders of your clan.
- **Annual hand-signed letter from the Council of Clan Heads** — Olukiiko lw'Ebikabyaffe members receive a physical, hand-signed letter each January. Costs almost nothing and is disproportionately powerful for retention.

## Verification and trust

Three states. The path between them is what the user calls "doing my roots."

### The verification chain

**Self-declared** — automatic at sign-up. The member picked a clan; that's enough to count as a member but not enough to be "verified." Self-declared members can do everything except access verified-only privileges.

**Lineage-provided** — reached when the member fills siga, mutuba, and at least their father's name. No human approval needed; the system upgrades automatically. This is the realistic cap for diaspora and for younger members who do not have a relationship with their Omutaka.

**Bataka-verified** — the gold standard:

1. Member finishes lineage-provided, then taps *"Verify with my Omutaka"* in Roots.
2. The app generates a verification request: member name, phone (last 4 digits visible), claimed siga, mutuba, lineage. Submitted to the relevant Omutaka's admin queue.
3. Omutaka reviews and chooses: **Approve**, **Decline with reason**, or **Ask for more info**.
4. Approved members receive a notification, a `bataka_verified` badge, and a small ceremony screen acknowledging their Omutaka by name.
5. The verification is attributed: `verified_by_bataka_id` and `verified_at` are stored permanently. The chain is auditable.

If the queue is untouched for 14 days, the request auto-escalates to a Foundation reviewer to prevent dead-end queues from blocking members.

### What verified status unlocks

Verified status is a status object, but it also carries genuine benefits that incentivize the deeper sign-up path:

- **A `verified` badge** on the member's public-visible name in donor walls and call-to-action RSVP lists.
- **Verified Clan ID card** — downloadable shareable image and PDF: clan crest, totem, member name, *"Verified by [Omutaka name] on [date]"*, QR code linking to a public verification page. A status object for the kingdom — shareable on social media, framed at home.
- **Voice in clan polls** — when the Foundation or an Omutaka runs a clan or kingdom poll, only verified members vote. Self-declared members can see results but not cast.
- **Connected family trees** — verified members can link their family trees to other verified members'. Self-declared members can build a private tree but cannot link. This becomes a real collaborative clan genealogy over time.
- **Priority RSVP** — Bataka can mark events *verified-first* for capacity-limited gatherings (annual clan reunion, audiences with the Omutaka, Foundation events).
- **Heritage contributor status** — verified members can submit content (proverbs, photos of sacred sites, family stories) to clan pages, with Omutaka or Foundation review before publishing. Over time the canonical clan content becomes community-sourced, deepening collective ownership.
- **Year-end summary** — personalized annual recap of clan engagement, donations, content contributed.

What verified status does **not** unlock: the ability to donate (anyone can give), basic content (everyone gets it), or general lobbying weight (every member counts; verified just adds a "of which X are verified" subtotal).

### The Bataka admin panel (`/admin`)

A separate, simpler interface — not part of the public mockups, but described here because the verification flow depends on it.

Each Omutaka logs in (phone + OTP) and sees:

- Pending verification requests for their clan or siga, with count badge.
- Their clan's member statistics (totals, verified count, donor counts) — without PII unless they tap into a specific request.
- A composer for posting calls to action and clan-specific content.
- Their own public profile (editable).

Foundation super-admins additionally see: financial dashboards, the transparency log editor (append entries), campaign management, content moderation tools, and a Bataka management page (onboarding new Bataka, deactivating).

### Trust signals across the public app

Consistent and quiet, never shouted:

- **Footer on every public page**: *"Endorsed by the Council of Clan Heads of Buganda."* NGO Bureau registration number. Foundation contact.
- **Clan pages**: *"Curated with the Office of the Omutaka of [clan]"* — only when the Omutaka has actively contributed; omitted otherwise.
- **Donation receipts and transparency dashboard**: registration details, auditor name, latest annual report.
- **Member profile**: clear visibility of what is public ("Visible to other members: name, clan, donor tier") vs. private ("Private: phone, email, lineage details").

### Privacy and data protection

Uganda's Data Protection and Privacy Act (2019) and the Personal Data Protection Office apply to all members. Diaspora users in the EU and UK fall under GDPR. Both must be designed for from day one.

**Privacy defaults:**

- Phone numbers never displayed to other members. Used only for OTP and notifications.
- Lineage data (parents, grandparents, family tree) is private by default. Optional toggle to share with verified family-tree connections only — still not public.
- Member directory is **not** in v1.
- Children of unknown fathers and members with sensitive family history can complete sign-up without lineage and remain full members. Lineage is a feature, not a tax.

**Disclosures and rights:**

- Privacy policy in Luganda and English covering collection, purpose, retention, third parties (payment processors), and data subject rights.
- Each member can: download their data (JSON export), correct it, delete their account. Deletion scrubs PII but retains anonymized donation totals — donations cannot be reversed retroactively from the impact log. Standard practice; required for financial integrity.
- Cookie banner and analytics consent for the website (GDPR-compliant since diaspora are in scope).

**Retention defaults:**

- Active member data: kept while the account is active.
- Inactive accounts (no login for 24 months): notified, then archived after 6 further months of inaction (PII removed, donation history retained anonymized).
- Verification request audit logs: 7 years.
- Donation records: 7 years.

### Anti-abuse

- **Fake clan claims for inflated counts** — phone-OTP unique per person (one phone, one membership); rate-limited clan changes (once per 12 months); the verified subtotal is what's used for any high-stakes lobbying claim.
- **Bataka impersonation or disputed succession** — Bataka admin accounts are onboarded by the Foundation directly (not self-service). When succession disputes arise, the Foundation pauses verifications for that clan rather than picking sides.
- **Donation card fraud and chargebacks** — handled by payment processors; the app records and updates totals gracefully if a donation is later reversed.

## Technical shape

This section is intentionally light on stack opinions because that decision is better made when you know who is building it. What's worth pinning down is the **shape** of what needs to exist, the **payment integrations** (specialized for Uganda), and the **risks** that could sink the project.

### Components

Six components, each independently understandable:

1. **Public web app** — responsive site with PWA capabilities (manifest, service worker, web push). Server-side rendering or static generation for clan pages and campaign pages — they are the SEO and shareability engine. Renders fast on low-bandwidth Ugandan mobile (target: < 3s first meaningful paint on 3G).
2. **Member API** — sign-up, login (phone OTP), profile management, lineage progression, verification requests, RSVPs, family tree.
3. **Content service** — clan reference data, cultural content, calls to action, campaigns. Read-heavy. CMS-style admin for Foundation content editors.
4. **Donations service** — donation creation, subscription management, receipts, transparency log, donor wall, recognition tiers. The most security-sensitive component.
5. **Notification service** — web push, email, SMS (used sparingly; SMS costs add up). Triggered by calls to action, donation receipts, verification updates, monthly impact emails.
6. **Admin app** — separate route (`/admin`), separate auth, role-based: Bataka role and Foundation super-admin.

A reasonable starting stack — **Next.js (web + API routes) + Postgres + Tailwind + an email service like Resend or Postmark + a Web Push library** — would deliver everything in this spec without exotic dependencies. This is a default suggestion, not a prescription. The architecture maps cleanly to other stacks the developer may be fluent in.

### Payment integrations (the specialized part)

Uganda's payment landscape is specific and matters more than stack choice. Two rails are required.

**For UGX donations from Uganda:**

- **Flutterwave** is the strongest single integration — supports MTN MoMo, Airtel Money, card, and bank transfer through one API. Recurring subscriptions are supported but with the standard mobile-money limitation: monthly user confirmation by USSD push. We surface this in the app as *"tap to approve next month's Busuulu"* rather than fighting it.
- Alternative: **DPO Group** (now Network International) — works similarly, slightly older.
- Direct integrations with MTN MoMo Open API and Airtel Money are possible but operationally heavy. Better only if Flutterwave fees become prohibitive at scale.

**For foreign currency donations from diaspora:**

- **Stripe** — for cards, Apple Pay, Google Pay. Works in countries where most diaspora live. Best UX for recurring.
- **PayPal** — older diaspora donors prefer it. Add as a secondary option, not primary.
- Flutterwave also accepts foreign cards; the question is fees and dispute support — Stripe wins on both for high-value donor experience.

**Operational requirement that the Foundation must solve early:** Stripe does not support Uganda directly. The Foundation will need either a fiscal sponsor in the US, UK, or EU, or a registered subsidiary in a Stripe-supported country. **This is the single trickiest non-technical item in the project** and must be addressed in parallel with development. If unsolved by month 3 of build, v1 launches with Flutterwave-only for diaspora cards (works, but higher fees and weaker UX); Stripe is added as a v1.5 upgrade.

### Hosting and infrastructure considerations

- Hosting region should prioritize African latency (a CDN with African edge nodes — Cloudflare, AWS CloudFront with African PoPs, or similar) while serving diaspora users globally.
- Static assets (clan illustrations, photos) on a CDN with aggressive caching.
- Database: hosted Postgres with point-in-time recovery enabled. Donation records are financial and require backup discipline.
- File storage: object storage (S3-compatible) for photos, audio (folktale recordings), documents (annual reports, receipts).

### Internationalization

- All user-facing copy externalized into translation files (Luganda and English) from day one.
- Language toggle visible in every page header.
- Auto-detection: Ugandan IPs default to Luganda, foreign IPs default to English. User override is sticky.
- Currency display follows locale: UGX with thousands separators for Ugandan visitors, USD/GBP/EUR for foreign locales (auto-detected with manual override).

## Risks and mitigations

Seven risks with realistic mitigations. These are the failure modes that have killed similar projects.

**Risk 1 — Clan reference content is incomplete or inaccurate at launch.** Empty clan pages destroy the value proposition. *Mitigation:* pre-launch content sprint of 8-12 weeks with a small Foundation content team. Six "showcase" clans receive deep content (suggested: Mmamba, Ngabi, Mbogo, Lugave, Nkima, Ndiga — Foundation to confirm based on Bataka readiness and member size). The other ~46 clans get "minimum viable" pages: totem, brief origin, current Omutaka, sigas list. A visible "completeness" indicator on each page invites verified members to contribute.

**Risk 2 — Bataka don't engage with the admin panel.** If verifications never get approved and calls to action never get posted, the app loses its convening power. *Mitigation:* phased Bataka onboarding (start with 6-10 willing Bataka, not all 52); the Foundation acts as temporary proxy poster for Bataka who are slower to adopt; verification queues auto-escalate to a Foundation reviewer after 14 days.

**Risk 3 — Stripe / fiscal sponsor not solved before launch.** Diaspora donations are critical revenue. *Mitigation:* solve the Stripe entity question in parallel with development. If unsolved by month 3, launch v1 with Flutterwave-only for diaspora cards; add Stripe as v1.5.

**Risk 4 — Recurring mobile money in Uganda is genuinely fragile.** Auto-debit reliability for MTN/Airtel is lower than for cards. Members will see "payment failed" notifications and churn. *Mitigation:* design the recurring flow to expect re-approval; send a friendly *"your monthly support is due — tap to confirm"* notification 2 days before charge; treat recurring failures as soft (retry once, then prompt rather than auto-cancel); offer a "switch to bank standing order" upgrade path for high-tier sustainers.

**Risk 5 — Privacy or data protection complaint.** Uganda PDPO or a GDPR complaint from a diaspora user would be operationally painful. *Mitigation:* conservative privacy defaults (no member directory, lineage private), bilingual privacy policy, named Data Protection Officer (a Foundation staff role), maintained internal data flow document. None of these are expensive — they are discipline.

**Risk 6 — Cultural content disputes.** Buganda clan history has contested versions. Saying *"the Mmamba originate from X"* invites pushback from elders who hold different oral traditions. *Mitigation:* every clan page is reviewed and signed off by the relevant Omutaka before publication. Where genuine dispute exists, the page acknowledges it (*"Origin traditions vary; the most widely cited is..."*). The app does not pretend to consensus where none exists.

**Risk 7 — The Buganda Kingdom never endorses, or actively distances.** The aspirational kingdom endorsement may not come. *Mitigation:* the design works fully on Bataka endorsement alone; kingdom endorsement is additive, not load-bearing. Avoid Kabaka imagery, the Buganda crest, and royal seals until formally cleared.

## Phasing

The single most important boundary in the spec — without it, the project balloons.

### v1 — Launch (target: 6-9 months development)

- All six top-level destinations (Home, Clans, Roots, Give, Bataka, Profile).
- All 52 clan pages — six deep, the rest "minimum viable."
- Full progressive sign-up with all three verification states.
- Donations: one-time and recurring (Busuulu) in UGX (Flutterwave) and foreign currency (Stripe if solved, Flutterwave-only fallback).
- Calls to action with RSVP and Support-this-work buttons.
- Public transparency dashboard and per-campaign impact logs.
- Bataka admin panel (verification + posts).
- Foundation super-admin (financial, content, campaigns).
- Bilingual Luganda + English with auto-detection and one-tap toggle.
- "In honor of my Omutaka" donation flow.
- Verified Clan ID card, single-clan polls, connected family trees, heritage contributor flow.
- Permanent donor wall with consent.
- Annual hand-signed letter program for top tier.

### v2 — Months 9-15 after launch

- Send-a-letter feature in calls to action (pre-written letters to MPs).
- Tax-deductibility for diaspora (US 501(c)(3) and/or UK charity registration).
- Operational ratio disclosure (program/operations/fundraising %).
- Native Android wrapper if traction warrants Play Store presence.
- Multi-clan and kingdom-wide polls; deeper governance features.
- In-app event ticketing for major Foundation gatherings.

### Deferred indefinitely (or "if asked")

- Member-to-member directory (privacy risk; weak benefit).
- Marketplace or clan jobs board (scope creep; distinct product).
- Public social feed with member-generated posts (moderation overhead; misalignment with dignified tone).
- Per-clan financial accounting (would require giving model change).

## Open questions for Foundation decision

These items are flagged for Foundation leadership before development begins. They are not blockers for design (Claude Design can produce mockups based on the spec as written), but are blockers for build:

1. **Donor tier names** — the spec commits to Omwana w'Ekika / Omugabo / Mukulu w'Ekika / Olukiiko lw'Ebikabyaffe. The Foundation should formally bless these or propose alternatives.
2. **Showcase clans for launch** — the spec suggests Mmamba, Ngabi, Mbogo, Lugave, Nkima, Ndiga. The Foundation should confirm based on Bataka readiness and willingness to contribute content during the pre-launch sprint.
3. **Stripe / fiscal sponsor entity** — must be initiated immediately. Recommend appointing a Foundation board member to lead this in parallel with development.
4. **Bataka onboarding cohort** — identify 6-10 willing clan heads to participate as the first wave of admin-panel users. Their early engagement determines whether the convening features work.
5. **Content team for the pre-launch sprint** — staffing decision for the 8-12-week clan content effort. Likely 1 senior cultural editor + 2 researchers + Bataka liaison.
6. **NGO Bureau and tax authority confirmations** — tax-deductibility statement on receipts must reflect the Foundation's actual NGO Bureau status. Confirm and provide language.
7. **Privacy policy review** — engage a data-protection lawyer (Uganda PDPO) and, if budget permits, a GDPR-aware reviewer. Both languages.
8. **Year-one membership target** — set a public target before launch for the leading metric. Recommend the Foundation board agree on this, since it becomes the public commitment.

## Design deliverable note

The next step after Foundation approval of this spec is to produce mockups via Claude Design. A self-contained Claude Design prompt — covering audience, brand posture, IA, key screens, tone, and constraints — will be drafted separately and handed to the Foundation for use.

---

*End of design specification. Phase 1 covered audience, IA, and user flows. Phase 2 covered content model, trust architecture, technical shape, risks, phasing, and open questions.*
