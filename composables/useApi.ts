import { useUserStore } from "@/stores/userStore";
import type { FetchRequest, FetchOptions } from 'ofetch';
import { IAuthResponse } from "@/types/services/auth";

type IFormDataError = { [key: string]: string; };

interface IError {
    status: number;
    message: string;
    errors: { [key: string]: string; } | null;
}

export default async <TData>(url: FetchRequest, opt: FetchOptions = {}, params: {[key: string]: Ref<string> | Ref<number> } = {}) => {
    const data: Ref<TData | null> = ref(null);
    const error: Ref<IError | null> = ref(null);
    const isLoading = ref(false);

    const config = useRuntimeConfig();
    const userStore = useUserStore();

    const fetch = async () => {
        error.value = null;
        isLoading.value = true;


        let query = "";
        if(Object.keys(params).length){
            query = "?";
            for(const el of Object.keys(params)){
                query += `${el}=${params[el].value}&`
            }
            query = query.substring(0, query.length - 1);
        }

        const myFetch = $fetch.create({
            baseURL: config.public.baseApiUrl,
            headers: {
                'Authorization': `Bearer ${userStore.getToken}`
            },
            ...opt
        });

        try{
            const res = await myFetch.raw<TData>(url + query);
            data.value = res._data || null;
        } catch(err: any) {
            if(err.response?.status === 401){
                const { success } = await refreshToken();
                
                if(success){
                    try{
                        const myFetch2 = $fetch.create({
                            baseURL: config.public.baseApiUrl,
                            headers: {
                                'Authorization': `Bearer ${userStore.getToken}`
                            },
                            ...opt
                        });

                        const res = await myFetch2.raw<TData>(url + query);
                        data.value = res._data || null;
                        
                        return;
                    } catch(err: any){
                        error.value = errorFactory(err.response?.status || 500, err.response?._data?.errors);
                    }
                }
            }

            error.value = errorFactory(err.response?.status || 500, err.response?._data?.errors);
        }
        
        isLoading.value = false;
    }

    await fetch();

    const refresh = async () => {
        await fetch();
    }

    return { data, error, isLoading, refresh }
}

const refreshToken = async () => {
    const config = useRuntimeConfig();
    const userStore = useUserStore();

    const myFetch = $fetch.create({
        baseURL: config.public.baseApiUrl,
        credentials: 'include',
        method: "get",
    });

    try{
        const res = await myFetch.raw<IAuthResponse>("auth/refresh");

        userStore.setUser(res._data!);

        return { success: true }
    } catch(err: any){
        if(err.response.statusCode === 403){
            await userStore.logout();
        }

        return { success: false }
    }

}


const errorFactory = (statusCode: number, errors: IFormDataError | null = null): IError => {
    let err: IError = {
        status: 500,
        message: "Coś poszło nie tak",
        errors: null,
    }

        switch(statusCode){
            case 400:
                err.status = 400;
                err.message = "Błąd walidacji danych"
                err.errors = errors;
                break;
            case 401:
                err.status = 401;
                err.message = "Brak autoryzacji"
                break;
            case 403:
                err.status = 403;
                err.message = "Nie masz dostępu do tych danych"
                break;
            case 404:
                err.status = 404;
                err.message = "Nie odnaleziono zasobu"
                break;
        }

    return err;
}