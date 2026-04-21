export type FeeModel = 'percent' | 'lehman' | 'double-lehman' | 'retainer';

export type FeeCalculationInput = {
  model: FeeModel;
  dealValue: number;
  percent?: number;
  retainer?: number;
};

export type FeeCalculationResult = {
  model: FeeModel;
  total: number;
  breakdown: Array<{ label: string; amount: number }>;
};

const LEHMAN_TIERS: Array<{ upTo: number; rate: number }> = [
  { upTo: 1_000_000, rate: 0.05 },
  { upTo: 2_000_000, rate: 0.04 },
  { upTo: 3_000_000, rate: 0.03 },
  { upTo: 4_000_000, rate: 0.02 },
  { upTo: Infinity, rate: 0.01 },
];

const DOUBLE_LEHMAN_TIERS: Array<{ upTo: number; rate: number }> = [
  { upTo: 1_000_000, rate: 0.1 },
  { upTo: 2_000_000, rate: 0.08 },
  { upTo: 3_000_000, rate: 0.06 },
  { upTo: 4_000_000, rate: 0.04 },
  { upTo: Infinity, rate: 0.02 },
];

function calculateTiered(
  dealValue: number,
  tiers: Array<{ upTo: number; rate: number }>,
): FeeCalculationResult['breakdown'] {
  const breakdown: FeeCalculationResult['breakdown'] = [];
  let remaining = dealValue;
  let consumed = 0;

  for (const tier of tiers) {
    if (remaining <= 0) break;
    const tierSize = tier.upTo - consumed;
    const applied = Math.min(remaining, tierSize);
    breakdown.push({
      label: `${(tier.rate * 100).toFixed(0)}% on next ${applied.toLocaleString()}`,
      amount: applied * tier.rate,
    });
    remaining -= applied;
    consumed += applied;
  }

  return breakdown;
}

export function calculateFee(input: FeeCalculationInput): FeeCalculationResult {
  switch (input.model) {
    case 'percent': {
      const rate = input.percent ?? 0.02;
      return {
        model: 'percent',
        total: input.dealValue * rate,
        breakdown: [
          {
            label: `${(rate * 100).toFixed(2)}% flat`,
            amount: input.dealValue * rate,
          },
        ],
      };
    }
    case 'lehman': {
      const breakdown = calculateTiered(input.dealValue, LEHMAN_TIERS);
      return {
        model: 'lehman',
        total: breakdown.reduce((acc, b) => acc + b.amount, 0),
        breakdown,
      };
    }
    case 'double-lehman': {
      const breakdown = calculateTiered(input.dealValue, DOUBLE_LEHMAN_TIERS);
      return {
        model: 'double-lehman',
        total: breakdown.reduce((acc, b) => acc + b.amount, 0),
        breakdown,
      };
    }
    case 'retainer': {
      const retainer = input.retainer ?? 0;
      const rate = input.percent ?? 0.01;
      const success = input.dealValue * rate;
      return {
        model: 'retainer',
        total: retainer + success,
        breakdown: [
          { label: 'Monthly retainer', amount: retainer },
          {
            label: `${(rate * 100).toFixed(2)}% success fee`,
            amount: success,
          },
        ],
      };
    }
  }
}
