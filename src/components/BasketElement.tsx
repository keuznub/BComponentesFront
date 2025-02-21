
import { Product } from '../models/Product'
import { useCart } from '../contexts/CartContext'
import toast from 'react-hot-toast'
import img from '../assets/rubbish-bin.svg'

function BasketElement({cartElement}:{cartElement:{product:Product,quantity:number}}) {
    const cart = useCart()
    const handleOnRemove = ()=>{
        cart.removeProduct(cartElement.product)
        toast.success("Product Removed from cart")
    }
    return (
        <div className='grid grid-cols-5 justify-around'>
            <div className=''>
                <img src={cartElement.product.image}  alt="Product Image"  className="h-7"/>
            </div>
            <div className='text-start '>
                {cartElement.product.name}
            </div>
            <div className='text-end me-2'>
                Units: {cartElement.quantity}
            </div>
            <div className='text-center'>
                {((cartElement.product.price*(1-cartElement.product.discount/100))*cartElement.quantity).toFixed(2)}€
            </div>
            <div className='text-center'>
                <button onClick={handleOnRemove} type='button' className='cursor-pointer px-4'>
                    <img src={img} className='h-7'/>
                </button>
            </div>
        </div>
    )
}

export default BasketElement