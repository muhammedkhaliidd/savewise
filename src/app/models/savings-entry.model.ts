export interface SavingsEntry {
  id: string;
  currency: string;
  amount: number;
  label?: string;
}

export interface SavingsState {
  entries: SavingsEntry[];
  lastInputDate: string | null;
}
