import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { firstValueFrom } from 'rxjs';
import { StorageService } from '../core/services/storage.service';
import { MetalPriceApiService } from '../core/services/metal-price-api.service';
import { ExchangeRateStore } from './exchange-rate.store';
import { lookupPurityFactor } from '../features/metals/constants/metal-options';
import type {
  MetalApiPrice,
  MetalApiRow,
  MetalCode,
  MetalPrice,
  MetalPricesState,
} from '../features/metals/models/metal-price.model';

const initialState: MetalPricesState = {
  customPrices: [],
  apiPrices: [],
  lastSyncedAt: null,
  isSyncing: false,
  syncError: null,
};

function findPriceIndex(prices: MetalPrice[], metal: MetalCode, purity: string): number {
  return prices.findIndex((p) => p.metal === metal && p.purityLabel === purity);
}

export const MetalPriceStore = signalStore(
  withState(initialState),
  withComputed(({ customPrices, apiPrices }, exchange = inject(ExchangeRateStore)) => ({
    allCustomPrices: computed(() => customPrices()),

    /**
     * Returns the pure-metal (24K / 999) price per gram in the current base currency,
     * or null when the price cannot be determined.
     *
     * Resolution: the first active custom row for this metal is used and back-derived to
     * a pure-equivalent price using its purityFactor. Otherwise the API USD/g price is
     * converted via the existing USD->base exchange rate. If neither is available the
     * result is null and callers should treat the entry as "price unavailable".
     *
     * Note: the USD->base conversion reads the exchange store at compute time, so a
     * fresh page load may briefly show a stale figure until the exchange sync lands.
     */
    getMetalPricePerGramInBase: computed(() => {
      const rate = exchange.getRate();
      const base = exchange.currentBase();
      const customs = customPrices().filter((p) => p.active !== false);
      const apis = apiPrices();
      return (metal: MetalCode): number | null => {
        const custom = customs.find((c) => c.metal === metal);
        if (custom) {
          const pf = lookupPurityFactor(metal, custom.purityLabel);
          if (pf > 0) return custom.pricePerGram / pf;
        }
        const api = apis.find((a) => a.metal === metal);
        if (!api) return null;
        const usdToBase = rate('USD', base);
        return api.pricePerGramUsd * usdToBase;
      };
    }),

    apiMetalRows: computed((): MetalApiRow[] => {
      const rate = exchange.getRate();
      const base = exchange.currentBase();
      const customs = customPrices().filter((p) => p.active !== false);
      return apiPrices().map((api) => {
        const usdToBase = rate('USD', base);
        const apiPerGramInBase = api.pricePerGramUsd * usdToBase;
        const custom = customs.find((c) => c.metal === api.metal);
        let customPerGramInBase: number | null = null;
        if (custom) {
          const pf = lookupPurityFactor(api.metal, custom.purityLabel);
          if (pf > 0) customPerGramInBase = custom.pricePerGram / pf;
        }
        return { metal: api.metal, apiPerGramInBase, customPerGramInBase };
      });
    }),
  })),
  withMethods(
    (
      store,
      storage = inject(StorageService),
      api = inject(MetalPriceApiService),
    ) => {
      function persist(): void {
        storage.saveMetalPrices({
          customPrices: store.customPrices(),
          apiPrices: store.apiPrices(),
          lastSyncedAt: store.lastSyncedAt(),
          isSyncing: false,
          syncError: null,
        });
      }

      return {
        setPrice(price: MetalPrice): void {
          const current = store.customPrices();
          const idx = findPriceIndex(current, price.metal, price.purityLabel);
          const next =
            idx >= 0
              ? current.map((p, i) => (i === idx ? { ...price } : p))
              : [...current, { ...price }];
          patchState(store, { customPrices: next });
          persist();
        },
        updatePrice(
          originalMetal: MetalCode,
          originalPurity: string,
          next: MetalPrice,
        ): void {
          const updated = store
            .customPrices()
            .map((p) =>
              p.metal === originalMetal && p.purityLabel === originalPurity
                ? { ...next, active: next.active ?? p.active }
                : p,
            );
          patchState(store, { customPrices: updated });
          persist();
        },
        deletePrice(metal: MetalCode, purityLabel: string): void {
          const next = store
            .customPrices()
            .filter((p) => !(p.metal === metal && p.purityLabel === purityLabel));
          patchState(store, { customPrices: next });
          persist();
        },
        setPriceActive(metal: MetalCode, purityLabel: string, active: boolean): void {
          const next = store
            .customPrices()
            .map((p) =>
              p.metal === metal && p.purityLabel === purityLabel ? { ...p, active } : p,
            );
          patchState(store, { customPrices: next });
          persist();
        },
        reorderPrices(newPrices: MetalPrice[]): void {
          patchState(store, { customPrices: newPrices });
          persist();
        },
        clearCustomPrices(): void {
          if (store.customPrices().length === 0) return;
          patchState(store, { customPrices: [] });
          persist();
        },
        async syncFromApi(): Promise<void> {
          if (store.isSyncing()) return;
          patchState(store, { isSyncing: true, syncError: null });
          try {
            const newApiPrices: MetalApiPrice[] = await firstValueFrom(api.fetchSpot());
            patchState(store, {
              apiPrices: newApiPrices,
              lastSyncedAt: Date.now(),
              isSyncing: false,
            });
            persist();
          } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to sync metal prices';
            patchState(store, { isSyncing: false, syncError: message });
            throw err;
          }
        },
        loadFromStorage(): void {
          const raw = storage.loadMetalPrices();
          if (!raw) return;
          patchState(store, {
            customPrices: raw.customPrices ?? [],
            apiPrices: raw.apiPrices ?? [],
            lastSyncedAt: raw.lastSyncedAt ?? null,
          });
        },
      };
    },
  ),
);
