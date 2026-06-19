import { Injectable } from '@angular/core';
import type { ExchangeRatesState } from '../../features/exchange/models/exchange-rate.model';
import type { SavingsState } from '../../features/savings/models/savings-entry.model';
import type { MetalPricesState } from '../../features/metals/models/metal-price.model';
import type { GoalsState } from '../../features/goals/models/goal.model';
import type { SavingsCalcState } from '../../features/savings-calc/models/savings-calc.model';

const STORAGE_KEYS = {
  EXCHANGE_RATES: 'money-calc-rates',
  SAVINGS: 'money-calc-savings',
  METAL_PRICES: 'money-calc-metals',
  GOALS: 'money-calc-goals',
  SAVINGS_CALC: 'money-calc-savings-calc',
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

  saveMetalPrices(state: MetalPricesState): void {
    localStorage.setItem(STORAGE_KEYS.METAL_PRICES, JSON.stringify(state));
  }

  loadMetalPrices(): MetalPricesState | null {
    const data = localStorage.getItem(STORAGE_KEYS.METAL_PRICES);
    return data ? JSON.parse(data) : null;
  }

  saveGoals(state: GoalsState): void {
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(state));
  }

  loadGoals(): GoalsState | null {
    const data = localStorage.getItem(STORAGE_KEYS.GOALS);
    return data ? JSON.parse(data) : null;
  }

  saveSavingsCalc(state: SavingsCalcState): void {
    localStorage.setItem(STORAGE_KEYS.SAVINGS_CALC, JSON.stringify(state));
  }

  loadSavingsCalc(): SavingsCalcState | null {
    const data = localStorage.getItem(STORAGE_KEYS.SAVINGS_CALC);
    return data ? JSON.parse(data) : null;
  }

  clearAll(): void {
    localStorage.removeItem(STORAGE_KEYS.EXCHANGE_RATES);
    localStorage.removeItem(STORAGE_KEYS.SAVINGS);
    localStorage.removeItem(STORAGE_KEYS.METAL_PRICES);
    localStorage.removeItem(STORAGE_KEYS.GOALS);
    localStorage.removeItem(STORAGE_KEYS.SAVINGS_CALC);
  }
}
