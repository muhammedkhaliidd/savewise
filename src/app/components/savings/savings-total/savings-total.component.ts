import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-savings-total',
  standalone: true,
  imports: [CommonModule, CardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p-card
      class="!bg-gradient-to-br !from-[var(--color-primary)] !to-[var(--color-primary-dark)] !text-white"
    >
      <div class="text-center">
        <p class="text-sm mb-1 text-white">Total Savings</p>
        <p class="text-3xl font-bold">{{ total() | number: '1.2-2' }} {{ baseCurrency() }}</p>
        <p class="text-white/60 text-xs mt-2">
          Across {{ entryCount() }} {{ entryCount() === 1 ? 'entry' : 'entries' }}
        </p>
      </div>
    </p-card>
  `,
})
export class SavingsTotalComponent {
  total = input.required<number>();
  entryCount = input.required<number>();
  baseCurrency = input.required<string>();
}
