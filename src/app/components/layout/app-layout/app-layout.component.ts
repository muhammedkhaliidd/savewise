import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ExchangeRateStore } from '../../../stores/exchange-rate.store';
import { SavingsStore } from '../../../stores/savings.store';
import { CurrencyService } from '../../../core/services/currency.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col h-full">
      <app-header
        [currencies]="allCurrencies()"
        [baseCurrency]="exchangeStore.currentBase()"
        (baseCurrencyChange)="exchangeStore.setBaseCurrency($event)"
      />

      <main class="flex-1 overflow-auto p-4">
        <ng-content></ng-content>
      </main>

      <app-footer [lastInputDate]="savingsStore.lastInputDate()" />
    </div>
  `,
})
export class AppLayoutComponent implements OnInit {
  readonly exchangeStore = inject(ExchangeRateStore);
  readonly savingsStore = inject(SavingsStore);
  private readonly currencyService = inject(CurrencyService);

  readonly allCurrencies = computed(() =>
    this.currencyService.getAllCurrencies()
  );

  ngOnInit(): void {
    this.exchangeStore.loadFromStorage();
    this.savingsStore.loadFromStorage();
  }
}
