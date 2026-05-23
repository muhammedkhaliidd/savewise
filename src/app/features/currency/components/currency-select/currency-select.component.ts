import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import type { Currency } from '../../models/currency.model';
import {
  CurrencyNamePipe,
  currencyNameKey,
} from '../../../../core/pipes/display-code.pipe';
import {
  SELECT_OVERLAY_OPTIONS,
  SELECT_PANEL_STYLE,
  SELECT_PANEL_STYLE_CLASS,
} from '../../../../core/constants/select-overlay';

type CurrencyOption = Currency & { localizedName: string };

@Component({
  selector: 'app-currency-select',
  standalone: true,
  imports: [CommonModule, SelectModule, FormsModule, TranslateModule, CurrencyNamePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-w-0 w-full max-w-full">
      <p-select
        [options]="selectOptions()"
        [ngModel]="selectedValue()"
        optionLabel="code"
        optionValue="code"
        [filter]="true"
        filterBy="code,name,localizedName"
        [placeholder]="resolvedPlaceholder()"
        (onChange)="selectionChange.emit($event.value)"
        [styleClass]="styleClass()"
        [panelStyle]="panelStyle"
        [panelStyleClass]="panelStyleClass"
        [overlayOptions]="overlayOptions"
        scrollHeight="240px"
      >
        <ng-template let-currency pTemplate="item">
          <div class="flex min-w-0 max-w-full items-center gap-2">
            <span class="shrink-0 font-semibold">{{ currency.code }}</span>
            <span class="min-w-0 flex-1 truncate text-[var(--color-text-muted)] text-sm">
              {{ currency.code | currencyName | translate }}
            </span>
          </div>
        </ng-template>
        <ng-template pTemplate="selectedItem">
          <span class="truncate">{{ selectedLabel() }}</span>
        </ng-template>
      </p-select>
    </div>
  `,
})
export class CurrencySelectComponent {
  private readonly translate = inject(TranslateService);
  private readonly langTick = toSignal(this.translate.onLangChange, { initialValue: null });

  readonly panelStyle = SELECT_PANEL_STYLE;
  readonly panelStyleClass = SELECT_PANEL_STYLE_CLASS;
  readonly overlayOptions = SELECT_OVERLAY_OPTIONS;

  currencies = input.required<Currency[]>();
  selectedCode = input<string>('');
  placeholder = input<string>('');
  styleClass = input<string>('w-full');
  selectionChange = output<string>();

  selectedValue = signal('');

  readonly selectOptions = computed((): CurrencyOption[] => {
    this.langTick();
    return this.currencies().map((c) => {
      const key = currencyNameKey(c.code);
      const translated = this.translate.instant(key);
      return {
        ...c,
        localizedName: translated !== key ? translated : c.name,
      };
    });
  });

  readonly selectedLabel = computed(() => {
    this.langTick();
    const code = this.selectedValue();
    if (!code) {
      return '';
    }
    const key = currencyNameKey(code);
    const name = this.translate.instant(key);
    const label = name !== key ? name : this.currencies().find((c) => c.code === code)?.name ?? '';
    return `${code} — ${label}`;
  });

  resolvedPlaceholder(): string {
    this.langTick();
    const custom = this.placeholder();
    return custom || this.translate.instant('currency.selectCurrency');
  }

  constructor() {
    effect(() => {
      const code = this.selectedCode();
      if (code) {
        this.selectedValue.set(code);
      }
    });
  }
}
