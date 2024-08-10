import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services';
import { asyncScheduler, BehaviorSubject, Observable, observeOn } from 'rxjs';
import { CartItem, Product } from '../../../core/models';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSelectChange } from '@angular/material/select';
import { v4 as uuidv4 } from 'uuid';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  isLoadingProducts$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isLoading: Observable<boolean> = this.isLoadingProducts$.asObservable()
    .pipe(observeOn(asyncScheduler));
  products: Product[] = [];
  cartToCheckout: CartItem[] = [];
  cartTotal$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  cartTotal: Observable<number> = this.cartTotal$.asObservable()
    .pipe(observeOn(asyncScheduler));

  constructor (
    private productsService: ProductsService,
    private formBuilder: FormBuilder) {
    this.refreshProducts();
  }

  ngOnInit(): void {
    this.isLoading.subscribe({
      next: (loading: boolean): void => {
        if (!loading) {
          console.debug('Products loaded');
          this.trackPrice();
        }
      },
      complete: (): void => {
      }
    });

  }

  trackSize($event: MatSelectChange, arg1: string | number) {
    const productFound: CartItem = this.cartToCheckout
      .find((item: CartItem): boolean => item.trackId == arg1)!;
    productFound.productToCheckout.size = $event.value;
    this.trackPrice();
  }
  trackCandy($event: MatSelectChange, arg1: string | number) {
    const productFound: CartItem = this.cartToCheckout
      .find((item: CartItem): boolean => item.trackId == arg1)!;
    productFound.productToCheckout.candy = $event.value;
    this.trackPrice();
  }
  trackSyrup($event: MatSelectChange, arg1: string | number) {
    const productFound: CartItem = this.cartToCheckout
      .find((item: CartItem): boolean => item.trackId == arg1)!;
    productFound.productToCheckout.syrup = $event.value;
    this.trackPrice();
  }

  trackPrice() {
    let valor = 0;
    this.cartToCheckout.forEach((val) => {
      const { size, syrup, candy } = val.productToCheckout;
      val.price$.next(
        val.productToCheckout.price(
          size.price,
          candy?.price ?? 0,
          syrup?.price ?? 0));
      valor += val.price$.value;
    });
    this.cartTotal$.next(valor);
  }

  refreshProducts(): void {
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
          this.cartToCheckout.push({
            trackId: uuidv4(),
            product: this.products[0],
            productToCheckout: {
              id: this.products[0].id,
              name: this.products[0].name,
              description: this.products[0].description,
              size: this.products[0].size[0],
              candy: this.products[0].candy[0],
              syrup: this.products[0].syrup[0],
              price: (arg1: number, arg2: number | undefined, arg3: number | undefined): number =>
                (arg1 + (arg2 ?? 0) + (arg3 ?? 0))
            },
            price$: new BehaviorSubject<number>(0)
          });
          this.cartToCheckout[0].price = this.cartToCheckout[0].price$
            .asObservable()
            .pipe(observeOn(asyncScheduler));
          this.cartToCheckout[0].price
            .subscribe({
              next: (price: number): void => {
                console.debug(price);
              }
            });
          this.cartToCheckout[0].price$
            .next(this.cartToCheckout[0]
              .productToCheckout
              .price(
                this.cartToCheckout[0].productToCheckout.size.price,
                this.cartToCheckout[0].productToCheckout.candy?.price ?? 0,
                this.cartToCheckout[0].productToCheckout.syrup?.price ?? 0));
          this.isLoadingProducts$.next(false);
        }
      });
  }

  addProduct(event: any, product: Product) {
    let productToCart: CartItem = {
      trackId: uuidv4(),
      product: product,
      productToCheckout: {
        id: product.id,
        name: product.name,
        description: product.description,
        size: product.size[0],
        candy: product.candy[0],
        syrup: product.syrup[0],
        price: (arg1: number, arg2: number | undefined, arg3: number | undefined): number =>
          (arg1 + (arg2 ?? 0) + (arg3 ?? 0))
      },
      price$: new BehaviorSubject<number>(0)
    };
    this.cartToCheckout.push(productToCart);
    productToCart.price = productToCart.price$
      .asObservable()
      .pipe(observeOn(asyncScheduler));
    productToCart.price
      .subscribe({
        next: (price: number): void => {
          console.debug(price);
        }
      });
    productToCart.price$
      .next(productToCart.productToCheckout
        .price(
          productToCart.productToCheckout.size.price,
          productToCart.productToCheckout.candy?.price ?? 0,
          productToCart.productToCheckout.syrup?.price ?? 0));
  }
  removeProduct(productToRemove: CartItem) {
    //removes product from cartToCheckout array based on trackId
    let index = this.cartToCheckout.indexOf(productToRemove);
    this.cartToCheckout.splice(index, 1);
  }

}
