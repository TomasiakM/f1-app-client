import { useUserStore } from "~/stores/userStore";
import { IAuthResponse } from "~/types/services/auth";

export default async () => {
    let isSuccess = false;

    const { public: { baseApiUrl }} = useRuntimeConfig();
    const { data } = await useFetch<IAuthResponse>('/api/auth/refresh', {
        baseURL: baseApiUrl,
        method: "GET",
        credentials: 'include',
        retry: false,
    });

    if(data.value){
        const userStore = useUserStore();
        userStore.setUser(data.value);
        
        isSuccess = true;
    }

    return { isSuccess }
}