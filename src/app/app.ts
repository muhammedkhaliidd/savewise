import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutComponent } from './components/layout/app-layout/app-layout.component';
import { RateConfigComponent } from './components/exchange/rate-config/rate-config.component';
import { RateListComponent } from './components/exchange/rate-list/rate-list.component';
import { SavingsFormComponent } from './components/savings/savings-form/savings-form.component';
import { SavingsListComponent } from './components/savings/savings-list/savings-list.component';
import { SavingsTotalComponent } from './components/savings/savings-total/savings-total.component';
import { ExchangeRateStore } from './stores/exchange-rate.store';
import { SavingsStore } from './stores/savings.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    AppLayoutComponent,
    RateConfigComponent,
    RateListComponent,
    SavingsFormComponent,
    SavingsListComponent,
    SavingsTotalComponent,
  ],
  providers: [ExchangeRateStore, SavingsStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-layout>
      <div class="mx-auto grid w-full max-w-5xl gap-4 md:gap-6">
        <app-savings-total
          [total]="savingsStore.totalInBase()"
          [entryCount]="savingsStore.entryCount()"
          [baseCurrency]="exchangeStore.currentBase()"
        />

        <div class="grid gap-4 sm:grid-cols-2">
          <app-savings-form
            [baseCurrency]="exchangeStore.currentBase()"
            (entryAdded)="savingsStore.addEntry($event)"
          />

          <app-rate-config
            [existingRates]="exchangeStore.allRates()"
            (rateAdded)="onRateAdded($event)"
          />
        </div>

        <app-savings-list
          [entries]="savingsStore.allEntries()"
          [baseCurrency]="exchangeStore.currentBase()"
          [exchangeStore]="exchangeStore"
          (deleteEntry)="savingsStore.deleteEntry($event)"
        />

        <app-rate-list [rates]="exchangeStore.allRates()" (deleteRate)="onRateDeleted($event)" />
      </div>
    </app-layout>
  `,
})
export class App implements OnInit {
  readonly exchangeStore = inject(ExchangeRateStore);
  readonly savingsStore = inject(SavingsStore);

  ngOnInit(): void {
    this.exchangeStore.loadFromStorage();
    this.savingsStore.loadFromStorage();
  }

  onRateAdded(event: { from: string; to: string; rate: number }): void {
    this.exchangeStore.setRate(event.from, event.to, event.rate);
  }

  onRateDeleted(event: { from: string; to: string }): void {
    this.exchangeStore.deleteRate(event.from, event.to);
  }
}
