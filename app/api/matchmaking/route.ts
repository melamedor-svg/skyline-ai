import { NextResponse } from 'next/server';
import type { Lead } from '@/lib/mock-data';

type Mandate = {
  sectors?: string[];
  countries?: string[];
  sizeClasses?: Array<Lead['sizeClass']>;
  minValue?: number;
  maxValue?: number;
};

type MatchRequest = {
  lead: Lead;
  mandate: Mandate;
};

function scoreLead(lead: Lead, mandate: Mandate): number {
  let score = 50;

  if (mandate.sectors?.some((s) => lead.sector.toLowerCase().includes(s.toLowerCase()))) {
    score += 20;
  }
  if (mandate.countries?.includes(lead.country)) {
    score += 15;
  }
  if (mandate.sizeClasses?.includes(lead.sizeClass)) {
    score += 10;
  }
  if (mandate.minValue !== undefined && lead.estValue >= mandate.minValue) {
    score += 3;
  }
  if (mandate.maxValue !== undefined && lead.estValue <= mandate.maxValue) {
    score += 2;
  }

  return Math.min(100, score);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as MatchRequest;

    if (!body.lead || !body.mandate) {
      return NextResponse.json(
        { error: 'Missing lead or mandate in request body' },
        { status: 400 },
      );
    }

    const matchScore = scoreLead(body.lead, body.mandate);

    return NextResponse.json({
      leadId: body.lead.id,
      matchScore,
      recommendation:
        matchScore >= 80
          ? 'strong_fit'
          : matchScore >= 60
            ? 'possible_fit'
            : 'weak_fit',
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to compute match' },
      { status: 500 },
    );
  }
}
