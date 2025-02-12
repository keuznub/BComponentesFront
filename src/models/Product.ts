export interface Product {
    id: number;
    name: string;
    description?: string;
    image: String;
    price: number;
    discount: number;
    idCategory?: number;
}
