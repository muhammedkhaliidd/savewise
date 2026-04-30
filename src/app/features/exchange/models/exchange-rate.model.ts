export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
}

export type RateKey = `${string}-${string}`;

export type SyncIntervalUnit = 'minutes' | 'hours';

export interface SyncIntervalSetting {
  value: number;
  unit: SyncIntervalUnit;
}

export interface ApiRateRow {
  currency: string;
  apiToBase: number;
  customToBase: number | null;
}

export interface ExchangeRatesState {
  customRates: ExchangeRate[];
  apiRates: ExchangeRate[];
  baseCurrency: string;
  lastSyncedAt: number | null;
  isSyncing: boolean;
  syncError: string | null;
  syncInterval: SyncIntervalSetting;
}

export interface LegacyExchangeRatesState {
  rates: Record<RateKey, number>;
  baseCurrency: string;
}

export interface PreviousExchangeRatesState {
  rates: ExchangeRate[];
  baseCurrency: string;
}
