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
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { CurrencySelectComponent } from '../../../currency/components/currency-select/currency-select.component';
import { CurrencyService } from '../../../../core/services/currency.service';
import type { ExchangeRate } from '../../models/exchange-rate.model';

@Component({
  selector: 'app-rate-config',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ButtonModule,
    InputNumberModule,
    ToggleSwitchModule,
    FormsModule,
    CurrencySelectComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid gap-4">
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <div>
            <label class="block text-sm font-medium text-[var(--color-text-muted)] mb-1">
              {{ 'exchange.form.from' | translate }} <span class="text-red-500">*</span>
            </label>
            <app-currency-select
              [currencies]="allCurrencies()"
              [selectedCode]="fromCurrency()"
              (selectionChange)="fromCurrency.set($event)"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-[var(--color-text-muted)] mb-1">
              {{ 'exchange.form.to' | translate }} <span class="text-red-500">*</span>
            </label>
            <app-currency-select
              [currencies]="allCurrencies()"
              [selectedCode]="toCurrency()"
              (selectionChange)="toCurrency.set($event)"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-[var(--color-text-muted)] mb-1">
            {{ rateLabel() }} <span class="text-red-500">*</span>
          </label>
          <p-inputNumber
            [(ngModel)]="rateValue"
            mode="decimal"
            [minFractionDigits]="2"
            [maxFractionDigits]="6"
            placeholder="1.00"
            styleClass="w-full"
          />
        </div>

        <div class="flex items-center justify-between">
          <label class="text-sm font-medium text-[var(--color-text-muted)]">{{
            'common.active' | translate
          }}</label>
          <p-toggleSwitch
            [(ngModel)]="activeValue"
            [ariaLabel]="'exchange.form.toggleActive' | translate"
          />
        </div>

      <p-button
        [label]="editMode() ? ('common.save' | translate) : ('exchange.form.addRate' | translate)"
        [icon]="editMode() ? 'pi pi-check' : 'pi pi-plus'"
        (onClick)="addRate()"
        [disabled]="!canAdd()"
        styleClass="w-full"
      />
    </div>
  `,
})
export class RateConfigComponent {
  private readonly currencyService = inject(CurrencyService);
  private readonly translate = inject(TranslateService);
  private readonly langTick = toSignal(this.translate.onLangChange, { initialValue: null });

  existingRates = input<ExchangeRate[]>([]);
  editMode = input(false);
  rateAdded = output<ExchangeRate>();

  readonly allCurrencies = computed(() => this.currencyService.getAllCurrencies());

  readonly rateLabel = computed(() => {
    this.langTick();
    return this.translate.instant('exchange.form.rateLabel', {
      from: this.fromCurrency() || 'USD',
      to: this.toCurrency() || 'USD',
    });
  });

  fromCurrency = signal('');
  toCurrency = signal('');
  rateValue = signal(1);
  activeValue = signal(true);

  canAdd = computed(() => {
    const from = this.fromCurrency();
    const to = this.toCurrency();
    return from && to && from !== to;
  });

  addRate(): void {
    if (this.canAdd()) {
      this.rateAdded.emit({
        from: this.fromCurrency(),
        to: this.toCurrency(),
        rate: this.rateValue(),
        active: this.activeValue(),
      });
      this.reset();
    }
  }

  reset(): void {
    this.fromCurrency.set('');
    this.toCurrency.set('');
    this.rateValue.set(1);
    this.activeValue.set(true);
  }

  setValues(from: string, to: string, rate: number, active: boolean = true): void {
    this.fromCurrency.set(from);
    this.toCurrency.set(to);
    this.rateValue.set(rate);
    this.activeValue.set(active);
  }
}
