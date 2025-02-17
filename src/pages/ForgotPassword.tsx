import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { CursorProgressContext } from '../contexts/CursorProgressContext'
import InputComponent from '../components/InputComponent'
import ButtonComponent from '../components/ButtonComponent'
import { User } from '../models/User'
import toast from 'react-hot-toast'

function ForgotPassword() {
  
  const {setCursorProgress} = useContext(CursorProgressContext)


  const [user, setUser] = useState<Partial<User>>(
    {
      email: '',
      password: '',
    }
  )


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setCursorProgress(true)
    toast.loading("Not available yet")
    setCursorProgress(false)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setUser({ ...user, [name]: value, })
  }


  return <>
    
    <form className="max-w-sm lg:max-w-lg mx-auto md:grid md:grid-cols-2 gap-x-12 border-1 rounded-2xl bg-zinc-50 dark:bg-zinc-900 p-4 mt-10" onSubmit={handleSubmit}>
    <InputComponent name='email' type='email' value={user.email} onChange={handleChange} children="Your email:"  placeholder='example@mail.com' required />
    <InputComponent name='password' type='password' value={user.password} onChange={handleChange} children="Your password:" required />
    <ButtonComponent type='submit' className='col-span-2'>Change Password</ButtonComponent>
    </form>
  </>
}

export default ForgotPassword