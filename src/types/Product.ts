import Rate from "./Rate"

export default interface Product {
    id: number
    name: string
    description: string
    image?: string
    price: number
    rate: Rate[]
    discount?: number
    categoryID?: number
    
}