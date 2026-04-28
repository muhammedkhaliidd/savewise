import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Toast } from 'primeng/toast';
import { ExchangeRateStore } from './stores/exchange-rate.store';
import { SavingsStore } from './stores/savings.store';
import { RouterOutlet } from '@angular/router';
import { AppLayoutComponent } from './core/layout/app-layout/app-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    ConfirmDialog,
    Toast,
    RouterOutlet,
    AppLayoutComponent,
  ],
  providers: [ExchangeRateStore, SavingsStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
})
export class App {}
