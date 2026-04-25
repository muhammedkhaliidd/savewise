# Money Calculator - Architecture Documentation

## Overview

A multi-currency savings calculator built with Angular 21, PrimeNG, Tailwind CSS, and CapacitorJS.

## Architecture Principles

### 1. Signals-Based State Management

All state uses Angular Signals:
- `signal<T>()` for mutable state
- `computed()` for derived values
- `effect()` for side effects
- No RxJS for state management

### 2. SignalStore Pattern

Using `@ngrx/signals` for feature stores:
```typescript
export const FeatureStore = signalStore(
  withState({ ... }),
  withComputed(({ ... }) => ({ ... })),
  withMethods((store, deps = inject(...)) => ({ ... }))
);
```

Stores:
- **ExchangeRateStore**: Manages currency rates and base currency
- **SavingsStore**: Manages savings entries and last input date

### 3. OnPush Strategy

All components use `ChangeDetectionStrategy.OnPush` for performance.

### 4. Component Architecture

**Layout Components** (Logic + Presentation):
- `HeaderComponent`: Base currency selector
- `FooterComponent`: Last input date display
- `AppLayoutComponent`: Shell with store providers

**Currency Components**:
- `CurrencySelectComponent`: Searchable dropdown
- `CurrencyInputComponent`: Amount input with currency display

**Exchange Components**:
- `RateConfigComponent`: Form to add exchange rates
- `RateListComponent`: Table of configured rates

**Savings Components**:
- `SavingsFormComponent`: Form to add savings entries
- `SavingsListComponent`: Table of savings with conversion
- `SavingsTotalComponent`: Card displaying total in base currency

### 5. Data Flow

```
User Action → Component → Store Method → patchState → localStorage (via StorageService)
                                            ↓
                                    Signal Updates → UI Re-renders (OnPush)
```

## State Management

### ExchangeRateStore State
```typescript
{
  rates: Record<`${from}-${to}`, number>,  // 'USD-EGP' -> 50
  baseCurrency: string                      // 'USD'
}
```

### SavingsStore State
```typescript
{
  entries: SavingsEntry[],
  lastInputDate: string | null  // ISO timestamp
}
```

## Persistence

- **localStorage** for all state persistence
- **StorageService** abstracts localStorage operations
- **Automatic save** on every state change
- **Load on init** in `AppLayoutComponent.ngOnInit()`

## Currency Data

- Uses `currency-codes` npm package for ISO currency data
- All currencies searchable by code or name
- Default rate is 1:1 for undefined pairs

## Mobile Support

CapacitorJS configured for:
- Android (`npx cap add android`)
- iOS (`npx cap add ios`)

## File Structure

```
src/app/
├── core/
│   ├── services/
│   │   ├── currency.service.ts      # Currency list/search
│   │   └── storage.service.ts         # localStorage
│   └── constants/
├── stores/
│   ├── exchange-rate.store.ts         # Exchange rates state
│   └── savings.store.ts               # Savings entries state
├── models/
│   ├── currency.model.ts
│   ├── exchange-rate.model.ts
│   └── savings-entry.model.ts
├── components/
│   ├── layout/
│   │   ├── header/
│   │   ├── footer/
│   │   └── app-layout/
│   ├── currency/
│   │   ├── currency-select/
│   │   └── currency-input/
│   ├── exchange/
│   │   ├── rate-config/
│   │   └── rate-list/
│   └── savings/
│       ├── savings-form/
│       ├── savings-list/
│       └── savings-total/
└── app.ts                               # Root with store wiring
```

## Styling

- **CSS Variables** for theme colors
- **Tailwind CSS** for layout utilities
- **PrimeNG** for UI components with custom teal theme

## Future Enhancements

- Live exchange rates from API
- Charts for savings history
- Multiple savings buckets/goals
- Export to CSV
- Cloud sync
