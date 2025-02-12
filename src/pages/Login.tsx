import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { CursorProgressContext } from '../contexts/cursorProgressContext'
import { Link } from 'react-router-dom'
import AuthService from '../services/authService'
import toast, { Toaster } from 'react-hot-toast'
import { HttpException } from '../exceptions/HttpExcepction'

function Login() {

  const [form, setForm] = useState({email: '',password: ''})
  const {cursorProgress, setCursorProgress} = useContext(CursorProgressContext)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setCursorProgress(true)
    await AuthService.loginUser(form.email,form.password)
      .then(e=>{toast.success(e.message)})
      .catch(e=>toast.error(e.status+" "+e.message))
      .finally(()=>setCursorProgress(false))
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setForm({ ...form, [name]: value, })
  }


  return (
    <form className="max-w-sm mx-auto min-w-sm p-4 border-1 rounded-2xl bg-zinc-50 dark:bg-zinc-900  mt-36" onSubmit={handleSubmit}>
      <Toaster position='top-center'/>
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center">Your email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required />
      </div>
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center">Your password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        <Link to={"/register/update"} className='text-sm hover:text-blue-800 font-light italic'>Forgot password?</Link>
      </div>
      <div className='flex justify-between'>
      <button type="submit" className="text-white bg-orange-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-blue-800 mx-auto">Login</button>
      <Link to="/register"type="submit" className="text-white bg-orange-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-blue-800 mx-auto">Sign Up</Link>
      </div>
    </form>

  )
}

export default Login