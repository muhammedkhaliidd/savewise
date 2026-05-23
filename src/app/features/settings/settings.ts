import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ExchangeRateStore } from '../../stores/exchange-rate.store';
import { MetalPriceStore } from '../../stores/metal-price.store';
import { CurrencyService } from '../../core/services/currency.service';
import { ThemeService } from '../../core/services/theme.service';
import { ToastService } from '../../core/services/toast.service';
import { OverlayStackService } from '../../core/services/overlay-stack.service';
import { LOCALE_FLAG_SRC } from '../../core/constants/locale-flags';
import { LocaleService, type AppLocale } from '../../core/services/locale.service';
import { CurrencySelectComponent } from '../currency/components/currency-select/currency-select.component';
import { SyncIntervalFormComponent } from '../exchange/components/sync-interval-form/sync-interval-form.component';
import type { SyncIntervalSetting } from '../exchange/models/exchange-rate.model';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ButtonModule,
    DialogModule,
    SelectButtonModule,
    ToggleSwitchModule,
    CurrencySelectComponent,
    SyncIntervalFormComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './settings.html',
})
export class Settings {
  readonly exchangeStore = inject(ExchangeRateStore);
  readonly metalStore = inject(MetalPriceStore);
  readonly theme = inject(ThemeService);
  readonly localeService = inject(LocaleService);
  readonly overlayStack = inject(OverlayStackService);
  private readonly currencyService = inject(CurrencyService);
  private readonly toast = inject(ToastService);
  private readonly translate = inject(TranslateService);

  private readonly langTick = toSignal(this.translate.onLangChange, { initialValue: null });

  readonly allCurrencies = computed(() => this.currencyService.getAllCurrencies());

  readonly syncIntervalDialogVisible = signal(false);

  readonly languageOptions = computed(() => {
    this.langTick();
    return this.localeService.languageOptions.map((o) => ({
      code: o.code,
      label: this.translate.instant(o.labelKey),
      flagSrc: LOCALE_FLAG_SRC[o.code],
    }));
  });

  readonly syncIntervalLabel = computed(() => {
    this.langTick();
    const { value, unit } = this.exchangeStore.syncInterval();
    const unitKey =
      unit === 'minutes'
        ? value === 1
          ? 'common.minute'
          : 'common.minutes'
        : value === 1
        ? 'common.hour'
        : 'common.hours';
    return this.translate.instant('settings.syncEvery', {
      value,
      unit: this.translate.instant(unitKey),
    });
  });

  onLanguageChange(code: AppLocale): void {
    void this.localeService.setLocale(code);
  }

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
        this.translate.instant('toast.metalsCleared'),
        this.translate.instant('toast.metalsClearedDetail')
      );
    }
    void this.runSync();
    this.toast.success(
      this.translate.instant('toast.updated'),
      this.translate.instant('toast.baseCurrencyChanged', { code })
    );
  }

  onIntervalChanged(setting: SyncIntervalSetting): void {
    this.exchangeStore.setSyncInterval(setting.value, setting.unit);
    this.syncIntervalDialogVisible.set(false);
    this.toast.success(
      this.translate.instant('toast.updated'),
      this.translate.instant('toast.syncIntervalChanged')
    );
  }

  private async runSync(): Promise<void> {
    try {
      await this.exchangeStore.syncFromApi();
    } catch {
      this.toast.error(
        this.translate.instant('toast.syncFailed'),
        this.translate.instant('toast.ratesSyncFailed')
      );
    }
  }
}
