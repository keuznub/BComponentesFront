import { HttpException } from "../../exceptions/HttpExcepction"

const BASE_URL = "http://localhost:3000/api/"
export const fetchAPI = async (endpoint:string,method:"GET"|"POST"|"PUT"|"DELETE",body?:any)=>{
    const response = await fetch(BASE_URL+endpoint,{
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body:JSON.stringify(body)
    })
    const data = await response.json()
    if(!response.ok) throw new HttpException(response.status,data.message)
    return data
}

export default fetchAPI