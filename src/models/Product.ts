import Rate from "./Rate";

export interface Product {
    id?: number;
    name: string;
    description?: string;
    image: string;
    price: number;
    discount: number;
    idCategory?: number;
    avgRate? : number;
    rates? : Rate[];
}
