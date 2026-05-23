import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { NavigationService } from '../../../core/services/navigation.service';

const ROOT_PATHS = new Set(['/', '/dashboard']);

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header
      class="sticky top-0 z-50 bg-[var(--color-surface)] text-[var(--color-text)] border-b border-[var(--color-primary)]/25 shadow-sm px-3 py-3 sm:px-4 sm:py-3"
    >
      <div class="mx-auto flex w-full max-w-5xl items-center justify-between gap-3">
        <div class="flex items-center gap-2 min-w-0">
          @if (showBack()) {
          <p-button
            icon="pi pi-arrow-left"
            severity="secondary"
            [text]="true"
            [rounded]="true"
            size="small"
            [ariaLabel]="'nav.back' | translate"
            (onClick)="onBack()"
          />
          }
          <a routerLink="/dashboard" class="flex min-w-0 items-center gap-2 no-underline">
            <img
              src="assets/icons/web-transparent-logo.png"
              alt=""
              class="h-8 w-20 shrink-0"
              aria-hidden="true"
            />
          </a>
        </div>

        <div class="flex items-center gap-2 sm:gap-3">
          <span class="text-xs sm:text-sm text-[var(--color-text-muted)] whitespace-nowrap">
            {{ 'header.baseCurrency' | translate }}
            <span class="font-semibold text-[var(--color-text)]">{{ baseCurrency() }}</span>
          </span>
          @if (!showBack()) {
          <p-button
            icon="pi pi-cog"
            severity="secondary"
            [text]="true"
            [rounded]="true"
            size="small"
            routerLink="/settings"
            [ariaLabel]="'nav.openSettings' | translate"
          />
          }
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  private readonly router = inject(Router);
  private readonly nav = inject(NavigationService);

  baseCurrency = input.required<string>();

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
      startWith(this.router.url)
    ),
    { initialValue: this.router.url }
  );

  readonly showBack = computed(() => {
    const path = (this.currentUrl() ?? '/').split('?')[0].split('#')[0];
    return !ROOT_PATHS.has(path);
  });

  onBack(): void {
    void this.nav.goBack();
  }
}
