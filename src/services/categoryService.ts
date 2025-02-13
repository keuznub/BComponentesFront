import { Category } from "../models/Category"
import fetchAPI from "./FetchAPI/fetchAPI"

export class CategoryService{
    static getAll = async () => fetchAPI("categories","GET")
    static getById = async (id: number) => fetchAPI(`categories/${id}`,"GET")
    static save = async (category: Category) => fetchAPI(`categories`,"POST", category)
    static delete = async (id: number) => fetchAPI(`categories/${id}`,"DELETE")
}

export default CategoryService