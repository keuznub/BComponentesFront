
import { OrderProduct } from "../models/OrderProduct"
import fetchAPI from "./FetchAPI/fetchAPI"

export class OrderService{
    static getAll = async () => await fetchAPI(`orders`,"GET")
    static getAllByUserId = async () => await fetchAPI(`orders`,"GET")
    static getById = async (id: number) => await fetchAPI(`orders/${id}`,"GET")
    
    static save = async (orderProduct:OrderProduct[]) => await fetchAPI(`orders`,"POST", orderProduct)
    static delete = async (id: number) => await fetchAPI(`orders/${id}`,"DELETE")
}

export default OrderService


