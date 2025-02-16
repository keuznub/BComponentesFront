import fetchAPI from "./FetchAPI/fetchAPI"

export class UserService{
    static getAll = async () => fetchAPI("users","GET")
    static getById = async (id: number) => fetchAPI(`users/${id}`,"GET")
    static delete = async (id: number) => fetchAPI(`users/${id}`,"DELETE")
}

export default UserService