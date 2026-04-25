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
import type { ExchangeRatesState, RateKey } from '../models/exchange-rate.model';

const initialState: ExchangeRatesState = {
  rates: {},
  baseCurrency: 'EGP',
};

function buildRateKey(from: string, to: string): RateKey {
  return `${from}-${to}`;
}

export const ExchangeRateStore = signalStore(
  withState(initialState),
  withComputed(({ rates, baseCurrency }) => ({
    getRate: computed(() => {
      return (from: string, to: string): number => {
        if (from === to) return 1;
        const key = buildRateKey(from, to);
        const rate = rates()[key];
        if (rate !== undefined) return rate;
        const reverseKey = buildRateKey(to, from);
        const reverseRate = rates()[reverseKey];
        if (reverseRate !== undefined) return 1 / reverseRate;
        return 1;
      };
    }),
    getRateToBase: computed(() => {
      const base = baseCurrency();
      return (from: string): number => {
        if (from === base) return 1;
        const key = buildRateKey(from, base);
        const rate = rates()[key];
        if (rate !== undefined) return rate;
        const reverseKey = buildRateKey(base, from);
        const reverseRate = rates()[reverseKey];
        if (reverseRate !== undefined) return 1 / reverseRate;
        return 1;
      };
    }),
    allRates: computed(() => rates()),
    currentBase: computed(() => baseCurrency()),
    configuredPairs: computed(() => Object.keys(rates())),
  })),
  withMethods((store, storage = inject(StorageService)) => ({
    setRate(from: string, to: string, rate: number): void {
      const key = buildRateKey(from, to);
      const currentRates = store.rates();
      const newRates = { ...currentRates, [key]: rate };
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
        patchState(store, {
          rates: saved.rates,
          baseCurrency: saved.baseCurrency,
        });
      }
    },
    deleteRate(from: string, to: string): void {
      const key = buildRateKey(from, to);
      const newRates = { ...store.rates() };
      delete newRates[key];
      patchState(store, { rates: newRates });
      storage.saveExchangeRates({
        rates: newRates,
        baseCurrency: store.baseCurrency(),
      });
    },
  })),
);
