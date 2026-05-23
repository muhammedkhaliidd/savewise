import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { interval, switchMap } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ExchangeRateStore } from '../../../stores/exchange-rate.store';
import { MetalPriceStore } from '../../../stores/metal-price.store';
import { SavingsStore } from '../../../stores/savings.store';
import { ToastService } from '../../../core/services/toast.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="flex flex-col h-screen overflow-hidden">
      <app-header [baseCurrency]="exchangeStore.currentBase()" />

      <section class="flex-1 min-h-0 overflow-auto flex flex-col gap-1 justify-between">
        <main class="p-3 sm:p-4 md:p-6 lg:p-8 ">
          <ng-content></ng-content>
        </main>
        <app-footer [lastInputDate]="savingsStore.lastInputDate()" />
      </section>
    </article>
  `,
})
export class AppLayoutComponent implements OnInit {
  readonly exchangeStore = inject(ExchangeRateStore);
  readonly metalStore = inject(MetalPriceStore);
  readonly savingsStore = inject(SavingsStore);
  private readonly toast = inject(ToastService);
  private readonly destroyRef = inject(DestroyRef);

  syncIntervalObservable = toObservable(this.exchangeStore.syncIntervalMs);

  constructor() {
    // Eagerly instantiate so the dark class is applied on bootstrap regardless of route.
    inject(ThemeService);
  }

  ngOnInit(): void {
    this.exchangeStore.loadFromStorage();
    this.metalStore.loadFromStorage();
    this.savingsStore.loadFromStorage();
    this.maybeInitialSync();
    this.listenToSyncInterval();
  }

  private listenToSyncInterval(): void {
    this.syncIntervalObservable
      .pipe(
        switchMap((ms) => interval(ms)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => void this.runSync());
  }

  private maybeInitialSync(): void {
    const intervalMs = this.exchangeStore.syncIntervalMs();
    const lastEx = this.exchangeStore.lastSyncedAt();
    const lastMe = this.metalStore.lastSyncedAt();
    const stale = (t: number | null) => t === null || Date.now() - t >= intervalMs;
    if (stale(lastEx) || stale(lastMe)) {
      void this.runSync();
    }
  }

  private async runSync(): Promise<void> {
    const [exRes, meRes] = await Promise.allSettled([
      this.exchangeStore.syncFromApi(),
      this.metalStore.syncFromApi(),
    ]);
    if (exRes.status === 'rejected') {
      this.toast.error('Sync failed', 'Could not fetch live exchange rates');
    }
    if (meRes.status === 'rejected') {
      this.toast.error('Sync failed', 'Could not fetch live metal prices');
    }
  }
}
