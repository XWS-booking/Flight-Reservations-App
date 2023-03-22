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

export const authStoreSlice: StateCreator<AuthStore>= () => ({
    ...state,
    login: ({email, password}: Login) => {},
    register: () => {}
})
