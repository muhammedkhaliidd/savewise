import type { OverlayOptions } from 'primeng/api';

/** Keeps p-select overlays out of scroll containers and within the viewport on mobile. */
export const SELECT_OVERLAY_OPTIONS: OverlayOptions = {
  appendTo: 'body',
};

export const SELECT_PANEL_STYLE: Record<string, string> = {
  maxWidth: 'min(22rem, calc(100vw - 1.5rem))',
  width: 'min(22rem, calc(100vw - 1.5rem))',
};

export const SELECT_PANEL_STYLE_CLASS = 'select-overlay-panel';
