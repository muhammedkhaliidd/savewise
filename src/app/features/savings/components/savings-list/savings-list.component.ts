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
  deleteEntry = output<string>();
  editEntry = output<SavingsEntry>();
  addEntry = output<void>();
  toggleActive = output<{ id: string; active: boolean }>();
  reorder = output<SavingsEntry[]>();

  entriesView = computed(() => {
    this.langTick();
    return [...this.entries()];
  });

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
      header: this.translate.instant('confirm.deleteEntry'),
      message: this.translate.instant('confirm.deleteEntryMessage'),
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
