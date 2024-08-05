import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../../core/models';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSelectChange } from '@angular/material/select';

export interface CartItem {
  product: Product;
  price: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  isLoadingProducts$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  products: Product[] = [];
  cartToCheckout: CartItem[] = [];
  cartTotal: number = 0;
  constructor (private productsService: ProductsService) { }

  ngOnInit(): void {
    if (this.isLoadingProducts$) {
      this.productsService.getProducts()
        .subscribe({
          next: (products: Product[]): void => {
            this.products = products;
          },
          error: (error: HttpErrorResponse): void => {
            console.error(error);
            this.isLoadingProducts$.next(false);
          },
          complete: () => {
            this.isLoadingProducts$.next(false);
            this.cartToCheckout.push({
              product: this.products[0],
              price: 0
            });
          }
        });
    }
  }


  trackPrice(event: MatSelectChange, product: string | number): void {
    console.debug(event);
    const productFound: CartItem = this.cartToCheckout.find((item: CartItem): boolean => item.product.id == product)!;
    console.debug(this.cartToCheckout);
  }

}
