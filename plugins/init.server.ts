import { IAuthResponse } from "@/types/services/auth";
import { useUserStore } from "@/stores/userStore";

export default defineNuxtPlugin(async () => {
    const authCookie = useCookie('Refresh-Cookie');
    if(!authCookie.value){
        return;
    }

    const { public: { baseApiUrl }} = useRuntimeConfig();
    const myFetch = $fetch.create({
        baseURL: baseApiUrl,
        method: 'GET',
        credentials: "include",
        headers: useRequestHeaders(['cookie']),
    })
    
    const store = useUserStore();
    try{
        const res = await myFetch.raw<IAuthResponse>("api/auth/refresh");
        if(res._data){
            store.setUser(res._data)
            return;
        }
    } catch { }
    
    store.logout();
})
