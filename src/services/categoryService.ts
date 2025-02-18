import { Category } from "../models/Category"
import fetchAPI from "./FetchAPI/fetchAPI"

export class CategoryService{
    static getAll = async () => await fetchAPI("categories","GET")
    static getById = async (id: number) => await fetchAPI(`categories/${id}`,"GET")
    static save = async (category: Category) => await fetchAPI(`categories`,"POST", category)
    static delete = async (id: number) => await fetchAPI(`categories/${id}`,"DELETE")
}

export default CategoryService