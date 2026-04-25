import { Injectable } from '@angular/core';
import type { ExchangeRatesState } from '../../models/exchange-rate.model';
import type { SavingsState } from '../../models/savings-entry.model';

const STORAGE_KEYS = {
  EXCHANGE_RATES: 'money-calc-rates',
  SAVINGS: 'money-calc-savings',
} as const;

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  saveExchangeRates(state: ExchangeRatesState): void {
    localStorage.setItem(STORAGE_KEYS.EXCHANGE_RATES, JSON.stringify(state));
  }

  loadExchangeRates(): ExchangeRatesState | null {
    const data = localStorage.getItem(STORAGE_KEYS.EXCHANGE_RATES);
    return data ? JSON.parse(data) : null;
  }

  saveSavings(state: SavingsState): void {
    localStorage.setItem(STORAGE_KEYS.SAVINGS, JSON.stringify(state));
  }

  loadSavings(): SavingsState | null {
    const data = localStorage.getItem(STORAGE_KEYS.SAVINGS);
    return data ? JSON.parse(data) : null;
  }

  clearAll(): void {
    localStorage.removeItem(STORAGE_KEYS.EXCHANGE_RATES);
    localStorage.removeItem(STORAGE_KEYS.SAVINGS);
  }
}
