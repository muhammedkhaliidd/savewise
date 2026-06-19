import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SavingsTotalComponent } from '../savings/components/savings-total/savings-total.component';
import { GoalsChartComponent } from '../goals/components/goals-chart/goals-chart.component';
import { SavingsStore } from '../../stores/savings.store';
import { ExchangeRateStore } from '../../stores/exchange-rate.store';
import { MetalPriceStore } from '../../stores/metal-price.store';
import { GoalsStore } from '../../stores/goals.store';

@Component({
  selector: 'app-dashboard',
  imports: [TranslateModule, SavingsTotalComponent, GoalsChartComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  readonly exchangeStore = inject(ExchangeRateStore);
  readonly metalStore = inject(MetalPriceStore);
  readonly savingsStore = inject(SavingsStore);
  readonly goalsStore = inject(GoalsStore);

  ngOnInit(): void {
    this.exchangeStore.loadFromStorage();
    this.metalStore.loadFromStorage();
    this.savingsStore.loadFromStorage();
    this.goalsStore.loadFromStorage();
  }
}
