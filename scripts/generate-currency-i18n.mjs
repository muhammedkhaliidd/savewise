/**
 * Merges currency.codes and currency.names into public/assets/i18n/{en,ar}.json.
 * Run: npm run i18n:currencies
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import currencyCodes from 'currency-codes';

const __dirname = dirname(fileURLToPath(import.meta.url));
const i18nDir = join(__dirname, '..', 'public', 'assets', 'i18n');
const arNames = new Intl.DisplayNames(['ar'], { type: 'currency' });

function arabicCurrencySymbol(code) {
  try {
    const part = new Intl.NumberFormat('ar', { style: 'currency', currency: code })
      .formatToParts(0)
      .find((p) => p.type === 'currency');
    const value = part?.value?.trim();
    if (value && value !== code) {
      return value;
    }
  } catch {
    /* fallback */
  }
  return code;
}

const codesEn = {};
const codesAr = {};
const namesEn = {};
const namesAr = {};

for (const { code, currency } of currencyCodes.data) {
  codesEn[code] = code;
  codesAr[code] = arabicCurrencySymbol(code);
  namesEn[code] = currency;
  try {
    namesAr[code] = arNames.of(code);
  } catch {
    namesAr[code] = currency;
  }
}

for (const [lang, codes, names] of [
  ['en', codesEn, namesEn],
  ['ar', codesAr, namesAr],
]) {
  const filePath = join(i18nDir, `${lang}.json`);
  const bundle = JSON.parse(readFileSync(filePath, 'utf8'));
  bundle.currency ??= {};
  const existingCodes = bundle.currency.codes ?? {};
  const existingNames = bundle.currency.names ?? {};
  bundle.currency.codes = { ...codes, ...existingCodes };
  bundle.currency.names = { ...names, ...existingNames };
  writeFileSync(filePath, JSON.stringify(bundle, null, 2) + '\n');
}

console.log(
  `Merged ${Object.keys(codesEn).length} currency codes and names into en.json and ar.json`,
);
