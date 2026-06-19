import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { StorageService } from '../core/services/storage.service';
import type { SavingsEntry, SavingsState } from '../features/savings/models/savings-entry.model';
import { ExchangeRateStore } from './exchange-rate.store';
import { MetalPriceStore } from './metal-price.store';
import { valueEntryInBase } from '../features/savings/savings-value.util';

const initialState: SavingsState = {
  entries: [],
  lastInputDate: null,
};

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

function migrateEntry(entry: SavingsEntry): SavingsEntry {
  return entry.type ? entry : { ...entry, type: 'money' };
}

export const SavingsStore = signalStore(
  withState(initialState),
  withComputed(
    (
      state,
      exchangeStore = inject(ExchangeRateStore),
      metalStore = inject(MetalPriceStore),
    ) => ({
      allEntries: computed(() => state.entries()),
      entryCount: computed(() => state.entries().filter((e) => e.active !== false).length),
      hasEntries: computed(() => state.entries().length > 0),
      totalInBase: computed(() => {
        const rateToBase = exchangeStore.getRateToBase();
        const metalPure = metalStore.getMetalPricePerGramInBase();
        return state
          .entries()
          .filter((entry) => entry.active !== false)
          .reduce((sum, entry) => sum + (valueEntryInBase(entry, rateToBase, metalPure) ?? 0), 0);
      }),
    }),
  ),
  withMethods((store, storage = inject(StorageService)) => ({
    addEntry(entry: Omit<SavingsEntry, 'id'>): void {
      const newEntry: SavingsEntry = {
        ...entry,
        type: entry.type ?? 'money',
        id: generateId(),
      };
      const newDate = new Date().toISOString();
      const newEntries = [...store.entries(), newEntry];
      patchState(store, {
        entries: newEntries,
        lastInputDate: newDate,
      });
      storage.saveSavings({
        entries: store.entries(),
        lastInputDate: newDate,
      });
    },
    updateEntry(id: string, changes: Partial<SavingsEntry>): void {
      const newEntries = store.entries().map((e) => (e.id === id ? { ...e, ...changes } : e));
      const newDate = new Date().toISOString();
      patchState(store, {
        entries: newEntries,
        lastInputDate: newDate,
      });
      storage.saveSavings({
        entries: newEntries,
        lastInputDate: newDate,
      });
    },
    deleteEntry(id: string): void {
      const newEntries = store.entries().filter((e) => e.id !== id);
      const newDate = new Date().toISOString();
      patchState(store, {
        entries: newEntries,
        lastInputDate: newDate,
      });
      storage.saveSavings({
        entries: newEntries,
        lastInputDate: newDate,
      });
    },
    loadFromStorage(): void {
      const saved = storage.loadSavings();
      if (saved) {
        const migrated = saved.entries.map(migrateEntry);
        patchState(store, {
          entries: migrated,
          lastInputDate: saved.lastInputDate,
        });
      }
    },
    clearAll(): void {
      patchState(store, {
        entries: [],
        lastInputDate: null,
      });
      storage.saveSavings({
        entries: [],
        lastInputDate: null,
      });
    },
    reorderEntries(newEntries: SavingsEntry[]): void {
      const newDate = new Date().toISOString();
      patchState(store, {
        entries: newEntries,
        lastInputDate: newDate,
      });
      storage.saveSavings({
        entries: newEntries,
        lastInputDate: newDate,
      });
    },
  })),
);
