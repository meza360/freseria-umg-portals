import { Product, Sale } from './index';

export interface ApiResponse {
    isSuccess: boolean;
    value: Product[]
    | Sale
    | Array<Sale>;
    error: string | null;
}