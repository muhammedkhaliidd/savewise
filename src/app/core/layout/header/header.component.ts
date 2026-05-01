import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header
      class="sticky top-0 z-50 bg-[var(--color-surface)] text-[var(--color-text)] border-b border-[var(--color-border)] shadow-sm px-3 py-3 sm:px-4 sm:py-3"
    >
      <div class="mx-auto flex w-full max-w-5xl items-center justify-between gap-3">
        <div class="flex items-center gap-2 min-w-0">
          <img src="assets/icons/web-transparent-logo.png" alt="SaveWise" class="w-20 h-8" />
        </div>

        <div class="flex items-center gap-2 sm:gap-3">
          <span class="text-xs sm:text-sm text-[var(--color-text-muted)] whitespace-nowrap">
            Base currency:
            <span class="font-semibold text-[var(--color-text)]">{{ baseCurrency() }}</span>
          </span>
          <p-button
            icon="pi pi-cog"
            severity="secondary"
            [text]="true"
            [rounded]="true"
            size="small"
            routerLink="/settings"
            ariaLabel="Open settings"
          />
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  baseCurrency = input.required<string>();
}
