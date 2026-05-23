import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CdkDragHandle } from '@angular/cdk/drag-drop';
import { ButtonModule } from 'primeng/button';
import { OrderListModule } from 'primeng/orderlist';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import type { ExchangeRate } from '../../models/exchange-rate.model';
import { ConfirmService } from '../../../../core/services/confirm.service';

@Component({
  selector: 'app-rate-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    CdkDragHandle,
    ButtonModule,
    OrderListModule,
    ToggleSwitchModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './rate-list.component.html',
  styles: [':host ::ng-deep li:last-child > div { border-bottom-width: 0; }'],
})
export class RateListComponent {
  private readonly confirmService = inject(ConfirmService);
  private readonly translate = inject(TranslateService);

  rates = input.required<ExchangeRate[]>();
  deleteRate = output<ExchangeRate>();
  editRate = output<ExchangeRate>();
  addRate = output<void>();
  toggleActive = output<{ from: string; to: string; active: boolean }>();
  reorder = output<ExchangeRate[]>();

  onReorder(_value: ExchangeRate[]): void {
    this.reorder.emit(this.rates());
  }

  confirmDelete(rate: ExchangeRate): void {
    this.confirmService.confirm({
      header: this.translate.instant('confirm.deleteRate'),
      message: this.translate.instant('confirm.deleteRateMessage', {
        from: rate.from,
        to: rate.to,
      }),
      icon: 'pi pi-trash',
      actionText: this.translate.instant('common.delete'),
      actionSeverity: 'danger',
      onConfirm: () => this.deleteRate.emit(rate),
    });
  }
}
