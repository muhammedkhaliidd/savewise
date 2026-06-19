import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { SIDE_NAV_ITEMS, TAB_ITEMS } from '../../constants/nav-items';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslateModule, ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (bottomBar()) {
    <!-- Bottom tab bar (mobile/tablet) -->
    <nav
      class="flex items-center justify-around gap-1 bg-[var(--color-surface)] border-t border-[var(--color-border)] px-1 py-2"
      [attr.aria-label]="'nav.openMenu' | translate"
    >
      @for (item of navItems(); track item.route) {
      <a
        [routerLink]="item.route"
        routerLinkActive="bg-[var(--color-primary)]/15 !text-[var(--color-primary)]"
        [routerLinkActiveOptions]="{ exact: true }"
        class="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-primary)]/5 transition-all duration-200"
        [attr.aria-current]="isActive(item.route) ? 'page' : null"
        (click)="itemClick.emit()"
      >
        <i [class]="item.icon + ' text-lg'"></i>
        <span class="text-[0.65rem] line-clamp-1">{{ item.labelKey | translate }}</span>
      </a>
      }
    </nav>
    } @else {
    <!-- Vertical sidebar (desktop) -->
    <nav class="flex flex-col gap-1" [attr.aria-label]="'nav.openMenu' | translate">
      @for (item of navItems(); track item.route) {
      <a
        [routerLink]="item.route"
        routerLinkActive="bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-r-2 border-[var(--color-primary)]"
        [routerLinkActiveOptions]="{ exact: true }"
        class="flex items-center gap-3 px-3 py-2 rounded transition-colors text-[var(--color-text)] hover:bg-[var(--color-primary)]/5 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50"
        [attr.aria-current]="isActive(item.route) ? 'page' : null"
        (click)="itemClick.emit()"
      >
        <i [class]="item.icon + ' w-5 text-center flex-shrink-0'"></i>
        <span class="font-medium text-sm">{{ item.labelKey | translate }}</span>
      </a>
      }
    </nav>
    }
  `,
})
export class SideNavComponent {
  readonly bottomBar = input(false);
  readonly itemClick = output<void>();

  readonly navItems = computed(() => (this.bottomBar() ? TAB_ITEMS : SIDE_NAV_ITEMS));

  isActive(route: string): boolean {
    // Will be handled by routerLinkActive directive
    return false;
  }
}
