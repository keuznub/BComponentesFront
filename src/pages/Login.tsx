import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { Link/*useNavigate*/ } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import InputComponent from '../components/InputComponent'
import ButtonComponent from '../components/ButtonComponent'
import { CursorProgressContext } from '../contexts/CursorProgressContext'

function Login() {

  const [form, setForm] = useState({ email: 'admin@admin.com', password: 'admin' })
  const {setCursorProgress } = useContext(CursorProgressContext)
  //const navigate = useNavigate()
  const user = useAuth()
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setCursorProgress(true)

    user.login(form.email, form.password)
      //.then(() => { navigate("/products") })
      .finally(() => { setCursorProgress(false) })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setForm({ ...form, [name]: value, })
  }


  return (
    <form className="max-w-sm mx-auto p-4 border-1 rounded-2xl bg-zinc-50 dark:bg-zinc-900  mt-36" onSubmit={handleSubmit}>
      <InputComponent name='email' type='email' value={form.email} onChange={handleChange} children="Your email:" placeholder='example@mail.com' required />
      <InputComponent name='password' type='password' value={form.password} onChange={handleChange} children="Your password:" className='' required />
      <Link to={"/register/update"} className='text-sm hover:text-blue-800 font-light italic'>Forgot password?</Link>
      <div className='flex flex-row'>
        <ButtonComponent type='submit' className='mx-auto'>Login</ButtonComponent>
        <Link to="/register" type="submit" className="mx-auto font-bold bg-orange-500 hover:bg-orange-600 cursor-pointer text-gray-900 text-sm rounded-lg p-2.5 dark:text-white">Sign Up</Link>
      </div>
    </form>

  )
}

export default Login