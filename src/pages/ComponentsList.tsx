import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import ProductService from '../services/productService'
import toast from 'react-hot-toast'
import { Product } from '../models/Product'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import PagingNav from '../components/PagingNav'
import { useAuth } from '../contexts/AuthContext'
import SearchBar from '../components/SearchBar'
import { useMotionValueEvent, useScroll } from 'motion/react'
import { CacheAPI } from '../services/Cache API/cacheAPI'




function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isHidedSearchBar, setIsHidedSearchBar] = useState(false)
  const [productCount,setProductCount] = useState<number>(0)
  const [queryParams] = useSearchParams()
  const [nameSearch,setNameSearch] = useState("")
  const [categorySearch] = useState("")
  const name = queryParams.get("name") || ""
  const category = queryParams.get("category") || ""
  const page = queryParams.get("page") || 0
  const { scrollY } = useScroll()
  const [scrollDirection, setScrollDirection] = useState("down")

  useMotionValueEvent(scrollY, "change", (current) => {
    const diff = current - (scrollY.getPrevious()||0);
    (diff>0&&scrollDirection=="down")?setIsHidedSearchBar(true):setIsHidedSearchBar(false)
    setScrollDirection(diff > 0 ? "down" : "up")
  })

  const location = useLocation()
  const navigate = useNavigate()
  

  useEffect(() => {
    setLoading(true)
    getProducts()
  }, [location])

  const getProducts = async ()=>{
    const cacheResponse = await CacheAPI.getDataURL(location.search)
    if(cacheResponse){
      setProducts(cacheResponse.products)
      setProductCount(cacheResponse.count)
      setLoading(false)
      return
    }

    ProductService.getAll(+page,name,category)
    .then(e=>{
      setProducts(e.products)
      setProductCount(e.count)
      CacheAPI.putDataURL(location.search,new Response(JSON.stringify(e)))
    })
    .catch(e=>{toast.error(e.status+" "+e.message)
      if(e.status==500||e.status==403){
        useAuth().logout
        navigate("/login")
      }
    })
    .finally(()=>{setLoading(false);
    })

  }

  const handleOnSubmit = (e:FormEvent)=>{
      e.preventDefault();
      const params = new URLSearchParams(location.search)
      nameSearch?params.set("name",nameSearch):params.delete("name")
      params.set("page","0")
      navigate({ search: params.toString()})
      window.scrollTo({top:0,behavior:"smooth"})
  }

  const handleOnChange = (e:ChangeEvent<HTMLInputElement>)=>{
      setNameSearch(e.target.value)
  }




  if (loading) return <div className='flex mx-auto justify-center'>
    <div role="status">
      <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
      <span className="sr-only">Loading...</span>
    </div>
  </div>

  return <>
    <div className='relative'>
    <SearchBar handleOnSubmit={handleOnSubmit} onChange={handleOnChange} name={nameSearch} category={categorySearch} isHided={isHidedSearchBar}/>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-10">
      {products?.map((product,index) => <ProductCard key={index} product={product}/>)}
    </div>

    <div className='flex flex-row justify-center mt-8'>
      <PagingNav productCount={productCount}/>
    </div>
    </div>
  </>
}

export default ProductList