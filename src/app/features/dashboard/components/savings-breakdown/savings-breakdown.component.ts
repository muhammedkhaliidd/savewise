import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ChartModule } from 'primeng/chart';
import { ThemeService } from '../../../../core/services/theme.service';
import { valueEntryInBase } from '../../../savings/savings-value.util';
import { currencyDisplayKey } from '../../../../core/pipes/display-code.pipe';
import type { SavingsEntry } from '../../../savings/models/savings-entry.model';
import type { MetalCode } from '../../../metals/models/metal-price.model';

const METAL_COLORS: Record<string, string> = {
  gold:      '#d97706', // amber  — recognisably gold
  silver:    '#94a3b8', // slate  — silver-grey
  platinum:  '#e2e8f0', // light slate — platinum white
  palladium: '#6366f1', // indigo — distinctive
};

const MONEY_COLORS = [
  '#10b981', // emerald-500
  '#059669', // emerald-600
  '#34d399', // emerald-400
  '#0d9488', // teal-600
  '#6ee7b7', // emerald-300
  '#047857', // emerald-700
];

const OTHER_COLOR = '#6b7280';

const MAX_SLICES = 6;

@Component({
  selector: 'app-savings-breakdown',
  imports: [TranslateModule, ChartModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="bg-[var(--color-surface)] rounded-[var(--radius)] shadow-sm border border-[var(--color-border)] p-3 sm:p-4"
    >
      <h3
        class="flex items-center gap-2 text-base font-semibold text-[var(--color-text)] sm:text-lg mb-4"
      >
        <i class="pi pi-chart-pie text-[var(--color-primary)]" aria-hidden="true"></i>
        {{ 'dashboard.breakdown.title' | translate }}
      </h3>

      @if (chartData(); as data) {
        <div class="h-[20rem]">
          <p-chart type="doughnut" [data]="data" [options]="chartOptions()" height="100%" />
        </div>
      } @else {
        <p class="text-[var(--color-text-muted)] text-center py-4">
          {{ 'dashboard.breakdown.noData' | translate }}
        </p>
      }
    </div>
  `,
})
export class SavingsBreakdownComponent {
  private readonly translate = inject(TranslateService);
  private readonly theme = inject(ThemeService);
  private readonly langTick = toSignal(this.translate.onLangChange, { initialValue: null });

  readonly entries = input.required<SavingsEntry[]>();
  readonly rateToBase = input.required<(from: string) => number>();
  readonly metalPure = input.required<(metal: MetalCode) => number | null>();

  readonly chartData = computed(() => {
    this.langTick();
    const rateToBase = this.rateToBase();
    const metalPure = this.metalPure();
    const active = this.entries().filter((e) => e.active !== false);
    if (!active.length) return null;

    const groups = new Map<string, { label: string; value: number; color: string }>();
    let moneyColorIdx = 0;

    for (const entry of active) {
      const value = valueEntryInBase(entry, rateToBase, metalPure) ?? 0;
      if (value <= 0) continue;

      let key: string;
      let label: string;
      let color: string;

      if ((entry.type ?? 'money') === 'metal' && entry.metal) {
        key = `metal:${entry.metal}`;
        label = this.translate.instant(`metals.${entry.metal}`);
        color = METAL_COLORS[entry.metal] ?? OTHER_COLOR;
      } else {
        const currency = entry.currency ?? '';
        key = `currency:${currency}`;
        label = this.translate.instant(currencyDisplayKey(currency));
        color = '';
      }

      const existing = groups.get(key);
      if (existing) {
        existing.value += value;
      } else {
        if (!color) {
          color = MONEY_COLORS[moneyColorIdx % MONEY_COLORS.length];
          moneyColorIdx++;
        }
        groups.set(key, { label, value, color });
      }
    }

    const sorted = [...groups.values()].sort((a, b) => b.value - a.value);
    if (!sorted.length) return null;

    let slices = sorted;
    if (sorted.length > MAX_SLICES) {
      let otherValue = 0;
      for (let i = MAX_SLICES; i < sorted.length; i++) otherValue += sorted[i].value;
      slices = [
        ...sorted.slice(0, MAX_SLICES),
        { label: this.translate.instant('dashboard.breakdown.other'), value: otherValue, color: OTHER_COLOR },
      ];
    }

    return {
      labels: slices.map((s) => s.label),
      datasets: [
        {
          data: slices.map((s) => Math.round(s.value * 100) / 100),
          backgroundColor: slices.map((s) => s.color),
          borderWidth: 0,
        },
      ],
    };
  });

  readonly chartOptions = computed(() => {
    const text = this.theme.isDark() ? '#e7e5e4' : '#44403c';
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: { color: text, boxWidth: 12, padding: 14, font: { size: 12 } },
        },
      },
    };
  });
}
