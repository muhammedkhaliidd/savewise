import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { DatePickerModule } from 'primeng/datepicker';
import { CurrencySelectComponent } from '../../../currency/components/currency-select/currency-select.component';
import { CurrencyService } from '../../../../core/services/currency.service';
import { currencyDisplayKey, DisplayCodePipe } from '../../../../core/pipes/display-code.pipe';
import { ExchangeRateStore } from '../../../../stores/exchange-rate.store';
import { MetalPriceStore } from '../../../../stores/metal-price.store';
import { SavingsStore } from '../../../../stores/savings.store';
import { valueEntryInBase } from '../../../savings/savings-value.util';
import {
  SELECT_OVERLAY_OPTIONS,
  SELECT_PANEL_STYLE,
  SELECT_PANEL_STYLE_CLASS,
} from '../../../../core/constants/select-overlay';
import type { Goal } from '../../models/goal.model';

export interface GoalFormValue {
  name?: string;
  initialSavingsIds: string[];
  addedSavingsIds: string[];
  targetAmount: number;
  targetCurrency: string;
  targetDate?: string;
}

interface SavingsOption {
  id: string;
  label: string;
}

@Component({
  selector: 'app-goals-form',
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    MultiSelectModule,
    DatePickerModule,
    CurrencySelectComponent,
    DisplayCodePipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './goals-form.component.html',
})
export class GoalsFormComponent {
  private readonly currencyService = inject(CurrencyService);
  private readonly translate = inject(TranslateService);
  private readonly exchangeStore = inject(ExchangeRateStore);
  private readonly metalStore = inject(MetalPriceStore);
  private readonly savingsStore = inject(SavingsStore);
  private readonly langTick = toSignal(this.translate.onLangChange, { initialValue: null });

  readonly selectOverlayOptions = SELECT_OVERLAY_OPTIONS;
  readonly selectPanelStyle = SELECT_PANEL_STYLE;
  readonly selectPanelStyleClass = SELECT_PANEL_STYLE_CLASS;

  baseCurrency = input.required<string>();
  editMode = input(false);
  goalSubmit = output<GoalFormValue>();

  readonly allCurrencies = computed(() => this.currencyService.getAllCurrencies());

  nameValue = signal('');
  startDateDisplay = signal(new Date().toISOString());
  initialIds = signal<string[]>([]);
  addedIds = signal<string[]>([]);
  targetAmountValue = signal<number | null>(null);
  targetCurrency = signal('');
  targetDateValue = signal<Date | null>(null);

  private suppressCurrencyDefault = false;

  readonly savingsOptions = computed((): SavingsOption[] => {
    this.langTick();
    const rateToBase = this.exchangeStore.getRateToBase();
    const metalPure = this.metalStore.getMetalPricePerGramInBase();
    const baseKey = currencyDisplayKey(this.baseCurrency());
    const translated = this.translate.instant(baseKey);
    const baseLabel = translated === baseKey ? this.baseCurrency() : translated;
    return this.savingsStore.allEntries().map((entry) => {
      const value = valueEntryInBase(entry, rateToBase, metalPure) ?? 0;
      const name = entry.label || this.translate.instant('common.untitled');
      return { id: entry.id, label: `${name} · ${value.toFixed(2)} ${baseLabel}` };
    });
  });

  /** Options for the "added savings" picker exclude entries already in initial savings. */
  readonly addedOptions = computed(() => {
    const initial = new Set(this.initialIds());
    return this.savingsOptions().filter((o) => !initial.has(o.id));
  });

  readonly currentInBase = computed(() => {
    const rateToBase = this.exchangeStore.getRateToBase();
    const metalPure = this.metalStore.getMetalPricePerGramInBase();
    const entriesById = new Map(this.savingsStore.allEntries().map((e) => [e.id, e]));
    return [...this.initialIds(), ...this.addedIds()].reduce((sum, id) => {
      const entry = entriesById.get(id);
      if (!entry) return sum;
      return sum + (valueEntryInBase(entry, rateToBase, metalPure) ?? 0);
    }, 0);
  });

  readonly canSubmit = computed(() => {
    const amount = this.targetAmountValue();
    return !!this.targetCurrency() && amount !== null && amount > 0;
  });

  constructor() {
    effect(() => {
      const base = this.baseCurrency();
      if (this.suppressCurrencyDefault) return;
      if (base && !this.targetCurrency()) {
        this.targetCurrency.set(base);
      }
    });
  }

  submit(): void {
    if (!this.canSubmit()) return;
    this.goalSubmit.emit({
      name: this.nameValue().trim() || undefined,
      initialSavingsIds: this.initialIds(),
      addedSavingsIds: this.addedIds(),
      targetAmount: this.targetAmountValue() ?? 0,
      targetCurrency: this.targetCurrency(),
      targetDate: this.targetDateValue()?.toISOString(),
    });
    if (!this.editMode()) this.reset();
  }

  reset(): void {
    this.nameValue.set('');
    this.startDateDisplay.set(new Date().toISOString());
    this.initialIds.set([]);
    this.addedIds.set([]);
    this.targetAmountValue.set(null);
    this.targetCurrency.set(this.baseCurrency());
    this.targetDateValue.set(null);
  }

  setValues(goal: Goal): void {
    this.suppressCurrencyDefault = true;
    this.nameValue.set(goal.name ?? '');
    this.startDateDisplay.set(goal.startDate);
    this.initialIds.set([...goal.initialSavingsIds]);
    this.addedIds.set([...goal.addedSavingsIds]);
    this.targetAmountValue.set(goal.targetAmount);
    this.targetCurrency.set(goal.targetCurrency);
    this.targetDateValue.set(goal.targetDate ? new Date(goal.targetDate) : null);
    queueMicrotask(() => {
      this.suppressCurrencyDefault = false;
    });
  }
}
