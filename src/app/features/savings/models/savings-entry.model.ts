import type { MetalCode } from '../../metals/models/metal-price.model';

export type SavingsEntryType = 'money' | 'metal';

export interface SavingsEntry {
  id: string;
  type?: SavingsEntryType;
  currency?: string;
  amount?: number;
  metal?: MetalCode;
  purityLabel?: string;
  grams?: number;
  label?: string;
  order?: number;
  active?: boolean;
}

export interface SavingsState {
  entries: SavingsEntry[];
  lastInputDate: string | null;
}
