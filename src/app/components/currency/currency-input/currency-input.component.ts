import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-currency-input',
  standalone: true,
  imports: [CommonModule, InputNumberModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-center gap-2">
      <p-inputNumber
        [ngModel]="amountValue()"
        (onInput)="amountValue.set($event.value ?? 0)"
        (onBlur)="amountChange.emit(amountValue())"
        mode="decimal"
        [minFractionDigits]="2"
        [maxFractionDigits]="4"
        [placeholder]="placeholder()"
        [styleClass]="'w-full ' + styleClass()"
      />
      <span class="text-[var(--color-text-muted)] font-medium">{{ currencyCode() }}</span>
    </div>
  `,
})
export class CurrencyInputComponent {
  amount = input<number>(0);
  currencyCode = input.required<string>();
  placeholder = input<string>('0.00');
  styleClass = input<string>('');
  amountChange = output<number>();

  amountValue = signal(0);

  constructor() {
    effect(() => {
      this.amountValue.set(this.amount());
    });
  }
}
