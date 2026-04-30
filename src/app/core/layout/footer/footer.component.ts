import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import type { SyncIntervalSetting } from '../../../features/exchange/models/exchange-rate.model';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, DatePipe, ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer
      class="flex flex-col gap-1 px-3 py-2 bg-[var(--color-surface)] border-t border-[var(--color-border)] text-xs sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:py-3 sm:text-sm"
    >
      <span class="text-[var(--color-text-muted)]"> SaveWise </span>

      <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
        <span class="text-[var(--color-text-muted)]">
          @if (lastInputDate()) {
            Last updated: {{ lastInputDate() | date: 'medium' }}
          } @else {
            No savings yet
          }
        </span>

        <span class="flex items-center gap-2 text-[var(--color-text-muted)]">
          Sync: {{ syncIntervalLabel() }}
          <p-button
            icon="pi pi-pencil"
            severity="secondary"
            [text]="true"
            [rounded]="true"
            size="small"
            (onClick)="editInterval.emit()"
          />
        </span>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  lastInputDate = input<string | null>(null);
  syncInterval = input.required<SyncIntervalSetting>();
  editInterval = output<void>();

  syncIntervalLabel = computed(() => {
    const { value, unit } = this.syncInterval();
    const singular = unit === 'hours' ? 'Hour' : 'Min';
    const plural = unit === 'hours' ? 'Hours' : 'Mins';
    const noun = value === 1 ? singular : plural;
    return `${value} ${noun}`;
  });
}
