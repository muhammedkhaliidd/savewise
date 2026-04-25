import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import type { Currency } from '../../../models/currency.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SelectModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header
      class="sticky top-0 z-50 bg-[var(--color-primary)] text-white shadow-md px-3 py-3 sm:px-4 sm:py-3"
    >
      <div class="mx-auto flex w-full max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex items-center gap-2">
        <img src="assets/icons/logo.png" alt="SaveWise" class="w-8 h-8 sm:w-10 sm:h-10" />
        <span class="text-lg font-bold sm:text-xl">SaveWise</span>
      </div>

      <div class="flex items-center gap-2 w-full sm:w-auto sm:gap-3">
        <label class="hidden whitespace-nowrap text-sm text-white/90 sm:inline">Base Currency:</label>
        <p-select
          [options]="currencies()"
          [ngModel]="selectedBase()"
          optionLabel="code"
          optionValue="code"
          [filter]="true"
          filterBy="code,name"
          placeholder="Select"
          (onChange)="baseCurrencyChange.emit($event.value)"
          styleClass="w-full sm:w-44"
          [panelStyle]="{
            width: 'min(22rem, calc(100vw - 1rem))',
            'max-width': 'calc(100vw - 1rem)'
          }"
          [style]="{ width: '100%' }"
        >
          <ng-template let-currency pTemplate="item">
            <div class="flex min-w-0 items-center gap-2">
              <span class="font-semibold">{{ currency.code }}</span>
              <span class="min-w-0 flex-1 truncate text-[var(--color-text-muted)] text-sm">{{
                currency.name
              }}</span>
            </div>
          </ng-template>
        </p-select>
      </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  currencies = input.required<Currency[]>();
  baseCurrency = input.required<string>();
  baseCurrencyChange = output<string>();

  selectedBase = signal('');

  constructor() {
    effect(() => {
      const base = this.baseCurrency();
      if (base) {
        this.selectedBase.set(base);
      }
    });
  }
}
