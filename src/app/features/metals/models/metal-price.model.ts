export type MetalCode = 'gold' | 'silver' | 'platinum' | 'palladium';

export interface PurityOption {
  label: string;
  factor: number;
}

export interface MetalPrice {
  metal: MetalCode;
  purityLabel: string;
  pricePerGram: number;
  active?: boolean;
}

export interface MetalApiPrice {
  metal: MetalCode;
  pricePerGramUsd: number;
}

export interface MetalApiRow {
  metal: MetalCode;
  apiPerGramInBase: number;
  customPerGramInBase: number | null;
}

export interface MetalPricesState {
  customPrices: MetalPrice[];
  apiPrices: MetalApiPrice[];
  lastSyncedAt: number | null;
  isSyncing: boolean;
  syncError: string | null;
}
