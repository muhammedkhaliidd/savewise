import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { StorageService } from '../core/services/storage.service';
import type {
  DebtDirection,
  DebtEntry,
  DebtsState,
} from '../features/debts/models/debt-entry.model';
import { valueEntryInBase } from '../features/savings/savings-value.util';
import { ExchangeRateStore } from './exchange-rate.store';
import { MetalPriceStore } from './metal-price.store';

const initialState: DebtsState = {
  entries: [],
};

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

export const DebtsStore = signalStore(
  withState(initialState),
  withComputed(
    (
      state,
      exchangeStore = inject(ExchangeRateStore),
      metalStore = inject(MetalPriceStore),
    ) => {
      /** Sum (in base currency) of the active entries in one direction. */
      const sumInBase = (direction: DebtDirection) =>
        computed(() => {
          const rateToBase = exchangeStore.getRateToBase();
          const metalPure = metalStore.getMetalPricePerGramInBase();
          return state
            .entries()
            .filter((e) => e.active !== false && e.direction === direction)
            .reduce((sum, e) => sum + (valueEntryInBase(e, rateToBase, metalPure) ?? 0), 0);
        });

      const owedInBase = sumInBase('owe');
      const owedToMeInBase = sumInBase('owedToMe');

      return {
        allEntries: computed(() => state.entries()),
        hasEntries: computed(() => state.entries().length > 0),
        /** Active debts I owe. */
        owedInBase,
        /** Active amounts owed to me. */
        owedToMeInBase,
        /** Signed effect on the total: owed to me (+) minus what I owe (−). */
        balanceInBase: computed(() => owedToMeInBase() - owedInBase()),
      };
    },
  ),
  withMethods((store, storage = inject(StorageService)) => {
    const save = (entries: DebtEntry[]): void => {
      patchState(store, { entries });
      storage.saveDebts({ entries });
    };

    return {
      addEntry(entry: Omit<DebtEntry, 'id'>): void {
        save([...store.entries(), { ...entry, type: entry.type ?? 'money', id: generateId() }]);
      },
      updateEntry(id: string, changes: Partial<DebtEntry>): void {
        save(store.entries().map((e) => (e.id === id ? { ...e, ...changes } : e)));
      },
      deleteEntry(id: string): void {
        save(store.entries().filter((e) => e.id !== id));
      },
      reorderEntries(entries: DebtEntry[]): void {
        save(entries);
      },
      clearAll(): void {
        save([]);
      },
      loadFromStorage(): void {
        const saved = storage.loadDebts();
        if (saved) {
          patchState(store, { entries: saved.entries });
        }
      },
    };
  }),
);
