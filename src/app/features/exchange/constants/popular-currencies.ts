/** Display order for live exchange rates (first match wins). */
export const POPULAR_CURRENCY_CODES = [
  'USD',
  'EUR',
  'GBP',
  'CHF',
  'EGP',
  'AED',
  'SAR',
  'KWD',
  'AUD',
  'CAD',
] as const;

export const POPULAR_CURRENCY_RANK = new Map<string, number>(
  POPULAR_CURRENCY_CODES.map((code, index) => [code, index]),
);
