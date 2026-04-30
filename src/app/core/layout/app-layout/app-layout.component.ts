import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { interval, switchMap } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ExchangeRateStore } from '../../../stores/exchange-rate.store';
import { SavingsStore } from '../../../stores/savings.store';
import { CurrencyService } from '../../../core/services/currency.service';
import { ToastService } from '../../../core/services/toast.service';
import { SyncIntervalFormComponent } from '../../../features/exchange/components/sync-interval-form/sync-interval-form.component';
import type { SyncIntervalSetting } from '../../../features/exchange/models/exchange-rate.model';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    HeaderComponent,
    FooterComponent,
    SyncIntervalFormComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="flex flex-col h-screen overflow-hidden">
      <app-header
        [currencies]="allCurrencies()"
        [baseCurrency]="exchangeStore.currentBase()"
        (baseCurrencyChange)="exchangeStore.setBaseCurrency($event)"
      />

      <section class="flex-1 min-h-0 overflow-auto flex flex-col gap-1 space-between">
        <main class="p-3 sm:p-4 md:p-6 lg:p-8 ">
          <ng-content></ng-content>
        </main>
        <app-footer
          [lastInputDate]="savingsStore.lastInputDate()"
          [syncInterval]="exchangeStore.syncInterval()"
          (editInterval)="editIntervalDialogVisible.set(true)"
        />
      </section>
    </article>

    <p-dialog
      [(visible)]="editIntervalDialogVisible"
      [modal]="true"
      header="Sync Interval"
      [style]="{ width: '90vw', maxWidth: '24rem' }"
    >
      <app-sync-interval-form
        [initial]="exchangeStore.syncInterval()"
        (intervalChanged)="onIntervalChanged($event)"
      />
    </p-dialog>
  `,
})
export class AppLayoutComponent implements OnInit {
  readonly exchangeStore = inject(ExchangeRateStore);
  readonly savingsStore = inject(SavingsStore);
  private readonly currencyService = inject(CurrencyService);
  private readonly toast = inject(ToastService);
  private readonly destroyRef = inject(DestroyRef);

  readonly allCurrencies = computed(() => this.currencyService.getAllCurrencies());
  readonly editIntervalDialogVisible = signal(false);
  syncIntervalObservable = toObservable(this.exchangeStore.syncIntervalMs);

  constructor() {}

  ngOnInit(): void {
    this.exchangeStore.loadFromStorage();
    this.savingsStore.loadFromStorage();
    this.maybeInitialSync();
    this.listenToSyncInterval();
  }

  onIntervalChanged(setting: SyncIntervalSetting): void {
    this.exchangeStore.setSyncInterval(setting.value, setting.unit);
    this.editIntervalDialogVisible.set(false);
    this.toast.success('Updated', 'Sync interval changed');
  }

  private listenToSyncInterval(): void {
    this.syncIntervalObservable
      .pipe(
        switchMap((ms) => interval(ms)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => void this.runSync());
  }

  private maybeInitialSync(): void {
    const last = this.exchangeStore.lastSyncedAt();
    const intervalMs = this.exchangeStore.syncIntervalMs();
    if (last === null || Date.now() - last >= intervalMs) {
      void this.runSync();
    }
  }

  private async runSync(): Promise<void> {
    try {
      await this.exchangeStore.syncFromApi();
    } catch {
      this.toast.error('Sync failed', 'Could not fetch live exchange rates');
    }
  }
}
