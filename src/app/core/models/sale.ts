export interface SaleDetails {
    productId: string,
    name: string,
    description: string,
    unitPrice: number,
    total: number,
    extras: Array<
        {
            name: string,
            value?: string,
            price?: number;
        }>;
}

export interface Sale {
    id?: string,
    voucherId?: string,
    dateEmitted?: Date | string,
    establishmentTaxId: string,
    establishmentName: string,
    totalSale?: number,
    billTo: {
        name: string,
        taxId: string,
        address: string,
        email: string;
    },
    saleDetails: SaleDetails[];
    seller?: {
        id: string,
        name: string;
    };
}