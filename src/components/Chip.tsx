import { ReactNode } from 'react'

function Chip({children,color}:{children:ReactNode,color?:string}) {
    return (
        <>
            <span id="badge-dismiss-default" className={`inline-flex rounded-4xl dark:text-white text-black items-center opacity-80 px-2 py-1 me-2 text-sm font-medium`} style={{backgroundColor:color}}>
                {children}
            </span>
        </>
    )
}

export default Chip