import { BehaviorSubject, Observable } from 'rxjs';

export interface Product {
    id: number | string;
    name: string;
    description: string;
    imageUrl: string;
    size: Array<ProductExtra>;
    candy: Array<ProductExtra>;
    syrup: Array<ProductExtra>;
}

export interface ProductExtra {
    name: string;
    price: number;
}

export interface ProductToCheckout {
    id: number | string;
    name: string;
    description: string;
    price: (sizePrice: number, candyPrice?: number, syrupPrice?: number) => number;
    size: ProductExtra;
    candy?: ProductExtra;
    syrup?: ProductExtra;
}
export interface CartItem {
    product: Product;
    productToCheckout: ProductToCheckout;
    price?: Observable<number>;
    price$: BehaviorSubject<number>;
}