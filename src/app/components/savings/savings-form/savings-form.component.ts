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
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { CurrencySelectComponent } from '../../currency/currency-select/currency-select.component';
import { CurrencyService } from '../../../core/services/currency.service';
import type { SavingsEntry } from '../../../models/savings-entry.model';

@Component({
  selector: 'app-savings-form',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    FormsModule,
    CurrencySelectComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="bg-[var(--color-surface)] rounded-[var(--radius)] shadow-sm border border-[var(--color-border)] p-4"
    >
      <h3 class="text-lg font-semibold mb-4 text-[var(--color-text)]">Add Savings</h3>

      <div class="grid gap-4">
        <div>
          <label class="block text-sm font-medium text-[var(--color-text-muted)] mb-1"
            >Label (optional)</label
          >
          <input
            pInputText
            [(ngModel)]="labelValue"
            placeholder="e.g., Emergency fund"
            class="w-full"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-[var(--color-text-muted)] mb-1"
              >Currency</label
            >
            <app-currency-select
              [currencies]="allCurrencies()"
              [selectedCode]="currency()"
              (selectionChange)="currency.set($event)"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-[var(--color-text-muted)] mb-1"
              >Amount</label
            >
            <p-inputNumber
              [(ngModel)]="amountValue"
              mode="decimal"
              [minFractionDigits]="2"
              [maxFractionDigits]="4"
              placeholder="0.00"
              styleClass="w-full"
            />
          </div>
        </div>

        <p-button
          label="Add Savings"
          (onClick)="addEntry()"
          [disabled]="!canAdd()"
          styleClass="w-full"
        />
      </div>
    </div>
  `,
})
export class SavingsFormComponent {
  private readonly currencyService = inject(CurrencyService);

  baseCurrency = input.required<string>();
  entryAdded = output<Omit<SavingsEntry, 'id'>>();

  readonly allCurrencies = computed(() => this.currencyService.getAllCurrencies());

  labelValue = signal('');
  currency = signal('');
  amountValue = signal(0);

  constructor() {
    effect(() => {
      const base = this.baseCurrency();
      if (base && !this.currency()) {
        this.currency.set(base);
      }
    });
  }

  canAdd = computed(() => {
    const curr = this.currency();
    const amount = this.amountValue();
    return curr && amount > 0;
  });

  addEntry(): void {
    if (this.canAdd()) {
      this.entryAdded.emit({
        label: this.labelValue() || undefined,
        currency: this.currency(),
        amount: this.amountValue(),
      });
      this.reset();
    }
  }

  reset(): void {
    this.labelValue.set('');
    this.currency.set(this.baseCurrency());
    this.amountValue.set(0);
  }
}
