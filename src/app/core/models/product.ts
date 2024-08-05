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