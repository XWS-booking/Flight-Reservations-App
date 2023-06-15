import axios from "axios";
import { create, StateCreator } from "zustand";
import { Flight } from "./types/flight.type";
import produce from "immer";
import { AppStore, useApplicationStore } from "../application.store";

export enum ResponseStatus {
  Success = "success",
  Loading = "loading",
  Error = "error",
}

export type ApiResponse = {
  data: any;
  status: ResponseStatus;
  error: null;
};

export type FlightStoreState = {
  addFlightRes: ApiResponse;
  flights: Flight[];
  totalCount: number;
  deleteFlightRes: ApiResponse;
  purchaseTicketRes: ApiResponse;
  userFlightTickets: any;
  spinner: boolean;
};
export type FlightActions = {
  createFlight: (flight: Flight) => Promise<void>;
  getFlights: (
    flight: Flight,
    pageNumber: number,
    pageSize: number
  ) => Promise<void>;
  deleteFlight: (flightId: string) => Promise<void>;
  purchaseFlightTicket: (flightId: string, quantity: number) => Promise<void>;
  getUserTicketHistory: () => Promise<void>;
};

export const state: FlightStoreState = {
  addFlightRes: {
    data: null,
    status: ResponseStatus.Loading,
    error: null,
  },
  flights: [],
  totalCount: 0,
  deleteFlightRes: {
    data: null,
    status: ResponseStatus.Loading,
    error: null,
  },
  purchaseTicketRes: {
    data: null,
    status: ResponseStatus.Loading,
    error: null,
  },
  userFlightTickets: null,
  spinner: false,
};

export type FlightStore = FlightStoreState & FlightActions;

export const flightStoreSlice: StateCreator<AppStore, [], [], FlightStore> = (
  set,
  get
) => ({
  ...state,
  createFlight: async (flight: Flight) => {
    set(
      produce((state: AppStore) => {
        state.addFlightRes.status = ResponseStatus.Loading;
        return state;
      })
    );
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/flights/add`,
        {
          destination: flight.destination,
          departure: flight.departure,
          seats: parseInt(flight.seats.toString()),
          price: parseInt(flight.price.toString()),
          date: new Date(flight.date).toISOString(),
          freeSeats: parseInt(flight.seats.toString()),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + get().token,
          },
        }
      );
      set(
        produce((state: AppStore) => {
          state.addFlightRes.data = res.data;
          state.addFlightRes.status = ResponseStatus.Success;
          return state;
        })
      );
    } catch (e) {
      console.log(e);
      set(
        produce((state: AppStore) => {
          state.addFlightRes.status = ResponseStatus.Error;
          return state;
        })
      );
    }
  },
  getFlights: async (flight: Flight, pageNumber: number, pageSize: number) => {
    set(
      produce((state: FlightStore) => {
        state.spinner = true;
        return state;
      })
    );
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/flights/getAll/${pageNumber}/${pageSize}`,
        flight,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + get().token,
          },
        }
      );
      set(
        produce((state: FlightStore) => {
          state.spinner = false;
          state.flights = res.data.data;
          state.totalCount = res.data.totalCount;
          return state;
        })
      );
    } catch (e) {
      console.log(e);
    }
  },
  deleteFlight: async (flightId: string) => {
    set(
      produce((state: FlightStore) => {
        state.deleteFlightRes.status = ResponseStatus.Loading;
        return state;
      })
    );
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/flights/${flightId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + get().token,
          },
        }
      );
      set(
        produce((state: FlightStore) => {
          state.deleteFlightRes.data = res.data;
          state.deleteFlightRes.status = ResponseStatus.Success;
          return state;
        })
      );
    } catch (e) {
      console.log(e);
      set(
        produce((state: FlightStore) => {
          state.deleteFlightRes.status = ResponseStatus.Error;
          return state;
        })
      );
    }
  },
  purchaseFlightTicket: async (flightId: string, quantity: number) => {
    set(
      produce((state: AppStore) => {
        state.purchaseTicketRes.status = ResponseStatus.Loading;
        return state;
      })
    );
    try {
      console.log(get().token);
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/flights/${flightId}/buy-tickets/${quantity}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + get().token,
          },
        }
      );

      set(
        produce((state: AppStore) => {
          state.purchaseTicketRes.data = res.data;
          state.purchaseTicketRes.status = ResponseStatus.Success;
          return state;
        })
      );
      console.log("eee", get().purchaseTicketRes.status);
    } catch (e) {
      console.log(e);
      set(
        produce((state: AppStore) => {
          state.purchaseTicketRes.status = ResponseStatus.Error;
          return state;
        })
      );
    }
  },
  getUserTicketHistory: async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/flights/tickets/listing`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + get().token,
          },
        }
      );
      set(
        produce((state: FlightStore) => {
          state.userFlightTickets = res.data.tickets;
          console.log("res ", state.userFlightTickets);
          return state;
        })
      );
    } catch (e) {
      console.log(e);
    }
  },
});
