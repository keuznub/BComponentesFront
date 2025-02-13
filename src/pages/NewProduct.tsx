import { ChangeEvent, DragEvent, DragEventHandler, FormEvent, useContext, useEffect, useState } from 'react'
import { CursorProgressContext } from '../contexts/cursorProgressContext'
import { Product } from '../models/Product'
import ProductService from '../services/productService'
import toast from 'react-hot-toast'


function NewProduct() {

  const [product, setProduct] = useState<Product>(
    {
      name: '',
      description: '',
      price: 0,
      image: '',
      discount: 0
    }
  )

  interface Category {
    id: number
    name: string
  }

  const [image,setImage] = useState<File|null>()
  const [categories, setCategories] = useState<Category[]>([])
  const { setCursorProgress } = useContext(CursorProgressContext)



  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setCursorProgress(true)
    ProductService.save({...product,price:Number(product.price),idCategory:Number(product.idCategory)}).then(e=>{toast.success(e.message)}).catch(e=>toast.error(e.status+" "+e.message))
    console.log(product);
    
  }

  const handleImageUpload = (event:ChangeEvent<HTMLInputElement>)=> {
    if(!event.target.files) return
    const file = event?.target.files[0]
    setImage(file)
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result as string;
      console.log(base64Image);
      setProduct({ ...product, image: base64Image });
    };
    reader.readAsDataURL(file)
  }

  
  const handleImageUploadDrag = (event:DragEvent<HTMLDivElement>|undefined)=> {
    event?.preventDefault()
    event?.stopPropagation()
    if(!event?.dataTransfer) return
    const file = event?.dataTransfer.files[0]
    setImage(file)
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result as string;
      console.log(base64Image);
      setProduct({ ...product, image: base64Image });
    };
    reader.readAsDataURL(file)
  }




  const placeHolder = <>
                <div className="flex flex-col items-center justify-center pt-5 pb-6" onDrop={handleImageUploadDrag}>
                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                <p className="text-xs text-gray-500 dark:text-gray-400">PNG</p>
              </div>
      </>



  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { value, name } = e.target
    setProduct({ ...product, [name]: value})
  }

  return <>

    <form className="max-w-md lg:max-w-3xl mx-auto gap-x-12 grid grid-cols-2 gap-y-10" onSubmit={handleSubmit} onDrop={e=>{e.preventDefault();e.stopPropagation()}} >

      <div className='flex flex-col'>
        <div className="">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name:</label>
          <input id="name" value={product.name} name='name' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" onChange={handleChange} placeholder="" required />
        </div>
        <div className="">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
          <textarea id="description" name='description' rows={4} value={product.description} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" onChange={handleChange} placeholder="" required />
        </div>
        <div className="">
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price:</label>
          <input id="price" value={product.price} type='number' name='price' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" onChange={handleChange} placeholder="" required />
        </div>
        <div className="">
          <label htmlFor="idCategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categories</label>
          <select id="idCategory" value={product.idCategory} onChange={handleChange} name='idCategory' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="">Elige una categoria</option>
            {categories.map((category, i) => <option key={i} value={category.id}>{category.name}</option>)}
          </select>
        </div>
      </div>
      <div className='flex flex-col mt-4'>
      <label htmlFor="dropzone-file">Imagen:</label>
          <div className="flex items-center justify-center w-full" onDrop={handleImageUploadDrag}>
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            {(image)?<img src={URL.createObjectURL(image)} className='object-fill' alt='imagenProduct'/>:placeHolder}
              <input id="dropzone-file" type="file" className="hidden" onChange={handleImageUpload} onDrop={handleImageUploadDrag}/>
            </label>
          </div>
        </div>
      <button type="submit" className="mt-10 col-span-2 cursor-pointer text-white bg-orange-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Añadir</button>
      <div>
        
      </div>

    </form>
  </>
}

export default NewProduct