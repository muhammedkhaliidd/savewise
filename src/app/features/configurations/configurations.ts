import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RateConfigComponent } from '../exchange/components/rate-config/rate-config.component';
import { RateListComponent } from '../exchange/components/rate-list/rate-list.component';
import { MetalPriceConfigComponent } from '../metals/components/metal-price-config/metal-price-config.component';
import { MetalPriceListComponent } from '../metals/components/metal-price-list/metal-price-list.component';
import { DialogModule } from 'primeng/dialog';
import { ExchangeRateStore } from '../../stores/exchange-rate.store';
import { MetalPriceStore } from '../../stores/metal-price.store';
import { ToastService } from '../../core/services/toast.service';
import { OverlayStackService } from '../../core/services/overlay-stack.service';
import { ExchangeRate } from '../exchange/models/exchange-rate.model';
import type { MetalCode, MetalPrice } from '../metals/models/metal-price.model';

@Component({
  selector: 'app-configurations',
  standalone: true,
  imports: [
    TranslateModule,
    RateConfigComponent,
    RateListComponent,
    MetalPriceConfigComponent,
    MetalPriceListComponent,
    DialogModule,
  ],
  templateUrl: './configurations.html',
})
export class Configurations implements OnInit {
  readonly exchangeStore = inject(ExchangeRateStore);
  readonly metalStore = inject(MetalPriceStore);
  readonly overlayStack = inject(OverlayStackService);
  private readonly toast = inject(ToastService);
  private readonly translate = inject(TranslateService);

  readonly editRateForm = viewChild<RateConfigComponent>('editRateForm');
  readonly editMetalPriceForm = viewChild<MetalPriceConfigComponent>('editMetalPriceForm');

  readonly editRateDialogVisible = signal(false);
  readonly editMetalPriceDialogVisible = signal(false);
  readonly addRateDialogVisible = signal(false);
  readonly addMetalPriceDialogVisible = signal(false);

  private editingRateOriginal: { from: string; to: string } | null = null;
  private editingMetalPriceOriginal: { metal: MetalCode; purityLabel: string } | null = null;

  ngOnInit(): void {
    this.exchangeStore.loadFromStorage();
    this.metalStore.loadFromStorage();
  }

  onAddRateClicked(): void {
    this.addRateDialogVisible.set(true);
  }

  onAddMetalPriceClicked(): void {
    this.addMetalPriceDialogVisible.set(true);
  }

  onRateAddedFromDialog(event: { from: string; to: string; rate: number }): void {
    this.exchangeStore.setRate(event.from, event.to, event.rate);
    this.addRateDialogVisible.set(false);
    this.toast.success(
      this.translate.instant('toast.saved'),
      this.translate.instant('toast.rateAdded'),
    );
  }

  onMetalPriceAddedFromDialog(price: MetalPrice): void {
    this.metalStore.setPrice(price);
    this.addMetalPriceDialogVisible.set(false);
    this.toast.success(
      this.translate.instant('toast.saved'),
      this.translate.instant('toast.metalPriceAdded'),
    );
  }

  onToggleRateActive(event: { from: string; to: string; active: boolean }): void {
    this.exchangeStore.setRateActive(event.from, event.to, event.active);
  }

  onToggleMetalPriceActive(event: { metal: MetalCode; purityLabel: string; active: boolean }): void {
    this.metalStore.setPriceActive(event.metal, event.purityLabel, event.active);
  }

  onRateDeleted(event: { from: string; to: string }): void {
    this.exchangeStore.deleteRate(event.from, event.to);
  }

  onMetalPriceDeleted(price: MetalPrice): void {
    this.metalStore.deletePrice(price.metal, price.purityLabel);
  }

  onEditRate(rate: ExchangeRate): void {
    this.editingRateOriginal = { from: rate.from, to: rate.to };
    this.editRateDialogVisible.set(true);
    setTimeout(() => {
      const form = this.editRateForm();
      if (form) {
        form.setValues(rate.from, rate.to, rate.rate, rate.active !== false);
      }
    }, 0);
  }

  onSaveRateEdit(rate: ExchangeRate): void {
    if (this.editingRateOriginal) {
      this.exchangeStore.updateRate(
        this.editingRateOriginal.from,
        this.editingRateOriginal.to,
        rate.from,
        rate.to,
        rate.rate,
        rate.active,
      );
      this.editingRateOriginal = null;
      this.editRateDialogVisible.set(false);
      this.toast.success(
        this.translate.instant('toast.saved'),
        this.translate.instant('toast.rateUpdated'),
      );
    }
  }

  onEditMetalPrice(price: MetalPrice): void {
    this.editingMetalPriceOriginal = { metal: price.metal, purityLabel: price.purityLabel };
    this.editMetalPriceDialogVisible.set(true);
    setTimeout(() => {
      this.editMetalPriceForm()?.setValues(
        price.metal,
        price.purityLabel,
        price.pricePerGram,
        price.active !== false,
      );
    }, 0);
  }

  onSaveMetalPriceEdit(price: MetalPrice): void {
    if (this.editingMetalPriceOriginal) {
      this.metalStore.updatePrice(
        this.editingMetalPriceOriginal.metal,
        this.editingMetalPriceOriginal.purityLabel,
        price,
      );
      this.editingMetalPriceOriginal = null;
      this.editMetalPriceDialogVisible.set(false);
      this.toast.success(
        this.translate.instant('toast.saved'),
        this.translate.instant('toast.metalPriceUpdated'),
      );
    }
  }
}
