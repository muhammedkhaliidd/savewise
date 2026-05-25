import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DisplayCodePipe } from '../../pipes/display-code.pipe';
import { NAV_ITEMS } from '../../constants/nav-items';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ButtonModule,
    TranslateModule,
    DisplayCodePipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header
      class="sticky top-0 z-50 bg-[var(--color-surface)] text-[var(--color-text)] border-b border-[var(--color-primary)]/25 shadow-sm px-3 py-3 sm:px-4 sm:py-3"
    >
      <div class="mx-auto flex w-full max-w-7xl items-center justify-between gap-3">
        <!-- Left: Hamburger + Logo -->
        <div class="flex items-center gap-2 min-w-0 lg:hidden">
          <!-- Hamburger menu button (mobile/tablet only) -->
          <p-button
            icon="pi pi-bars"
            severity="secondary"
            [text]="true"
            [rounded]="true"
            size="small"
            [ariaLabel]="'nav.openMenu' | translate"
            (onClick)="menuToggle.emit()"
          />
          <a routerLink="/dashboard" class="flex min-w-0 items-center gap-2 no-underline">
            <img
              src="assets/icons/web-transparent-logo.png"
              alt=""
              class="h-8 w-20 shrink-0"
              aria-hidden="true"
            />
          </a>
        </div>

        <!-- Center: Tab Navigation (desktop only) -->
        <nav class="hidden lg:flex gap-1 items-center">
          @for (item of navItems; track item.route) {
          <a
            [routerLink]="item.route"
            routerLinkActive="border-b-2 border-[var(--color-primary)] text-[var(--color-primary)]"
            [routerLinkActiveOptions]="{ exact: true }"
            class="flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors whitespace-nowrap"
          >
            <i [class]="item.icon"></i>
            <span>{{ item.labelKey | translate }}</span>
          </a>
          }
        </nav>

        <!-- Right: Base Currency Badge -->
        <a
          routerLink="/settings"
          class="flex items-center gap-2 px-3 py-2 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/15 transition-colors shrink-0"
          [attr.aria-label]="'header.baseCurrency' | translate"
        >
          <i class="pi pi-wallet"></i>
          <span class="text-xs sm:text-sm font-semibold">{{
            baseCurrency() | displayCode | translate
          }}</span>
        </a>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  baseCurrency = input.required<string>();
  readonly menuToggle = output<void>();

  readonly navItems = NAV_ITEMS;
}
