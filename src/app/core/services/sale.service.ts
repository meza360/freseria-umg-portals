import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Sale } from '../models';
import { catchError, map, Observable, tap } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private apiUrl: string = environment.apiUrl;
  constructor (private httpClient: HttpClient) { }

  newSale(sale: Sale) {
    return this.httpClient.post<ApiResponse>(`${this.apiUrl}/sales`, sale)
      .pipe(
        tap(console.debug),
        map((response: ApiResponse) => {
          if (response.isSuccess) {
            return <Sale>response.value;
          }
          throw new HttpErrorResponse({ error: response.error, status: 500, statusText: 'Internal Server Error' });
        }),
        catchError((error) => {
          console.error(error);
          return new Observable<Sale>(observer => {
            observer.error({ isSuccess: false, value: null });
            observer.complete();
          }
          );
        }
        )
      );
  }
  getSale(orderId: string): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(`${this.apiUrl}/sales/findId/${orderId}`)
      .pipe(
        tap(console.debug),
      );
  }
}
