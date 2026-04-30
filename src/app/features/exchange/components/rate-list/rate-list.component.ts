import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragHandle } from '@angular/cdk/drag-drop';
import { ButtonModule } from 'primeng/button';
import { OrderListModule } from 'primeng/orderlist';
import type { ExchangeRate } from '../../models/exchange-rate.model';
import { ConfirmService } from '../../../../core/services/confirm.service';

@Component({
  selector: 'app-rate-list',
  standalone: true,
  imports: [CommonModule, CdkDragHandle, ButtonModule, OrderListModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './rate-list.component.html',
  styles: [':host ::ng-deep li:last-child > div { border-bottom-width: 0; }'],
})
export class RateListComponent {
  private readonly confirmService = inject(ConfirmService);

  rates = input.required<ExchangeRate[]>();
  deleteRate = output<ExchangeRate>();
  editRate = output<ExchangeRate>();
  reorder = output<ExchangeRate[]>();

  onReorder(_value: ExchangeRate[]): void {
    this.reorder.emit(this.rates());
  }

  confirmDelete(rate: ExchangeRate): void {
    this.confirmService.confirm({
      header: 'Delete Custom Rate',
      message: `Are you sure you want to delete the custom rate ${rate.from} → ${rate.to}?`,
      icon: 'pi pi-trash',
      actionText: 'Delete',
      actionSeverity: 'danger',
      onConfirm: () => this.deleteRate.emit(rate),
    });
  }
}
