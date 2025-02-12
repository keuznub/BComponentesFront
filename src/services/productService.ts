import { Product } from "../models/Product"
import fetchAPI from "../utils/FetchAPI/fetchAPI"

export class ProductService{
    static getAll = async ():Promise<any[]> => fetchAPI("products","GET")
    static getById = async (id: number) => fetchAPI(`products/${id}`,"GET")
    static save = async (product: Product) => fetchAPI(`products`,"POST", product)
    static delete = async (id: number) => fetchAPI(`products/${id}`,"DELETE")
}

export default ProductService


