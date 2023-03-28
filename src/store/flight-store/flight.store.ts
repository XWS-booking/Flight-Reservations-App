import axios from "axios"
import { create, StateCreator } from "zustand"
import { Flight } from "./types/flight.type"
import produce from "immer"
import { AppStore } from "../application.store"

export type FlightStoreState = {
    addFlightRes: any
    getFlightsRes: Flight[]
    totalCount: number
    deleteFlightRes: any
    purchaseTicketRes: any
    userFlightTickets: any
}
export type FlightActions = {
    createFlight: (flight: Flight) => Promise<void>
    getFlights: (flight: Flight, pageNumber: number, pageSize: number) => Promise<void>
    deleteFlight: (flightId: string) => Promise<void>
    purchaseFlightTicket: (flightId: string, quantity: number) => Promise<void>
    getUserTicketHistory: () => Promise<void>
}

export const state: FlightStoreState = {
    addFlightRes: null,
    getFlightsRes: [],
    totalCount: 0,
    deleteFlightRes: null,
    purchaseTicketRes: null,
    userFlightTickets: null
}


export type FlightStore = FlightStoreState & FlightActions

export const flightStoreSlice: StateCreator<AppStore, [], [], FlightStore> = (set, get) => ({
    ...state,
    createFlight: async (flight: Flight) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/flights/add`, {
                destination: flight.destination,
                departure: flight.departure,
                seats: parseInt(flight.seats.toString()),
                price: parseInt(flight.price.toString()),
                date: new Date(flight.date).toISOString(),
                freeSeats: parseInt(flight.seats.toString())
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + get().token
                }
            })
            set(
                produce((state: FlightStore) => {
                    state.addFlightRes = res.data
                    return state
                })
            )
        } catch (e) {
            console.log(e)
        }
    },
    getFlights: async (flight: Flight, pageNumber: number, pageSize: number) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/flights/getAll/${pageNumber}/${pageSize}`, flight, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + get().token
                }
            })
            set(
                produce((state: FlightStore) => {
                    state.getFlightsRes = res.data.data
                    state.totalCount = res.data.totalCount
                    return state
                })
            )
        } catch (e) {
            console.log(e)
        }
    },
    deleteFlight: async (flightId: string) => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/flights/${flightId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + get().token
                }
            })
            set(
                produce((state: FlightStore) => {
                    state.deleteFlightRes = res.data
                    return state
                })
            )
        } catch (e) {
            console.log(e)
        }
    },
    purchaseFlightTicket: async (flightId: string, quantity: number) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/flights/${flightId}/buy-tickets/${quantity}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + get().token
                }
            })
            set(
                produce((state: FlightStore) => {
                    state.purchaseTicketRes = res.data
                    return state
                })
            )
        } catch (e) {
            console.log(e)
        }
    },
    getUserTicketHistory: async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/flights/tickets/listing`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + get().token
                }
            })
            set(
                produce((state: FlightStore) => {
                    state.userFlightTickets = res.data.tickets
                    console.log('res ', state.userFlightTickets)
                    return state
                })
            )
        } catch (e) {
            console.log(e)
        }
    }
})