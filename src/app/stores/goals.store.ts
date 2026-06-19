import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { StorageService } from '../core/services/storage.service';
import { ExchangeRateStore } from './exchange-rate.store';
import { MetalPriceStore } from './metal-price.store';
import { SavingsStore } from './savings.store';
import { valueEntryInBase } from '../features/savings/savings-value.util';
import type { Goal, GoalsState } from '../features/goals/models/goal.model';

const initialState: GoalsState = {
  goals: [],
  lastInputDate: null,
};

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

export interface GoalProgress {
  goal: Goal;
  /** Live value of linked savings entries, in base currency. */
  currentInBase: number;
  /** Target amount converted to base currency. */
  targetInBase: number;
  /** Progress ratio clamped to [0, 1]. */
  progress: number;
}

export const GoalsStore = signalStore(
  withState(initialState),
  withComputed(
    (
      state,
      savingsStore = inject(SavingsStore),
      exchangeStore = inject(ExchangeRateStore),
      metalStore = inject(MetalPriceStore),
    ) => ({
      allGoals: computed(() => state.goals()),
      hasGoals: computed(() => state.goals().length > 0),
      goalsWithProgress: computed((): GoalProgress[] => {
        const rateToBase = exchangeStore.getRateToBase();
        const metalPure = metalStore.getMetalPricePerGramInBase();
        const entriesById = new Map(savingsStore.allEntries().map((e) => [e.id, e]));
        return state.goals().map((goal) => {
          const linkedIds = [...goal.initialSavingsIds, ...goal.addedSavingsIds];
          const currentInBase = linkedIds.reduce((sum, id) => {
            const entry = entriesById.get(id);
            if (!entry) return sum;
            return sum + (valueEntryInBase(entry, rateToBase, metalPure) ?? 0);
          }, 0);
          const targetInBase = goal.targetAmount * rateToBase(goal.targetCurrency);
          const progress = targetInBase > 0 ? Math.min(currentInBase / targetInBase, 1) : 0;
          return { goal, currentInBase, targetInBase, progress };
        });
      }),
    }),
  ),
  withMethods((store, storage = inject(StorageService)) => {
    function persist(goals: Goal[], lastInputDate: string): void {
      patchState(store, { goals, lastInputDate });
      storage.saveGoals({ goals, lastInputDate });
    }
    return {
      addGoal(goal: Omit<Goal, 'id' | 'startDate'>): void {
        const now = new Date().toISOString();
        const newGoal: Goal = { ...goal, id: generateId(), startDate: now };
        persist([...store.goals(), newGoal], now);
      },
      updateGoal(id: string, changes: Partial<Goal>): void {
        const next = store.goals().map((g) => (g.id === id ? { ...g, ...changes } : g));
        persist(next, new Date().toISOString());
      },
      deleteGoal(id: string): void {
        persist(
          store.goals().filter((g) => g.id !== id),
          new Date().toISOString(),
        );
      },
      reorderGoals(newGoals: Goal[]): void {
        persist(newGoals, new Date().toISOString());
      },
      loadFromStorage(): void {
        const saved = storage.loadGoals();
        if (saved) {
          patchState(store, { goals: saved.goals, lastInputDate: saved.lastInputDate });
        }
      },
      clearAll(): void {
        persist([], new Date().toISOString());
      },
    };
  }),
);
