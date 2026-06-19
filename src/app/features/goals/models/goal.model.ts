export interface Goal {
  id: string;
  /** Optional user-defined name; auto-generated when left blank. */
  name?: string;
  /** ISO date string, set automatically on creation. Not editable. */
  startDate: string;
  /** Savings entry ids chosen at creation. Locked afterwards. */
  initialSavingsIds: string[];
  /** Savings entry ids added later (edit mode only). Excludes initial ids. */
  addedSavingsIds: string[];
  /** Fixed target amount the user wants to reach. Editable. */
  targetAmount: number;
  /** Currency of the target amount (any currency). Editable. */
  targetCurrency: string;
  order?: number;
}

export interface GoalsState {
  goals: Goal[];
  lastInputDate: string | null;
}
