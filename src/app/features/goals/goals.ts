import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';
import { GoalsFormComponent, GoalFormValue } from './components/goals-form/goals-form.component';
import { GoalsListComponent } from './components/goals-list/goals-list.component';
import { GoalsStore } from '../../stores/goals.store';
import { SavingsStore } from '../../stores/savings.store';
import { ExchangeRateStore } from '../../stores/exchange-rate.store';
import { MetalPriceStore } from '../../stores/metal-price.store';
import { ToastService } from '../../core/services/toast.service';
import { OverlayStackService } from '../../core/services/overlay-stack.service';
import type { Goal } from './models/goal.model';

@Component({
  selector: 'app-goals',
  imports: [TranslateModule, GoalsFormComponent, GoalsListComponent, DialogModule],
  templateUrl: './goals.html',
})
export class Goals implements OnInit {
  readonly exchangeStore = inject(ExchangeRateStore);
  readonly metalStore = inject(MetalPriceStore);
  readonly savingsStore = inject(SavingsStore);
  readonly goalsStore = inject(GoalsStore);
  readonly overlayStack = inject(OverlayStackService);
  private readonly toast = inject(ToastService);
  private readonly translate = inject(TranslateService);

  readonly editGoalForm = viewChild<GoalsFormComponent>('editGoalForm');

  readonly addGoalDialogVisible = signal(false);
  readonly editGoalDialogVisible = signal(false);

  private editingGoalId: string | null = null;

  ngOnInit(): void {
    this.exchangeStore.loadFromStorage();
    this.metalStore.loadFromStorage();
    this.savingsStore.loadFromStorage();
    this.goalsStore.loadFromStorage();
  }

  onAddGoalClicked(): void {
    this.addGoalDialogVisible.set(true);
  }

  onGoalAdded(value: GoalFormValue): void {
    this.goalsStore.addGoal({
      name: value.name,
      initialSavingsIds: value.initialSavingsIds,
      addedSavingsIds: [],
      targetAmount: value.targetAmount,
      targetCurrency: value.targetCurrency,
    });
    this.addGoalDialogVisible.set(false);
    this.toast.success(
      this.translate.instant('toast.saved'),
      this.translate.instant('toast.goalAdded'),
    );
  }

  onEditGoal(goal: Goal): void {
    this.editingGoalId = goal.id;
    this.editGoalDialogVisible.set(true);
    setTimeout(() => {
      this.editGoalForm()?.setValues(goal);
    }, 0);
  }

  onGoalEdited(value: GoalFormValue): void {
    if (this.editingGoalId) {
      this.goalsStore.updateGoal(this.editingGoalId, {
        name: value.name,
        addedSavingsIds: value.addedSavingsIds,
        targetAmount: value.targetAmount,
        targetCurrency: value.targetCurrency,
      });
      this.editingGoalId = null;
      this.editGoalDialogVisible.set(false);
      this.toast.success(
        this.translate.instant('toast.saved'),
        this.translate.instant('toast.goalUpdated'),
      );
    }
  }
}
