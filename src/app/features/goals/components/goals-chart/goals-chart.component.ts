import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ChartModule } from 'primeng/chart';
import { ThemeService } from '../../../../core/services/theme.service';
import type { GoalProgress } from '../../../../stores/goals.store';

@Component({
  selector: 'app-goals-chart',
  imports: [CommonModule, TranslateModule, ChartModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="bg-[var(--color-surface)] rounded-[var(--radius)] shadow-sm border border-[var(--color-border)] p-3 sm:p-4"
    >
      <h3
        class="flex items-center gap-2 text-base font-semibold text-[var(--color-text)] sm:text-lg mb-4"
      >
        <i class="pi pi-chart-bar text-[var(--color-primary)]"></i>
        {{ 'goals.chartTitle' | translate }}
      </h3>

      @if (goals().length === 0) {
      <p class="text-[var(--color-text-muted)] text-center py-4">
        {{ 'goals.chartEmpty' | translate }}
      </p>
      } @else {
      <div class="h-[20rem]">
        <p-chart type="bar" [data]="chartData()" [options]="chartOptions()" height="100%" />
      </div>
      }
    </div>
  `,
})
export class GoalsChartComponent {
  private readonly translate = inject(TranslateService);
  private readonly theme = inject(ThemeService);
  private readonly langTick = toSignal(this.translate.onLangChange, { initialValue: null });

  goals = input.required<GoalProgress[]>();

  readonly chartData = computed(() => {
    this.langTick();
    const items = this.goals();
    return {
      labels: items.map(
        (item) => item.goal.name || this.translate.instant('common.untitled'),
      ),
      datasets: [
        {
          label: this.translate.instant('goals.form.currentSavings'),
          data: items.map((item) => Math.round(item.currentInBase * 100) / 100),
          backgroundColor: '#10b981',
          borderRadius: 6,
        },
        {
          label: this.translate.instant('goals.form.target'),
          data: items.map((item) => Math.round(item.targetInBase * 100) / 100),
          backgroundColor: '#d97706',
          borderRadius: 6,
        },
      ],
    };
  });

  readonly chartOptions = computed(() => {
    const text = this.theme.isDark() ? '#e7e5e4' : '#44403c';
    const grid = this.theme.isDark() ? 'rgba(231,229,228,0.12)' : 'rgba(28,25,23,0.08)';
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: text } },
      },
      scales: {
        x: { ticks: { color: text }, grid: { color: grid } },
        y: { ticks: { color: text }, grid: { color: grid }, beginAtZero: true },
      },
    };
  });
}
