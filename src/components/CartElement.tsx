
import { Product } from '../models/Product'
import { useCart } from '../contexts/CartContext'
import toast from 'react-hot-toast'
import img from '../assets/rubbish-bin.svg'
function CartElement({cartElement}:{cartElement:{product:Product,quantity:number}}) {
    const cart = useCart()
    const handleOnRemove = ()=>{
        cart.removeProduct(cartElement.product)
        toast.success("Product Removed from cart")
    }
    return (
        <div className='border-b pb-4 flex flex-row gap-x-4 w-full justify-items-center'>
            <div className='flex-initial'>
                <img src={cartElement.product.image} className='h-15 w-20'/>
            </div>
            <div className='flex flex-col flex-auto'>
                <span>{cartElement.product.name}</span>
                <span className='font-light'>Units: <span className='font-bold'>{cartElement.quantity}</span></span>
                <span className='font-bold'>{((cartElement.product.price*(1-cartElement.product.discount/100))*cartElement.quantity).toFixed(2).replace(".",",")}€</span>
            </div>
            <div className='flex-initial'>
                <button onClick={handleOnRemove} type='button' className='rounded-2xl border-black'>
                    <img src={img} alt="Remove" className='w-6 '/>
                </button>
            </div>
        </div>
    )
}

export default CartElement