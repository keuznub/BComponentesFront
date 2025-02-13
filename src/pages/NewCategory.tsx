import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { CursorProgressContext } from '../contexts/cursorProgressContext'
import { Category } from '../models/Category'


function NewCategory() {
  const COLORS : string[] = [
    'gray', 'red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink', 
    'rose', 'amber', 'lime', 'emerald', 'teal', 'cyan', 'sky', 'violet',
    'fuchsia'
  ];

  const [category, setCategory] = useState<Category>({
      name:''
  })
  const {setCursorProgress} = useContext(CursorProgressContext)




  useEffect(() => {

  }, [])


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setCursorProgress(true)

  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { value, name } = e.target
    setCategory({ ...category, [name]: value, })
  }

  return <>
    <form className="max-w-sm lg:max-w-lg mx-auto gap-x-12 flex flex-col gap-y-10" onSubmit={handleSubmit}>
      <div className="">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name:</label>
        <input id="name" value={category.name} name='name' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" onChange={handleChange} placeholder="" required />
      </div>
      <div className="">
          <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categories</label>
          <select id="color" value={category.color} onChange={handleChange} name='color' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="">Choose a color</option>
            {COLORS.map((color,i)=><option key={i} className={`bg-${color}-500`} value={color}>{color}</option>)}
          </select>
      </div>
      
      <button type="submit" className="mt-10 cursor-pointer text-white bg-orange-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Añadir</button>

    </form>
  </>
}

export default NewCategory