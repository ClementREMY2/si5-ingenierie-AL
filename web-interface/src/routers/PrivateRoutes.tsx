import {ReactNode} from "react";
import {Outlet} from "react-router-dom";
import {toast} from "react-toastify";
import {useAuth} from "../context/Auth.tsx";
import {UserRole} from "../interfaces/model/User.ts";
import {publicRoutes} from "../utils/Routes.ts";
import {getRedirection} from "./Router.tsx";

interface PrivateRoutesProps {
    children?: ReactNode;
    roles?: UserRole[];
}

export default function PrivateRoutes({children, roles}: Readonly<PrivateRoutesProps>) {
    const {token, user, logout} = useAuth();

    if (!token || !user) {
        logout();
        toast.error("You must be logged in to use this page, redirecting to login page.");
        return getRedirection(publicRoutes.login);
    }

    if (roles && !roles.includes(user.role)) {
        toast.error("You don't have permission to access this page, redirecting to dashboard.");
        return getRedirection();
    }
    return children ?? <Outlet/>;
}