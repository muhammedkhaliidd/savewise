import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';
import {
  SavingsFormComponent,
  type SavingsFormValue,
} from './components/savings-form/savings-form.component';
import { SavingsListComponent } from './components/savings-list/savings-list.component';
import { SavingsStore } from '../../stores/savings.store';
import { DebtsStore } from '../../stores/debts.store';
import { ExchangeRateStore } from '../../stores/exchange-rate.store';
import { MetalPriceStore } from '../../stores/metal-price.store';
import { ToastService } from '../../core/services/toast.service';
import { OverlayStackService } from '../../core/services/overlay-stack.service';
import { SavingsEntry } from './models/savings-entry.model';
import type { DebtEntry } from '../debts/models/debt-entry.model';
import { clearUnusedFields } from './savings-value.util';

@Component({
  selector: 'app-savings',
  imports: [TranslateModule, SavingsFormComponent, SavingsListComponent, DialogModule],
  templateUrl: './savings.html',
})
export class Savings implements OnInit {
  readonly exchangeStore = inject(ExchangeRateStore);
  readonly metalStore = inject(MetalPriceStore);
  readonly savingsStore = inject(SavingsStore);
  readonly debtsStore = inject(DebtsStore);
  readonly overlayStack = inject(OverlayStackService);
  private readonly toast = inject(ToastService);
  private readonly translate = inject(TranslateService);

  readonly editSavingsForm = viewChild<SavingsFormComponent>('editSavingsForm');
  readonly editDebtForm = viewChild<SavingsFormComponent>('editDebtForm');

  readonly editSavingsDialogVisible = signal(false);
  readonly addSavingsDialogVisible = signal(false);
  readonly editDebtDialogVisible = signal(false);
  readonly addDebtDialogVisible = signal(false);

  private editingSavingsId: string | null = null;
  private editingDebtId: string | null = null;

  ngOnInit(): void {
    this.exchangeStore.loadFromStorage();
    this.metalStore.loadFromStorage();
    this.savingsStore.loadFromStorage();
    this.debtsStore.loadFromStorage();
  }

  // ── Savings ────────────────────────────────────────────────────────────────

  onAddSavingsClicked(): void {
    this.addSavingsDialogVisible.set(true);
  }

  onSavingsAddedFromDialog(entry: SavingsFormValue): void {
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

  onSaveSavingsEdit(entry: SavingsFormValue): void {
    if (this.editingSavingsId) {
      this.savingsStore.updateEntry(this.editingSavingsId, clearUnusedFields(entry));
      this.editingSavingsId = null;
      this.editSavingsDialogVisible.set(false);
      this.toast.success(
        this.translate.instant('toast.saved'),
        this.translate.instant('toast.savingsUpdated'),
      );
    }
  }

  // ── Debts ──────────────────────────────────────────────────────────────────

  onAddDebtClicked(): void {
    this.addDebtDialogVisible.set(true);
  }

  onDebtAddedFromDialog(entry: SavingsFormValue): void {
    this.debtsStore.addEntry({ ...entry, direction: entry.direction ?? 'owe' });
    this.addDebtDialogVisible.set(false);
    this.toast.success(
      this.translate.instant('toast.saved'),
      this.translate.instant('toast.debtAdded'),
    );
  }

  onToggleDebtActive(event: { id: string; active: boolean }): void {
    this.debtsStore.updateEntry(event.id, { active: event.active });
  }

  onEditDebtEntry(entry: SavingsEntry): void {
    this.editingDebtId = entry.id;
    this.editDebtDialogVisible.set(true);
    setTimeout(() => {
      this.editDebtForm()?.setValues(entry);
    }, 0);
  }

  onSaveDebtEdit(entry: SavingsFormValue): void {
    if (this.editingDebtId) {
      this.debtsStore.updateEntry(this.editingDebtId, clearUnusedFields(entry));
      this.editingDebtId = null;
      this.editDebtDialogVisible.set(false);
      this.toast.success(
        this.translate.instant('toast.saved'),
        this.translate.instant('toast.debtUpdated'),
      );
    }
  }

  /** The list emits the debt entries it was given, in the new order. */
  onReorderDebts(entries: SavingsEntry[]): void {
    this.debtsStore.reorderEntries(entries as DebtEntry[]);
  }
}
