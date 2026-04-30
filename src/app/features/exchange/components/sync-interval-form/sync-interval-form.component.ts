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
import type {
  SyncIntervalSetting,
  SyncIntervalUnit,
} from '../../models/exchange-rate.model';

@Component({
  selector: 'app-sync-interval-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputNumberModule, SelectModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid gap-4">
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <div>
          <label class="block text-sm font-medium text-[var(--color-text-muted)] mb-1">
            Every <span class="text-red-500">*</span>
          </label>
          <p-inputNumber
            [(ngModel)]="value"
            [min]="bounds().min"
            [max]="bounds().max"
            mode="decimal"
            [useGrouping]="false"
            styleClass="w-full"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-[var(--color-text-muted)] mb-1">
            Unit <span class="text-red-500">*</span>
          </label>
          <p-select
            [(ngModel)]="unit"
            [options]="unitOptions"
            optionLabel="label"
            optionValue="value"
            styleClass="w-full"
          />
        </div>
      </div>

      <p class="text-xs text-[var(--color-text-muted)]">
        Allowed: {{ bounds().min }}–{{ bounds().max }} {{ unit() }}
      </p>

      <p-button
        [label]="'Save'"
        (onClick)="save()"
        [disabled]="!canSave()"
        styleClass="w-full"
      />
    </div>
  `,
})
export class SyncIntervalFormComponent {
  initial = input.required<SyncIntervalSetting>();
  intervalChanged = output<SyncIntervalSetting>();

  value = signal(1);
  unit = signal<SyncIntervalUnit>('hours');

  readonly unitOptions = [
    { label: 'Minutes', value: 'minutes' as SyncIntervalUnit },
    { label: 'Hours', value: 'hours' as SyncIntervalUnit },
  ];

  readonly bounds = computed(() =>
    this.unit() === 'minutes' ? { min: 30, max: 1440 } : { min: 1, max: 24 },
  );

  readonly canSave = computed(() => {
    const v = this.value();
    const { min, max } = this.bounds();
    return v != null && Number.isFinite(v) && v >= min && v <= max;
  });

  constructor() {
    effect(() => {
      const { value, unit } = this.initial();
      this.value.set(value);
      this.unit.set(unit);
    });

    effect(() => {
      const { min, max } = this.bounds();
      const v = this.value();
      if (v == null || !Number.isFinite(v)) {
        this.value.set(min);
      } else if (v < min) {
        this.value.set(min);
      } else if (v > max) {
        this.value.set(max);
      }
    });
  }

  save(): void {
    if (this.canSave()) {
      this.intervalChanged.emit({ value: this.value(), unit: this.unit() });
    }
  }
}
