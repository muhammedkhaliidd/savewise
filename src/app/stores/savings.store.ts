import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { StorageService } from '../core/services/storage.service';
import type { SavingsEntry, SavingsState } from '../models/savings-entry.model';
import { ExchangeRateStore } from './exchange-rate.store';

const initialState: SavingsState = {
  entries: [],
  lastInputDate: null,
};

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export const SavingsStore = signalStore(
  withState(initialState),
  withComputed((state, exchangeStore = inject(ExchangeRateStore)) => ({
    allEntries: computed(() => state.entries()),
    entryCount: computed(() => state.entries().length),
    hasEntries: computed(() => state.entries().length > 0),
    totalInBase: computed(() => {
      const rateToBase = exchangeStore.getRateToBase();
      return state
        .entries()
        .reduce((sum, entry) => sum + entry.amount * rateToBase(entry.currency), 0);
    }),
  })),
  withMethods((store, storage = inject(StorageService)) => ({
    addEntry(entry: Omit<SavingsEntry, 'id'>): void {
      const newEntry: SavingsEntry = {
        ...entry,
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
        patchState(store, {
          entries: saved.entries,
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
      console.log('reorderEntries', newEntries);
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
