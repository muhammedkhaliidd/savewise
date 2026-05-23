import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import type { MetalCode, MetalPrice } from '../../models/metal-price.model';
import { METAL_OPTIONS, PURITY_OPTIONS } from '../../constants/metal-options';

@Component({
  selector: 'app-metal-price-config',
  standalone: true,
  imports: [
    CommonModule,
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
              Metal <span class="text-red-500">*</span>
            </label>
            <p-select
              [options]="metalOptions"
              [ngModel]="metal()"
              optionLabel="label"
              optionValue="code"
              placeholder="Select metal"
              styleClass="w-full"
              (onChange)="metal.set($event.value)"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-[var(--color-text-muted)] mb-1">
              Purity <span class="text-red-500">*</span>
            </label>
            <p-select
              [options]="purityOptions()"
              [ngModel]="purityLabel()"
              optionLabel="label"
              optionValue="label"
              placeholder="Select purity"
              styleClass="w-full"
              [disabled]="!metal()"
              (onChange)="purityLabel.set($event.value)"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-[var(--color-text-muted)] mb-1">
            Price per gram ({{ baseCurrency() || 'base' }}) <span class="text-red-500">*</span>
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
            Enter the price you pay at this purity (e.g. jeweller's quoted price).
          </p>
        </div>

        <div class="flex items-center justify-between">
          <label class="text-sm font-medium text-[var(--color-text-muted)]">Active</label>
          <p-toggleSwitch [(ngModel)]="activeValue" ariaLabel="Toggle price active" />
        </div>

      <p-button
        [label]="editMode() ? 'Save' : 'Add Price'"
        [icon]="editMode() ? 'pi pi-check' : 'pi pi-plus'"
        (onClick)="addPrice()"
        [disabled]="!canAdd()"
        styleClass="w-full"
      />
    </div>
  `,
})
export class MetalPriceConfigComponent {
  editMode = input(false);
  baseCurrency = input<string>('');
  priceAdded = output<MetalPrice>();

  metalOptions = METAL_OPTIONS;

  metal = signal<MetalCode | ''>('');
  purityLabel = signal('');
  pricePerGramValue = signal<number | null>(null);
  activeValue = signal(true);

  readonly purityOptions = computed(() => {
    const m = this.metal();
    return m ? PURITY_OPTIONS[m] : [];
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
