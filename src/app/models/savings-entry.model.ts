export interface SavingsEntry {
  id: string;
  currency: string;
  amount: number;
  label?: string;
  order?: number;
}

export interface SavingsState {
  entries: SavingsEntry[];
  lastInputDate: string | null;
}
