import {createBrowserRouter, Navigate} from "react-router-dom";
import HomePage from "../pages/HomePage.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import NotFoundPage from "../pages/NotFoundPage.tsx";
import SignUpPage from "../pages/SignUpPage.tsx";
import {privateRoutes, publicRoutes} from "../utils/Routes.ts";
import PrivateRoutes from "./PrivateRoutes.tsx";
import RouterContent from "./RouterContent.tsx";

const getDefaultRedirection = () => privateRoutes.home;

export const getRedirection = (route?: string) => <Navigate replace to={route ?? getDefaultRedirection()}/>;

export const router = createBrowserRouter([
    {
        element: <RouterContent/>,
        children: [
            {path: publicRoutes.signUp, element: <SignUpPage/>},
            {path: publicRoutes.login, element: <LoginPage/>},
            {path: privateRoutes.home, element: <PrivateRoutes><HomePage/></PrivateRoutes>},
            {path: publicRoutes.notFound, element: <NotFoundPage/>}
        ]
    },
    {path: publicRoutes.all, element: getRedirection(publicRoutes.notFound)} // Go to 404 page if no route matches, this should always be the last route
]);