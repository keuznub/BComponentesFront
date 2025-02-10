import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import UserList from './pages/UserList'
import Navbar from './components/Navbar'
import Layout from './layout/Layout'
import OfferList from './pages/ComponentsList'
import NewOffer from './pages/NewProduct'
import CategoriesList from './pages/CategoriesList'
import ProductList from './pages/ComponentsList'
import ProductDetail from './pages/ProductDetail'
import NewProduct from './pages/NewProduct'

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
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

