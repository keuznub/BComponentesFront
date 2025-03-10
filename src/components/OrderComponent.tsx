import { Order } from "../models/Order"
import OrderProductElement from "./OrderProductComponent"


function OrderComponent({ order }: { order: Order }) {
    return <>
        <div className="flex flex-row border rounded-2xl p-4 justify-around">
            <div className="">
                {order.status}
            </div>
            <div className="flex flex-col">
                {order.orderProducts?.map((element,i)=><OrderProductElement key={i} orderProductElement={{product:element.product, quantity:element.quantity}}/>)}
            </div>
        </div>
    </>

}

export default OrderComponent