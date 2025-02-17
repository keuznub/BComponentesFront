
import { Product } from '../models/Product'
import { useCart } from '../contexts/CartContext'
import toast from 'react-hot-toast'

function BasketElement({cartElement}:{cartElement:{product:Product,quantity:number}}) {
    const cart = useCart()
    const handleOnRemove = ()=>{
        cart.removeProduct(cartElement.product)
        toast.success("Product Removed from cart")
    }
    return (
        <>
            <div className='text-center'>
                {cartElement.product.name}
            </div>
            <div className='text-end me-2'>
                Units: {cartElement.quantity}
            </div>
            <div className='text-center'>
                {cartElement.product.price*cartElement.quantity}€
            </div>
            <div className='text-center'>
                <button onClick={handleOnRemove} type='button' className='bg-blue-200 rounded-2xl'>Borrar</button>
            </div>
        </>
    )
}

export default BasketElement