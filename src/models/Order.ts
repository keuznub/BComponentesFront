import { OrderProduct } from "./OrderProduct"

export interface Order{
    id?:number
    status?:string
    orderPrducts?: OrderProduct[]
}