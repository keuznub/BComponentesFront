import { HttpException } from "../../exceptions/HttpExcepction"

const API_URL = import.meta.env.BASE_URL+"/api/"
export const fetchAPI = async (endpoint:string,method:"GET"|"POST"|"PUT"|"DELETE",body?:any)=>{
    const response = await fetch(API_URL+endpoint,{
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