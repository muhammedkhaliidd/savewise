import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';
import { SavingsFormComponent } from './components/savings-form/savings-form.component';
import { SavingsListComponent } from './components/savings-list/savings-list.component';
import { SavingsStore } from '../../stores/savings.store';
import { ExchangeRateStore } from '../../stores/exchange-rate.store';
import { MetalPriceStore } from '../../stores/metal-price.store';
import { ToastService } from '../../core/services/toast.service';
import { OverlayStackService } from '../../core/services/overlay-stack.service';
import { SavingsEntry } from './models/savings-entry.model';

@Component({
  selector: 'app-savings',
  imports: [TranslateModule, SavingsFormComponent, SavingsListComponent, DialogModule],
  templateUrl: './savings.html',
})
export class Savings implements OnInit {
  readonly exchangeStore = inject(ExchangeRateStore);
  readonly metalStore = inject(MetalPriceStore);
  readonly savingsStore = inject(SavingsStore);
  readonly overlayStack = inject(OverlayStackService);
  private readonly toast = inject(ToastService);
  private readonly translate = inject(TranslateService);

  readonly editSavingsForm = viewChild<SavingsFormComponent>('editSavingsForm');

  readonly editSavingsDialogVisible = signal(false);
  readonly addSavingsDialogVisible = signal(false);

  private editingSavingsId: string | null = null;

  ngOnInit(): void {
    this.exchangeStore.loadFromStorage();
    this.metalStore.loadFromStorage();
    this.savingsStore.loadFromStorage();
  }

  onAddSavingsClicked(): void {
    this.addSavingsDialogVisible.set(true);
  }

  onSavingsAddedFromDialog(entry: Omit<SavingsEntry, 'id'>): void {
    this.savingsStore.addEntry(entry);
    this.addSavingsDialogVisible.set(false);
    this.toast.success(
      this.translate.instant('toast.saved'),
      this.translate.instant('toast.savingsAdded'),
    );
  }

  onToggleSavingsActive(event: { id: string; active: boolean }): void {
    this.savingsStore.updateEntry(event.id, { active: event.active });
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
      this.toast.success(
        this.translate.instant('toast.saved'),
        this.translate.instant('toast.savingsUpdated'),
      );
    }
  }
}
