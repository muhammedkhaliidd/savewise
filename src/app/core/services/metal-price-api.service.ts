import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import type { MetalApiPrice, MetalCode } from '../../features/metals/models/metal-price.model';
import { TROY_OUNCE_GRAMS } from '../../features/metals/constants/metal-options';

interface GoldApiResponse {
  name: string;
  price: number;
  symbol: string;
  currency: string;
  updatedAt: string;
}

const SYMBOL_BY_METAL: Record<MetalCode, string> = {
  gold: 'XAU',
  silver: 'XAG',
  platinum: 'XPT',
  palladium: 'XPD',
};

@Injectable({ providedIn: 'root' })
export class MetalPriceApiService {
  private readonly http = inject(HttpClient);

  fetchSpot(): Observable<MetalApiPrice[]> {
    const calls = (Object.entries(SYMBOL_BY_METAL) as [MetalCode, string][]).map(
      ([metal, symbol]) =>
        this.http.get<GoldApiResponse>(`https://api.gold-api.com/price/${symbol}`).pipe(
          map((res): MetalApiPrice | null =>
            typeof res?.price === 'number' && res.price > 0
              ? { metal, pricePerGramUsd: res.price / TROY_OUNCE_GRAMS }
              : null,
          ),
          catchError(() => of<MetalApiPrice | null>(null)),
        ),
    );
    return forkJoin(calls).pipe(
      map((results) => results.filter((r): r is MetalApiPrice => r !== null)),
    );
  }
}
