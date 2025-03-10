import { useEffect, useState } from "react"
import OrderService from "../services/orderService"
import { useAuth } from "../contexts/AuthContext"
import { Order } from "../models/Order"
import toast from "react-hot-toast"
import OrderComponent from "../components/OrderComponent"


function OrderList() {
    const userAuth = useAuth()
    const [orders,setOrders] = useState<Order[]>()
    useEffect(()=>{
        if(!userAuth.user) return
        OrderService.getAllByUserId()
        .then(e=>{setOrders(e);console.log(e)
        })
        .catch(e=>toast.error(e.status+" "+e.message))

    },[])


  return (
    <div className="w-full mx-auto max-w-lg p-4 flex flex-col gap-2 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        {orders?.map(order=><OrderComponent key={order.id} order={order}/>)}
    </div>
  )
}

export default OrderList