import {  ReactNode } from 'react'

function ButtonComponent({name,type,onClick,children,className}:{name?:string,type:"button" | "reset" | "submit" | undefined,onClick?:(e:any)=>any,children?:ReactNode,className?:string}) {
    return (
            <button type={type} name={name} onClick={onClick} id={name} className={"font-bold bg-orange-500 hover:bg-orange-600 cursor-pointer text-gray-900 text-sm rounded-lg p-2.5 dark:text-white "+className}>
                {children}
            </button>
    )
}

export default ButtonComponent