import type { Lead } from '@/lib/mock-data';

export type TeaserResult = {
  teaser: string;
  status: 'success' | 'error';
};

const BLIND_TEASER_SYSTEM_PROMPT = `
You are a global M&A broker. Produce a concise "Blind Teaser" —
an anonymous opportunity summary suitable for distribution to
qualified buyers. Do NOT disclose the seller's identity.
Tone: professional, confident, compelling. 120-180 words.
`.trim();

export async function generateBlindTeaser(lead: Lead): Promise<TeaserResult> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return {
      teaser: buildMockTeaser(lead),
      status: 'success',
    };
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: BLIND_TEASER_SYSTEM_PROMPT },
          {
            role: 'user',
            content: `Generate a blind teaser for this lead: ${JSON.stringify(lead)}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = (await response.json()) as {
      choices: Array<{ message: { content: string } }>;
    };

    return {
      teaser: data.choices[0]?.message.content ?? buildMockTeaser(lead),
      status: 'success',
    };
  } catch {
    return {
      teaser: buildMockTeaser(lead),
      status: 'error',
    };
  }
}

function buildMockTeaser(lead: Lead): string {
  return [
    `Project "${lead.id.toUpperCase()}" — confidential opportunity.`,
    `A ${lead.sizeClass.toLowerCase()}-size ${lead.sector.toLowerCase()} asset`,
    `based in ${lead.country}, valued at approximately`,
    `${lead.currency} ${lead.estValue.toLocaleString()}.`,
    `Seller seeks qualified counterparties under NDA.`,
    `Detailed information memorandum available upon execution of NDA.`,
  ].join(' ');
}
