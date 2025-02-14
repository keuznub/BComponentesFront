import { useState } from 'react'
import HeaderComponent from './HeaderComponent'
import FooterComponent from './FooterComponent'
import { Outlet } from 'react-router-dom'
import { CursorProgressContext } from '../contexts/cursorProgressContext'
import { Toaster } from 'react-hot-toast'
import OffCanvasLayout from '../components/OffCanvasLayout'

function Layout() {
    const [cursorProgress, setCursorProgress] = useState(false)
    return (
        <>  
             <CursorProgressContext.Provider value={{cursorProgress, setCursorProgress}}>
                <Toaster position='top-center'/>
                <div className={`min-h-screen bg-white dark:bg-gradient-to-b dark:from-zinc-800 dark:to-zinc-950 text-gray-900 dark:text-white ${cursorProgress&&"cursor-progress"}`}>
                <header className=''>
                    <HeaderComponent />
                </header>
                <main className='pt-28 pb-28'>
                    <OffCanvasLayout/>
                    <Outlet />
                </main>
                <footer>
                    <FooterComponent />
                </footer>
                </div>
            </CursorProgressContext.Provider>
        </>
    )
}

export default Layout