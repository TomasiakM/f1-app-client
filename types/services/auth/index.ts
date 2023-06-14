type Role = 'User' | 'Admin'; 

export interface IAuthResponse{
    accessToken: string;
    id: string;
    image: string;
    roles: Role[]
    username: string;
}

export interface ILoginForm {
    username: string;
    password: string;
}