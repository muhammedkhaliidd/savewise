import { Injectable, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

export type AppLocale = 'en' | 'ar';

const STORAGE_KEY = 'money-calc-locale';
const SUPPORTED: AppLocale[] = ['en', 'ar'];

@Injectable({ providedIn: 'root' })
export class LocaleService {
  private readonly translate = inject(TranslateService);
  private readonly title = inject(Title);

  private readonly _locale = signal<AppLocale>(this.readStoredLocale());

  readonly locale = this._locale.asReadonly();
  readonly isRtl = () => this._locale() === 'ar';

  readonly languageOptions = [
    { code: 'en' as AppLocale, labelKey: 'settings.langEn' },
    { code: 'ar' as AppLocale, labelKey: 'settings.langAr' },
  ];

  /** Call from APP_INITIALIZER before first render. */
  init(): Promise<void> {
    const lang = this.readStoredLocale();
    return this.applyLocale(lang);
  }

  setLocale(lang: AppLocale): Promise<void> {
    if (lang === this._locale()) {
      return Promise.resolve();
    }
    localStorage.setItem(STORAGE_KEY, lang);
    return this.applyLocale(lang);
  }

  private async applyLocale(lang: AppLocale): Promise<void> {
    await firstValueFrom(this.translate.use(lang));
    this._locale.set(lang);
    this.applyDocumentAttrs(lang);
    this.updateTitle();
  }

  private applyDocumentAttrs(lang: AppLocale): void {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  private updateTitle(): void {
    this.title.setTitle(this.translate.instant('app.title'));
  }

  private readStoredLocale(): AppLocale {
    const saved = localStorage.getItem(STORAGE_KEY) as AppLocale | null;
    return saved && SUPPORTED.includes(saved) ? saved : 'en';
  }
}
