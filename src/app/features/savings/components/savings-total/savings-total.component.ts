import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-savings-total',
  standalone: true,
  imports: [CommonModule, CardModule, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p-card class="brand-gradient !text-white">
      <div class="text-center p-3 sm:p-4 md:p-6">
        <p class="flex items-center justify-center gap-2 text-sm mb-1 text-white">
          <i class="pi pi-money-bill"></i>
          {{ 'savings.total' | translate }}
        </p>
        <p class="text-2xl font-bold sm:text-3xl md:text-4xl">
          {{ total() | number : '1.2-2' }} {{ baseCurrency() }}
        </p>
        <p class="text-white/70 text-[11px] mt-2 sm:text-xs">
          {{ entriesLabel() }}
        </p>
      </div>
    </p-card>
  `,
})
export class SavingsTotalComponent {
  private readonly translate = inject(TranslateService);
  private readonly langTick = toSignal(this.translate.onLangChange, { initialValue: null });

  total = input.required<number>();
  entryCount = input.required<number>();
  baseCurrency = input.required<string>();

  readonly entriesLabel = computed(() => {
    this.langTick();
    const count = this.entryCount();
    const entriesKey = count === 1 ? 'savings.entry' : 'savings.entries';
    return this.translate.instant('savings.totalEntries', {
      count,
      entries: this.translate.instant(entriesKey),
    });
  });
}
