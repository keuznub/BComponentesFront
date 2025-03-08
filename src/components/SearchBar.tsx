import { ChangeEventHandler, FormEvent, useEffect, useState } from "react"
import CategoryService from "../services/categoryService"
import { Category } from "../models/Category"
import { useLocation, useNavigate } from "react-router-dom"


function SearchBar({ isHided, name, handleOnSubmit, onChange }: { isHided: boolean, name?: string, category?: string, handleOnSubmit: (e: FormEvent) => void, onChange?: ChangeEventHandler }) {

    const [dropdownVisible, setDropdownVisible] = useState(false)
    const [categories, setCategories] = useState<Category[]>([])
    const [currentCategory, setCurrentCategory] = useState<string>("")
    const location = useLocation()
    const navigate = useNavigate()
    const params = new URLSearchParams(location.search)

    useEffect(() => {
        CategoryService.getAll()
            .then(setCategories)
            .catch()
        const categoryParam = params.get("category")||""
        setCurrentCategory(categoryParam)
    }, [])

    const handleOnClick = (categoryName: string) => {
        categoryName?params.set("category", categoryName):params.delete("category")
        params.set("page","0")
        navigate({ search: params.toString() })
        window.scrollTo({ top: 0, behavior: "smooth" })
        const categoryParam = params.get("category")||""
        setCurrentCategory(categoryParam)
    }

    const handleOnBlurDropdown= ()=>{
        setTimeout(()=>{
            setDropdownVisible(false)
        },200)
    }



    return (

        <form onSubmit={handleOnSubmit} className={`fixed top-15 inset-x-0 z-10 max-w-lg mx-auto transition-all duration-500 ${isHided ? "-translate-y-5 opacity-0 invisible" : ""}`}>
            <div className="flex">
                <button onClick={() => setDropdownVisible(!dropdownVisible)} onBlur={handleOnBlurDropdown} className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900
                 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-gray-100
                  dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white
                   dark:border-gray-600" type="button">
                    {currentCategory?currentCategory:"All categories"}
                    <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg></button>
                <div className={`z-10 absolute top-11 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 ${!dropdownVisible ? "hidden" : ""}`}>
                    {categories &&
                        <ul className="py-2 text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-200 rounded-2xl p-4" aria-labelledby="dropdown-button">
                            {currentCategory && <li>
                                <button type="button" onClick={() => handleOnClick("")} className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">All categories</button>
                            </li>}
                            {categories.map(category => <li key={category.id}>
                                <button type="button" onClick={() => handleOnClick(category.name)} className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{category.name}</button>
                            </li>)}
                        </ul>

                    }
                </div>
                <div className="relative w-full">
                    <input type="search" value={name} onChange={onChange} className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Ryzen 5 7600X, RX 7800XT..." />
                    <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                </div>
            </div>
        </form>


    )
}

export default SearchBar