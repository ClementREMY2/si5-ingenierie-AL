import {createBrowserRouter, Navigate, To} from "react-router-dom";
import {UserRole} from "../interfaces/model/User.ts";
import DashboardPage from "../pages/DashboardPage.tsx";
import DoctorEditPage from "../pages/doctor/DoctorEditPage.tsx";
import DoctorListPage from "../pages/doctor/DoctorListPage.tsx";
import GatewayEditPage from "../pages/gateway/GatewayEditPage.tsx";
import GatewayListPage from "../pages/gateway/GatewayListPage.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import MainPage from "../pages/MainPage.tsx";
import NotFoundPage from "../pages/NotFoundPage.tsx";
import PatientEditPage from "../pages/patient/PatientEditPage.tsx";
import PatientListPage from "../pages/patient/PatientListPage.tsx";
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
                                element: <DoctorEditPage edit/>
                            },
                            {
                                path: privateRoutes.doctors.view,
                                element: <DoctorEditPage/>
                            },
                            {
                                path: privateRoutes.doctors.edit,
                                element: <DoctorEditPage edit/>
                            }
                        ]
                    },
                    // Gateways
                    {
                        path: privateRoutes.gateways.base,
                        element: <PrivateRoutes roles={[UserRole.ADMIN]}/>,
                        children: [
                            {
                                path: privateRoutes.gateways.list,
                                element: <GatewayListPage/>
                            },
                            {
                                path: privateRoutes.gateways.create,
                                element: <GatewayEditPage edit/>
                            },
                            {
                                path: privateRoutes.gateways.view,
                                element: <GatewayEditPage/>
                            },
                            {
                                path: privateRoutes.gateways.edit,
                                element: <GatewayEditPage edit/>
                            }
                        ]
                    },
                    // Patients
                    {
                        path: privateRoutes.patients.base,
                        element: <PrivateRoutes roles={[UserRole.ADMIN]}/>,
                        children: [
                            {
                                path: privateRoutes.patients.list,
                                element: <PatientListPage/>
                            },
                            {
                                path: privateRoutes.patients.create,
                                element: <PatientEditPage edit/>
                            },
                            {
                                path: privateRoutes.patients.view,
                                element: <PatientEditPage/>
                            },
                            {
                                path: privateRoutes.patients.edit,
                                element: <PatientEditPage edit/>
                            }
                        ]
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