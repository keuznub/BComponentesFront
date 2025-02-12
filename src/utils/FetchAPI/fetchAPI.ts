
const BASE_URL = "http://localhost:3000/api/"
export const fetchAPI = async (endpoint:string,method:"GET"|"POST"|"PUT"|"DELETE",body:any={})=>{
    return await fetch(BASE_URL+endpoint,{
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body:JSON.stringify(body)
    })
}

export default fetchAPI