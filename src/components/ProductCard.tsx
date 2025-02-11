

import { Link } from 'react-router-dom'
import Product from '../types/Product'



function ProductCard({ product }: { product: Product }) {

    const getAvgRate = ()=>{
        return 5.0
    }
    const rate = getAvgRate();

    return (
        <Link to={`/products/${product.id}`} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="">
                <img className="p-8 rounded-t-lg" src="data:image/jpeg;base64,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" alt="product image" />
            </a>
            <div className="px-5 pb-5">
                <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
                </a>
                <div className="flex items-center mt-2.5 mb-5">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        {Array.from({ length: 5 }, (_, i) => <svg key={i} className={`w-4 h-4 ${(i+1>Math.round(rate))?"text-gray-300":"text-yellow-300"} hover:text-yellow-500 `} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>)}


                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">{product.rate}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{product.price}€</span>
                
                </div>
            </div>
        </Link>

    )
}

export default ProductCard