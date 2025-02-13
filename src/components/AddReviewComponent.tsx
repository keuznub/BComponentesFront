import {FormEvent, useState } from 'react'
import Rate from '../models/Rate'
import { useNavigate, useParams } from 'react-router-dom'
import fetchAPI from '../services/FetchAPI/fetchAPI'
import RateService from '../services/rateService'
import toast from 'react-hot-toast'

function AddReviewComponent({idProduct=-1}:{idProduct?:number}){
    const navigate = useNavigate()
    const [rate,setRate] = useState<Rate>({
        idProduct,
        value:0,
        opinion:''
    })

    const handleSubmit = (e:FormEvent)=>{
        e.preventDefault()
        RateService.save(rate).then(e=>{toast.success(e.message);navigate(0)}).catch(e=>toast.error(e.status+" "+e.message))
        console.log(rate);
        
    }

    return (
        <form className='border-md flex flex-col p-4' onSubmit={handleSubmit}>
            <p>Deja tu review</p>
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                {Array.from({ length: 5 }, (_, i) => <svg key={i} className={`w-4 h-4 ${(i + 1 > Math.round(rate.value)) ? "text-gray-300" : "text-yellow-300"} hover:text-yellow-500 `} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" onClick={()=>setRate({...rate,value:(i+1)})} viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>)}
            </div>
            <div>
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <textarea id="description" name='description' rows={4} value={rate.opinion} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" onChange={e=>setRate({...rate,opinion:e.target.value})} placeholder="" required />
            </div>
            <div className='mt-2'>
            <button type="submit" className="text-white bg-orange-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-blue-800 mx-auto">Add Review</button>
            </div>
        </form>
    )
}

export default AddReviewComponent