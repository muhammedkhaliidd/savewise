import type { MetalCode, PurityOption } from '../models/metal-price.model';

export const TROY_OUNCE_GRAMS = 31.1034768;

export const METAL_CODES: MetalCode[] = ['gold', 'silver', 'platinum', 'palladium'];

export interface MetalOption {
  code: MetalCode;
  label: string;
  icon: string;
}

export const METAL_OPTIONS: MetalOption[] = [
  { code: 'gold', label: 'Gold', icon: 'pi pi-star-fill text-amber-500' },
  { code: 'silver', label: 'Silver', icon: 'pi pi-star text-stone-400' },
  { code: 'platinum', label: 'Platinum', icon: 'pi pi-circle-fill text-stone-300' },
  { code: 'palladium', label: 'Palladium', icon: 'pi pi-circle text-stone-500' },
];

export function metalIcon(code: MetalCode | undefined): string {
  if (!code) return 'pi pi-question-circle';
  return METAL_OPTIONS.find((o) => o.code === code)?.icon ?? 'pi pi-question-circle';
}

export const PURITY_OPTIONS: Record<MetalCode, PurityOption[]> = {
  gold: [
    { label: '24K', factor: 1 },
    { label: '22K', factor: 22 / 24 },
    { label: '21K', factor: 21 / 24 },
    { label: '18K', factor: 18 / 24 },
    { label: '14K', factor: 14 / 24 },
    { label: '10K', factor: 10 / 24 },
  ],
  silver: [
    { label: '999', factor: 0.999 },
    { label: '925', factor: 0.925 },
    { label: '800', factor: 0.8 },
  ],
  platinum: [
    { label: '999', factor: 0.999 },
    { label: '950', factor: 0.95 },
  ],
  palladium: [
    { label: '999', factor: 0.999 },
    { label: '950', factor: 0.95 },
  ],
};

export function lookupPurityFactor(metal: MetalCode, label: string): number {
  return PURITY_OPTIONS[metal]?.find((o) => o.label === label)?.factor ?? 0;
}

export function metalLabelKey(code: MetalCode | undefined): string {
  if (!code) return '';
  return `metals.${code}`;
}

/** @deprecated Use metalLabelKey with TranslateService.instant */
export function metalLabel(code: MetalCode | undefined): string {
  if (!code) return '';
  return METAL_OPTIONS.find((o) => o.code === code)?.label ?? code;
}
