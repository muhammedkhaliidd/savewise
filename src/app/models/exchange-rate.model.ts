export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
}

export type RateKey = `${string}-${string}`;

export interface ExchangeRatesState {
  rates: Record<RateKey, number>;
  baseCurrency: string;
}
