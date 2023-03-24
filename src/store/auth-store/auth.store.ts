import { create, StateCreator } from "zustand"
import { Login } from "./types/login.type"
import { Registration } from "./types/registration.type"

export type AuthStoreState = {
    token: string | null,
    user: any
}
export type AuthActions = {
    login: (data: Login) => void,
    register: (data: Registration) => void
}

export const state: AuthStoreState = {
    token: null,
    user: null
}


export type AuthStore = AuthStoreState & AuthActions

export const authStoreSlice: StateCreator<AuthStore>= (set) => ({
    ...state,
    login: async ({email, password}: Login) => {
        const rawResponse = await fetch('http://localhost:8000/auth/signin', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {
            'Content-Type': 'application/json',
            }
        });
        const token = await rawResponse.json();
        set({ token: token['access_token'] })
    },

    register: () => {}
})
