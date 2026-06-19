import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DisplayCodePipe } from '../../../../core/pipes/display-code.pipe';
import type { GoalProgress } from '../../../../stores/goals.store';

@Component({
  selector: 'app-goal-cards',
  imports: [CommonModule, TranslateModule, DisplayCodePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="bg-[var(--color-surface)] rounded-[var(--radius)] shadow-sm border border-[var(--color-border)] p-3 sm:p-4"
    >
      <h3
        class="flex items-center gap-2 text-base font-semibold text-[var(--color-text)] sm:text-lg mb-4"
      >
        <i class="pi pi-flag text-[var(--color-primary)]" aria-hidden="true"></i>
        {{ 'dashboard.goalCards.title' | translate }}
      </h3>

      @if (goals().length === 0) {
        <p class="text-[var(--color-text-muted)] text-center py-4">
          {{ 'dashboard.goalCards.empty' | translate }}
        </p>
      } @else {
        <div class="flex flex-col gap-4">
          @for (gp of goals(); track gp.goal.id) {
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <span class="font-semibold text-[var(--color-text)] truncate">
                  {{ gp.goal.name || ('common.untitled' | translate) }}
                </span>
                <span class="ms-2 flex-shrink-0 text-sm font-bold text-[var(--color-primary)]">
                  {{ (gp.progress * 100) | number:'1.0-0' }}%
                </span>
              </div>
              <div class="h-2 rounded-full overflow-hidden bg-[var(--color-border)] mb-1.5">
                <div
                  class="h-full rounded-full bg-[var(--color-primary)] transition-all duration-500"
                  [style.width.%]="gp.progress * 100"
                  role="progressbar"
                  [attr.aria-valuenow]="(gp.progress * 100) | number:'1.0-0'"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div class="flex justify-between text-xs text-[var(--color-text-muted)]">
                <span>{{ gp.currentInBase | number:'1.2-2' }} {{ baseCurrency() | displayCode | translate }}</span>
                <span>{{ gp.targetInBase | number:'1.2-2' }} {{ baseCurrency() | displayCode | translate }}</span>
              </div>
              @if (gp.goal.targetDate) {
                <p class="text-xs text-[var(--color-text-muted)] mt-0.5">
                  {{ 'dashboard.goalCards.by' | translate }} {{ gp.goal.targetDate | date:'mediumDate' }}
                </p>
              }
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class GoalCardsComponent {
  readonly goals = input.required<GoalProgress[]>();
  readonly baseCurrency = input.required<string>();
}
