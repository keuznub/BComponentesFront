import { Product } from "../models/Product"
import fetchAPI from "./FetchAPI/fetchAPI"

export class ProductService{
    static getAll = async () => fetchAPI("products","GET")
    static getById = async (id: number) => fetchAPI(`products/${id}`,"GET")
    static save = async (product: Product,productCategories:number[]) => fetchAPI(`products`,"POST", {product:product,categories:productCategories})
    static delete = async (id: number) => fetchAPI(`products/${id}`,"DELETE")
}

export default ProductService


