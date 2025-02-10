import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import ErrorAlert from '../components/ErrorAlert'
import { registerOffer } from '../services/offerService'
import { getCategories } from '../services/categoryService'
import { CursorProgressContext } from '../contexts/cursorProgressContext'
import Product from '../types/Product'

function NewProduct() {

  const [product, setProduct] = useState<Partial<Product>>(
    {
      name : '',
      description : '',
      categoryID : undefined,
      price : undefined,
      image : undefined,
    }
  )

  interface Category {
    id: number
    name: string
  }



  const [message, setMessage] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const {setCursorProgress} = useContext(CursorProgressContext)




  useEffect(() => {
    async function call() {
      try {
        const categoriesList: Category[] = await getCategories()
        categoriesList.length > 0 && setCategories(categoriesList)
      } catch (error) {
        const msg = error instanceof Error ? error.message : 'Error desconocido'
      } 
    }
    call()
  }, [])


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setCursorProgress(true)
    // mensaje por post al api del backend
    try {
      //await registerOffer(form.title, form.description, form.contactEmail, new Date(form.published), new Date(form.expired), form.active, form.idCategory)
      //console.log('Offer register successfull')
      //setMessage('Offer register successfull')
      // Redirigir a otra pagina (ofertas)
    } catch (error) {
      console.log(error);
      const msg = error instanceof Error ? error.message : 'Error desconocido'
      setMessage(msg)
    }finally{
      setCursorProgress(false)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { value, name } = e.target
    setProduct({ ...product, [name]: value, })
  }

  return <>
    <ErrorAlert>{message}</ErrorAlert>
    <form className="max-w-sm lg:max-w-lg mx-auto gap-x-12 flex flex-col gap-y-10" onSubmit={handleSubmit}>
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
          {categories.map((category,i)=><option key={i} value={category.id}>{category.name}</option>)}
        </select>
      </div>
      
      <button type="submit" className="mt-10 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Añadir</button>

    </form>
  </>
}

export default NewProduct