import {createBrowserRouter, Navigate, To} from "react-router-dom";
import {UserRole} from "../interfaces/User.ts";
import DashboardPage from "../pages/DashboardPage.tsx";
import DoctorListPage from "../pages/DoctorListPage.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import MainPage from "../pages/MainPage.tsx";
import NotFoundPage from "../pages/NotFoundPage.tsx";
import PatientListPage from "../pages/PatientListPage.tsx";
import ProfilePage from "../pages/ProfilePage.tsx";
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
                element: <MainPage/>,
                children: [
                    {
                        path: privateRoutes.profile,
                        element: <PrivateRoutes><ProfilePage/></PrivateRoutes>
                    },
                    {
                        path: privateRoutes.dashboard,
                        element: <PrivateRoutes><DashboardPage/></PrivateRoutes>
                    },
                    // Doctors
                    {
                        path: privateRoutes.doctors.base,
                        element: <PrivateRoutes roles={[UserRole.ADMIN]}/>,
                        children: [
                            {
                                path: privateRoutes.doctors.list,
                                element: <DoctorListPage/>
                            },
                            {
                                path: privateRoutes.doctors.create,
                                element: <DoctorListPage/>
                            }
                        ]
                    },
                    // Patients
                    {
                        path: privateRoutes.patients,
                        element: <PrivateRoutes roles={[UserRole.DOCTOR]}><PatientListPage/></PrivateRoutes>
                    }
                ]
            },
            {
                path: "/",
                element: getRedirection(publicRoutes.login)
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