import type { OverlayListenerOptions, OverlayOptions } from 'primeng/api';

// Note: `appendTo` is not set here because p-select ignores `overlayOptions.appendTo` in
// PrimeNG 21; overlays are appended to <body> app-wide via `overlayAppendTo` in app.config.ts.

function isTouchDevice(): boolean {
  return typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
}

/**
 * Short, non-searchable dropdowns (metal, purity, sync unit…): the panel stays anchored to the
 * field on every screen size, with PrimeNG's default close-on-scroll behaviour.
 */
export const SELECT_OVERLAY_OPTIONS: OverlayOptions = {};

/**
 * Long, searchable dropdowns (currency, savings multi-selects).
 *
 * - On phones the panel opens as a bottom sheet (32px above the bottom safe area / keyboard,
 *   max 50vh tall) instead of anchoring it to the field. Modal mode is never re-aligned, so the
 *   panel doesn't jump while the user types in the filter. Styles: `.select-overlay-sheet`.
 * - On touch devices, ancestor scrolls don't close the panel: the on-screen keyboard opened by
 *   the filter input makes the browser scroll the page/dialog, which would otherwise close the
 *   list while typing. PrimeNG already ignores `resize` on touch devices for the same reason.
 */
export const SEARCHABLE_SELECT_OVERLAY_OPTIONS: OverlayOptions = {
  responsive: {
    media: '(max-width: 767px)',
    direction: 'bottom',
    styleClass: 'select-overlay-sheet',
  },
  listener: (_event: Event, options?: OverlayListenerOptions) => {
    if (options?.type === 'scroll' && isTouchDevice()) {
      return false;
    }
    return options?.valid;
  },
};

export const SELECT_PANEL_STYLE: Record<string, string> = {
  maxWidth: 'min(22rem, calc(100vw - 1.5rem))',
  width: 'min(22rem, calc(100vw - 1.5rem))',
};

export const SELECT_PANEL_STYLE_CLASS = 'select-overlay-panel';
