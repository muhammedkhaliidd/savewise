import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer
      class="flex items-center justify-between gap-1 px-3 py-2 bg-[var(--color-surface)] border-t border-[var(--color-border)] text-xs sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:py-3 sm:text-sm"
    >
      <img src="assets/icons/web-transparent-logo.png" alt="SaveWise" class="w-16 h-6" />

      <span class="text-[var(--color-text-muted)]">
        @if (lastInputDate()) { Savings updated: {{ lastInputDate() | date : 'medium' }}
        } @else { No savings yet }
      </span>
    </footer>
  `,
})
export class FooterComponent {
  lastInputDate = input<string | null>(null);
}
