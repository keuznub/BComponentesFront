import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import AuthService from "../services/authService"
import toast from "react-hot-toast"
import { Product } from "../models/Product"

interface CartContextType{
    products: CartElement[] | null
    addProduct: (product:Product)=>void
    removeProduct: (product:Product)=>void
    
}

interface CartElement{
    product:Product
    quantity:number
}

const CartElement = createContext<CartContextType|null>(null)


export function CartProvider({children}:{children:ReactNode}){
    const [products,setProducts] = useState<CartElement[] | null>(null)
    
    useEffect(()=>{
        
    },[])

    const addProduct = (product:Product)=>{
        if(!products) return setProducts([{product,quantity:1}])
        const findProduct = products.find(p=>p.product.id === product.id)
        if(!findProduct) return setProducts([...products,{product,quantity:1}])
        const updatedArray = products.map(p=>p.product.id===product.id?{...p,quantity:p.quantity+1}:{...p})
        setProducts(updatedArray)
    }

    const removeProduct = (product:Product)=>{
        if(!products) return
        const findProduct = products?.find(p=>p.product.id === product.id)
        if(!findProduct) return 
        return setProducts(products.filter(p=>p.product.id!=findProduct.product.id))
    }

    return <CartElement.Provider value={{products,addProduct,removeProduct}}>
            {children}
    </CartElement.Provider>
}

export function useCart(){
    const context = useContext(CartElement)
    if(!context) throw new Error("No hay contexto")
    return context
}
