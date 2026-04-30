import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import type { ApiRateRow } from '../../models/exchange-rate.model';

@Component({
  selector: 'app-api-rate-list',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './api-rate-list.component.html',
  styles: [':host ::ng-deep li:last-child { border-bottom-width: 0; }'],
})
export class ApiRateListComponent {
  rates = input.required<ApiRateRow[]>();
  baseCurrency = input.required<string>();
  lastSyncedAt = input<number | null>(null);
  isSyncing = input(false);
  sync = output<void>();
}
