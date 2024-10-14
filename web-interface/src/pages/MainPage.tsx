import {Box, Toolbar} from "@mui/material";
import {useState} from "react";
import {Outlet} from "react-router-dom";
import MainAppBar from "../components/main/MainAppBar.tsx";
import MainDrawer from "../components/main/MainDrawer.tsx";

export default function MainPage() {
    const [open, setOpen] = useState<boolean>(true);

    return (
        <Box display={"flex"} height={"100%"}>
            <MainAppBar openDrawer={open} setOpenDrawer={setOpen}/>
            <MainDrawer open={open}/>
            <Box component={"main"} sx={{flexGrow: 1}}>
                <Toolbar/>
                <Outlet/>
            </Box>
        </Box>
    );
}