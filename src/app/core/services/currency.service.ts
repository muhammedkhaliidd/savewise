import { Injectable } from '@angular/core';
import currencyCodes from 'currency-codes';
import type { Currency } from '../../models/currency.model';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private currencies: Currency[] = currencyCodes.data.map((c) => ({
    code: c.code,
    name: c.currency,
    number: parseInt(c.number, 10),
    digits: c.digits,
  }));

  getAllCurrencies(): Currency[] {
    return this.currencies;
  }

  searchCurrencies(query: string): Currency[] {
    const lowerQuery = query.toLowerCase();
    return this.currencies.filter(
      (c) => c.code.toLowerCase().includes(lowerQuery) || c.name.toLowerCase().includes(lowerQuery),
    );
  }

  getCurrencyByCode(code: string): Currency | undefined {
    return this.currencies.find((c) => c.code === code);
  }
}
