import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { CursorProgressContext } from '../contexts/cursorProgressContext'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import InputComponent from '../components/InputComponent'
import ButtonComponent from '../components/ButtonComponent'

function Login() {

  const [form, setForm] = useState({ email: '', password: '' })
  const {setCursorProgress } = useContext(CursorProgressContext)
  const navigate = useNavigate()
  const user = useAuth()
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setCursorProgress(true)

    user.login(form.email, form.password)
      .then(() => { navigate("/products") })
      .finally(() => { setCursorProgress(false) })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setForm({ ...form, [name]: value, })
  }


  return (
    <form className="max-w-sm mx-auto min-w-sm p-4 border-1 rounded-2xl bg-zinc-50 dark:bg-zinc-900  mt-36" onSubmit={handleSubmit}>
      <InputComponent name='email' type='email' value={form.email} onChange={handleChange} children="Your email:" placeholder='example@mail.com' required />
      <InputComponent name='password' type='password' value={form.password} onChange={handleChange} children="Your password:" required />
      <Link to={"/register/update"} className='text-sm hover:text-blue-800 font-light italic'>Forgot password?</Link>
      <div className='flex justify-between'>
        <ButtonComponent type='submit' className='mx-auto'>Login</ButtonComponent>
        <Link to="/register" type="submit" className="text-white bg-orange-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-blue-800 mx-auto">Sign Up</Link>
      </div>
    </form>

  )
}

export default Login