import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

/**
 * Exposes the on-screen keyboard size to CSS so fixed, bottom-anchored UI (e.g. the mobile
 * dropdown sheet) can sit above the keyboard:
 *  - `--keyboard-inset`: height of the area covered by the keyboard (0 when closed, or when the
 *    browser/WebView already resizes the layout viewport for the keyboard).
 *  - `--visual-viewport-height`: height of the area actually visible to the user.
 */
@Injectable({ providedIn: 'root' })
export class VisualViewportService {
  private readonly document = inject(DOCUMENT);
  private started = false;

  start(): void {
    const win = this.document.defaultView;
    const vv = win?.visualViewport;
    if (this.started || !win || !vv) return;
    this.started = true;

    const root = this.document.documentElement;
    const update = (): void => {
      const inset = Math.max(0, win.innerHeight - vv.height - vv.offsetTop);
      root.style.setProperty('--keyboard-inset', `${Math.round(inset)}px`);
      root.style.setProperty('--visual-viewport-height', `${Math.round(vv.height)}px`);
    };

    update();
    vv.addEventListener('resize', update);
    vv.addEventListener('scroll', update);
  }
}
