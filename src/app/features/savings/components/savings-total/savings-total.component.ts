import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { DisplayCodePipe } from '../../../../core/pipes/display-code.pipe';

@Component({
  selector: 'app-savings-total',
  standalone: true,
  imports: [CommonModule, CardModule, TranslateModule, DisplayCodePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p-card class="brand-gradient savings-hero !text-white">
      <div class="savings-hero__texture" aria-hidden="true"></div>
      <div class="savings-hero__content">
        <span class="savings-hero__badge">
          <i class="pi pi-wallet" aria-hidden="true"></i>
          {{ 'savings.total' | translate }}
        </span>
        <p class="savings-hero__amount">
          <span class="savings-hero__value">{{ total() | number : '1.2-2' }}</span>
          <span class="savings-hero__currency">{{
            baseCurrency() | displayCode | translate
          }}</span>
        </p>
        <p class="savings-hero__meta">{{ entriesLabel() }}</p>
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
