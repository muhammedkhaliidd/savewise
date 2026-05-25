import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ApiRateListComponent } from '../exchange/components/api-rate-list/api-rate-list.component';
import { ApiMetalPriceListComponent } from '../metals/components/api-metal-price-list/api-metal-price-list.component';
import { ToastService } from '../../core/services/toast.service';
import { ExchangeRateStore } from '../../stores/exchange-rate.store';
import { MetalPriceStore } from '../../stores/metal-price.store';

@Component({
  selector: 'app-live-rates',
  standalone: true,
  imports: [TranslateModule, ApiRateListComponent, ApiMetalPriceListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mx-auto grid grid-cols-1 w-full max-w-5xl gap-4 md:gap-6">
      <app-api-rate-list
        [rates]="exchangeStore.apiRateRows()"
        [baseCurrency]="exchangeStore.currentBase()"
        [lastSyncedAt]="exchangeStore.lastSyncedAt()"
        [isSyncing]="exchangeStore.isSyncing()"
        [syncInterval]="exchangeStore.syncInterval()"
        (sync)="onSyncFromApi()"
      />

      <!-- separator -->
      <div class="h-px w-full bg-[var(--color-border)]"></div>

      <app-api-metal-price-list
        [rows]="metalStore.apiMetalRows()"
        [baseCurrency]="exchangeStore.currentBase()"
        [lastSyncedAt]="metalStore.lastSyncedAt()"
        [isSyncing]="metalStore.isSyncing()"
        [syncInterval]="exchangeStore.syncInterval()"
        (sync)="onSyncMetalsFromApi()"
      />
    </div>
  `,
})
export class LiveRates {
  readonly exchangeStore = inject(ExchangeRateStore);
  readonly metalStore = inject(MetalPriceStore);
  private readonly toast = inject(ToastService);
  private readonly translate = inject(TranslateService);

  async onSyncFromApi(): Promise<void> {
    try {
      await this.exchangeStore.syncFromApi();
      this.toast.success(
        this.translate.instant('toast.synced'),
        this.translate.instant('toast.ratesUpdated')
      );
    } catch {
      this.toast.error(
        this.translate.instant('toast.syncFailed'),
        this.translate.instant('toast.ratesSyncFailed')
      );
    }
  }

  async onSyncMetalsFromApi(): Promise<void> {
    try {
      await this.metalStore.syncFromApi();
      this.toast.success(
        this.translate.instant('toast.synced'),
        this.translate.instant('toast.metalPricesUpdated')
      );
    } catch {
      this.toast.error(
        this.translate.instant('toast.syncFailed'),
        this.translate.instant('toast.metalSyncFailed')
      );
    }
  }
}
