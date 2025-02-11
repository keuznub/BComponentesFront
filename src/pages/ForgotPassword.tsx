import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import ErrorAlert from '../components/ErrorAlert'
import { registerUser } from '../services/authService'
import { CursorProgressContext } from '../contexts/cursorProgressContext'

function ForgotPassword() {
  
  const {setCursorProgress} = useContext(CursorProgressContext)


  const [form, setForm] = useState(
    {
      email: '',
      password: '',
      aceptNotifications: false
    }
  )
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setCursorProgress(true)
    // mensaje por post al api del backend
    try {
      //await updateUser(form.email, form.password, form.aceptNotifications)
      console.log('update successfull')
      setMessage('update successfull')
      // Redirigir a otra pagina (ofertas)
    } catch (error) {
      console.log(error);
      const msg = error instanceof Error ? error.message : 'Error desconocido'
      setMessage(msg)
    }finally{
      setCursorProgress(false)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setForm({ ...form, [name]: value, })
  }


  return <>
    <ErrorAlert>{message}</ErrorAlert>
    <form className="max-w-sm lg:max-w-lg mx-auto md:grid md:grid-cols-2 gap-x-12 border-1 rounded-2xl bg-zinc-50 dark:bg-zinc-900 p-4 mt-10" onSubmit={handleSubmit}>


      <div className="mb-5 col-span-2">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
        <input type="email" id="email" name='email' value={form.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} placeholder="name@aprendetu.com" required />
      </div>
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input type="password" id="password" name='password' value={form.password} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} required />
      </div>
      <div className="mb-5">
        <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repite Password</label>
        <input type="password" id="repeat-password" name='repeat-password' className="<bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
      <button type="submit" className="text-white block mx-auto col-span-2 bg-orange-400  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Cambiar password</button>

    </form>
  </>
}

export default ForgotPassword