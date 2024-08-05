import { Product } from './index';

export interface ApiResponse {
    isSuccess: boolean;
    value: Product[];
    error: string | null;
}