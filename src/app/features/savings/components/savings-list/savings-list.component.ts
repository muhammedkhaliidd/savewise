import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDragHandle } from '@angular/cdk/drag-drop';
import { ButtonModule } from 'primeng/button';
import { OrderListModule } from 'primeng/orderlist';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import type { SavingsEntry } from '../../models/savings-entry.model';
import { ExchangeRateStore } from '../../../../stores/exchange-rate.store';
import { MetalPriceStore } from '../../../../stores/metal-price.store';
import { ConfirmService } from '../../../../core/services/confirm.service';
import {
  lookupPurityFactor,
  metalIcon,
  metalLabel,
} from '../../../metals/constants/metal-options';

@Component({
  selector: 'app-savings-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CdkDragHandle,
    ButtonModule,
    OrderListModule,
    ToggleSwitchModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './savings-list.component.html',
  styles: [':host ::ng-deep li:last-child > div { border-bottom-width: 0; }'],
})
export class SavingsListComponent {
  private readonly confirmService = inject(ConfirmService);

  entries = input.required<SavingsEntry[]>();
  baseCurrency = input.required<string>();
  exchangeStore = input.required<InstanceType<typeof ExchangeRateStore>>();
  metalStore = input.required<InstanceType<typeof MetalPriceStore>>();
  deleteEntry = output<string>();
  editEntry = output<SavingsEntry>();
  addEntry = output<void>();
  toggleActive = output<{ id: string; active: boolean }>();
  reorder = output<SavingsEntry[]>();

  entriesView = computed(() => [...this.entries()]);

  entryType(entry: SavingsEntry): 'money' | 'metal' {
    return entry.type ?? 'money';
  }

  convertedAmount(entry: SavingsEntry): number | null {
    if (this.entryType(entry) === 'money') {
      const amount = entry.amount ?? 0;
      const currency = entry.currency ?? '';
      return amount * this.exchangeStore().getRateToBase()(currency);
    }
    if (!entry.metal || !entry.purityLabel || !entry.grams) return null;
    const pure = this.metalStore().getMetalPricePerGramInBase()(entry.metal);
    if (pure == null) return null;
    return entry.grams * lookupPurityFactor(entry.metal, entry.purityLabel) * pure;
  }

  tagLabel(entry: SavingsEntry): string {
    return this.entryType(entry) === 'money' ? 'Money' : metalLabel(entry.metal);
  }

  tagIcon(entry: SavingsEntry): string {
    return this.entryType(entry) === 'money' ? 'pi pi-money-bill' : metalIcon(entry.metal);
  }

  tagClass(entry: SavingsEntry): string {
    if (this.entryType(entry) === 'money') {
      return 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300';
    }
    switch (entry.metal) {
      case 'gold':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300';
      case 'silver':
        return 'bg-slate-200 text-slate-700 dark:bg-slate-400/20 dark:text-slate-200';
      case 'platinum':
        return 'bg-zinc-200 text-zinc-700 dark:bg-zinc-400/20 dark:text-zinc-200';
      case 'palladium':
        return 'bg-stone-200 text-stone-700 dark:bg-stone-400/20 dark:text-stone-200';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-500/15 dark:text-slate-300';
    }
  }

  confirmDelete(id: string): void {
    this.confirmService.confirm({
      header: 'Delete Entry',
      message: 'Are you sure you want to delete this savings entry?',
      icon: 'pi pi-trash',
      actionText: 'Delete',
      actionSeverity: 'danger',
      onConfirm: () => this.deleteEntry.emit(id),
    });
  }

  onReorder(): void {
    this.reorder.emit([...this.entriesView()]);
  }
}
