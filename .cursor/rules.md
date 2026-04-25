# Money Calculator - Cursor Rules

## Angular & Signals

- **Always use signals** for component state: `value = signal<T>()`
- **Use computed signals** for derived state: `derived = computed(() => ...)`
- **Use output()** for component events, never `@Output()` decorator
- **Use input()** for component inputs with `required: true` when mandatory
- **All components use OnPush**: `changeDetection: ChangeDetectionStrategy.OnPush`
- **No RxJS for state** - use signals and SignalStore only

## SignalStore Pattern

```typescript
export const FeatureStore = signalStore(
  withState({ ... }),
  withComputed(({ ... }) => ({ ... })),
  withMethods((store, deps = inject(...)) => ({ ... }))
);
```

- Keep stores feature-focused (exchange rates vs savings)
- Use `withComputed` for derived values
- Use `withMethods` for all state mutations
- Inject services in `withMethods` using `inject()`

## Component Split

- **Dummy components**: Pure presentational
  - Data via `input()` signals
  - Events via `output()`
  - No store injection
  - Named like `savings-list.dummy.component.ts`

- **Logic components**: Connect stores to UI
  - Inject stores
  - Minimal template logic
  - Pass data to dummy components

## CSS & Styling

- **All colors via CSS variables**: `color: var(--color-primary)`
- **Tailwind for utilities only**: spacing, flex, grid
- **No arbitrary Tailwind values**: use theme extensions
- **Component styles use CSS variables** for consistency

## Clean Code

- Small functions (< 20 lines)
- Descriptive names, no abbreviations
- No comments explaining "what" - code should be self-explanatory
- No `any` types - strict TypeScript

## File Naming

- Components: `feature-name.component.ts`
- Dummy components: `feature-name.dummy.component.ts`
- Stores: `feature.store.ts`
- Models: `feature.model.ts`
- Services: `feature.service.ts`
