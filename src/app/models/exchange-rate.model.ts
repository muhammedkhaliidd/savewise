export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
}

export type RateKey = `${string}-${string}`;

export interface ExchangeRatesState {
  rates: ExchangeRate[];
  baseCurrency: string;
}

// Legacy format for migration
export interface LegacyExchangeRatesState {
  rates: Record<RateKey, number>;
  baseCurrency: string;
}
