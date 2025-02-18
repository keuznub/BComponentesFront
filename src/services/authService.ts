import { User } from "../models/User"
import fetchAPI from "./FetchAPI/fetchAPI"
export class AuthService{
    static loginUser = async (email: string, password: string) => await fetchAPI("auth/login","POST",{email,password})
    static registerUser = async (user: User) => await fetchAPI("auth/register","POST",user)
    static logoutUser = async () => await fetchAPI("auth/logout","POST")
}
export default AuthService