import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { OrderListModule } from 'primeng/orderlist';
import type { SavingsEntry } from '../../../models/savings-entry.model';
import { ExchangeRateStore } from '../../../stores/exchange-rate.store';
import { ConfirmService } from '../../../core/services/confirm.service';

@Component({
  selector: 'app-savings-list',
  standalone: true,
  imports: [CommonModule, ButtonModule, OrderListModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="bg-[var(--color-surface)] rounded-[var(--radius)] shadow-sm border border-[var(--color-border)] p-3 sm:p-4"
    >
      <h3 class="text-base font-semibold mb-4 text-[var(--color-text)] sm:text-lg">
        Savings Entries
      </h3>

      @if (entries().length === 0) {
        <p class="text-[var(--color-text-muted)] text-center py-4">
          No savings entries yet. Add your first entry above.
        </p>
      } @else {
        <p-orderList
          [value]="entriesWithConversion()"
          [dragdrop]="true"
          [responsive]="true"
          (onReorder)="onReorder($event)"
          dataKey="id"
          class="w-full"
        >
          <ng-template let-entry pTemplate="item">
            <div
              class="flex w-full items-center justify-between gap-3 p-2 rounded border border-[var(--color-border)] bg-white"
            >
              <div class="flex-1 min-w-0">
                <p class="truncate font-semibold text-[var(--color-text)]">
                  {{ entry.label || 'Untitled' }}
                </p>
                <p class="text-xs text-[var(--color-text-muted)]">
                  @if (entry.currency === baseCurrency()) {
                    <span class="text-[var(--color-primary)] font-semibold">
                      {{ entry.amount | number: '1.2-2' }} {{ entry.currency }}
                    </span>
                  } @else {
                    {{ entry.amount | number: '1.2-4' }} {{ entry.currency }}
                    =
                    <span class="text-[var(--color-primary)] font-semibold">
                      {{ entry.convertedAmount | number: '1.2-2' }} {{ baseCurrency() }}
                    </span>
                  }
                </p>
              </div>
              <div class="flex gap-1">
                <p-button
                  icon="pi pi-pencil"
                  severity="secondary"
                  [outlined]="true"
                  [rounded]="true"
                  size="small"
                  (onClick)="editEntry.emit(entry); $event.stopPropagation()"
                />
                <p-button
                  icon="pi pi-trash"
                  severity="danger"
                  [outlined]="true"
                  [rounded]="true"
                  size="small"
                  (onClick)="confirmDelete(entry.id); $event.stopPropagation()"
                />
              </div>
            </div>
          </ng-template>
        </p-orderList>
      }
    </div>
  `,
})
export class SavingsListComponent {
  private readonly confirmService = inject(ConfirmService);

  entries = input.required<SavingsEntry[]>();
  baseCurrency = input.required<string>();
  exchangeStore = input.required<InstanceType<typeof ExchangeRateStore>>();
  deleteEntry = output<string>();
  editEntry = output<SavingsEntry>();
  reorder = output<SavingsEntry[]>();

  entriesWithConversion = computed(() => {
    const store = this.exchangeStore();
    const getRateToBase = store.getRateToBase;
    return this.entries().map((entry) => ({
      ...entry,
      convertedAmount: entry.amount * getRateToBase()(entry.currency),
    }));
  });

  confirmDelete(id: string): void {
    this.confirmService.confirm({
      header: 'Delete Entry',
      message: 'Are you sure you want to delete this savings entry?',
      icon: 'pi pi-trash',
      actionText: 'Delete',
      actionSeverity: 'danger',
      onConfirm: () => this.deleteEntry.emit(id),
    });
  }

  onReorder(value: Array<SavingsEntry & { convertedAmount: number }>): void {
    console.log(',onReorder', value);
    this.reorder.emit(this.entriesWithConversion());
  }
}
