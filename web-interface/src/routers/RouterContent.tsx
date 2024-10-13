import "react-toastify/dist/ReactToastify.css";
import "moment/locale/fr.js";
import {Box, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import {Outlet} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import PageTemplate from "../pages/PageTemplate.tsx";

moment.locale("fr");

// https://zenoo.github.io/mui-theme-creator/
const theme = createTheme({});

export default function RouterContent() {
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