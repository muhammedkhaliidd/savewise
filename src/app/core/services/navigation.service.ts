import { Injectable, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { OverlayStackService } from './overlay-stack.service';
import { ToastService } from './toast.service';

const DOUBLE_TAP_WINDOW_MS = 2000;
const ROOT_PATHS = new Set(['/', '/dashboard']);

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private readonly location = inject(Location);
  private readonly router = inject(Router);
  private readonly overlays = inject(OverlayStackService);
  private readonly toast = inject(ToastService);

  private lastBackAtRoot = 0;

  async goBack(opts: { allowExit?: boolean } = {}): Promise<void> {
    if (this.overlays.closeTop()) return;

    const path = this.router.url.split('?')[0].split('#')[0];
    const onRoot = ROOT_PATHS.has(path);

    if (!onRoot) {
      if (window.history.length > 1) {
        this.location.back();
      } else {
        void this.router.navigate(['/dashboard']);
      }
      return;
    }

    if (!opts.allowExit) return;

    const now = Date.now();
    if (now - this.lastBackAtRoot < DOUBLE_TAP_WINDOW_MS) {
      const { App } = await import('@capacitor/app');
      await App.exitApp();
      return;
    }
    this.lastBackAtRoot = now;
    this.toast.info('Press back again to exit', '', DOUBLE_TAP_WINDOW_MS);
  }
}
