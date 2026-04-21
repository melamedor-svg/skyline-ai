import { NextResponse } from 'next/server';
import { generateBlindTeaser } from '@/lib/ai-agent';
import type { Lead } from '@/lib/mock-data';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { leadData?: Lead };

    if (!body.leadData) {
      return NextResponse.json(
        { error: 'Missing leadData in request body' },
        { status: 400 },
      );
    }

    const result = await generateBlindTeaser(body.leadData);

    return NextResponse.json({
      teaser: result.teaser,
      status: result.status,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to generate outreach' },
      { status: 500 },
    );
  }
}
