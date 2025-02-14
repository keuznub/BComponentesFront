import { User } from "../models/User"
import fetchAPI from "./FetchAPI/fetchAPI"
export class AuthService{
    static loginUser = async (email: string, password: string) => fetchAPI("auth/login","POST",{email,password})
    static registerUser = async (user: User) => fetchAPI("auth/register","POST",user)
    static logoutUser = async () => fetchAPI("auth/logout","POST")
}
export default AuthService