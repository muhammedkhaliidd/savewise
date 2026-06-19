import { Component, computed, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SavingsTotalComponent } from '../savings/components/savings-total/savings-total.component';
import { GoalsChartComponent } from '../goals/components/goals-chart/goals-chart.component';
import { DashboardStatsComponent, NearestTarget } from './components/dashboard-stats/dashboard-stats.component';
import { SavingsBreakdownComponent } from './components/savings-breakdown/savings-breakdown.component';
import { GoalCardsComponent } from './components/goal-cards/goal-cards.component';
import { SavingsStore } from '../../stores/savings.store';
import { ExchangeRateStore } from '../../stores/exchange-rate.store';
import { MetalPriceStore } from '../../stores/metal-price.store';
import { GoalsStore } from '../../stores/goals.store';
import { SavingsCalcStore } from '../../stores/savings-calc.store';

@Component({
  selector: 'app-dashboard',
  imports: [
    TranslateModule,
    SavingsTotalComponent,
    GoalsChartComponent,
    DashboardStatsComponent,
    SavingsBreakdownComponent,
    GoalCardsComponent,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  readonly exchangeStore = inject(ExchangeRateStore);
  readonly metalStore = inject(MetalPriceStore);
  readonly savingsStore = inject(SavingsStore);
  readonly goalsStore = inject(GoalsStore);
  readonly calcStore = inject(SavingsCalcStore);

  readonly nearestTarget = computed((): NearestTarget | null => {
    const now = new Date();

    const candidates: NearestTarget[] = [
      ...this.calcStore.itemsWithProjection()
        .filter((v) => new Date(v.item.targetDate) > now)
        .map((v) => ({ label: v.item.name ?? '', date: new Date(v.item.targetDate) })),
      ...this.goalsStore.allGoals()
        .filter((g) => g.targetDate && new Date(g.targetDate) > now)
        .map((g) => ({ label: g.name ?? '', date: new Date(g.targetDate!) })),
    ];

    if (!candidates.length) return null;
    let nearest = candidates[0];
    for (const c of candidates) {
      if (c.date < nearest.date) nearest = c;
    }
    return nearest;
  });

  ngOnInit(): void {
    this.exchangeStore.loadFromStorage();
    this.metalStore.loadFromStorage();
    this.savingsStore.loadFromStorage();
    this.goalsStore.loadFromStorage();
    this.calcStore.loadFromStorage();
  }
}
