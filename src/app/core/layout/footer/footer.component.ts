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
      class="flex items-center justify-between gap-1 px-3 py-2 bg-[var(--color-surface)] border-t border-[var(--color-border)] text-xs sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:py-3 sm:text-sm"
    >
      <span class="text-[var(--color-text-muted)]">SaveWise</span>
      <div class="flex flex-col justify-between sm:flex-row sm:items-center sm:gap-4">
        <span class="flex items-center gap-1 text-[var(--color-text-muted)]">
          Exchange Sync: {{ syncIntervalLabel() }}
          <p-button
            icon="pi pi-pen-to-square"
            severity="secondary"
            [text]="true"
            [rounded]="true"
            size="small"
            (onClick)="editInterval.emit()"
            styleClass="!p-[0px] !w-[20px] !h-[20px]"
          />
        </span>
        <span class="text-[var(--color-text-muted)]">
          @if (lastInputDate()) { Savings updated: {{ lastInputDate() | date : 'medium' }}
          } @else { No savings yet }
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
