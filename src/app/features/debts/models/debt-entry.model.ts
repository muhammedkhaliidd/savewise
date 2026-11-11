import type { SavingsEntry } from '../../savings/models/savings-entry.model';

/** `owe`: money/metal I owe (subtracted from the total). `owedToMe`: owed to me (added). */
export type DebtDirection = 'owe' | 'owedToMe';

/** A debt is valued exactly like a savings entry, then signed by its direction. */
export interface DebtEntry extends SavingsEntry {
  direction: DebtDirection;
}

export interface DebtsState {
  entries: DebtEntry[];
}
