import type { AppLocale } from '../services/locale.service';

/** SVG flags — render consistently on Windows web and mobile (unlike emoji flags). */
export const LOCALE_FLAG_SRC: Record<AppLocale, string> = {
  en: 'assets/flags/us.svg',
  ar: 'assets/flags/eg.svg',
};
