import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { firstValueFrom } from 'rxjs';
import { StorageService } from '../core/services/storage.service';
import { ExchangeRateApiService } from '../core/services/exchange-rate-api.service';
import type {
  ApiRateRow,
  ExchangeRate,
  ExchangeRatesState,
  LegacyExchangeRatesState,
  PreviousExchangeRatesState,
  SyncIntervalSetting,
  SyncIntervalUnit,
} from '../features/exchange/models/exchange-rate.model';

const initialState: ExchangeRatesState = {
  customRates: [],
  apiRates: [],
  baseCurrency: 'EGP',
  lastSyncedAt: null,
  isSyncing: false,
  syncError: null,
  syncInterval: { value: 1, unit: 'hours' },
};

function findRateIndex(rates: ExchangeRate[], from: string, to: string): number {
  return rates.findIndex((r) => r.from === from && r.to === to);
}

function lookupRate(rates: ExchangeRate[], from: string, to: string): number | null {
  const found = rates.find((r) => r.from === from && r.to === to);
  if (found) return found.rate;
  const reverse = rates.find((r) => r.from === to && r.to === from);
  if (reverse) return 1 / reverse.rate;
  return null;
}

export const ExchangeRateStore = signalStore(
  withState(initialState),
  withComputed(({ customRates, apiRates, baseCurrency, syncInterval }) => ({
    getRate: computed(() => {
      const customs = customRates();
      const apis = apiRates();
      return (from: string, to: string): number => {
        if (from === to) return 1;
        return lookupRate(customs, from, to) ?? lookupRate(apis, from, to) ?? 1;
      };
    }),
    getRateToBase: computed(() => {
      const base = baseCurrency();
      const customs = customRates();
      const apis = apiRates();
      return (from: string): number => {
        if (from === base) return 1;
        return lookupRate(customs, from, base) ?? lookupRate(apis, from, base) ?? 1;
      };
    }),
    allRates: computed(() => customRates()),
    customPairs: computed(() => customRates().map((r) => `${r.from}-${r.to}`)),
    currentBase: computed(() => baseCurrency()),
    apiRateRows: computed((): ApiRateRow[] => {
      const base = baseCurrency();
      const customs = customRates();
      return apiRates().map((api) => {
        const customToBase = lookupRate(customs, api.to, base);
        return {
          currency: api.to,
          apiToBase: 1 / api.rate,
          customToBase,
        };
      });
    }),
    syncIntervalMs: computed(() => {
      const { value, unit } = syncInterval();
      return unit === 'hours' ? value * 60 * 60 * 1000 : value * 60 * 1000;
    }),
  })),
  withMethods(
    (
      store,
      storage = inject(StorageService),
      api = inject(ExchangeRateApiService),
    ) => {
      function persist(): void {
        storage.saveExchangeRates({
          customRates: store.customRates(),
          apiRates: store.apiRates(),
          baseCurrency: store.baseCurrency(),
          lastSyncedAt: store.lastSyncedAt(),
          isSyncing: false,
          syncError: null,
          syncInterval: store.syncInterval(),
        });
      }

      return {
        setRate(from: string, to: string, rate: number): void {
          const current = store.customRates();
          const idx = findRateIndex(current, from, to);
          const next =
            idx >= 0
              ? current.map((r, i) => (i === idx ? { from, to, rate } : r))
              : [...current, { from, to, rate }];
          patchState(store, { customRates: next });
          persist();
        },
        updateRate(
          originalFrom: string,
          originalTo: string,
          newFrom: string,
          newTo: string,
          rate: number,
        ): void {
          const next = store
            .customRates()
            .map((r) =>
              r.from === originalFrom && r.to === originalTo
                ? { from: newFrom, to: newTo, rate }
                : r,
            );
          patchState(store, { customRates: next });
          persist();
        },
        deleteRate(from: string, to: string): void {
          const next = store.customRates().filter((r) => !(r.from === from && r.to === to));
          patchState(store, { customRates: next });
          persist();
        },
        reorderRates(newRates: ExchangeRate[]): void {
          patchState(store, { customRates: newRates });
          persist();
        },
        setBaseCurrency(currency: string): void {
          patchState(store, { baseCurrency: currency });
          persist();
        },
        setSyncInterval(value: number, unit: SyncIntervalUnit): void {
          if (unit === 'minutes' && (value < 30 || value > 1440)) return;
          if (unit === 'hours' && (value < 1 || value > 24)) return;
          const setting: SyncIntervalSetting = { value, unit };
          patchState(store, { syncInterval: setting });
          persist();
        },
        async syncFromApi(): Promise<void> {
          if (store.isSyncing()) return;
          patchState(store, { isSyncing: true, syncError: null });
          try {
            const base = store.baseCurrency();
            const response = await firstValueFrom(api.fetchRates(base));
            if (response.result !== 'success') {
              throw new Error('API returned non-success result');
            }
            const newApiRates: ExchangeRate[] = Object.entries(response.rates)
              .filter(([currency]) => currency !== base)
              .map(([currency, rate]) => ({ from: base, to: currency, rate }));
            patchState(store, {
              apiRates: newApiRates,
              lastSyncedAt: Date.now(),
              isSyncing: false,
            });
            persist();
          } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to sync rates';
            patchState(store, { isSyncing: false, syncError: message });
            throw err;
          }
        },
        loadFromStorage(): void {
          const raw = storage.loadExchangeRates() as
            | ExchangeRatesState
            | PreviousExchangeRatesState
            | LegacyExchangeRatesState
            | null;
          if (!raw) return;

          const anyRaw = raw as unknown as Record<string, unknown>;

          // New format
          if ('customRates' in anyRaw && Array.isArray(anyRaw['customRates'])) {
            const next = raw as ExchangeRatesState;
            patchState(store, {
              customRates: next.customRates,
              apiRates: next.apiRates ?? [],
              baseCurrency: next.baseCurrency,
              lastSyncedAt: next.lastSyncedAt ?? null,
              syncInterval: next.syncInterval ?? { value: 1, unit: 'hours' },
            });
            return;
          }

          // Previous flat array format → customRates
          if ('rates' in anyRaw && Array.isArray(anyRaw['rates'])) {
            const prev = raw as PreviousExchangeRatesState;
            patchState(store, {
              customRates: prev.rates,
              baseCurrency: prev.baseCurrency,
            });
            persist();
            return;
          }

          // Legacy record format → customRates
          if ('rates' in anyRaw && typeof anyRaw['rates'] === 'object') {
            const legacy = raw as LegacyExchangeRatesState;
            const customRates: ExchangeRate[] = Object.entries(legacy.rates).map(([key, rate]) => {
              const [from, to] = key.split('-');
              return { from, to, rate };
            });
            patchState(store, {
              customRates,
              baseCurrency: legacy.baseCurrency,
            });
            persist();
          }
        },
      };
    },
  ),
);
