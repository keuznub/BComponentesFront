import img from '../assets/shoppingcart_80945.svg'
import { Product } from '../models/Product'
function OffCanvasLayout() {
    const productos : Product[] = {

    }

    return <div id="drawer-right-example" className="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800" tabIndex={-1} aria-labelledby="drawer-right-label">
        <div className='flex flex-row gap-x-5'>
            <img src={img} className='w-5' alt="" />
            <span>Tu Carrito:</span>
        </div>
        <hr className='border-b-2 mt-2 mb-2' />
        <div className='flex flex-col gap-y-5'>
        <div className='border rounded-sm w-full grid grid-cols-2'>
            <div className='text-center'>
                Title
            </div>
            <div className='text-end me-2'>
                Quantity
            </div>
            <div className='text-center'>
                Price
            </div>
            
        </div>
        <div className='border rounded-sm w-full grid grid-cols-2'>
            <div className='text-center'>
                Title
            </div>
            <div className='text-end me-2'>
                Quantity
            </div>
            <div className='text-center'>
                Price
            </div>
            
        </div>
        </div>
    </div>
}

export default OffCanvasLayout