import axios from "axios"
import { create, StateCreator } from "zustand"
import { Flight } from "./types/flight.type"
import produce from "immer"
import { AppStore } from "../application.store"

export type FlightStoreState = {
    addFlightRes: any
}
export type FlightActions = {
    createFlight: (flight: Flight) => Promise<void>
}

export const state: FlightStoreState = {
    addFlightRes: null
}


export type FlightStore = FlightStoreState & FlightActions

export const flightStoreSlice: StateCreator<AppStore, [], [], FlightStore> = (set, get) => ({
    ...state,
    createFlight: async (flight: Flight) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/flights/add`, {
                'Seats': flight.seats,
                'Date': flight.date,
                'StartLocation': flight.departure,
                'EndLocation': flight.destination,
                'Price': flight.price
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + get().token
                }
            })
            set(
                produce((state: FlightStore) => {
                    state.addFlightRes.data = res.data
                    return state
                })
            )
        } catch (e) {
            console.log(e)
        }
    }
})