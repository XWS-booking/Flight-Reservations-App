import { AuthStore, authStoreSlice } from './auth-store/auth.store';
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { FlightStore, flightStoreSlice } from './flight-store/flight.store';

export type AppStore = AuthStore & FlightStore
export const useApplicationStore = create<AppStore>()(
    persist(
        immer((...a) => ({
            ...authStoreSlice(...a),
            ...flightStoreSlice(...a)
        })),
        {
            partialize: ({ token, user }) => ({
                token,
                user,
            }),
            name: 'application-store',
        }
    )
)