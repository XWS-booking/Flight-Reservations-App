import { create, StateCreator } from "zustand"
import { DEFAULT_HEADERS } from "../../utils/auth.constants"
import { User } from "./model/user.model"
import { Login } from "./types/login.type"
import { Registration } from "./types/registration.type"

export type AuthStoreState = {
    token: string | null,
    user: User | null
}
export type AuthActions = {
    login: (data: Login) => void,
    register: (data: Registration) => void,
}

export const state: AuthStoreState = {
    token: null,
    user: null
}


export type AuthStore = AuthStoreState & AuthActions

export const authStoreSlice: StateCreator<AuthStore> = (set) => ({
    ...state,
    login: async ({ email, password }: Login) => {
        const rawResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/signin`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: DEFAULT_HEADERS
        });
        const token = await rawResponse.json();
        const resp = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/user`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token['access_token']
            }
        });
        const user = await resp.json();
        set({ user: user })
        set({ token: token['access_token'] })
    },

    register: async (data: Registration) => {

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/register`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: DEFAULT_HEADERS
            })

            const dt = await response.json()
            console.log(dt)
        } catch (e) {
            console.log(e)
        }
    },
})
