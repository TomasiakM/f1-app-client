import { defineStore } from 'pinia'
import { IAuthResponse } from '@/types/services/auth';

interface IUserState{
    token: string;
    user: {
        id: string;
        username: string;
        image: string;
        isAdmin: boolean;
    } | null;
}

export const useUserStore = defineStore('userStore', {
    state: () => {
      return {
        token: "",
        user: null,
      } as IUserState
    },
    actions:{
        setUser(data: IAuthResponse){
            this.token = data.accessToken;
            this.user = {
                id: data.id,
                username: data.username,
                image: data.image,
                isAdmin: data.roles.includes('Admin')
            }
            
        },
        async logout(){
            this.token = "";
            this.user = null;
        }
    },
    getters: {
        isAuthorized: (state) => !!state.token,
        getToken: (state) => state.token,
        getUser: (state) => state.user,
    }
  })
  