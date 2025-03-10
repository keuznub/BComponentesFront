
import { useCart } from '../contexts/CartContext'
import BasketElement from '../components/BasketElement'
import ButtonComponent from '../components/ButtonComponent'
import { FormEvent } from 'react'
import OrderService from '../services/orderService'
import { OrderProduct } from '../models/OrderProduct'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function NewOrder() {
  const cart = useCart()
  const navigate = useNavigate()

  const handleOnSubmit = (e:FormEvent)=>{
    e.preventDefault()
    
    if(!cart.products) return
    const orderProductSend : OrderProduct[] = cart.products.map(p=>({idProduct:p.product.id!,quantity:p.quantity})) as OrderProduct[]
    
    OrderService
    .save(orderProductSend)
    .then(e => { toast.success(e.message); cart.clearCart();  navigate("/orders") })
    .catch(e => toast.error(e.status + " " + e.message))
    .finally()
  }

  return (
    <div className='border rounded-lg flex flex-col p-4'>
      <div className=''>
        <p className='text-lg font-bold'>List of products:</p>
        <hr className='border-b-2 mb-2' />
        <div className='flex flex-col'>
            {cart.products?.map(product=><BasketElement key={product.product.id} cartElement={product}/>)}
        </div>
        <hr className='border border-dashed my-4 col-span-4' />
        <span className='text-lg'>Total:  <span className='font-bold'>{cart.products?.reduce((acu,prod)=>acu+(prod.product.price*(1-prod.product.discount/100)*prod.quantity),0).toFixed(2)}€</span></span>
        <ButtonComponent type='submit' onClick={handleOnSubmit} children="Pay" className='ms-10'/>
      </div>
    </div>
  )
}

export default NewOrder