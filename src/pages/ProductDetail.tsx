import { useEffect, useState } from 'react'
import { Product } from '../models/Product'
import ProductService from '../services/productService'
import { useNavigate, useParams } from 'react-router-dom'
import ReviewComponent from '../components/ReviewComponent'
import AddReviewComponent from '../components/AddReviewComponent'
import { useAuth } from '../contexts/AuthContext'
import ButtonComponent from '../components/ButtonComponent'
import { useCart } from '../contexts/CartContext'
import toast from 'react-hot-toast'



function ProductDetail() {
  const {id} = useParams()
  const [product, setProduct] = useState<Product>()
  const [loading, setLoading] = useState(false)
  const [avgRate, setAvgRate] = useState<number>(0)
  const navigate = useNavigate()
  const user = useAuth()
  const cart = useCart()
  const IMAGE_BASE64 = product?.image?product.image:"data:image/png`;base64,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"
  const imagen = <img className='p-8 rounded-t-lg w-full h-full object-contain' src={IMAGE_BASE64} alt="" />
  useEffect(() => {
    ProductService.getById(Number(id)).then(setProduct).finally(()=>setLoading(false))
  }, [])

  useEffect(() => {
    calcAvg()
  },[product])

  function calcAvg(){
    const total = product?.rates?.reduce((acu,rate)=>rate.value+acu,0)
    const avg = product?.rates&&total&&total/product?.rates?.length
    setAvgRate(avg||0)
  }
  const handleAdd = ()=>{
    if(!user.isAuthenticated){
      navigate("/login")
      return
    }
    if(!product) return
    cart.addProduct(product)
    toast.success("Product added to cart")
  }

  if (loading) return <div className='flex mx-auto justify-center'>
    <div role="status">
      <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
      <span className="sr-only">Loading...</span>
    </div>
  </div>


  return <>
    <div className='flex flex-col p-10'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6'>
        <div className='flex flex-col'>
          {imagen}
        </div>
        <div className='flex flex-col'>
          <p className='font-bold text-xl font-sans'>{product?.name}</p>
          <div className="flex items-center">
            <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">{avgRate}</p>
            <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
            <a href="#review" className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">{product?.rates?.length} reviews</a>
          </div>
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
          <p className='font-bold text-lg font-sans'>Models:</p>
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        </div>
        <div className='flex flex-col rounded-3xl md:rounded-xl p-5 md:p-8 border-gray-300 border gap-y-5 md:gap-y-8 md:col-span-2 lg:col-auto'>
              <span className='text-2xl md:text-3xl font-bold'>{product?.price}€ <span className='text-gray-500 line-through font-medium'>{product?.price+"€"}</span> </span>
              <div className='h-full'/>
              <ButtonComponent type='button' children="Add to cart" onClick={handleAdd} className='w-full' />
              
        </div>
      </div>
      <hr className='my-5 md:my-10'/>
      <div className='text-lg'>
          <p className='font-bold text-black dark:text-white text-2xl'>Description:</p>
          <p className=' text-black dark:text-white'>{product?.description}</p>
      </div>
      <hr className='my-5 md:my-10'/>
      <div className='text-lg flex flex-col gap-y-2 md:gap-y-4' id='review'>
          <p className='font-bold text-black dark:text-white text-2xl'>Reviews: </p>
          {product?.rates?.map((rate,index)=>rate.opinion&&
            <ReviewComponent key={index} rate={rate}/>
          )}
      </div>
      <hr className='my-5 md:my-10'/>
      {product?.id&&<AddReviewComponent idProduct={product?.id}/>}
    </div>

  </>

}
export default ProductDetail