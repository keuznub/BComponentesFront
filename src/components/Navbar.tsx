
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

import OffCanvasButton from './OffCanvasButton'

function Navbar() {

  const user = useAuth()
  const LinkClassName = 'px-3 text-sm rounded-sm p-5 hover:bg-orange-600 dark:text-white text-black dark:hover:text-black hover:text-white transition-colors duration-100'

  return (


    <nav className="bg-orange-500 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="#" className="flex items-center space-x-3 rtl:space-x-reverse">

          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">BComponentes</span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

          <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col md:p-0 font-medium border border-gray-100 rounded-lg bg-orange-500 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:border-gray-700">
            <li>
              <Link to="/login" className={LinkClassName}>Login</Link>
            </li>
            <li>
              <Link to="/products" className={LinkClassName}>Productos</Link>
            </li>
            {user.isAuthenticated && user.isAdmin && <li>
              <Link to="/products/New" className={LinkClassName}>Nuevo Producto</Link>
            </li>}
            {user.isAuthenticated && user.isAdmin && <li>
              <Link to="/categories/new" className={LinkClassName}>Nueva Category</Link>
            </li>}
            {user.isAuthenticated && <li>
              <Link to="/categories" className={LinkClassName}>Categorias</Link>
            </li>}
            <li>
              <Link to="/register" className={LinkClassName}>Registro</Link>
            </li>
          </ul>
        </div>
        <OffCanvasButton/>

      </div>

    </nav>

  )
}

export default Navbar