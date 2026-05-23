import { Injectable, computed, effect, signal } from '@angular/core';

type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'money-calc-theme';

/** Matches --color-primary (light) and --color-bg (dark) in styles.scss */
const THEME_COLOR_LIGHT = '#059669';
const THEME_COLOR_DARK = '#1c1917';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _mode = signal<ThemeMode>(this.initialMode());
  readonly mode = this._mode.asReadonly();
  readonly isDark = computed(() => this._mode() === 'dark');

  constructor() {
    effect(() => {
      const dark = this.isDark();
      const root = document.documentElement;
      root.classList.toggle('dark', dark);
      localStorage.setItem(STORAGE_KEY, this._mode());
      this.updateThemeColorMeta(dark);
    });
  }

  toggle(): void {
    this._mode.update((m) => (m === 'dark' ? 'light' : 'dark'));
  }

  private updateThemeColorMeta(dark: boolean): void {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', dark ? THEME_COLOR_DARK : THEME_COLOR_LIGHT);
    }
  }

  private initialMode(): ThemeMode {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    if (saved === 'light' || saved === 'dark') return saved;
    return globalThis.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
