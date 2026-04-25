import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer
      class="flex items-center justify-between px-4 py-3 bg-[var(--color-surface)] border-t border-[var(--color-border)] text-sm"
    >
      <span class="text-[var(--color-text-muted)]"> SaveWise </span>

      <span class="text-[var(--color-text-muted)]">
        @if (lastInputDate()) {
          Last updated: {{ lastInputDate() | date: 'medium' }}
        } @else {
          No savings yet
        }
      </span>
    </footer>
  `,
})
export class FooterComponent {
  lastInputDate = input<string | null>(null);
}
