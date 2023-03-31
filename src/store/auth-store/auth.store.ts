import { produce } from 'immer';
import { StateCreator } from "zustand"
import { DEFAULT_HEADERS } from "../../utils/auth.constants"
import { User } from "./model/user.model"
import { Login } from "./types/login.type"
import { Registration } from "./types/registration.type"

export type AuthStoreState = {
    token: string | null,
    user: User | null
}
export type AuthActions = {
    login: (data: Login) => Promise<boolean>,
    register: (data: Registration) => void,
    logout: () => void,
}

export const state: AuthStoreState = {
    token: null,
    user: null,
}


export type AuthStore = AuthStoreState & AuthActions

export const authStoreSlice: StateCreator<AuthStore> = (set) => ({
    ...state,
    login: async ({ email, password }: Login) => {
        const rawResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/signin`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: DEFAULT_HEADERS
        }).then(res => {
            if(res.status >= 400) {
                return null
            }
            return res.json();
        });
        const token = await rawResponse;
        if(token == null) return false
        const resp = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/user`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token['access_token']
            }
        });
        const user = await resp.json();
        set(
            produce((state: AuthStore) => {
                state.token = token['access_token']
                state.user = user
                return state
            })
        )
        return true;
    },
    logout: () => {
        set(
            produce((state: AuthStore) => {
                state.token = null
                state.user = null
                return state
            })
        )
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

