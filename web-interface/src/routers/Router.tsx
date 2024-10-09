import {createBrowserRouter, Navigate} from "react-router-dom";
import HomePage from "../pages/HomePage.tsx";
import NotFound from "../pages/NotFoundPage.tsx";
import SignIn from "../pages/SignIn.tsx";
import SignUp from "../pages/SignUp.tsx";
import {privateRoutes, publicRoutes} from "../utils/Routes.ts";
import RouterContent from "./RouterContent.tsx";

const getDefaultRedirection = () => privateRoutes.home;

const getRedirection = (route?: string) => <Navigate replace to={route ?? getDefaultRedirection()}/>;

export const router = createBrowserRouter([
    {
        element: <RouterContent/>,
        children: [
            {path: publicRoutes.signUp, element: <SignUp/>},
            {path: publicRoutes.signIn, element: <SignIn/>},
            {path: privateRoutes.home, element: <HomePage/>},
            {path: publicRoutes.notFound, element: <NotFound/>}
        ]
    },
    {path: publicRoutes.all, element: getRedirection(publicRoutes.notFound)} // Go to 404 page if no route matches, this should always be the last route
]);