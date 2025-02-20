import { Product } from "../models/Product"
import fetchAPI from "./FetchAPI/fetchAPI"

export class ProductService{
    static getAll = async (page?:number,name?:string) => await fetchAPI(`products?page=${page}&name=${name}`,"GET")
    static getById = async (id: number) => await fetchAPI(`products/${id}`,"GET")
    static save = async (product: Product,productCategories:number[]) => await fetchAPI(`products`,"POST", {product:product,categories:productCategories})
    static delete = async (id: number) => await fetchAPI(`products/${id}`,"DELETE")
}

export default ProductService


