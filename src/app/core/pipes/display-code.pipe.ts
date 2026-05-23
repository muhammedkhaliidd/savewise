import { Pipe, PipeTransform } from '@angular/core';

export function currencyDisplayKey(code: string): string {
  return `currency.codes.${code}`;
}

export function currencyNameKey(code: string): string {
  return `currency.names.${code}`;
}

/** Pure pipe: maps ISO code → i18n name key for use with `| translate`. */
@Pipe({
  name: 'currencyName',
  standalone: true,
  pure: true,
})
export class CurrencyNamePipe implements PipeTransform {
  transform(code: string | null | undefined): string {
    if (!code) {
      return '';
    }
    return currencyNameKey(code);
  }
}

/** Pure pipe: maps ISO code → i18n key for use with `| translate`. */
@Pipe({
  name: 'displayCode',
  standalone: true,
  pure: true,
})
export class DisplayCodePipe implements PipeTransform {
  transform(code: string | null | undefined): string {
    if (!code) {
      return '';
    }
    return currencyDisplayKey(code);
  }
}
