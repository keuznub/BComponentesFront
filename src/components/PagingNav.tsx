
import { useLocation, useNavigate} from 'react-router-dom'

function PagingNav({ productCount}: { productCount: number }) {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const actualPage = params.get('page') || 0
    const PAGE_SIZE = 8
    const maxPage = Math.floor(productCount/PAGE_SIZE)
    const navigate = useNavigate()
    const handlePage = (num:number)=>{
        params.set('page',num.toString())
        navigate({search: params.toString()})
    }
    
    

    return (
        <nav aria-label="Page navigation example">
            <ul className="flex items-center -space-x-px h-10 text-base">
                <li>
                    <button onClick={()=>handlePage(Math.max(0,+actualPage-1))} disabled={+actualPage==0} className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span className="sr-only">Previous</span>
                        <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                        </svg>
                    </button>
                </li>
                
                <li>
                    <button onClick={()=>handlePage(Math.min(maxPage,+actualPage+1))} disabled={+actualPage>=PAGE_SIZE} className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span className="sr-only">Next</span>
                        <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                        </svg>
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default PagingNav