import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CdkDragHandle } from '@angular/cdk/drag-drop';
import { ButtonModule } from 'primeng/button';
import { OrderListModule } from 'primeng/orderlist';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import type { MetalPrice } from '../../models/metal-price.model';
import { metalLabelKey } from '../../constants/metal-options';
import { ConfirmService } from '../../../../core/services/confirm.service';
import { DisplayCodePipe } from '../../../../core/pipes/display-code.pipe';

@Component({
  selector: 'app-metal-price-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    DisplayCodePipe,
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
  private readonly translate = inject(TranslateService);
  prices = input.required<MetalPrice[]>();
  baseCurrency = input.required<string>();
  deletePrice = output<MetalPrice>();
  editPrice = output<MetalPrice>();
  addPrice = output<void>();
  toggleActive = output<{ metal: MetalPrice['metal']; purityLabel: string; active: boolean }>();
  reorder = output<MetalPrice[]>();

  metalLabel(code: MetalPrice['metal']): string {
    return this.translate.instant(metalLabelKey(code));
  }

  onReorder(): void {
    this.reorder.emit(this.prices());
  }

  confirmDelete(price: MetalPrice): void {
    this.confirmService.confirm({
      header: this.translate.instant('confirm.deleteMetalPrice'),
      message: this.translate.instant('confirm.deleteMetalPriceMessage', {
        metal: this.metalLabel(price.metal),
        purity: price.purityLabel,
      }),
      icon: 'pi pi-trash',
      actionText: this.translate.instant('common.delete'),
      actionSeverity: 'danger',
      onConfirm: () => this.deletePrice.emit(price),
    });
  }
}
