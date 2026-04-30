import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ExchangeRateApiResponse {
  result: 'success' | 'error';
  base_code: string;
  rates: Record<string, number>;
  time_last_update_unix: number;
}

@Injectable({ providedIn: 'root' })
export class ExchangeRateApiService {
  private readonly http = inject(HttpClient);

  fetchRates(base: string): Observable<ExchangeRateApiResponse> {
    return this.http.get<ExchangeRateApiResponse>(`https://open.er-api.com/v6/latest/${base}`);
  }
}
