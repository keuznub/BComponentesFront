
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import CartElement from './CartElement'
import img from '../assets/shoppingcart_80945.svg'

function CartCanvas() {
    const cart = useCart()
    const user = useAuth()
    const emptyCart = <>
        <div>
            Empty cart, you can search for products <Link to="/products" className='text-blue-400 cursor-pointer'>here</Link>
        </div>
    </>

    const noAuth = <Link to={"/login"} className='font-bold bg-orange-500 hover:bg-orange-600 cursor-pointer text-gray-900 text-sm rounded-lg p-2.5 dark:text-white text-center'>Login</Link>

    return <>
        <button className="cursor-pointer h-full px-4 py-4 -m-4 " type='button' data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example" data-drawer-placement="right" aria-controls="drawer-right-example">
            <img src={img} className='w-5' alt="" />
        </button>


        <div id="drawer-right-example" className="fixed top-0 right-0 z-40 h-screen p-0 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800" tabIndex={-1} aria-labelledby="drawer-right-label">
            <div className='h-full flex flex-col gap-y-2'>
                <div className='flex flex-row gap-x-5 bg-orange-400 w-full p-4 border border-black'>
                    <img src={img} className='w-5' alt="" />
                    <span>Your cart:</span>
                </div>
                <hr className='border-b-2' />
                {!user.isAuthenticated ? noAuth : <>
                    <div className='flex flex-col gap-y-5 p-2  overflow-y-auto'>
                        {!cart?.products ? emptyCart : cart.products.map(cartElement => <CartElement key={cartElement.product.id} cartElement={cartElement} />)}
                    </div>
                    <hr className='border-b-2' />
                    {cart?.products && <Link to={"/orders/new"} className='font-bold text-center m-4 bg-orange-500 hover:bg-orange-600 cursor-pointer text-gray-900 text-sm md:text-lg rounded-lg p-2.5 dark:text-white '>Show articles in basket</Link>}</>}
            </div>
        </div>
    </>
}

export default CartCanvas