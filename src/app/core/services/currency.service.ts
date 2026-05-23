import { Injectable, inject } from '@angular/core';
import currencyCodes from 'currency-codes';
import { TranslateService } from '@ngx-translate/core';
import { currencyDisplayKey } from '../pipes/display-code.pipe';
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
      const key = currencyDisplayKey(c.code);
      const translated = this.translate.instant(key);
      const display = (translated !== key ? translated : c.code).toLowerCase();
      return (
        c.code.toLowerCase().includes(lowerQuery) ||
        c.name.toLowerCase().includes(lowerQuery) ||
        display.includes(lowerQuery)
      );
    });
  }

  getCurrencyByCode(code: string): Currency | undefined {
    return this.currencies.find((c) => c.code === code);
  }
}
