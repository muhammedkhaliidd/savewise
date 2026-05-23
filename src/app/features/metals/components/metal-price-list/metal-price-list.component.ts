import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDragHandle } from '@angular/cdk/drag-drop';
import { ButtonModule } from 'primeng/button';
import { OrderListModule } from 'primeng/orderlist';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import type { MetalPrice } from '../../models/metal-price.model';
import { metalLabel } from '../../constants/metal-options';
import { ConfirmService } from '../../../../core/services/confirm.service';

@Component({
  selector: 'app-metal-price-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CdkDragHandle,
    ButtonModule,
    OrderListModule,
    ToggleSwitchModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './metal-price-list.component.html',
  styles: [':host ::ng-deep li:last-child > div { border-bottom-width: 0; }'],
})
export class MetalPriceListComponent {
  private readonly confirmService = inject(ConfirmService);

  prices = input.required<MetalPrice[]>();
  baseCurrency = input.required<string>();
  deletePrice = output<MetalPrice>();
  editPrice = output<MetalPrice>();
  addPrice = output<void>();
  toggleActive = output<{ metal: MetalPrice['metal']; purityLabel: string; active: boolean }>();
  reorder = output<MetalPrice[]>();

  metalLabel = metalLabel;

  onReorder(): void {
    this.reorder.emit(this.prices());
  }

  confirmDelete(price: MetalPrice): void {
    this.confirmService.confirm({
      header: 'Delete Metal Price',
      message: `Are you sure you want to delete ${metalLabel(price.metal)} · ${price.purityLabel}?`,
      icon: 'pi pi-trash',
      actionText: 'Delete',
      actionSeverity: 'danger',
      onConfirm: () => this.deletePrice.emit(price),
    });
  }
}
