import { FetchOptions } from "ofetch";
import { useUserStore } from "~/stores/userStore";

interface IApiErrorResponse {
    detail: string;
    status: number;
    errors?: { [key: string]: string };
}

const myFetch = <TResponse>(url: string, opt: FetchOptions = {}) => {
    const userStore = useUserStore();
    const { public: { baseApiUrl }} = useRuntimeConfig()
    
    const res = $fetch.create<TResponse>({
        baseURL: baseApiUrl,
        retry: false,
        headers: {
            'Authorization': `Bearer ${userStore.getToken}`
        },
        ...opt,
    })

    return res.raw(url);
}

export default async <TResponse = null>(url: string, opt: FetchOptions = {}) => {
    try{
        const result = await myFetch<TResponse>(url, opt);
        return { data: result._data, error: null}
    } catch(err: any){
        console.log(err.response)
        let error: IApiErrorResponse = {
            detail: "Coś poszło nie tak",
            status: 500,
        }

        if(err.response === undefined){
            return { error, data: null };
        }


        if(err.response.status === 401 && !url.includes('auth/login')){
            await useRefreshToken();

            try{
                const result = await myFetch<TResponse>(url, opt);
                return { data: result._data, error: null}
            } catch(err: any){
        
                if(err.data){
                    error = err.data;
                }
                return { error, data: null };
            }
        }
        
        if(err.data){
            error = err.data;
        }

        return { error, data: null };
    }
}