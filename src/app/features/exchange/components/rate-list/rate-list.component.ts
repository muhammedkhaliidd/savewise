import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { OrderListModule } from 'primeng/orderlist';
import type { ExchangeRate } from '../../models/exchange-rate.model';

@Component({
  selector: 'app-rate-list',
  standalone: true,
  imports: [CommonModule, ButtonModule, OrderListModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="bg-[var(--color-surface)] rounded-[var(--radius)] shadow-sm border border-[var(--color-border)] p-3 sm:p-4"
    >
      <h3 class="text-base font-semibold mb-4 text-[var(--color-text)] sm:text-lg">
        Configured Rates
      </h3>

      @if (rates().length === 0) {
        <p class="text-[var(--color-text-muted)] text-center py-4">
          No custom rates configured. Default rate of 1 will be used.
        </p>
      } @else {
        <p-orderList
          [value]="rates()"
          [dragdrop]="true"
          (onReorder)="onReorder($event)"
          class="w-full"
          scrollHeight="190px"
          breakpoint="575px"
        >
          <ng-template let-rate pTemplate="item">
            <div
              class="flex w-full items-center justify-between gap-3 p-2 rounded border border-[var(--color-border)] bg-white"
            >
              <div class="flex-1 min-w-0">
                <p class="font-semibold text-[var(--color-text)]">
                  {{ rate.from }} → {{ rate.to }}
                </p>
                <p class="text-xs text-[var(--color-text-muted)]">
                  1 {{ rate.from }} = {{ rate.rate | number: '1.2-6' }} {{ rate.to }}
                </p>
              </div>
              <div class="flex gap-1">
                <p-button
                  icon="pi pi-pencil"
                  severity="secondary"
                  [outlined]="true"
                  [rounded]="true"
                  (onClick)="editRate.emit(rate); $event.stopPropagation()"
                />
                <p-button
                  icon="pi pi-trash"
                  severity="danger"
                  [outlined]="true"
                  [rounded]="true"
                  (onClick)="deleteRate.emit(rate); $event.stopPropagation()"
                />
              </div>
            </div>
          </ng-template>
        </p-orderList>
      }
    </div>
  `,
})
export class RateListComponent {
  rates = input.required<ExchangeRate[]>();
  deleteRate = output<ExchangeRate>();
  editRate = output<ExchangeRate>();
  reorder = output<ExchangeRate[]>();

  onReorder(_value: ExchangeRate[]): void {
    this.reorder.emit(this.rates());
  }
}
