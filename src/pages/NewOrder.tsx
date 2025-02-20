
import { useCart } from '../contexts/CartContext'
import BasketElement from '../components/BasketElement'
import ButtonComponent from '../components/ButtonComponent'

function NewOrder() {
  const cart = useCart()
  return (
    <div className='border rounded-lg flex flex-col p-4'>
      <div className=''>
        <p className='text-lg font-bold'>List of products:</p>
        <hr className='border-b-2 mb-2' />
        <div className='grid grid-cols-4 justify-between'>
            {cart.products?.map(product=><BasketElement cartElement={product}/>)}
        </div>
        <hr className='border-b-2 my-4 col-span-4' />
        <span className='text-lg'>Total:  <span className='font-bold'>{cart.products?.reduce((acu,prod)=>acu+(prod.product.price*(1-prod.product.discount/100)*prod.quantity),0).toFixed(2)}€</span></span>
        <ButtonComponent type='submit' children="Pay" className='ms-10'/>
      </div>
    </div>
  )
}

export default NewOrder