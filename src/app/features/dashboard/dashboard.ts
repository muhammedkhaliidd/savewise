import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { RateConfigComponent } from '../exchange/components/rate-config/rate-config.component';
import { RateListComponent } from '../exchange/components/rate-list/rate-list.component';
import { ApiRateListComponent } from '../exchange/components/api-rate-list/api-rate-list.component';
import { SavingsFormComponent } from '../savings/components/savings-form/savings-form.component';
import { SavingsTotalComponent } from '../savings/components/savings-total/savings-total.component';
import { SavingsListComponent } from '../savings/components/savings-list/savings-list.component';
import { DialogModule } from 'primeng/dialog';
import { SavingsStore } from '../../stores/savings.store';
import { ExchangeRateStore } from '../../stores/exchange-rate.store';
import { ExchangeRate } from '../exchange/models/exchange-rate.model';
import { ToastService } from '../../core/services/toast.service';
import { SavingsEntry } from '../savings/models/savings-entry.model';

@Component({
  selector: 'app-dashboard',
  imports: [
    RateConfigComponent,
    RateListComponent,
    ApiRateListComponent,
    SavingsFormComponent,
    SavingsListComponent,
    SavingsTotalComponent,
    DialogModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
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

  async onSyncFromApi(): Promise<void> {
    try {
      await this.exchangeStore.syncFromApi();
      this.toast.success('Synced', 'Live exchange rates updated');
    } catch {
      this.toast.error('Sync failed', 'Could not fetch live exchange rates');
    }
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
