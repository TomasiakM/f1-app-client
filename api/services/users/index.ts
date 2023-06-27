import { IRegisterForm } from "@/types/services/user";

const register = (data: IRegisterForm) => {
    return useApiSend('api/user/register', { method: "POST", body: data })
}

export default { register }