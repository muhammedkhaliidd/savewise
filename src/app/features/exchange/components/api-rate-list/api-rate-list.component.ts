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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import type { ApiRateRow, SyncIntervalSetting } from '../../models/exchange-rate.model';

@Component({
  selector: 'app-api-rate-list',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, IconFieldModule, InputIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './api-rate-list.component.html',
  styles: [':host ::ng-deep li:last-child { border-bottom-width: 0; }'],
})
export class ApiRateListComponent {
  private readonly destroyRef = inject(DestroyRef);

  rates = input.required<ApiRateRow[]>();
  baseCurrency = input.required<string>();
  lastSyncedAt = input<number | null>(null);
  isSyncing = input(false);
  syncInterval = input.required<SyncIntervalSetting>();
  sync = output<void>();

  readonly autoSyncLabel = computed(() => {
    const { value, unit } = this.syncInterval();
    const singular = unit === 'hours' ? 'Hour' : 'Min';
    const plural = unit === 'hours' ? 'Hours' : 'Mins';
    const noun = value === 1 ? singular : plural;
    return `${value} ${noun}`;
  });

  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  searchQuery = signal('');

  readonly filteredRates = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    if (!query) return this.rates();
    return this.rates().filter((r) => r.currency.toLowerCase().includes(query));
  });

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
