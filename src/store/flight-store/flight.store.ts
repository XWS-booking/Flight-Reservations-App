import axios from "axios"
import { create, StateCreator } from "zustand"
import { Flight } from "./types/flight.type"
import produce from "immer"
import { AppStore } from "../application.store"

export type FlightStoreState = {
    addFlightRes: any
    getFlightsRes: any
    totalCount: any
}
export type FlightActions = {
    createFlight: (flight: Flight) => Promise<void>
    getFlights: (flight: Flight, pageNumber: number, pageSize: number) => Promise<any>
}

export const state: FlightStoreState = {
    addFlightRes: null,
    getFlightsRes: null,
    totalCount: null
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
    },
    getFlights: async (flight: Flight, pageNumber: number, pageSize: number) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/flights/getAll/${pageNumber}/${pageSize}`, {
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
                    console.log(res.data)
                    state.getFlightsRes = res.data.data
                    state.totalCount = res.data.totalCount
                    return state
                })
            )
        } catch (e) {
            console.log(e)
        }
    }
})