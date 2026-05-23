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
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { CurrencySelectComponent } from '../../../currency/components/currency-select/currency-select.component';
import { CurrencyService } from '../../../../core/services/currency.service';
import type { SavingsEntry, SavingsEntryType } from '../../models/savings-entry.model';
import type { MetalCode } from '../../../metals/models/metal-price.model';
import { METAL_OPTIONS, PURITY_OPTIONS } from '../../../metals/constants/metal-options';
import {
  SELECT_OVERLAY_OPTIONS,
  SELECT_PANEL_STYLE,
  SELECT_PANEL_STYLE_CLASS,
} from '../../../../core/constants/select-overlay';

@Component({
  selector: 'app-savings-form',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    SelectModule,
    SelectButtonModule,
    ToggleSwitchModule,
    FormsModule,
    CurrencySelectComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './savings-form.component.html',
})
export class SavingsFormComponent {
  private readonly currencyService = inject(CurrencyService);
  private readonly translate = inject(TranslateService);
  private readonly langTick = toSignal(this.translate.onLangChange, { initialValue: null });

  readonly selectOverlayOptions = SELECT_OVERLAY_OPTIONS;
  readonly selectPanelStyle = SELECT_PANEL_STYLE;
  readonly selectPanelStyleClass = SELECT_PANEL_STYLE_CLASS;

  baseCurrency = input.required<string>();
  editMode = input(false);
  entryAdded = output<Omit<SavingsEntry, 'id'>>();

  readonly allCurrencies = computed(() => this.currencyService.getAllCurrencies());

  readonly typeOptions = computed(() => {
    this.langTick();
    return [
      {
        label: this.translate.instant('savings.form.typeMoney'),
        value: 'money' as SavingsEntryType,
        icon: 'pi pi-money-bill text-emerald-500',
      },
      {
        label: this.translate.instant('savings.form.typeMetal'),
        value: 'metal' as SavingsEntryType,
        icon: 'pi pi-star-fill text-amber-500',
      },
    ];
  });

  readonly metalOptions = computed(() => {
    this.langTick();
    return METAL_OPTIONS.map((o) => ({
      ...o,
      label: this.translate.instant(`metals.${o.code}`),
    }));
  });

  type = signal<SavingsEntryType>('money');

  labelValue = signal('');

  currency = signal('');
  amountValue = signal<number | null>(null);

  metal = signal<MetalCode | ''>('');
  purityLabel = signal('');
  gramsValue = signal<number | null>(null);

  activeValue = signal(true);

  readonly purityOptions = computed(() => {
    const m = this.metal();
    return m ? PURITY_OPTIONS[m] : [];
  });

  private suppressPurityReset = false;
  private suppressCurrencyDefault = false;

  constructor() {
    effect(() => {
      const base = this.baseCurrency();
      if (this.suppressCurrencyDefault) return;
      if (base && !this.currency()) {
        this.currency.set(base);
      }
    });

    effect(() => {
      const m = this.metal();
      if (this.suppressPurityReset) return;
      if (!m) {
        this.purityLabel.set('');
        return;
      }
      const opts = PURITY_OPTIONS[m];
      const current = this.purityLabel();
      if (!opts.some((o) => o.label === current)) {
        this.purityLabel.set(opts[0]?.label ?? '');
      }
    });
  }

  canAdd = computed(() => {
    if (this.labelValue().trim() === '') return false;
    if (this.type() === 'money') {
      const amount = this.amountValue();
      return !!this.currency() && amount !== null && amount > 0;
    }
    const grams = this.gramsValue();
    return !!this.metal() && !!this.purityLabel() && grams !== null && grams > 0;
  });

  addEntry(): void {
    if (!this.canAdd()) return;
    const label = this.labelValue() || undefined;
    const active = this.activeValue();
    if (this.type() === 'money') {
      this.entryAdded.emit({
        type: 'money',
        label,
        currency: this.currency(),
        amount: this.amountValue() ?? 0,
        active,
      });
    } else {
      this.entryAdded.emit({
        type: 'metal',
        label,
        metal: this.metal() as MetalCode,
        purityLabel: this.purityLabel(),
        grams: this.gramsValue() ?? 0,
        active,
      });
    }
    this.reset();
  }

  reset(): void {
    this.type.set('money');
    this.labelValue.set('');
    this.currency.set(this.baseCurrency());
    this.amountValue.set(null);
    this.metal.set('');
    this.purityLabel.set('');
    this.gramsValue.set(null);
    this.activeValue.set(true);
  }

  setValues(entry: SavingsEntry): void {
    this.suppressCurrencyDefault = true;
    this.suppressPurityReset = true;
    const entryType = entry.type ?? 'money';
    this.type.set(entryType);
    this.labelValue.set(entry.label ?? '');
    this.activeValue.set(entry.active !== false);
    if (entryType === 'money') {
      this.currency.set(entry.currency ?? '');
      this.amountValue.set(entry.amount ?? null);
      this.metal.set('');
      this.purityLabel.set('');
      this.gramsValue.set(null);
    } else {
      this.metal.set(entry.metal ?? '');
      this.purityLabel.set(entry.purityLabel ?? '');
      this.gramsValue.set(entry.grams ?? null);
      this.currency.set('');
      this.amountValue.set(null);
    }
    queueMicrotask(() => {
      this.suppressCurrencyDefault = false;
      this.suppressPurityReset = false;
    });
  }
}
