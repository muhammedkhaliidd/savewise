import { Injectable, computed, effect, signal } from '@angular/core';

type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'money-calc-theme';

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
    });
  }

  toggle(): void {
    this._mode.update((m) => (m === 'dark' ? 'light' : 'dark'));
  }

  private initialMode(): ThemeMode {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
