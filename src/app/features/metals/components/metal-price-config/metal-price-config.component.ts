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
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import type { MetalCode, MetalPrice } from '../../models/metal-price.model';
import { METAL_OPTIONS, PURITY_OPTIONS } from '../../constants/metal-options';
import {
  SELECT_OVERLAY_OPTIONS,
  SELECT_PANEL_STYLE,
  SELECT_PANEL_STYLE_CLASS,
} from '../../../../core/constants/select-overlay';

@Component({
  selector: 'app-metal-price-config',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ButtonModule,
    InputNumberModule,
    SelectModule,
    ToggleSwitchModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid gap-4">
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <div>
            <label class="block text-sm font-medium text-[var(--color-text-muted)] mb-1">
              {{ 'metals.form.metal' | translate }} <span class="text-red-500">*</span>
            </label>
            <p-select
              [options]="metalOptions()"
              [ngModel]="metal()"
              optionLabel="label"
              optionValue="code"
              [placeholder]="'metals.form.selectMetal' | translate"
              styleClass="w-full"
              [panelStyle]="selectPanelStyle"
              [panelStyleClass]="selectPanelStyleClass"
              [overlayOptions]="selectOverlayOptions"
              (onChange)="metal.set($event.value)"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-[var(--color-text-muted)] mb-1">
              {{ 'metals.form.purity' | translate }} <span class="text-red-500">*</span>
            </label>
            <p-select
              [options]="purityOptions()"
              [ngModel]="purityLabel()"
              optionLabel="label"
              optionValue="label"
              [placeholder]="'metals.form.selectPurity' | translate"
              styleClass="w-full"
              [panelStyle]="selectPanelStyle"
              [panelStyleClass]="selectPanelStyleClass"
              [overlayOptions]="selectOverlayOptions"
              [disabled]="!metal()"
              (onChange)="purityLabel.set($event.value)"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-[var(--color-text-muted)] mb-1">
            {{ pricePerGramLabel() }} <span class="text-red-500">*</span>
          </label>
          <p-inputNumber
            [(ngModel)]="pricePerGramValue"
            mode="decimal"
            [minFractionDigits]="2"
            [maxFractionDigits]="6"
            placeholder="0.00"
            styleClass="w-full"
          />
          <p class="text-xs text-[var(--color-text-muted)] mt-1">
            {{ 'metals.form.priceHint' | translate }}
          </p>
        </div>

        <div class="flex items-center justify-between">
          <label class="text-sm font-medium text-[var(--color-text-muted)]">{{
            'common.active' | translate
          }}</label>
          <p-toggleSwitch
            [(ngModel)]="activeValue"
            [ariaLabel]="'metals.form.toggleActive' | translate"
          />
        </div>

      <p-button
        [label]="editMode() ? ('common.save' | translate) : ('metals.form.addPrice' | translate)"
        [icon]="editMode() ? 'pi pi-check' : 'pi pi-plus'"
        (onClick)="addPrice()"
        [disabled]="!canAdd()"
        styleClass="w-full"
      />
    </div>
  `,
})
export class MetalPriceConfigComponent {
  private readonly translate = inject(TranslateService);
  private readonly langTick = toSignal(this.translate.onLangChange, { initialValue: null });

  readonly selectOverlayOptions = SELECT_OVERLAY_OPTIONS;
  readonly selectPanelStyle = SELECT_PANEL_STYLE;
  readonly selectPanelStyleClass = SELECT_PANEL_STYLE_CLASS;

  editMode = input(false);
  baseCurrency = input<string>('');
  priceAdded = output<MetalPrice>();

  metal = signal<MetalCode | ''>('');
  purityLabel = signal('');
  pricePerGramValue = signal<number | null>(null);
  activeValue = signal(true);

  readonly metalOptions = computed(() => {
    this.langTick();
    return METAL_OPTIONS.map((o) => ({
      ...o,
      label: this.translate.instant(`metals.${o.code}`),
    }));
  });

  readonly purityOptions = computed(() => {
    const m = this.metal();
    return m ? PURITY_OPTIONS[m] : [];
  });

  readonly pricePerGramLabel = computed(() => {
    this.langTick();
    return this.translate.instant('metals.form.pricePerGram', {
      currency: this.baseCurrency() || this.translate.instant('common.base'),
    });
  });

  canAdd = computed(() => {
    const m = this.metal();
    const purity = this.purityLabel();
    const price = this.pricePerGramValue();
    return !!m && !!purity && price !== null && price > 0;
  });

  private suppressPurityReset = false;

  constructor() {
    effect(() => {
      const m = this.metal();
      if (this.suppressPurityReset) return;
      if (!m) {
        this.purityLabel.set('');
        return;
      }
      const opts = PURITY_OPTIONS[m];
      const current = this.purityLabel();
      if (!opts.some((o) => o.label === current)) {
        this.purityLabel.set(opts[0]?.label ?? '');
      }
    });
  }

  addPrice(): void {
    if (!this.canAdd()) return;
    this.priceAdded.emit({
      metal: this.metal() as MetalCode,
      purityLabel: this.purityLabel(),
      pricePerGram: this.pricePerGramValue() ?? 0,
      active: this.activeValue(),
    });
    this.reset();
  }

  reset(): void {
    this.metal.set('');
    this.purityLabel.set('');
    this.pricePerGramValue.set(null);
    this.activeValue.set(true);
  }

  setValues(metal: MetalCode, purity: string, price: number, active = true): void {
    this.suppressPurityReset = true;
    this.metal.set(metal);
    this.purityLabel.set(purity);
    this.pricePerGramValue.set(price);
    this.activeValue.set(active);
    queueMicrotask(() => {
      this.suppressPurityReset = false;
    });
  }
}
