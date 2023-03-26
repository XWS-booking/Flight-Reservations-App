import { RouteObject } from "react-router-dom";
import App from "../App";
import { FlightPage } from "../pages/FlightPage/FlightPage";
import { HomePage } from "../pages/HomePage/HomePage";
import { TicketHistory } from "../pages/TicketHistory/TicketHistory";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <HomePage />
            },
            {
                path: '/flights',
                element: <FlightPage />
            },
            {
                path: '/ticket-history',
                element: <TicketHistory></TicketHistory>
            }
        ]
    }

]

