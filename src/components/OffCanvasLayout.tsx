import { Link } from 'react-router-dom'
import img from '../assets/shoppingcart_80945.svg'
import { useCart } from '../contexts/CartContext'
import notFound from '../assets/notFound.png'
import CartElement from './CartElement'

import { useAuth } from '../contexts/AuthContext'


function OffCanvasLayout() {
    const cart = useCart()
    const user =useAuth()
    const emptyCart = <>
        <div className='flex flex-col text-center'>
            <div className='flex items-center justify-center'>
                <img className='w-30' src={notFound}/>
            </div>
            <span className='font-bold'>Your cart is empty</span>
            <Link to="/products" className='font-bold text-center m-4 bg-orange-500 hover:bg-orange-600 cursor-pointer text-gray-900 text-sm md:text-lg rounded-lg p-2.5 dark:text-white'>Show products</Link>
            
        </div>
    </>


    const noAuth = <Link to={"/login"} className='font-bold bg-orange-500 hover:bg-orange-600 cursor-pointer text-gray-900 text-sm rounded-lg p-2.5 dark:text-white text-center'>Login</Link>

    return <div id="drawer-right-example" className="fixed top-0 right-0 z-40 h-screen p-0 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800" tabIndex={-1} aria-labelledby="drawer-right-label">
        <div className='h-full flex flex-col gap-y-2'>
            <div className='flex flex-row gap-x-5 bg-orange-400 w-full p-4 border border-black'>
                <img src={img} className='w-5' alt="" />
                <span>Your cart:</span>
            </div>
            {!user.isAuthenticated?noAuth:<>
            <div className='flex flex-col gap-y-5 p-4  overflow-y-auto'>
                {!(cart?.products&&cart.products.length>0) ? emptyCart : cart.products.map(cartElement => <CartElement key={cartElement.product.id} cartElement={cartElement} />)}
            </div>
                {cart?.products&&cart.products.length>0&&<>
                <hr className='border-dashed mx-4' />
                <div className='flex flex-col px-4'>
                    <div className='flex flex-row justify-between'>
                        <span>Units:</span>
                        <span>{cart.products?.reduce((acu,product)=>acu+product.quantity,0)}</span>
                    </div>
                    <div className='flex flex-row justify-between'>
                        <span>Total:</span>
                        <span className='font-bold'>{cart.products?.reduce((acu,product)=>acu+(product.product.price*product.quantity),0).toFixed(2).replace(".",",")}</span>
                    </div>
                </div>
                {cart?.products&&<Link to={"/orders/new"} className='font-bold text-center m-4 bg-orange-500 hover:bg-orange-600 cursor-pointer text-gray-900 text-sm md:text-lg rounded-lg p-2.5 dark:text-white'>Show articles in basket</Link>}</>}</>}
            </div>
    </div>
}

export default OffCanvasLayout