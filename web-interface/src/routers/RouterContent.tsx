import "react-toastify/dist/ReactToastify.css";
import "moment/locale/fr.js";
import {Box, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import {useEffect} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {useAuth} from "../context/Auth.tsx";
import PageTemplate from "../pages/PageTemplate.tsx";
import {privateRoutes} from "../utils/Routes.ts";
import {isPublicRoute} from "../utils/Services.ts";

moment.locale("fr");

// https://zenoo.github.io/mui-theme-creator/
const theme = createTheme({});

export default function RouterContent() {
    const navigate = useNavigate();
    const location = useLocation();
    const {user} = useAuth();

    useEffect(() => {
        if (user && isPublicRoute(location.pathname)) {
            toast.info(`Bienvenue ${user.firstName} ${user.lastName}!`);
            return navigate(privateRoutes.dashboard);
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={"fr"}>
                <Box display={"flex"} height={"100%"}>
                    <CssBaseline/>
                    <ToastContainer position={"top-center"} theme={"colored"} closeOnClick/>
                    <PageTemplate>
                        <Outlet/> {/* This is where the child routes will be rendered */}
                    </PageTemplate>
                </Box>
            </LocalizationProvider>
        </ThemeProvider>
    );
}