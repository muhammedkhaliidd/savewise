import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import type { ExchangeRate } from '../../../models/exchange-rate.model';

@Component({
  selector: 'app-rate-list',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-[var(--color-surface)] rounded-[var(--radius)] shadow-sm border border-[var(--color-border)] p-3 sm:p-4">
      <h3 class="text-base font-semibold mb-4 text-[var(--color-text)] sm:text-lg">Configured Rates</h3>

      @if (ratesList().length === 0) {
        <p class="text-[var(--color-text-muted)] text-center py-4">
          No custom rates configured. Default rate of 1 will be used.
        </p>
      } @else {
        <div class="grid gap-3 md:hidden">
          @for (rate of ratesList(); track rate.from + '-' + rate.to) {
            <div class="rounded-lg border border-[var(--color-border)] bg-white p-3 shadow-sm">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="font-semibold text-[var(--color-text)]">{{ rate.from }} -> {{ rate.to }}</p>
                  <p class="mt-1 text-xs text-[var(--color-text-muted)]">
                    1 {{ rate.from }} = {{ rate.rate | number:'1.2-6' }} {{ rate.to }}
                  </p>
                </div>
                <p-button
                  icon="pi pi-trash"
                  severity="danger"
                  [text]="true"
                  (onClick)="deleteRate.emit(rate)"
                />
              </div>
            </div>
          }
        </div>

        <div class="hidden overflow-x-auto md:block">
          <p-table [value]="ratesList()" [tableStyle]="{ 'min-width': '28rem' }">
            <ng-template pTemplate="header">
              <tr>
                <th>From</th>
                <th>To</th>
                <th>Rate</th>
                <th class="w-16"></th>
              </tr>
            </ng-template>
            <ng-template pTemplate="body" let-rate>
              <tr>
                <td class="font-semibold">{{ rate.from }}</td>
                <td class="font-semibold">{{ rate.to }}</td>
                <td>{{ rate.rate | number:'1.2-6' }}</td>
                <td>
                  <p-button
                    icon="pi pi-trash"
                    severity="danger"
                    [text]="true"
                    (onClick)="deleteRate.emit(rate)"
                  />
                </td>
              </tr>
            </ng-template>
          </p-table>
        </div>
      }
    </div>
  `,
})
export class RateListComponent {
  rates = input.required<Record<string, number>>();
  deleteRate = output<ExchangeRate>();

  ratesList = computed(() => {
    const rates = this.rates();
    return Object.entries(rates).map(([key, rate]) => {
      const [from, to] = key.split('-');
      return { from, to, rate };
    });
  });
}
