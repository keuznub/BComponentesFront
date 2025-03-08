
import { useLocation, useNavigate } from 'react-router-dom'

function PagingNav({ productCount, maxPagesNumber = 6 }: { productCount: number, maxPagesNumber?: number }) {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const actualPage = params.get('page') || 0
    const PAGE_SIZE = 8
    const maxPage = Math.floor(productCount / PAGE_SIZE)
    const navigate = useNavigate()
    const handlePage = (num: number) => {
        params.set('page', num.toString())
        navigate({ search: params.toString() })
        window.scrollTo({top:0,behavior:"smooth"})
    }



    return (
        <nav aria-label="Page navigation example">
            <ul className="flex items-center -space-x-px h-10 text-base">
                <li>
                    <button onClick={() => handlePage(Math.max(0, +actualPage - 1))} disabled={+actualPage == 0} className="cursor-pointer disabled:cursor-auto flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:hover:bg-white disabled:dark:hover:bg-gray-800 disabled:text-gray-400">
                        <span className="sr-only">Previous</span>
                        <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                        </svg>
                    </button>
                </li>

                {Array.from({ length: maxPagesNumber / 2 }, (_, i) => +actualPage - i).filter(num => num >= 0).sort((a, b) => a-b).map(num =>
                    <li key={num}>
                        <button onClick={() => handlePage(num)} className={`cursor-pointer flex items-center justify-center leading-tight px-3 h-10 border dark:border-gray-700 dark:bg-gray-800 border-gray-300 ${num==actualPage&&"dark:bg-gray-900 bg-gray-100 text-xl font-bold z-10"}`}>{num}</button>
                    </li>
                )}


                {Array.from({ length: maxPagesNumber / 2 }, (_, i) => +actualPage + (i+1)).filter(num => (num <= maxPage)).sort((a, b) => a-b).map(num =>
                    <li key={num}>
                        <button onClick={() => handlePage(num)} className={`cursor-pointer flex items-center justify-center leading-tight px-3 h-10 border dark:border-gray-700 dark:bg-gray-800 border-gray-300 ${num==actualPage&&"dark:bg-gray-900 text-xl font-bold z-10"}`}>{num}</button>
                    </li>
                )}

                <li>
                    <button onClick={() => handlePage(Math.min(maxPage, +actualPage + 1))} disabled={+actualPage >= maxPage} className="cursor-pointer disabled:cursor-auto flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:hover:bg-white disabled:dark:hover:bg-gray-800 disabled:text-gray-400">
                        <span className="sr-only">Next</span>
                        <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                        </svg>
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default PagingNav