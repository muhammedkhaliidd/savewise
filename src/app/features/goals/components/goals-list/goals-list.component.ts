import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CdkDragHandle } from '@angular/cdk/drag-drop';
import { ButtonModule } from 'primeng/button';
import { OrderListModule } from 'primeng/orderlist';
import { ConfirmService } from '../../../../core/services/confirm.service';
import { DisplayCodePipe } from '../../../../core/pipes/display-code.pipe';
import type { GoalProgress } from '../../../../stores/goals.store';
import type { Goal } from '../../models/goal.model';

@Component({
  selector: 'app-goals-list',
  imports: [
    CommonModule,
    TranslateModule,
    DisplayCodePipe,
    CdkDragHandle,
    ButtonModule,
    OrderListModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './goals-list.component.html',
  styles: [':host ::ng-deep li:last-child > div { border-bottom-width: 0; }'],
})
export class GoalsListComponent {
  private readonly confirmService = inject(ConfirmService);
  private readonly translate = inject(TranslateService);
  private readonly langTick = toSignal(this.translate.onLangChange, { initialValue: null });

  goals = input.required<GoalProgress[]>();
  baseCurrency = input.required<string>();
  addGoal = output<void>();
  editGoal = output<Goal>();
  deleteGoal = output<string>();
  reorder = output<Goal[]>();

  goalsView = computed(() => {
    this.langTick();
    return [...this.goals()];
  });

  progressPercent(item: GoalProgress): number {
    return Math.round(item.progress * 100);
  }

  confirmDelete(id: string): void {
    this.confirmService.confirm({
      header: this.translate.instant('goals.confirmDelete'),
      message: this.translate.instant('goals.confirmDeleteMessage'),
      icon: 'pi pi-trash',
      actionText: this.translate.instant('common.delete'),
      actionSeverity: 'danger',
      onConfirm: () => this.deleteGoal.emit(id),
    });
  }

  onReorder(): void {
    this.reorder.emit(this.goalsView().map((v) => v.goal));
  }
}
