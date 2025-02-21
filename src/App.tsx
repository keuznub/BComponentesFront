import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Layout from './layout/Layout'
import CategoriesList from './pages/CategoriesList'
import ProductList from './pages/ComponentsList'
import ProductDetail from './pages/ProductDetail'
import NewProduct from './pages/NewProduct'
import NewCategory from './pages/NewCategory'
import ForgotPassword from './pages/ForgotPassword'
import NewOrder from './pages/NewOrder'
import Profile from './pages/Profile'
import OrderList from './pages/OrderList'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to={"login"} />} />
            <Route path="login" element={<Login />} />
            <Route path="products" element={<ProductList />} />
            <Route path="register" element={<Register />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="products/new" element={<NewProduct />} />
            <Route path="categories" element={<CategoriesList />} />
            <Route path="categories/new" element={<NewCategory />} />
            <Route path="register/update" element={<ForgotPassword />} />
            <Route path="orders/new" element={<NewOrder />} />
            <Route path="orders" element={<OrderList />} />
            <Route path="users/:id" element={<Profile />} />
            
          </Route>
          
        </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App

