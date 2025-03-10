
export class CacheAPI{

    static putDataURL = async (url:string, data:any)=>{
        const cache = await caches.open("api-responses")
        cache.put(url,data)
    }

    static getDataURL = async (url:string):Promise<any>=>{
        const cache = await caches.open("api-responses")
        const response = await cache.match(url)
        if(!response) return null
        return await response.json()
    }

    static deleteDataURL = async (url:string)=>{
        const cache = await caches.open("api-responses")
        cache.delete(url)
    }
}

