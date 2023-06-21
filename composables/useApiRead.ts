import type { FetchRequest, FetchOptions, FetchResponse } from 'ofetch';
import { useUserStore } from "@/stores/userStore";

 const useApiRead =async <T>(request: FetchRequest, opts: FetchOptions = {})=> {
    const config = useRuntimeConfig()
    const userStore = useUserStore()

    const myFetch = $fetch.create({
        baseURL: config.public.baseApiUrl,
        headers: {
            'Authorization': `Bearer ${userStore.getToken}`
        },
        ...opts,
    })

    try{
        const data = await myFetch.raw(request);

        return Promise.resolve<T>(data._data as T);
    } catch(err: any){
        return Promise.reject(err);
    }

    //return useFetch(request, { baseURL: config.public.baseApiUrl, retry: false,
        
  }
  
  export default useApiRead;