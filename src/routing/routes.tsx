import { RouteObject } from "react-router-dom";
import App from "../App";
import { LoginPage } from "../modules/auth/pages/login.page";



export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '/login',
                element: <LoginPage/>
            }
        ]
    }

]