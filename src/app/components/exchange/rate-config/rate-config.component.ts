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
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { CurrencySelectComponent } from '../../currency/currency-select/currency-select.component';
import { CurrencyService } from '../../../core/services/currency.service';
import type { ExchangeRate } from '../../../models/exchange-rate.model';

@Component({
  selector: 'app-rate-config',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputNumberModule, FormsModule, CurrencySelectComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="bg-[var(--color-surface)] rounded-[var(--radius)] shadow-sm border border-[var(--color-border)] p-3 sm:p-4"
    >
      @if (!editMode()) {
        <h3 class="text-base font-semibold mb-4 text-[var(--color-text)] sm:text-lg">
          Configure Exchange Rate
        </h3>
      }

      <div class="grid gap-4">
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <div>
            <label class="block text-sm font-medium text-[var(--color-text-muted)] mb-1"
              >From</label
            >
            <app-currency-select
              [currencies]="allCurrencies()"
              [selectedCode]="fromCurrency()"
              (selectionChange)="fromCurrency.set($event)"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-[var(--color-text-muted)] mb-1">To</label>
            <app-currency-select
              [currencies]="allCurrencies()"
              [selectedCode]="toCurrency()"
              (selectionChange)="toCurrency.set($event)"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-[var(--color-text-muted)] mb-1">
            Rate (1 {{ fromCurrency() || 'USD' }} = ? {{ toCurrency() || 'USD' }})
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

        <p-button
          [label]="editMode() ? 'Save' : 'Add Rate'"
          (onClick)="addRate()"
          [disabled]="!canAdd()"
          styleClass="w-full"
        />
      </div>
    </div>
  `,
})
export class RateConfigComponent {
  private readonly currencyService = inject(CurrencyService);

  existingRates = input<ExchangeRate[]>([]);
  editMode = input(false);
  rateAdded = output<ExchangeRate>();

  readonly allCurrencies = computed(() => this.currencyService.getAllCurrencies());

  fromCurrency = signal('');
  toCurrency = signal('');
  rateValue = signal(1);

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
      });
      this.reset();
    }
  }

  reset(): void {
    this.fromCurrency.set('');
    this.toCurrency.set('');
    this.rateValue.set(1);
  }

  setValues(from: string, to: string, rate: number): void {
    this.fromCurrency.set(from);
    this.toCurrency.set(to);
    this.rateValue.set(rate);
  }
}
