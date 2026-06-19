import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CdkDragHandle } from '@angular/cdk/drag-drop';
import { ButtonModule } from 'primeng/button';
import { OrderListModule } from 'primeng/orderlist';
import { ConfirmService } from '../../../../core/services/confirm.service';
import { DisplayCodePipe } from '../../../../core/pipes/display-code.pipe';
import type { CalcItemView } from '../../../../stores/savings-calc.store';
import type { SavingsCalcItem } from '../../models/savings-calc.model';

@Component({
  selector: 'app-savings-calc-list',
  imports: [
    CommonModule,
    TranslateModule,
    DisplayCodePipe,
    CdkDragHandle,
    ButtonModule,
    OrderListModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './savings-calc-list.component.html',
  styles: [':host ::ng-deep li:last-child > div { border-bottom-width: 0; }'],
})
export class SavingsCalcListComponent {
  private readonly confirmService = inject(ConfirmService);
  private readonly translate = inject(TranslateService);
  private readonly langTick = toSignal(this.translate.onLangChange, { initialValue: null });

  items = input.required<CalcItemView[]>();
  baseCurrency = input.required<string>();
  addItem = output<void>();
  editItem = output<SavingsCalcItem>();
  deleteItem = output<string>();
  reorder = output<SavingsCalcItem[]>();

  itemsView = computed(() => {
    this.langTick();
    return [...this.items()];
  });

  confirmDelete(id: string): void {
    this.confirmService.confirm({
      header: this.translate.instant('savingsCalc.confirmDelete'),
      message: this.translate.instant('savingsCalc.confirmDeleteMessage'),
      icon: 'pi pi-trash',
      actionText: this.translate.instant('common.delete'),
      actionSeverity: 'danger',
      onConfirm: () => this.deleteItem.emit(id),
    });
  }

  onReorder(): void {
    this.reorder.emit(this.itemsView().map((v) => v.item));
  }
}
