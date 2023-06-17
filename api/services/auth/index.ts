import { IAuthResponse, ILoginForm } from "@/types/services/auth";

const login = (body: ILoginForm) => {
    return useApiSend<IAuthResponse>("/api/auth/login", { body, method: "POST", credentials: 'include' });
}

const logout = () => {
    return useApiSend('/api/auth/logout', { method: "GET", credentials: 'include' });
}

export default { login, logout }