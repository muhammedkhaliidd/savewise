import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragHandle } from '@angular/cdk/drag-drop';
import { ButtonModule } from 'primeng/button';
import { OrderListModule } from 'primeng/orderlist';
import type { SavingsEntry } from '../../models/savings-entry.model';
import { ExchangeRateStore } from '../../../../stores/exchange-rate.store';
import { ConfirmService } from '../../../../core/services/confirm.service';

@Component({
  selector: 'app-savings-list',
  standalone: true,
  imports: [CommonModule, CdkDragHandle, ButtonModule, OrderListModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './savings-list.component.html',
  styles: [':host ::ng-deep li:last-child > div { border-bottom-width: 0; }'],
})
export class SavingsListComponent implements AfterViewInit {
  private readonly confirmService = inject(ConfirmService);

  entries = input.required<SavingsEntry[]>();
  baseCurrency = input.required<string>();
  exchangeStore = input.required<InstanceType<typeof ExchangeRateStore>>();
  deleteEntry = output<string>();
  editEntry = output<SavingsEntry>();
  reorder = output<SavingsEntry[]>();

  ngAfterViewInit(): void {
    setTimeout(() => {
      console.log({
        body: document.body.scrollHeight,
        html: document.documentElement.scrollHeight,
        viewport: window.innerHeight,
      });
    }, 1000);
  }

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
