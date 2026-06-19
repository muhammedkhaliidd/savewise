import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { StorageService } from '../core/services/storage.service';
import { ExchangeRateStore } from './exchange-rate.store';
import { MetalPriceStore } from './metal-price.store';
import { SavingsStore } from './savings.store';
import { projectCalcTotalInBase } from '../features/savings-calc/savings-calc.util';
import type {
  SavingsCalcItem,
  SavingsCalcState,
} from '../features/savings-calc/models/savings-calc.model';

const initialState: SavingsCalcState = {
  items: [],
  lastInputDate: null,
};

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

export interface CalcItemView {
  item: SavingsCalcItem;
  projectedInBase: number;
}

export const SavingsCalcStore = signalStore(
  withState(initialState),
  withComputed(
    (
      state,
      savingsStore = inject(SavingsStore),
      exchangeStore = inject(ExchangeRateStore),
      metalStore = inject(MetalPriceStore),
    ) => ({
      allItems: computed(() => state.items()),
      hasItems: computed(() => state.items().length > 0),
      itemsWithProjection: computed((): CalcItemView[] => {
        const rateToBase = exchangeStore.getRateToBase();
        const metalPure = metalStore.getMetalPricePerGramInBase();
        const entriesById = new Map(savingsStore.allEntries().map((e) => [e.id, e]));
        const now = new Date();
        return state.items().map((item) => ({
          item,
          projectedInBase: projectCalcTotalInBase(item, entriesById, rateToBase, metalPure, now),
        }));
      }),
    }),
  ),
  withMethods((store, storage = inject(StorageService)) => {
    function persist(items: SavingsCalcItem[], lastInputDate: string): void {
      patchState(store, { items, lastInputDate });
      storage.saveSavingsCalc({ items, lastInputDate });
    }
    return {
      addItem(item: Omit<SavingsCalcItem, 'id'>): void {
        const newItem: SavingsCalcItem = { ...item, id: generateId() };
        persist([...store.items(), newItem], new Date().toISOString());
      },
      updateItem(id: string, changes: Partial<SavingsCalcItem>): void {
        const next = store.items().map((i) => (i.id === id ? { ...i, ...changes } : i));
        persist(next, new Date().toISOString());
      },
      deleteItem(id: string): void {
        persist(
          store.items().filter((i) => i.id !== id),
          new Date().toISOString(),
        );
      },
      reorderItems(newItems: SavingsCalcItem[]): void {
        persist(newItems, new Date().toISOString());
      },
      loadFromStorage(): void {
        const saved = storage.loadSavingsCalc();
        if (saved) {
          patchState(store, { items: saved.items, lastInputDate: saved.lastInputDate });
        }
      },
      clearAll(): void {
        persist([], new Date().toISOString());
      },
    };
  }),
);
