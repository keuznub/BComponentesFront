import { HTMLInputTypeAttribute, ReactNode } from 'react'

function InputComponent({name,type,value,onChange,children, placeholder,required}:{name:string,type:HTMLInputTypeAttribute,value?:string|number,onChange?:(e:any)=>any,children?:ReactNode,placeholder?:string,required?:boolean}) {
    return (
        <div className="mb-5">
            <label htmlFor={name} className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"}>{children}</label>
            <input type={type} name={name} value={value} onChange={onChange} id={name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black " 
            placeholder={placeholder}  required={required?true:false} />
        </div>
    )
}

export default InputComponent