import React, { ReactNode } from 'react'

function Chip({children,color}:{children:ReactNode,color:string}) {
    return (
        <>
            <span id="badge-dismiss-default" className={`inline-flex items-center px-2 py-1 me-2 text-sm font-medium`} style={{backgroundColor:color}}>
                {children}
                <button type="button" className={`inline-flex items-center p-1 ms-2 text-sm bg-transparent rounded-xs`} style={{backgroundColor:color}} data-dismiss-target="#badge-dismiss-default" aria-label="Remove">
                    <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Remove</span>
                </button>
            </span>
        </>
    )
}

export default Chip