import { User } from "../models/User"
import fetchAPI from "./FetchAPI/fetchAPI"

export class UserService{
    static getAll = async () => await fetchAPI("users","GET")
    static getById = async (id: number) => await fetchAPI(`users/${id}`,"GET")
    static delete = async (id: number) => await fetchAPI(`users/${id}`,"DELETE")
    static update = async (id: number, user: User) => await fetchAPI(`users/${id}`,"PUT", user)
}

export default UserService