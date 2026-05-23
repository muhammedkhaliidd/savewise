import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import type { MetalApiRow } from '../../models/metal-price.model';
import type { SyncIntervalSetting } from '../../../exchange/models/exchange-rate.model';
import { metalLabelKey } from '../../constants/metal-options';

@Component({
  selector: 'app-api-metal-price-list',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './api-metal-price-list.component.html',
  styles: [':host ::ng-deep li:last-child { border-bottom-width: 0; }'],
})
export class ApiMetalPriceListComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly translate = inject(TranslateService);
  private readonly langTick = toSignal(this.translate.onLangChange, { initialValue: null });

  rows = input.required<MetalApiRow[]>();
  baseCurrency = input.required<string>();
  lastSyncedAt = input<number | null>(null);
  isSyncing = input(false);
  syncInterval = input.required<SyncIntervalSetting>();
  sync = output<void>();

  readonly autoSyncLabel = computed(() => {
    this.langTick();
    const { value, unit } = this.syncInterval();
    const singular = unit === 'hours' ? 'common.hour' : 'common.min';
    const plural = unit === 'hours' ? 'common.hours' : 'common.mins';
    const noun = this.translate.instant(value === 1 ? singular : plural);
    return `${value} ${noun}`;
  });

  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  searchQuery = signal('');

  readonly filteredRows = computed(() => {
    this.langTick();
    const query = this.searchQuery().trim().toLowerCase();
    const rows = this.rows();
    if (!query) return rows;
    return rows.filter((r) =>
      this.translate.instant(metalLabelKey(r.metal)).toLowerCase().includes(query),
    );
  });

  metalLabel(code: MetalApiRow['metal']): string {
    return this.translate.instant(metalLabelKey(code));
  }

  constructor() {
    afterNextRender(() => {
      const el = this.searchInput()?.nativeElement;
      if (!el) return;
      fromEvent<Event>(el, 'input')
        .pipe(
          map((e) => (e.target as HTMLInputElement).value),
          debounceTime(300),
          distinctUntilChanged(),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe((value) => this.searchQuery.set(value));
    });
  }
}
