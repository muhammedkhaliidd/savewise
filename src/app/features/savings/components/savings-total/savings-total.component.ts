import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-savings-total',
  standalone: true,
  imports: [CommonModule, CardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host ::ng-deep .brand-gradient-card .p-card,
      :host ::ng-deep .brand-gradient-card.p-card {
        background: linear-gradient(
          135deg,
          var(--color-primary) 0%,
          var(--color-primary-dark) 55%,
          var(--color-accent) 100%
        );
        color: #fff;
        border: none;
      }
    `,
  ],
  template: `
    <p-card class="brand-gradient-card !text-white">
      <div class="text-center p-3 sm:p-4 md:p-6">
        <p class="flex items-center justify-center gap-2 text-sm mb-1 text-white">
          <i class="pi pi-money-bill"></i>
          Total Savings
        </p>
        <p class="text-2xl font-bold sm:text-3xl md:text-4xl">
          {{ total() | number : '1.2-2' }} {{ baseCurrency() }}
        </p>
        <p class="text-white/70 text-[11px] mt-2 sm:text-xs">
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
