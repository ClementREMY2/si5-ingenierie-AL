import {Menu as MenuIcon, MenuOpen} from "@mui/icons-material";
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import MainDrawer from "../components/main/MainDrawer.tsx";
import {useAuth} from "../context/Auth.tsx";
import {publicRoutes} from "../utils/Routes.ts";

export default function MainPage() {
    const navigate = useNavigate();
    const {logout} = useAuth();

    const [open, setOpen] = useState<boolean>(true);

    const handleLogout = () => {
        logout();
        navigate(publicRoutes.login);
    };

    return (
        <Box display={"flex"} height={"100%"}>
            <AppBar position={"fixed"} variant={"outlined"} color={"inherit"}
                    sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <Toolbar disableGutters>
                    <IconButton
                        size={"large"}
                        color={"inherit"}
                        onClick={() => setOpen(!open)}
                        sx={{ml: 0.5, mr: 1.5}}>
                        {open ? <MenuOpen/> : <MenuIcon/>}
                    </IconButton>
                    <Typography variant={"h6"} flexGrow={1}>
                        ALM
                    </Typography>
                    <Button variant={"text"} color={"inherit"} sx={{mr: 0.5}} onClick={handleLogout}>
                        <Typography>Logout</Typography>
                    </Button>
                </Toolbar>
            </AppBar>
            <MainDrawer open={open}/>
            <Box component={"main"} sx={{flexGrow: 1}}>
                <Toolbar/>
                <Outlet/>
            </Box>
        </Box>
    );
}