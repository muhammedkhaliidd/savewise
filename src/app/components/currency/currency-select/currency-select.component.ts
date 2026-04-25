import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import type { Currency } from '../../../models/currency.model';

@Component({
  selector: 'app-currency-select',
  standalone: true,
  imports: [CommonModule, SelectModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p-select
      [options]="currencies()"
      [ngModel]="selectedValue()"
      optionLabel="code"
      optionValue="code"
      [filter]="true"
      filterBy="code,name"
      [placeholder]="placeholder()"
      (onChange)="selectionChange.emit($event.value)"
      [styleClass]="styleClass()"
      [panelStyle]="{
        width: 'min(22rem, calc(100vw - 1rem))',
        'max-width': 'calc(100vw - 1rem)'
      }"
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
  `,
})
export class CurrencySelectComponent {
  currencies = input.required<Currency[]>();
  selectedCode = input<string>('');
  placeholder = input<string>('Select currency');
  styleClass = input<string>('w-full');
  selectionChange = output<string>();

  selectedValue = signal('');

  constructor() {
    effect(() => {
      const code = this.selectedCode();
      if (code) {
        this.selectedValue.set(code);
      }
    });
  }
}
