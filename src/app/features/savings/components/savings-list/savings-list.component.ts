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
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CdkDragHandle } from '@angular/cdk/drag-drop';
import { ButtonModule } from 'primeng/button';
import { OrderListModule } from 'primeng/orderlist';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import type { SavingsEntry } from '../../models/savings-entry.model';
import type { DebtDirection, DebtEntry } from '../../../debts/models/debt-entry.model';
import { ExchangeRateStore } from '../../../../stores/exchange-rate.store';
import { MetalPriceStore } from '../../../../stores/metal-price.store';
import { ConfirmService } from '../../../../core/services/confirm.service';
import { DisplayCodePipe } from '../../../../core/pipes/display-code.pipe';
import { metalIcon, metalLabelKey } from '../../../metals/constants/metal-options';
import { valueEntryInBase } from '../../savings-value.util';

@Component({
  selector: 'app-savings-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    DisplayCodePipe,
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
  private readonly translate = inject(TranslateService);
  private readonly langTick = toSignal(this.translate.onLangChange, { initialValue: null });

  entries = input.required<SavingsEntry[]>();
  baseCurrency = input.required<string>();
  exchangeStore = input.required<InstanceType<typeof ExchangeRateStore>>();
  metalStore = input.required<InstanceType<typeof MetalPriceStore>>();
  /** `debt` shows debt wording, a direction tag, and signed (−/+) values. */
  variant = input<'savings' | 'debt'>('savings');
  deleteEntry = output<string>();
  editEntry = output<SavingsEntry>();
  addEntry = output<void>();
  toggleActive = output<{ id: string; active: boolean }>();
  reorder = output<SavingsEntry[]>();

  entriesView = computed(() => {
    this.langTick();
    return [...this.entries()];
  });

  readonly isDebt = computed(() => this.variant() === 'debt');

  /** i18n keys / icon that differ between the savings and debt variants. */
  readonly text = computed(() =>
    this.isDebt()
      ? {
          icon: 'pi pi-credit-card',
          title: 'debts.listTitle',
          add: 'debts.addEntry',
          empty: 'debts.empty',
          toggleActive: 'debts.toggleActive',
          deleteHeader: 'debts.confirmDelete',
          deleteMessage: 'debts.confirmDeleteMessage',
        }
      : {
          icon: 'pi pi-wallet',
          title: 'savings.listTitle',
          add: 'savings.addEntry',
          empty: 'savings.empty',
          toggleActive: 'savings.toggleActive',
          deleteHeader: 'confirm.deleteEntry',
          deleteMessage: 'confirm.deleteEntryMessage',
        },
  );

  directionOf(entry: SavingsEntry): DebtDirection | null {
    return this.isDebt() ? ((entry as Partial<DebtEntry>).direction ?? 'owe') : null;
  }

  directionLabel(entry: SavingsEntry): string {
    return this.directionOf(entry) === 'owedToMe'
      ? this.translate.instant('debts.owedToMe')
      : this.translate.instant('debts.owe');
  }

  directionTagClass(entry: SavingsEntry): string {
    return this.directionOf(entry) === 'owedToMe'
      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300'
      : 'bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300';
  }

  directionIcon(entry: SavingsEntry): string {
    return this.directionOf(entry) === 'owedToMe' ? 'pi pi-arrow-down-left' : 'pi pi-arrow-up-right';
  }

  /** Sign shown before the base-currency value: debts I owe are minus, owed to me is plus. */
  valueSign(entry: SavingsEntry): string {
    const direction = this.directionOf(entry);
    if (direction === 'owe') return '−';
    if (direction === 'owedToMe') return '+';
    return '';
  }

  valueClass(entry: SavingsEntry): string {
    return this.directionOf(entry) === 'owe'
      ? 'font-semibold text-rose-600 dark:text-rose-400'
      : 'font-semibold text-[var(--color-primary)]';
  }

  entryType(entry: SavingsEntry): 'money' | 'metal' {
    return entry.type ?? 'money';
  }

  convertedAmount(entry: SavingsEntry): number | null {
    return valueEntryInBase(
      entry,
      this.exchangeStore().getRateToBase(),
      this.metalStore().getMetalPricePerGramInBase(),
    );
  }

  tagLabel(entry: SavingsEntry): string {
    return this.entryType(entry) === 'money'
      ? this.translate.instant('savings.tagMoney')
      : this.translate.instant(metalLabelKey(entry.metal));
  }

  tagIcon(entry: SavingsEntry): string {
    return this.entryType(entry) === 'money' ? 'pi pi-money-bill' : metalIcon(entry.metal);
  }

  tagClass(entry: SavingsEntry): string {
    if (this.entryType(entry) === 'money') {
      return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300';
    }
    switch (entry.metal) {
      case 'gold':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300';
      case 'silver':
        return 'bg-stone-200 text-stone-700 dark:bg-stone-400/20 dark:text-stone-200';
      case 'platinum':
        return 'bg-stone-100 text-stone-700 dark:bg-stone-300/20 dark:text-stone-100';
      case 'palladium':
        return 'bg-stone-200 text-stone-700 dark:bg-stone-500/20 dark:text-stone-200';
      default:
        return 'bg-stone-100 text-stone-700 dark:bg-stone-500/15 dark:text-stone-300';
    }
  }

  confirmDelete(id: string): void {
    this.confirmService.confirm({
      header: this.translate.instant(this.text().deleteHeader),
      message: this.translate.instant(this.text().deleteMessage),
      icon: 'pi pi-trash',
      actionText: this.translate.instant('common.delete'),
      actionSeverity: 'danger',
      onConfirm: () => this.deleteEntry.emit(id),
    });
  }

  onReorder(): void {
    this.reorder.emit([...this.entriesView()]);
  }
}
