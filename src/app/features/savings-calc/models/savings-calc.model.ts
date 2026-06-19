export type CalcFrequency = 'monthly' | 'yearly';

export interface CalcRecurringEntry {
  id: string;
  amount: number;
  currency: string;
  frequency: CalcFrequency;
}

export interface SavingsCalcItem {
  id: string;
  /** Optional name; auto-generated when blank. */
  name?: string;
  /** Selected current savings entry ids, treated as a starting lump sum. */
  savingsIds: string[];
  /** Expected recurring contributions accumulated until the target date. */
  recurringEntries: CalcRecurringEntry[];
  /** ISO date string the projection is calculated at. */
  targetDate: string;
  order?: number;
}

export interface SavingsCalcState {
  items: SavingsCalcItem[];
  lastInputDate: string | null;
}
