import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { interval, switchMap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { App as CapApp } from '@capacitor/app';
import { Capacitor, type PluginListenerHandle } from '@capacitor/core';
import { DrawerModule } from 'primeng/drawer';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { ExchangeRateStore } from '../../../stores/exchange-rate.store';
import { MetalPriceStore } from '../../../stores/metal-price.store';
import { SavingsStore } from '../../../stores/savings.store';
import { ToastService } from '../../../core/services/toast.service';
import { ThemeService } from '../../../core/services/theme.service';
import { NavigationService } from '../../../core/services/navigation.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HeaderComponent,
    FooterComponent,
    SideNavComponent,
    DrawerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./app-layout.component.scss'],
  templateUrl: './app-layout.component.html',
})
export class AppLayoutComponent implements OnInit, OnDestroy {
  readonly exchangeStore = inject(ExchangeRateStore);
  readonly metalStore = inject(MetalPriceStore);
  readonly savingsStore = inject(SavingsStore);
  private readonly toast = inject(ToastService);
  private readonly translate = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly nav = inject(NavigationService);

  readonly drawerVisible = signal(false);
  syncIntervalObservable = toObservable(this.exchangeStore.syncIntervalMs);

  private backHandle?: PluginListenerHandle;

  constructor() {
    inject(ThemeService);
  }

  ngOnInit(): void {
    this.exchangeStore.loadFromStorage();
    this.metalStore.loadFromStorage();
    this.savingsStore.loadFromStorage();
    this.maybeInitialSync();
    this.listenToSyncInterval();

    if (Capacitor.getPlatform() === 'android') {
      void this.registerBackButton();
    }
  }

  ngOnDestroy(): void {
    this.backHandle?.remove().catch(() => {
      // Ignore: plugin may already be torn down.
    });
  }

  private async registerBackButton(): Promise<void> {
    this.backHandle = await CapApp.addListener('backButton', () => {
      void this.nav.goBack({ allowExit: true });
    });
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
      this.toast.error(
        this.translate.instant('toast.syncFailed'),
        this.translate.instant('toast.ratesSyncFailed')
      );
    }
    if (meRes.status === 'rejected') {
      this.toast.error(
        this.translate.instant('toast.syncFailed'),
        this.translate.instant('toast.metalSyncFailed')
      );
    }
  }
}
