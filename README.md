# Nexus — AI Global Brokerage Platform

A Next.js (App Router) scaffold for an AI-powered global deal brokerage
platform. AI agents identify, match, and manage cross-border business
opportunities — from sourcing to closing.

This repository follows the architecture described in
[`AI-Global-Brokerage-Blueprint.md`](./AI-Global-Brokerage-Blueprint.md).

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **UI:** React 18, Tailwind CSS, Lucide Icons
- **Database (planned):** Supabase (PostgreSQL) / Prisma
- **AI:** OpenAI / Anthropic APIs for teaser generation and matchmaking
- **Auth (planned):** NextAuth.js

## Directory Structure

```
/
├── app/                       # Next.js App Router
│   ├── dashboard/             # Opportunity Radar
│   ├── pipeline/              # Deal Flow
│   ├── settings/              # Platform configuration
│   ├── api/
│   │   ├── matchmaking/       # Match-score API
│   │   └── outreach/          # Blind teaser generation
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/                # Reusable UI
│   ├── Sidebar.tsx
│   ├── LeadCard.tsx
│   ├── DealStageBar.tsx
│   └── AgentInsightBox.tsx
├── lib/                       # Helpers
│   ├── db.ts                  # Data access (currently mock)
│   ├── ai-agent.ts            # LLM calls
│   ├── fee-calculator.ts      # Lehman / retainer / percent fees
│   └── mock-data.ts           # Simulated leads & deals
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app currently uses
simulated data from `lib/mock-data.ts`.

### Pages

- `/` — landing with module links
- `/dashboard` — Opportunity Radar with live mock leads
- `/pipeline` — Deal Flow with stage tracking
- `/settings` — AI / fee / access configuration

### API

- `POST /api/outreach` — generates a Blind Teaser. Falls back to a local
  templated teaser when `OPENAI_API_KEY` is not set.
- `POST /api/matchmaking` — scores a lead against a mandate.

## Environment

Create `.env.local` to enable live LLM calls:

```
OPENAI_API_KEY=sk-...
```

Without this key the app still runs with deterministic mock responses.
