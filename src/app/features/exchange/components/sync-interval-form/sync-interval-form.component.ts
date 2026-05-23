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
import type {
  SyncIntervalSetting,
  SyncIntervalUnit,
} from '../../models/exchange-rate.model';
import {
  SELECT_OVERLAY_OPTIONS,
  SELECT_PANEL_STYLE,
  SELECT_PANEL_STYLE_CLASS,
} from '../../../../core/constants/select-overlay';

@Component({
  selector: 'app-sync-interval-form',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ButtonModule,
    InputNumberModule,
    SelectModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid gap-4">
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <div>
          <label class="block text-sm font-medium text-[var(--color-text-muted)] mb-1">
            {{ 'exchange.syncForm.every' | translate }} <span class="text-red-500">*</span>
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
            {{ 'exchange.syncForm.unit' | translate }} <span class="text-red-500">*</span>
          </label>
          <p-select
            [(ngModel)]="unit"
            [options]="unitOptions()"
            optionLabel="label"
            optionValue="value"
            styleClass="w-full"
            [panelStyle]="selectPanelStyle"
            [panelStyleClass]="selectPanelStyleClass"
            [overlayOptions]="selectOverlayOptions"
          />
        </div>
      </div>

      <p class="text-xs text-[var(--color-text-muted)]">
        {{ allowedHint() }}
      </p>

      <p-button
        [label]="'common.save' | translate"
        (onClick)="save()"
        [disabled]="!canSave()"
        styleClass="w-full"
      />
    </div>
  `,
})
export class SyncIntervalFormComponent {
  private readonly translate = inject(TranslateService);
  private readonly langTick = toSignal(this.translate.onLangChange, { initialValue: null });

  readonly selectOverlayOptions = SELECT_OVERLAY_OPTIONS;
  readonly selectPanelStyle = SELECT_PANEL_STYLE;
  readonly selectPanelStyleClass = SELECT_PANEL_STYLE_CLASS;

  initial = input.required<SyncIntervalSetting>();
  intervalChanged = output<SyncIntervalSetting>();

  value = signal(1);
  unit = signal<SyncIntervalUnit>('hours');

  readonly unitOptions = computed(() => {
    this.langTick();
    return [
      { label: this.translate.instant('exchange.syncForm.minutes'), value: 'minutes' as SyncIntervalUnit },
      { label: this.translate.instant('exchange.syncForm.hours'), value: 'hours' as SyncIntervalUnit },
    ];
  });

  readonly bounds = computed(() =>
    this.unit() === 'minutes' ? { min: 30, max: 1440 } : { min: 1, max: 24 },
  );

  readonly allowedHint = computed(() => {
    this.langTick();
    const { min, max } = this.bounds();
    const unitKey =
      this.unit() === 'minutes'
        ? max === 1
          ? 'common.minute'
          : 'common.minutes'
        : max === 1
          ? 'common.hour'
          : 'common.hours';
    return this.translate.instant('exchange.syncForm.allowed', {
      min,
      max,
      unit: this.translate.instant(unitKey),
    });
  });

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
