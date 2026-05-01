import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { interval, switchMap } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ExchangeRateStore } from '../../../stores/exchange-rate.store';
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
  readonly savingsStore = inject(SavingsStore);
  private readonly toast = inject(ToastService);
  private readonly destroyRef = inject(DestroyRef);
  // Eagerly instantiate ThemeService so the dark/light class is applied on bootstrap
  // (it's providedIn: 'root' so otherwise wouldn't run until /settings is visited).
  private readonly _theme = inject(ThemeService);

  syncIntervalObservable = toObservable(this.exchangeStore.syncIntervalMs);

  ngOnInit(): void {
    this.exchangeStore.loadFromStorage();
    this.savingsStore.loadFromStorage();
    this.maybeInitialSync();
    this.listenToSyncInterval();
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
