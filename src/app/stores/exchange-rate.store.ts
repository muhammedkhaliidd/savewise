import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
  type StateSource,
} from '@ngrx/signals';
import { StorageService } from '../core/services/storage.service';
import type {
  ExchangeRate,
  ExchangeRatesState,
  LegacyExchangeRatesState,
  RateKey,
} from '../models/exchange-rate.model';

const initialState: ExchangeRatesState = {
  rates: [],
  baseCurrency: 'EGP',
};

function buildRateKey(from: string, to: string): RateKey {
  return `${from}-${to}`;
}

function findRateIndex(rates: ExchangeRate[], from: string, to: string): number {
  return rates.findIndex((r) => r.from === from && r.to === to);
}

export const ExchangeRateStore = signalStore(
  withState(initialState),
  withComputed(({ rates, baseCurrency }) => ({
    getRate: computed(() => {
      const ratesArray = rates();
      return (from: string, to: string): number => {
        if (from === to) return 1;
        const found = ratesArray.find((r) => r.from === from && r.to === to);
        if (found) return found.rate;
        const reverse = ratesArray.find((r) => r.from === to && r.to === from);
        if (reverse) return 1 / reverse.rate;
        return 1;
      };
    }),
    getRateToBase: computed(() => {
      const base = baseCurrency();
      const ratesArray = rates();
      return (from: string): number => {
        if (from === base) return 1;
        const found = ratesArray.find((r) => r.from === from && r.to === base);
        if (found) return found.rate;
        const reverse = ratesArray.find((r) => r.from === base && r.to === from);
        if (reverse) return 1 / reverse.rate;
        return 1;
      };
    }),
    allRates: computed(() => rates()),
    currentBase: computed(() => baseCurrency()),
    configuredPairs: computed(() => rates().map((r) => `${r.from}-${r.to}`)),
  })),
  withMethods((store, storage = inject(StorageService)) => ({
    setRate(from: string, to: string, rate: number): void {
      const currentRates = store.rates();
      const existingIndex = findRateIndex(currentRates, from, to);
      let newRates: ExchangeRate[];
      if (existingIndex >= 0) {
        // Update existing
        newRates = currentRates.map((r, i) => (i === existingIndex ? { from, to, rate } : r));
      } else {
        // Add new
        newRates = [...currentRates, { from, to, rate }];
      }
      patchState(store, { rates: newRates });
      storage.saveExchangeRates({
        rates: newRates,
        baseCurrency: store.baseCurrency(),
      });
    },
    updateRate(
      originalFrom: string,
      originalTo: string,
      newFrom: string,
      newTo: string,
      rate: number,
    ): void {
      const currentRates = store.rates();
      const newRates = currentRates.map((r) =>
        r.from === originalFrom && r.to === originalTo ? { from: newFrom, to: newTo, rate } : r,
      );
      patchState(store, { rates: newRates });
      storage.saveExchangeRates({
        rates: newRates,
        baseCurrency: store.baseCurrency(),
      });
    },
    setBaseCurrency(currency: string): void {
      patchState(store, { baseCurrency: currency });
      storage.saveExchangeRates({
        rates: store.rates(),
        baseCurrency: currency,
      });
    },
    loadFromStorage(): void {
      const saved = storage.loadExchangeRates();
      if (saved) {
        // Migration: check if rates is array (new) or record (legacy)
        const savedAny = saved as any;
        if (Array.isArray(savedAny.rates)) {
          // New format
          patchState(store, {
            rates: saved.rates,
            baseCurrency: saved.baseCurrency,
          });
        } else {
          // Legacy format - convert Record to array
          const legacy = saved as unknown as LegacyExchangeRatesState;
          const ratesArray: ExchangeRate[] = Object.entries(legacy.rates).map(([key, rate]) => {
            const [from, to] = key.split('-');
            return { from, to, rate };
          });
          patchState(store, {
            rates: ratesArray,
            baseCurrency: saved.baseCurrency,
          });
          // Save in new format
          storage.saveExchangeRates({
            rates: ratesArray,
            baseCurrency: saved.baseCurrency,
          });
        }
      }
    },
    deleteRate(from: string, to: string): void {
      const newRates = store.rates().filter((r) => !(r.from === from && r.to === to));
      patchState(store, { rates: newRates });
      storage.saveExchangeRates({
        rates: newRates,
        baseCurrency: store.baseCurrency(),
      });
    },
    reorderRates(newRates: ExchangeRate[]): void {
      patchState(store, { rates: newRates });
      storage.saveExchangeRates({
        rates: newRates,
        baseCurrency: store.baseCurrency(),
      });
    },
  })),
);
