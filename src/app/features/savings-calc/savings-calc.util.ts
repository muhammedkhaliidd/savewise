import type { MetalCode } from '../metals/models/metal-price.model';
import type { SavingsEntry } from '../savings/models/savings-entry.model';
import { valueEntryInBase } from '../savings/savings-value.util';
import type { CalcFrequency, SavingsCalcItem } from './models/savings-calc.model';

/**
 * Whole number of periods (months or years) between `now` and the target date.
 * Returns 0 when the target date is in the past.
 */
export function periodsUntil(targetISO: string, frequency: CalcFrequency, now: Date): number {
  const target = new Date(targetISO);
  if (Number.isNaN(target.getTime())) return 0;
  let months = (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth());
  if (target.getDate() < now.getDate()) months -= 1;
  if (months < 0) months = 0;
  return frequency === 'yearly' ? Math.floor(months / 12) : months;
}

/**
 * Projects an item's total at its target date, in base currency:
 * lump sum (selected savings) + Σ(recurring amount × periods × rateToBase).
 */
export function projectCalcTotalInBase(
  item: SavingsCalcItem,
  entriesById: Map<string, SavingsEntry>,
  rateToBase: (from: string) => number,
  metalPure: (metal: MetalCode) => number | null,
  now: Date,
): number {
  const lumpSum = item.savingsIds.reduce((sum, id) => {
    const entry = entriesById.get(id);
    if (!entry) return sum;
    return sum + (valueEntryInBase(entry, rateToBase, metalPure) ?? 0);
  }, 0);
  const recurring = item.recurringEntries.reduce((sum, e) => {
    const periods = periodsUntil(item.targetDate, e.frequency, now);
    return sum + e.amount * periods * rateToBase(e.currency);
  }, 0);
  return lumpSum + recurring;
}
