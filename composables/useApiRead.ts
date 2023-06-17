import { useUserStore } from "@/stores/userStore";

export default async <TResponse>(url: string ) => {
    const { public: { baseApiUrl } } = useRuntimeConfig();
    const { getToken } = useUserStore()
    const res = await useFetch<TResponse>(url, {
        baseURL: baseApiUrl,
        retry: false,
        headers: {
            'Authorization': `Bearer ${getToken}`
        },
    });
    
    if(res.error.value?.statusCode === 401){
        const { isSuccess } = await useRefreshToken();
        
        if(!isSuccess){
            return res;
        }

        return await useFetch<TResponse>(url, {
            baseURL: baseApiUrl,
            retry: false,
            headers: {
                'Authorization': `Bearer ${getToken}`
            },
        });
    }

    return res;
}