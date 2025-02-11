import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Layout from './layout/Layout'
import CategoriesList from './pages/CategoriesList'
import ProductList from './pages/ComponentsList'
import ProductDetail from './pages/ProductDetail'
import NewProduct from './pages/NewProduct'
import NewCategory from './pages/NewCategory'
import ForgotPassword from './pages/ForgotPassword'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="login" index element={<Login />} />
            <Route path="products" element={<ProductList />} />
            <Route path="register" element={<Register />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="products/new" element={<NewProduct />} />
            <Route path="categories" element={<CategoriesList />} />
            <Route path="categories/new" element={<NewCategory />} />
            <Route path="register/update" element={<ForgotPassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

