import { Injectable, inject } from '@angular/core';
import currencyCodes from 'currency-codes';
import { TranslateService } from '@ngx-translate/core';
import { currencyNameKey } from '../pipes/display-code.pipe';
import type { Currency } from '../../features/currency/models/currency.model';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private readonly translate = inject(TranslateService);

  private readonly currencies: Currency[] = currencyCodes.data.map((c) => ({
    code: c.code,
    name: c.currency,
    number: Number.parseInt(c.number, 10),
    digits: c.digits,
  }));

  getAllCurrencies(): Currency[] {
    return this.currencies;
  }

  searchCurrencies(query: string): Currency[] {
    const lowerQuery = query.toLowerCase();
    return this.currencies.filter((c) => {
      const nameKey = currencyNameKey(c.code);
      const localizedName = this.translate.instant(nameKey);
      const name =
        localizedName !== nameKey ? localizedName.toLowerCase() : c.name.toLowerCase();
      return (
        c.code.toLowerCase().includes(lowerQuery) ||
        c.name.toLowerCase().includes(lowerQuery) ||
        name.includes(lowerQuery)
      );
    });
  }

  getCurrencyByCode(code: string): Currency | undefined {
    return this.currencies.find((c) => c.code === code);
  }
}
