import { Category } from "./Category";
import Rate from "./Rate";

export interface Product {
    id?: number;
    name: string;
    description?: string;
    image: string;
    price: number;
    discount: number;
    avgRate? : number;
    rates? : Rate[];
    categoryProduct?: {category: Category}[]
}
