import {ReactNode} from "react";
import {toast} from "react-toastify";
import {useAuth} from "../context/Auth.tsx";
import {UserRole} from "../interfaces/User.ts";
import {privateRoutes, publicRoutes} from "../utils/Routes.ts";
import {getRedirection} from "./Router.tsx";

interface PrivateRoutesProps {
    children: ReactNode;
    roles?: UserRole[];
}

export default function PrivateRoutes({children, roles}: Readonly<PrivateRoutesProps>) {
    const {user} = useAuth();

    if (!user) {
        toast.error("You must be logged in to use this page, redirecting to login page.");
        return getRedirection(publicRoutes.login);
    }

    if (roles && !roles.includes(user.role)) {
        toast.error("You don't have permission to access this page, redirecting to dashboard.");
        return getRedirection(privateRoutes.dashboard, false, "path");
    }
    return children;
}