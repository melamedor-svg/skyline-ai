# Platform (Nexus) - Architecture Blueprint

זהו מסמך האפיון והארכיטקטורה לפרויקט תיווך העסקאות הגלובלי מבוסס AI.

**מטרת הפרויקט:** בניית פלטפורמה שמזהה, מתאימה, ומנהלת (מתווכת) הזדמנויות עסקיות גלובליות באמצעות סוכני AI.

## 1. ארכיטקטורת הפרויקט (Tech Stack)

- **Framework:** Next.js (App Router) - לניהול צד שרת וצד לקוח בפרויקט אחד.
- **Frontend:** React, Tailwind CSS, Lucide Icons (עיצוב UI נקי ומודרני).
- **Database:** Supabase (PostgreSQL) או Firebase - לשמירת הלידים, משתמשים והעסקאות (Deal Flow).
- **AI Engine (Backend):**
  - אינטגרציה ל-OpenAI API / Anthropic API (לצורך NLP: הבנת מכרזים, כתיבת טיזרים).
  - סוכני סריקה (Crawlers/Scrapers) מבוססי Python (שירוצו כ-Microservices בנפרד).
- **Authentication & Security:** NextAuth.js (כניסה מאובטחת לברוקרים ומשקיעים).

## 2. מבנה תיקיות נדרש (Directory Structure)

```
/nexus-platform
├── /app                  # Next.js App Router
│   ├── /dashboard        # מרכז הבקרה (ראדאר ההזדמנויות)
│   ├── /pipeline         # ניהול עסקאות (Deal Flow)
│   ├── /settings         # הגדרות מערכת ומודלים פיננסיים
│   └── layout.tsx & page.tsx
├── /components           # רכיבי UI (כפתורים, כרטיסים, מודאלים)
│   ├── LeadCard.tsx
│   ├── DealStageBar.tsx
│   └── AgentInsightBox.tsx
├── /lib                  # פונקציות עזר (חיבור ל-DB, תמחור)
│   ├── db.ts
│   ├── ai-agent.ts       # קריאות ל-API של מודל השפה
│   └── fee-calculator.ts
├── /api                  # API Routes (Next.js)
│   ├── /matchmaking      # חישוב אחוזי התאמה
│   └── /outreach         # הפקת מיילים ו-NDA אוטומטית
└── package.json
```

## 3. קוד התחלתי - יצירת מודל הנתונים (Prisma Schema לדוגמה)

```prisma
// schema.prisma

model Lead {
  id          String   @id @default(cuid())
  title       String
  description String
  country     String
  sector      String
  sizeClass   String   // Small, Medium, Large, Mega
  estValue    Float
  currency    String
  sourceUrl   String?  // מאיפה הסוכן הביא את זה
  agentId     String   // איזה סוכן מצא את זה
  createdAt   DateTime @default(now())

  // קשר לעסקה (אם הליד התקדם)
  deal        Deal?
}

model Deal {
  id          String   @id @default(cuid())
  leadId      String   @unique
  lead        Lead     @relation(fields: [leadId], references: [id])
  buyerName   String?
  sellerName  String?
  stage       String   // outreach, nda, vdr, closing, won, lost
  feeModel    String   // אחוז, Lehman, ריטיינר
  feeExpected Float
  nextAction  String
  updatedAt   DateTime @updatedAt
}
```

## 4. קוד התחלתי - מנוע ה-AI למסמכים משפטיים (/api/outreach/route.ts)

```typescript
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { leadData } = await req.json();

    const systemPrompt = `
      אתה מתווך עסקאות גלובלי. המטרה שלך היא לייצר "Blind Teaser" (תקציר עסקה אנונימי)
      כדי לשלוח לקונים פוטנציאליים מבלי לחשוף את זהות המוכר.
      עליך להציג את ההזדמנות בצורה אטרקטיבית, מקצועית ומסתורית.
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `צור טיזר לליד הבא: ${JSON.stringify(leadData)}` }
      ],
    });

    return NextResponse.json({
      teaser: response.choices[0].message.content,
      status: 'success'
    });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate outreach' }, { status: 500 });
  }
}
```
