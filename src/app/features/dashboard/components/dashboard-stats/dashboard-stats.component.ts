import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

export interface NearestTarget {
  label: string;
  date: Date;
}

@Component({
  selector: 'app-dashboard-stats',
  imports: [TranslateModule, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">

      <div class="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius)] p-3 sm:p-4 flex flex-col gap-1">
        <span class="flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
          <i class="pi pi-wallet text-[var(--color-primary)]" aria-hidden="true"></i>
          {{ 'dashboard.stats.activeEntries' | translate }}
        </span>
        <span class="text-2xl font-bold text-[var(--color-text)]">{{ entryCount() }}</span>
      </div>

      <div class="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius)] p-3 sm:p-4 flex flex-col gap-1">
        <span class="flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
          <i class="pi pi-flag text-[var(--color-primary)]" aria-hidden="true"></i>
          {{ 'dashboard.stats.goals' | translate }}
        </span>
        <span class="text-2xl font-bold text-[var(--color-text)]">{{ goalsCount() }}</span>
      </div>

      <div class="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius)] p-3 sm:p-4 flex flex-col gap-1">
        <span class="flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
          <i class="pi pi-calendar text-[var(--color-primary)]" aria-hidden="true"></i>
          {{ 'dashboard.stats.nearestTarget' | translate }}
        </span>
        @if (nearestTarget(); as t) {
          <span class="text-base font-bold text-[var(--color-text)] leading-tight">{{ t.date | date:'mediumDate' }}</span>
          <span class="text-xs text-[var(--color-text-muted)] truncate">
            {{ t.label || ('common.untitled' | translate) }}
          </span>
        } @else {
          <span class="text-sm font-medium text-[var(--color-text-muted)] pt-1">
            {{ 'dashboard.stats.noTarget' | translate }}
          </span>
        }
      </div>

      <div class="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius)] p-3 sm:p-4 flex flex-col gap-1">
        <span class="flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
          <i class="pi pi-clock text-[var(--color-primary)]" aria-hidden="true"></i>
          {{ 'dashboard.stats.lastUpdated' | translate }}
        </span>
        <span class="text-base font-bold text-[var(--color-text)] leading-tight">{{ lastUpdatedLabel() }}</span>
      </div>

    </div>
  `,
})
export class DashboardStatsComponent {
  private readonly translate = inject(TranslateService);
  private readonly langTick = toSignal(this.translate.onLangChange, { initialValue: null });

  readonly entryCount = input.required<number>();
  readonly goalsCount = input.required<number>();
  readonly nearestTarget = input.required<NearestTarget | null>();
  readonly lastInputDate = input.required<string | null>();

  readonly lastUpdatedLabel = computed((): string => {
    this.langTick();
    const dateStr = this.lastInputDate();
    if (!dateStr) return this.translate.instant('dashboard.stats.never');
    const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86_400_000);
    if (days === 0) return this.translate.instant('dashboard.stats.today');
    if (days === 1) return this.translate.instant('dashboard.stats.yesterday');
    return this.translate.instant('dashboard.stats.daysAgo', { days });
  });
}
