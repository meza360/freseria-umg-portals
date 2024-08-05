import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { catchError, map, Observable, tap } from 'rxjs';
import { Product } from '../models';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl: string = environment.apiUrl;
  private productsCatalog: Array<Product> = [];
  constructor (private httpClient: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    if (this.productsCatalog.length > 0) {
      return new Observable<Product[]>((observer) => {
        observer.next(this.productsCatalog);
        observer.complete();
      });
    }
    return this.httpClient.get<ApiResponse>(`${this.apiUrl}/products`, {})
      .pipe(
        tap(console.debug),
        map((response: ApiResponse) => {
          if (response.isSuccess) {
            return response.value;
          }
          return [];
        }
        ),
        catchError((selector) => {
          console.error(selector);
          return new Observable<Product[]>((observer) => {
            observer.error([]);
            //observer.complete();
          });
        }
        ));
  }
}
