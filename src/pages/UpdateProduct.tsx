import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { CursorProgressContext } from '../contexts/CursorProgressContext'
import { Product } from '../models/Product'
import ProductService from '../services/productService'
import toast from 'react-hot-toast'
import { Category } from '../models/Category'
import CategoryService from '../services/categoryService'
import Chip from '../components/Chip'
import InputComponent from '../components/InputComponent'
import ButtonComponent from '../components/ButtonComponent'
import { useNavigate, useParams } from 'react-router-dom'



function UpdateProduct() {

  const [product, setProduct] = useState<Product>(
    {
      name: '',
      description: '',
      price: 0,
      image: '',
      discount: 0,
    }
  )
  const navigate = useNavigate()
  const [productCategories,setProductCategories] = useState<number[]>([])
  const [image, setImage] = useState<string | null>()
  const [categories, setCategories] = useState<Category[]>([])
  const { setCursorProgress } = useContext(CursorProgressContext)
  const {id} = useParams()
  useEffect(() => {

    ProductService.getById(Number(id)).then(response=>{
      setProduct(response)
      if(!response.categoryProduct) return
      setProductCategories(response.categoryProduct.map((c:any)=>c.idCategory))
      console.log(response);
      
      setImage(response.image)
    }).catch(e =>{toast.error(e.status + " " + e.message)})
    console.log("Param:"+id);
    
    CategoryService.getAll()
      .then(setCategories)
      .catch(e =>{toast.error(e.status + " " + e.message); if(e.status==500||e.status==403)navigate("/login")})

    
    
  }, [])


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setCursorProgress(true)
    ProductService.update({ ...product, price: +product.price,discount:+product.discount},productCategories)
    .then(e => { toast.success(e.message) })
    .catch(e => toast.error(e.status + " " + e.message))
    .finally(()=>setCursorProgress(false))
  }

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    const file = event?.target.files[0]
    const imageAux = URL.createObjectURL(file)
    setImage(imageAux)
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result as string;
      setProduct({ ...product, image: base64Image });
    };
    reader.readAsDataURL(file)
  }






  const placeHolder = <>
    <div className="flex flex-col items-center justify-center pt-5 pb-6">
      <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
      </svg>
      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
      <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG</p>
    </div>
  </>



  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { value, name } = e.target
    setProduct({ ...product, [name]: value })
  }


  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    if(productCategories.length>1) return toast.error("Can't add more than 2 categories")
    const categoryIn = categories.find(c => c.id == Number(value))
    if (!categoryIn) return
    if (productCategories?.some(c=>c == categoryIn.id)) return
    if(!categoryIn.id) return
    setProductCategories([...productCategories,categoryIn.id])
  }

  const handleChipClick = (id: number) =>{
    const categoryIn = categories.find(c => c.id == id)
    if (!categoryIn) return
    const categoriesIn = productCategories?.filter(c=>c!=id)
    setProductCategories(categoriesIn)
  }
  
  return <>

    <form className="max-w-lg lg:max-w-3xl mx-auto gap-x-12 grid grid-cols-1 md:grid-cols-2 gap-y-10" onSubmit={handleSubmit} onDrop={e => { e.preventDefault(); e.stopPropagation() }} >

      <div className='flex flex-col w-full'>
        <InputComponent name='name' type='text' value={product.name} onChange={handleChange} children="Name:" required className='text-start'/>
        <div className="">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
          <textarea id="description" name='description' rows={4} value={product.description} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" onChange={handleChange} placeholder="" required />
        </div>
        <InputComponent name='price' type='number' value={product.price} onChange={handleChange} children="Price:" required className='text-start'/>
        <InputComponent name='discount' type='number' value={product.discount} onChange={handleChange} children="Discount:" required className='text-start'/>
        <div className="">
          <label htmlFor="idCategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categories</label>
          <select id="idCategory" value={""} onChange={handleSelectChange} name='idCategory' className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="">Añade categorias</option>
            {categories.map((category, i) => <option key={i} value={category.id}>{category.name}</option>)}
          </select>
          {productCategories&&productCategories.map(id=><button key={id} type='button' className='cursor-pointer' onClick={()=>handleChipClick(id)}><Chip color={categories.find(c=>c.id==id)?.color}>{categories.find(c=>c.id==id)?.name}</Chip></button>)}
        </div>
 
      </div>

      <div className='flex flex-col mt-4 w-full'>
        <label htmlFor="dropzone-file">Image:</label>
        <div className="flex items-center justify-center w-full">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            {(image) ? <img src={image} className='object-fill h-60' alt='imagenProduct' /> : placeHolder}
            <input id="dropzone-file" type="file" className="hidden" onChange={handleImageUpload} />
          </label>
        </div>
       
      </div>
      <ButtonComponent type='submit' className='md:col-span-2'>Update Product</ButtonComponent>


    </form>
  </>
}

export default UpdateProduct