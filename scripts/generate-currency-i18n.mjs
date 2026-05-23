/**
 * Merges currency.codes into public/assets/i18n/{en,ar}.json.
 * en: ISO codes; ar: Arabic symbols/abbreviations (manual entries preserved).
 * Run: npm run i18n:currencies
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import currencyCodes from 'currency-codes';

const __dirname = dirname(fileURLToPath(import.meta.url));
const i18nDir = join(__dirname, '..', 'public', 'assets', 'i18n');

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
for (const { code } of currencyCodes.data) {
  codesEn[code] = code;
  codesAr[code] = arabicCurrencySymbol(code);
}

for (const [lang, codes] of [
  ['en', codesEn],
  ['ar', codesAr],
]) {
  const filePath = join(i18nDir, `${lang}.json`);
  const bundle = JSON.parse(readFileSync(filePath, 'utf8'));
  bundle.currency ??= {};
  const existing = bundle.currency.codes ?? {};
  bundle.currency.codes = { ...codes, ...existing };
  writeFileSync(filePath, JSON.stringify(bundle, null, 2) + '\n');
}

console.log(`Merged ${Object.keys(codesEn).length} currency codes into en.json and ar.json`);
