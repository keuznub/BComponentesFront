
import { useEffect } from 'react'
import Rate from '../models/Rate'
import imagen from '../assets/react.svg'
function ReviewComponent({ rate }: { rate: Rate }) {
  useEffect(() => {
    

  }, [])
  return (
    <div className='border border-lg rounded-2xl flex flex-col p-2 md:p-10'>
      <div className='flex flex-row gap-x-2 md:gap-x-11'>
        <div className='text-3xl font-bold'>
          <img src={imagen} alt="imagen" className='object-fill w-10 h-10 rounded-lg' />
        </div>
        <div className='text-3xl font-bold'>
          {rate.user?.username}
        </div>
        <div className="flex items-center space-x-1 rtl:space-x-reverse">
          {Array.from({ length: 5 }, (_, i) => <svg key={i} className={`w-4 h-4 ${(i + 1 > Math.round(rate.value)) ? "text-gray-300" : "text-yellow-300"} hover:text-yellow-500 `} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>)}
        </div>
      </div>
      <div className='text-lg mt-2'>
        {rate.opinion}
      </div>
    </div>
  )
}

export default ReviewComponent