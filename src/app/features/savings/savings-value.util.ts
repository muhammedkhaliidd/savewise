import type { MetalCode } from '../metals/models/metal-price.model';
import { lookupPurityFactor } from '../metals/constants/metal-options';
import type { SavingsEntry } from './models/savings-entry.model';

/**
 * Values a single savings entry in the base currency.
 *
 * @param entry      the savings entry to value
 * @param rateToBase resolves a currency code to its rate against the base (e.g. `exchangeStore.getRateToBase()`)
 * @param metalPure  resolves a metal code to its pure (24K/999) per-gram price in base, or null if unavailable
 *                   (e.g. `metalStore.getMetalPricePerGramInBase()`)
 * @returns the entry's value in base currency, or null when a metal price is unavailable
 */
export function valueEntryInBase(
  entry: SavingsEntry,
  rateToBase: (from: string) => number,
  metalPure: (metal: MetalCode) => number | null,
): number | null {
  const type = entry.type ?? 'money';
  if (type === 'money') {
    const amount = entry.amount ?? 0;
    const currency = entry.currency ?? '';
    return amount * rateToBase(currency);
  }
  if (!entry.metal || !entry.purityLabel || !entry.grams) return null;
  const pure = metalPure(entry.metal);
  if (pure == null) return null;
  return entry.grams * lookupPurityFactor(entry.metal, entry.purityLabel) * pure;
}
