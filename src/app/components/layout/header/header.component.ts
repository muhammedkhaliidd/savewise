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
      class="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-[var(--color-primary)] text-white shadow-md"
    >
      <div class="flex items-center gap-2">
        <img src="assets/icons/logo.png" alt="SaveWise" class="w-10 h-10" />
        <span class="text-xl font-bold">SaveWise</span>
      </div>

      <div class="flex items-center gap-3">
        <label class="text-sm text-white/90">Base Currency:</label>
        <p-select
          [options]="currencies()"
          [ngModel]="selectedBase()"
          optionLabel="code"
          optionValue="code"
          [filter]="true"
          filterBy="code,name"
          placeholder="Select"
          (onChange)="baseCurrencyChange.emit($event.value)"
          style="w-40"
          [style]="{ 'min-width': '10rem' }"
        >
          <ng-template let-currency pTemplate="item">
            <div class="flex items-center gap-2">
              <span class="font-semibold">{{ currency.code }}</span>
              <span class="text-[var(--color-text-muted)] text-sm truncate">{{
                currency.name
              }}</span>
            </div>
          </ng-template>
        </p-select>
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
