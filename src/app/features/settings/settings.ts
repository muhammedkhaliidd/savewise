import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ExchangeRateStore } from '../../stores/exchange-rate.store';
import { CurrencyService } from '../../core/services/currency.service';
import { ThemeService } from '../../core/services/theme.service';
import { ToastService } from '../../core/services/toast.service';
import { SyncIntervalFormComponent } from '../exchange/components/sync-interval-form/sync-interval-form.component';
import type { SyncIntervalSetting } from '../exchange/models/exchange-rate.model';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ButtonModule,
    SelectModule,
    ToggleSwitchModule,
    SyncIntervalFormComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './settings.html',
})
export class Settings {
  readonly exchangeStore = inject(ExchangeRateStore);
  readonly theme = inject(ThemeService);
  private readonly currencyService = inject(CurrencyService);
  private readonly toast = inject(ToastService);

  readonly allCurrencies = computed(() => this.currencyService.getAllCurrencies());

  onBaseCurrencyChange(code: string): void {
    this.exchangeStore.setBaseCurrency(code);
    void this.runSync();
    this.toast.success('Updated', `Base currency changed to ${code}`);
  }

  onIntervalChanged(setting: SyncIntervalSetting): void {
    this.exchangeStore.setSyncInterval(setting.value, setting.unit);
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
