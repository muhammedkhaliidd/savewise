import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragHandle } from '@angular/cdk/drag-drop';
import { ButtonModule } from 'primeng/button';
import { OrderListModule } from 'primeng/orderlist';
import type { ExchangeRate } from '../../models/exchange-rate.model';

@Component({
  selector: 'app-rate-list',
  standalone: true,
  imports: [CommonModule, CdkDragHandle, ButtonModule, OrderListModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './rate-list.component.html',
  styles: [':host ::ng-deep li:last-child > div { border-bottom-width: 0; }'],
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
