import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Toast } from 'primeng/toast';
import { AppLayoutComponent } from './components/layout/app-layout/app-layout.component';
import { RateConfigComponent } from './components/exchange/rate-config/rate-config.component';
import { RateListComponent } from './components/exchange/rate-list/rate-list.component';
import { SavingsFormComponent } from './components/savings/savings-form/savings-form.component';
import { SavingsListComponent } from './components/savings/savings-list/savings-list.component';
import { SavingsTotalComponent } from './components/savings/savings-total/savings-total.component';
import { ExchangeRateStore } from './stores/exchange-rate.store';
import { SavingsStore } from './stores/savings.store';
import { ToastService } from './core/services/toast.service';
import type { SavingsEntry } from './models/savings-entry.model';
import type { ExchangeRate } from './models/exchange-rate.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    ConfirmDialog,
    Toast,
    AppLayoutComponent,
    RateConfigComponent,
    RateListComponent,
    SavingsFormComponent,
    SavingsListComponent,
    SavingsTotalComponent,
  ],
  providers: [ExchangeRateStore, SavingsStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
})
export class App implements OnInit {
  readonly exchangeStore = inject(ExchangeRateStore);
  readonly savingsStore = inject(SavingsStore);
  private readonly toast = inject(ToastService);

  // View children for setting edit values
  readonly editSavingsForm = viewChild<SavingsFormComponent>('editSavingsForm');
  readonly editRateForm = viewChild<RateConfigComponent>('editRateForm');

  // Dialog visibility signals
  readonly editSavingsDialogVisible = signal(false);
  readonly editRateDialogVisible = signal(false);

  // Track what we're editing
  private editingSavingsId: string | null = null;
  private editingRateOriginal: { from: string; to: string } | null = null;

  ngOnInit(): void {
    this.exchangeStore.loadFromStorage();
    this.savingsStore.loadFromStorage();
  }

  onSavingsAdded(entry: Omit<SavingsEntry, 'id'>): void {
    this.savingsStore.addEntry(entry);
    this.toast.success('Saved', 'Savings entry added');
  }

  onRateAdded(event: { from: string; to: string; rate: number }): void {
    this.exchangeStore.setRate(event.from, event.to, event.rate);
    this.toast.success('Saved', 'Exchange rate added');
  }

  onRateDeleted(event: { from: string; to: string }): void {
    this.exchangeStore.deleteRate(event.from, event.to);
  }

  onEditSavingsEntry(entry: SavingsEntry): void {
    this.editingSavingsId = entry.id;
    this.editSavingsDialogVisible.set(true);
    // Need to wait for dialog to open then set values
    setTimeout(() => {
      const form = this.editSavingsForm();
      if (form) {
        // Access form signals directly via any to set values
        form.labelValue.set(entry.label || '');
        form.currency.set(entry.currency);
        form.amountValue.set(entry.amount);
      }
    }, 0);
  }

  onSaveSavingsEdit(entry: Omit<SavingsEntry, 'id'>): void {
    if (this.editingSavingsId) {
      this.savingsStore.updateEntry(this.editingSavingsId, entry);
      this.editingSavingsId = null;
      this.editSavingsDialogVisible.set(false);
      this.toast.success('Saved', 'Savings entry updated');
    }
  }

  onEditRate(rate: ExchangeRate): void {
    this.editingRateOriginal = { from: rate.from, to: rate.to };
    this.editRateDialogVisible.set(true);
    setTimeout(() => {
      const form = this.editRateForm();
      if (form) {
        form.setValues(rate.from, rate.to, rate.rate);
      }
    }, 0);
  }

  onSaveRateEdit(rate: ExchangeRate): void {
    if (this.editingRateOriginal) {
      this.exchangeStore.updateRate(
        this.editingRateOriginal.from,
        this.editingRateOriginal.to,
        rate.from,
        rate.to,
        rate.rate,
      );
      this.editingRateOriginal = null;
      this.editRateDialogVisible.set(false);
      this.toast.success('Saved', 'Exchange rate updated');
    }
  }
}
