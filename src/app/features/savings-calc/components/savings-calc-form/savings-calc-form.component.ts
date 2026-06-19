import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
import { SelectButtonModule } from 'primeng/selectbutton';
import { DatePickerModule } from 'primeng/datepicker';
import { CurrencySelectComponent } from '../../../currency/components/currency-select/currency-select.component';
import { CurrencyService } from '../../../../core/services/currency.service';
import { ExchangeRateStore } from '../../../../stores/exchange-rate.store';
import { MetalPriceStore } from '../../../../stores/metal-price.store';
import { SavingsStore } from '../../../../stores/savings.store';
import { valueEntryInBase } from '../../../savings/savings-value.util';
import { currencyDisplayKey, DisplayCodePipe } from '../../../../core/pipes/display-code.pipe';
import {
  SELECT_OVERLAY_OPTIONS,
  SELECT_PANEL_STYLE,
  SELECT_PANEL_STYLE_CLASS,
} from '../../../../core/constants/select-overlay';
import { projectCalcTotalInBase } from '../../savings-calc.util';
import type {
  CalcFrequency,
  CalcRecurringEntry,
  SavingsCalcItem,
} from '../../models/savings-calc.model';

export interface SavingsCalcFormValue {
  name?: string;
  savingsIds: string[];
  recurringEntries: CalcRecurringEntry[];
  targetDate: string;
}

interface SavingsOption {
  id: string;
  label: string;
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

@Component({
  selector: 'app-savings-calc-form',
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    MultiSelectModule,
    SelectButtonModule,
    DatePickerModule,
    CurrencySelectComponent,
    DisplayCodePipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './savings-calc-form.component.html',
})
export class SavingsCalcFormComponent {
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
  calcSubmit = output<SavingsCalcFormValue>();

  readonly allCurrencies = computed(() => this.currencyService.getAllCurrencies());

  readonly frequencyOptions = computed(() => {
    this.langTick();
    return [
      { label: this.translate.instant('savingsCalc.form.monthly'), value: 'monthly' as CalcFrequency },
      { label: this.translate.instant('savingsCalc.form.yearly'), value: 'yearly' as CalcFrequency },
    ];
  });

  nameValue = signal('');
  savingsIds = signal<string[]>([]);
  recurringEntries = signal<CalcRecurringEntry[]>([]);
  targetDate = signal<Date | null>(null);

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

  readonly projectedInBase = computed(() => {
    const date = this.targetDate();
    if (!date) return 0;
    const rateToBase = this.exchangeStore.getRateToBase();
    const metalPure = this.metalStore.getMetalPricePerGramInBase();
    const entriesById = new Map(this.savingsStore.allEntries().map((e) => [e.id, e]));
    const item: SavingsCalcItem = {
      id: 'preview',
      savingsIds: this.savingsIds(),
      recurringEntries: this.recurringEntries(),
      targetDate: date.toISOString(),
    };
    return projectCalcTotalInBase(item, entriesById, rateToBase, metalPure, new Date());
  });

  readonly canSubmit = computed(() => this.targetDate() !== null);

  addRecurring(): void {
    this.recurringEntries.update((rows) => [
      ...rows,
      { id: generateId(), amount: 0, currency: this.baseCurrency(), frequency: 'monthly' },
    ]);
  }

  removeRecurring(id: string): void {
    this.recurringEntries.update((rows) => rows.filter((r) => r.id !== id));
  }

  updateRecurring(id: string, changes: Partial<CalcRecurringEntry>): void {
    this.recurringEntries.update((rows) =>
      rows.map((r) => (r.id === id ? { ...r, ...changes } : r)),
    );
  }

  submit(): void {
    if (!this.canSubmit()) return;
    this.calcSubmit.emit({
      name: this.nameValue().trim() || undefined,
      savingsIds: this.savingsIds(),
      recurringEntries: this.recurringEntries(),
      targetDate: this.targetDate()!.toISOString(),
    });
    if (!this.editMode()) this.reset();
  }

  reset(): void {
    this.nameValue.set('');
    this.savingsIds.set([]);
    this.recurringEntries.set([]);
    this.targetDate.set(null);
  }

  setValues(item: SavingsCalcItem): void {
    this.nameValue.set(item.name ?? '');
    this.savingsIds.set([...item.savingsIds]);
    this.recurringEntries.set(item.recurringEntries.map((r) => ({ ...r })));
    this.targetDate.set(new Date(item.targetDate));
  }
}
