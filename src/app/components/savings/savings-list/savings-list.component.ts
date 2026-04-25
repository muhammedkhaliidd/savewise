import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import type { SavingsEntry } from '../../../models/savings-entry.model';
import { ExchangeRateStore } from '../../../stores/exchange-rate.store';

@Component({
  selector: 'app-savings-list',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="bg-[var(--color-surface)] rounded-[var(--radius)] shadow-sm border border-[var(--color-border)] p-4"
    >
      <h3 class="text-lg font-semibold mb-4 text-[var(--color-text)]">Savings Entries</h3>

      @if (entries().length === 0) {
        <p class="text-[var(--color-text-muted)] text-center py-4">
          No savings entries yet. Add your first entry above.
        </p>
      } @else {
        <p-table [value]="entriesWithConversion()" [tableStyle]="{ 'min-width': '30rem' }">
          <ng-template pTemplate="header">
            <tr>
              <th>Label</th>
              <th>Amount</th>
              <th>In {{ baseCurrency() }}</th>
              <th class="w-16"></th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-entry>
            <tr>
              <td>
                <span class="font-medium">{{ entry.label || '—' }}</span>
                <span class="text-xs text-[var(--color-text-muted)] block">{{
                  entry.currency
                }}</span>
              </td>
              <td>
                <span class="font-semibold">{{ entry.amount | number: '1.2-4' }}</span>
              </td>
              <td>
                <span class="font-semibold text-[var(--color-primary)]">
                  {{ entry.convertedAmount | number: '1.2-2' }}
                </span>
              </td>
              <td>
                <p-button
                  icon="pi pi-trash"
                  severity="danger"
                  [text]="true"
                  (onClick)="deleteEntry.emit(entry.id)"
                />
              </td>
            </tr>
          </ng-template>
        </p-table>
      }
    </div>
  `,
})
export class SavingsListComponent {
  entries = input.required<SavingsEntry[]>();
  baseCurrency = input.required<string>();
  exchangeStore = input.required<InstanceType<typeof ExchangeRateStore>>();
  deleteEntry = output<string>();

  entriesWithConversion = computed(() => {
    const store = this.exchangeStore();
    const getRateToBase = store.getRateToBase;
    return this.entries().map((entry) => ({
      ...entry,
      convertedAmount: entry.amount * getRateToBase()(entry.currency),
    }));
  });
}
