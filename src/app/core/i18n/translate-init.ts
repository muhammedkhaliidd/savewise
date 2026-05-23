import { inject } from '@angular/core';
import { LocaleService } from '../services/locale.service';

export function initLocale(): () => Promise<void> {
  const locale = inject(LocaleService);
  return () => locale.init();
}
