export interface SavingsEntry {
  id: string;
  currency: string;
  amount: number;
  label?: string;
  order?: number;
  active?: boolean;
}

export interface SavingsState {
  entries: SavingsEntry[];
  lastInputDate: string | null;
}
