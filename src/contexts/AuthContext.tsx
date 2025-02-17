import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import AuthService from "../services/authService"
import toast from "react-hot-toast"


interface AuthContextType{
    user: UserPayload | null
    isAuthenticated: boolean
    isAdmin: boolean
    login: (email:string,password:string)=>Promise<any>
    logout: ()=>Promise<any>
    
}

interface UserPayload{
    id:number,
    role:string
    
}

const AuthContext = createContext<AuthContextType|null>(null)


export function AuthProvider({children}:{children:ReactNode}){
    const [user,setUser] = useState<UserPayload | null>(null)
    
    useEffect(()=>{
        
    },[])

    const login = async (email: string, password:string)=>{
        await AuthService.loginUser(email,password).then(e=>{setUser(e);toast.success(e.message)}).catch(e=>toast.error(e.message))       
    }
    const logout = async ()=>{
        await AuthService.logoutUser().then(()=>toast.success("Logged out")).then(()=>setUser(null))
    }

    return <AuthContext.Provider value={{user,login,logout,isAuthenticated:!!user, isAdmin:user?.role==="admin"}}>
            {children}
    </AuthContext.Provider>
}

export function useAuth(){
    const context = useContext(AuthContext)
    if(!context) throw new Error("No hay contexto")
    return context
}
