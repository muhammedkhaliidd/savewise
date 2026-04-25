import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
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
      class="bg-[var(--color-surface)] rounded-[var(--radius)] shadow-sm border border-[var(--color-border)] p-3 sm:p-4"
    >
      <h3 class="text-base font-semibold mb-4 text-[var(--color-text)] sm:text-lg">Savings Entries</h3>

      @if (entries().length === 0) {
        <p class="text-[var(--color-text-muted)] text-center py-4">
          No savings entries yet. Add your first entry above.
        </p>
      } @else {
        <div class="grid gap-3 md:hidden">
          @for (entry of entriesWithConversion(); track entry.id) {
            <div class="rounded-lg border border-[var(--color-border)] bg-white p-3 shadow-sm">
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <p class="truncate font-semibold text-[var(--color-text)]">{{ entry.label || 'Untitled' }}</p>
                  <p class="mt-1 text-xs text-[var(--color-text-muted)]">{{ entry.currency }}</p>
                </div>
                <p-button
                  icon="pi pi-trash"
                  severity="danger"
                  [text]="true"
                  (onClick)="deleteEntry.emit(entry.id)"
                />
              </div>
              <div class="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p class="text-[var(--color-text-muted)]">Amount</p>
                  <p class="font-semibold">{{ entry.amount | number: '1.2-4' }}</p>
                </div>
                <div>
                  <p class="text-[var(--color-text-muted)]">In {{ baseCurrency() }}</p>
                  <p class="font-semibold text-[var(--color-primary)]">
                    {{ entry.convertedAmount | number: '1.2-2' }}
                  </p>
                </div>
              </div>
            </div>
          }
        </div>

        <div class="hidden overflow-x-auto md:block">
          <p-table [value]="entriesWithConversion()" [tableStyle]="{ 'min-width': '40rem' }">
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
        </div>
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
