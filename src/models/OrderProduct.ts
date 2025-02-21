import { Product } from "./Product";


export interface OrderProduct {
    idProduct: number;
    product?: Product;
    idOrder?: number;
    quantity: number
}
