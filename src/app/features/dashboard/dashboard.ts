import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { RateConfigComponent } from '../exchange/components/rate-config/rate-config.component';
import { RateListComponent } from '../exchange/components/rate-list/rate-list.component';
import { ApiRateListComponent } from '../exchange/components/api-rate-list/api-rate-list.component';
import { MetalPriceConfigComponent } from '../metals/components/metal-price-config/metal-price-config.component';
import { MetalPriceListComponent } from '../metals/components/metal-price-list/metal-price-list.component';
import { ApiMetalPriceListComponent } from '../metals/components/api-metal-price-list/api-metal-price-list.component';
import { SavingsFormComponent } from '../savings/components/savings-form/savings-form.component';
import { SavingsTotalComponent } from '../savings/components/savings-total/savings-total.component';
import { SavingsListComponent } from '../savings/components/savings-list/savings-list.component';
import { DialogModule } from 'primeng/dialog';
import { SavingsStore } from '../../stores/savings.store';
import { ExchangeRateStore } from '../../stores/exchange-rate.store';
import { MetalPriceStore } from '../../stores/metal-price.store';
import { ExchangeRate } from '../exchange/models/exchange-rate.model';
import { ToastService } from '../../core/services/toast.service';
import { SavingsEntry } from '../savings/models/savings-entry.model';
import type { MetalCode, MetalPrice } from '../metals/models/metal-price.model';

@Component({
  selector: 'app-dashboard',
  imports: [
    RateConfigComponent,
    RateListComponent,
    ApiRateListComponent,
    MetalPriceConfigComponent,
    MetalPriceListComponent,
    ApiMetalPriceListComponent,
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
  readonly metalStore = inject(MetalPriceStore);
  readonly savingsStore = inject(SavingsStore);
  private readonly toast = inject(ToastService);

  // View children for setting edit values
  readonly editSavingsForm = viewChild<SavingsFormComponent>('editSavingsForm');
  readonly editRateForm = viewChild<RateConfigComponent>('editRateForm');
  readonly editMetalPriceForm = viewChild<MetalPriceConfigComponent>('editMetalPriceForm');

  // Dialog visibility signals
  readonly editSavingsDialogVisible = signal(false);
  readonly editRateDialogVisible = signal(false);
  readonly editMetalPriceDialogVisible = signal(false);
  readonly addSavingsDialogVisible = signal(false);
  readonly addRateDialogVisible = signal(false);
  readonly addMetalPriceDialogVisible = signal(false);

  // Track what we're editing
  private editingSavingsId: string | null = null;
  private editingRateOriginal: { from: string; to: string } | null = null;
  private editingMetalPriceOriginal: { metal: MetalCode; purityLabel: string } | null = null;

  ngOnInit(): void {
    this.exchangeStore.loadFromStorage();
    this.metalStore.loadFromStorage();
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

  onMetalPriceAdded(price: MetalPrice): void {
    this.metalStore.setPrice(price);
    this.toast.success('Saved', 'Metal price added');
  }

  onAddSavingsClicked(): void {
    this.addSavingsDialogVisible.set(true);
  }

  onAddRateClicked(): void {
    this.addRateDialogVisible.set(true);
  }

  onAddMetalPriceClicked(): void {
    this.addMetalPriceDialogVisible.set(true);
  }

  onSavingsAddedFromDialog(entry: Omit<SavingsEntry, 'id'>): void {
    this.onSavingsAdded(entry);
    this.addSavingsDialogVisible.set(false);
  }

  onRateAddedFromDialog(event: { from: string; to: string; rate: number }): void {
    this.onRateAdded(event);
    this.addRateDialogVisible.set(false);
  }

  onMetalPriceAddedFromDialog(price: MetalPrice): void {
    this.onMetalPriceAdded(price);
    this.addMetalPriceDialogVisible.set(false);
  }

  onToggleSavingsActive(event: { id: string; active: boolean }): void {
    this.savingsStore.updateEntry(event.id, { active: event.active });
  }

  onToggleRateActive(event: { from: string; to: string; active: boolean }): void {
    this.exchangeStore.setRateActive(event.from, event.to, event.active);
  }

  onToggleMetalPriceActive(event: { metal: MetalCode; purityLabel: string; active: boolean }): void {
    this.metalStore.setPriceActive(event.metal, event.purityLabel, event.active);
  }

  onRateDeleted(event: { from: string; to: string }): void {
    this.exchangeStore.deleteRate(event.from, event.to);
  }

  onMetalPriceDeleted(price: MetalPrice): void {
    this.metalStore.deletePrice(price.metal, price.purityLabel);
  }

  async onSyncFromApi(): Promise<void> {
    try {
      await this.exchangeStore.syncFromApi();
      this.toast.success('Synced', 'Live exchange rates updated');
    } catch {
      this.toast.error('Sync failed', 'Could not fetch live exchange rates');
    }
  }

  async onSyncMetalsFromApi(): Promise<void> {
    try {
      await this.metalStore.syncFromApi();
      this.toast.success('Synced', 'Live metal prices updated');
    } catch {
      this.toast.error('Sync failed', 'Could not fetch live metal prices');
    }
  }

  onEditSavingsEntry(entry: SavingsEntry): void {
    this.editingSavingsId = entry.id;
    this.editSavingsDialogVisible.set(true);
    setTimeout(() => {
      this.editSavingsForm()?.setValues(entry);
    }, 0);
  }

  onSaveSavingsEdit(entry: Omit<SavingsEntry, 'id'>): void {
    if (this.editingSavingsId) {
      const cleared: Partial<SavingsEntry> =
        entry.type === 'metal'
          ? { ...entry, currency: undefined, amount: undefined }
          : { ...entry, metal: undefined, purityLabel: undefined, grams: undefined };
      this.savingsStore.updateEntry(this.editingSavingsId, cleared);
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
        form.setValues(rate.from, rate.to, rate.rate, rate.active !== false);
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
        rate.active,
      );
      this.editingRateOriginal = null;
      this.editRateDialogVisible.set(false);
      this.toast.success('Saved', 'Exchange rate updated');
    }
  }

  onEditMetalPrice(price: MetalPrice): void {
    this.editingMetalPriceOriginal = { metal: price.metal, purityLabel: price.purityLabel };
    this.editMetalPriceDialogVisible.set(true);
    setTimeout(() => {
      this.editMetalPriceForm()?.setValues(
        price.metal,
        price.purityLabel,
        price.pricePerGram,
        price.active !== false,
      );
    }, 0);
  }

  onSaveMetalPriceEdit(price: MetalPrice): void {
    if (this.editingMetalPriceOriginal) {
      this.metalStore.updatePrice(
        this.editingMetalPriceOriginal.metal,
        this.editingMetalPriceOriginal.purityLabel,
        price,
      );
      this.editingMetalPriceOriginal = null;
      this.editMetalPriceDialogVisible.set(false);
      this.toast.success('Saved', 'Metal price updated');
    }
  }
}
