import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import AuthService from "../services/authService"
import toast from "react-hot-toast"
import { HttpException } from "../exceptions/HttpExcepction"


interface AuthContextType{
    user: UserPayload | null
    isAuthenticated: boolean
    isAdmin: boolean
    login: (email:string,password:string)=>Promise<any>
    logout: ()=>Promise<any>
    autoLogin: ()=>void
    
}

interface UserPayload{
    id:number,
    role:string
    
}

const AuthContext = createContext<AuthContextType|null>(null)


export function AuthProvider({children}:{children:ReactNode}){
    const [user,setUser] = useState<UserPayload | null>(null)

    
    useEffect(()=>{
        autoLogin()
    },[])

    const autoLogin = ()=>{
        AuthService.autoLoginUser().then(setUser)
    }

    const login = async (email: string, password:string)=>{
         await AuthService.loginUser(email,password).then(e=>{setUser(e);toast.success(e.message)}).catch(e=>{throw new HttpException(e.status,e.message)})       
       
    }
    const logout = async ()=>{
        await AuthService.logoutUser().then(()=>toast.success("Logged out")).then(()=>setUser(null))
    }

    return <AuthContext.Provider value={{user,login,logout,autoLogin,isAuthenticated:!!user, isAdmin:user?.role==="admin"}}>
            {children}
    </AuthContext.Provider>
}

export function useAuth(){
    const context = useContext(AuthContext)
    if(!context) throw new Error("No hay contexto")
    return context
}
