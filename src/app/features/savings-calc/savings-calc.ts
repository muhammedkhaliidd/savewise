import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';
import {
  SavingsCalcFormComponent,
  SavingsCalcFormValue,
} from './components/savings-calc-form/savings-calc-form.component';
import { SavingsCalcListComponent } from './components/savings-calc-list/savings-calc-list.component';
import { SavingsCalcStore } from '../../stores/savings-calc.store';
import { SavingsStore } from '../../stores/savings.store';
import { ExchangeRateStore } from '../../stores/exchange-rate.store';
import { MetalPriceStore } from '../../stores/metal-price.store';
import { ToastService } from '../../core/services/toast.service';
import { OverlayStackService } from '../../core/services/overlay-stack.service';
import type { SavingsCalcItem } from './models/savings-calc.model';

@Component({
  selector: 'app-savings-calc',
  imports: [TranslateModule, SavingsCalcFormComponent, SavingsCalcListComponent, DialogModule],
  templateUrl: './savings-calc.html',
})
export class SavingsCalc implements OnInit {
  readonly exchangeStore = inject(ExchangeRateStore);
  readonly metalStore = inject(MetalPriceStore);
  readonly savingsStore = inject(SavingsStore);
  readonly calcStore = inject(SavingsCalcStore);
  readonly overlayStack = inject(OverlayStackService);
  private readonly toast = inject(ToastService);
  private readonly translate = inject(TranslateService);

  readonly editCalcForm = viewChild<SavingsCalcFormComponent>('editCalcForm');

  readonly addCalcDialogVisible = signal(false);
  readonly editCalcDialogVisible = signal(false);

  private editingCalcId: string | null = null;

  ngOnInit(): void {
    this.exchangeStore.loadFromStorage();
    this.metalStore.loadFromStorage();
    this.savingsStore.loadFromStorage();
    this.calcStore.loadFromStorage();
  }

  onAddCalcClicked(): void {
    this.addCalcDialogVisible.set(true);
  }

  onCalcAdded(value: SavingsCalcFormValue): void {
    this.calcStore.addItem(value);
    this.addCalcDialogVisible.set(false);
    this.toast.success(
      this.translate.instant('toast.saved'),
      this.translate.instant('toast.calcAdded'),
    );
  }

  onEditCalc(item: SavingsCalcItem): void {
    this.editingCalcId = item.id;
    this.editCalcDialogVisible.set(true);
    setTimeout(() => {
      this.editCalcForm()?.setValues(item);
    }, 0);
  }

  onCalcEdited(value: SavingsCalcFormValue): void {
    if (this.editingCalcId) {
      this.calcStore.updateItem(this.editingCalcId, value);
      this.editingCalcId = null;
      this.editCalcDialogVisible.set(false);
      this.toast.success(
        this.translate.instant('toast.saved'),
        this.translate.instant('toast.calcUpdated'),
      );
    }
  }
}
