import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ExchangeRateStore } from '../../stores/exchange-rate.store';
import { MetalPriceStore } from '../../stores/metal-price.store';
import { CurrencyService } from '../../core/services/currency.service';
import { ThemeService } from '../../core/services/theme.service';
import { ToastService } from '../../core/services/toast.service';
import { OverlayStackService } from '../../core/services/overlay-stack.service';
import { SyncIntervalFormComponent } from '../exchange/components/sync-interval-form/sync-interval-form.component';
import type {
  SyncIntervalSetting,
  SyncIntervalUnit,
} from '../exchange/models/exchange-rate.model';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    SelectModule,
    ToggleSwitchModule,
    SyncIntervalFormComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './settings.html',
})
export class Settings {
  readonly exchangeStore = inject(ExchangeRateStore);
  readonly metalStore = inject(MetalPriceStore);
  readonly theme = inject(ThemeService);
  readonly overlayStack = inject(OverlayStackService);
  private readonly currencyService = inject(CurrencyService);
  private readonly toast = inject(ToastService);

  readonly allCurrencies = computed(() => this.currencyService.getAllCurrencies());

  readonly syncIntervalDialogVisible = signal(false);

  readonly syncIntervalLabel = computed(() => {
    const { value, unit } = this.exchangeStore.syncInterval();
    const unitLabel: Record<SyncIntervalUnit, [string, string]> = {
      minutes: ['minute', 'minutes'],
      hours: ['hour', 'hours'],
    };
    const [singular, plural] = unitLabel[unit];
    return `Every ${value} ${value === 1 ? singular : plural}`;
  });

  openSyncIntervalDialog(): void {
    this.syncIntervalDialogVisible.set(true);
  }

  onBaseCurrencyChange(code: string): void {
    if (code === this.exchangeStore.currentBase()) return;
    const hadCustomMetals = this.metalStore.allCustomPrices().length > 0;
    this.exchangeStore.setBaseCurrency(code);
    if (hadCustomMetals) {
      this.metalStore.clearCustomPrices();
      this.toast.warn(
        'Custom metal prices cleared',
        'Their values were tied to the previous base currency.',
      );
    }
    void this.runSync();
    this.toast.success('Updated', `Base currency changed to ${code}`);
  }

  onIntervalChanged(setting: SyncIntervalSetting): void {
    this.exchangeStore.setSyncInterval(setting.value, setting.unit);
    this.syncIntervalDialogVisible.set(false);
    this.toast.success('Updated', 'Sync interval changed');
  }

  private async runSync(): Promise<void> {
    try {
      await this.exchangeStore.syncFromApi();
    } catch {
      this.toast.error('Sync failed', 'Could not fetch live exchange rates');
    }
  }
}
