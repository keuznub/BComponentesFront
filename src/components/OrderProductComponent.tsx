
import { Product } from '../models/Product'

function OrderProductElement({orderProductElement}:{orderProductElement:{product:Product,quantity:number}}) {
    return (
        <div className='p-5 flex flex-row gap-x-4 w-full justify-items-center'>
            <div className=''>
                <img src={orderProductElement.product.image} className='h-15 w-20'/>
            </div>
            <div className='flex flex-col'>
                <span>{orderProductElement.product.name}</span>
                <span className='font-light'>Units: <span className='font-bold'>{orderProductElement.quantity}</span></span>
            </div>
        </div>
    )
}

export default OrderProductElement