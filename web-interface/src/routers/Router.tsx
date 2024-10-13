import {createBrowserRouter, Navigate, To} from "react-router-dom";
import DashboardPage from "../pages/DashboardPage.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import NotFoundPage from "../pages/NotFoundPage.tsx";
import RegisterPage from "../pages/RegisterPage.tsx";
import {privateRoutes, publicRoutes} from "../utils/Routes.ts";
import PrivateRoutes from "./PrivateRoutes.tsx";
import RouterContent from "./RouterContent.tsx";

const getDefaultRedirection = () => privateRoutes.dashboard;

export const getRedirection = (route?: To, replace: boolean = true) => (
    <Navigate to={route ?? getDefaultRedirection()} replace={replace}/>
);

export const router = createBrowserRouter([
    {
        element: <RouterContent/>,
        children: [
            {
                path: publicRoutes.register,
                element: <RegisterPage/>
            },
            {
                path: publicRoutes.login,
                element: <LoginPage/>
            },
            {
                path: privateRoutes.dashboard,
                element: <PrivateRoutes><DashboardPage/></PrivateRoutes>
            },
            {
                path: publicRoutes.notFound,
                element: <NotFoundPage/>
            }
        ]
    },
    { // Go to 404 page if no route matches, this should always be the last route
        path: publicRoutes.all,
        element: getRedirection(publicRoutes.notFound)
    }
]);