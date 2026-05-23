import { Pipe, PipeTransform } from '@angular/core';
import { POPULAR_CURRENCY_RANK } from '../constants/popular-currencies';

export interface CurrencyRow {
  currency: string;
}

/**
 * Pure pipe: puts popular currencies first (if present), then alphabetical.
 * Use after filter: `filteredRates() | prioritizeCurrencies`
 */
@Pipe({
  name: 'prioritizeCurrencies',
  standalone: true,
  pure: true,
})
export class PrioritizeCurrenciesPipe implements PipeTransform {
  transform<T extends CurrencyRow>(rows: readonly T[] | null | undefined): T[] {
    if (!rows?.length) {
      return [];
    }
    return [...rows].sort((a, b) => {
      const rankA = POPULAR_CURRENCY_RANK.get(a.currency) ?? Number.POSITIVE_INFINITY;
      const rankB = POPULAR_CURRENCY_RANK.get(b.currency) ?? Number.POSITIVE_INFINITY;
      if (rankA !== rankB) {
        return rankA - rankB;
      }
      return a.currency.localeCompare(b.currency);
    });
  }
}
