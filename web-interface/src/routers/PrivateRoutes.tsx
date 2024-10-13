import {ReactNode} from "react";
import {useLocation} from "react-router-dom";
import {toast} from "react-toastify";
import {useAuth} from "../context/Auth.tsx";
import {UserRole} from "../interfaces/User.ts";
import {publicRoutes} from "../utils/Routes.ts";
import {getRedirection} from "./Router.tsx";

interface PrivateRoutesProps {
    children: ReactNode;
    roles?: UserRole[];
}

export default function PrivateRoutes({children, roles}: Readonly<PrivateRoutesProps>) {
    const {state} = useLocation();
    const {user} = useAuth();

    if (!user) {
        toast.error("You must be logged in to use this page, redirecting to login page.");
        return getRedirection(publicRoutes.login);
    }

    if (roles && !roles.includes(user.role)) {
        console.log(state);
        if (state?.from) {
            toast.error("You don't have permission to access this page, redirecting to previous page.");
            return getRedirection(state.from, false);
        }
        toast.error("You don't have permission to access this page, redirecting to login page.");
        return getRedirection(publicRoutes.login);
    }
    return children;
}