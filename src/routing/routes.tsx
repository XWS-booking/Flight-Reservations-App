import { RouteObject } from "react-router-dom";
import App from "../App";
import { LoginPage } from "../modules/auth/pages/login.page";
import { HomePage } from "../pages/HomePage/HomePage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage></HomePage>,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
];
