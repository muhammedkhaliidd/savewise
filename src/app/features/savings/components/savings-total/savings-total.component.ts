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
          {{ (hasDebts() ? 'savings.netTotal' : 'savings.total') | translate }}
        </span>
        <p class="savings-hero__amount">
          <span class="savings-hero__value">{{ displayTotal() | number : '1.2-2' }}</span>
          <span class="savings-hero__currency">{{
            baseCurrency() | displayCode | translate
          }}</span>
        </p>
        @if (hasDebts()) {
          <dl class="savings-hero__breakdown">
            <div>
              <dt>{{ 'savings.total' | translate }}</dt>
              <dd>{{ total() | number : '1.2-2' }}</dd>
            </div>
            @if (owed()) {
              <div>
                <dt>{{ 'debts.owe' | translate }}</dt>
                <dd>−{{ owed() | number : '1.2-2' }}</dd>
              </div>
            }
            @if (owedToMe()) {
              <div>
                <dt>{{ 'debts.owedToMe' | translate }}</dt>
                <dd>+{{ owedToMe() | number : '1.2-2' }}</dd>
              </div>
            }
          </dl>
        }
        <p class="savings-hero__meta">{{ entriesLabel() }}</p>
      </div>
    </p-card>
  `,
})
export class SavingsTotalComponent {
  private readonly translate = inject(TranslateService);
  private readonly langTick = toSignal(this.translate.onLangChange, { initialValue: null });

  /** Savings total (active entries) in base currency. */
  total = input.required<number>();
  entryCount = input.required<number>();
  baseCurrency = input.required<string>();
  /** Active debts I owe, in base currency. */
  owed = input(0);
  /** Active amounts owed to me, in base currency. */
  owedToMe = input(0);

  /** Only switch to the net view when debts actually change the total. */
  readonly hasDebts = computed(() => this.owed() !== 0 || this.owedToMe() !== 0);
  readonly displayTotal = computed(() => this.total() - this.owed() + this.owedToMe());

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
