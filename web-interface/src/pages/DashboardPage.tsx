import {Menu as MenuIcon, MenuOpen} from "@mui/icons-material";
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {useState} from "react";
import MainDrawer from "../components/main/MainDrawer.tsx";

export default function DashboardPage() {
    const [open, setOpen] = useState<boolean>(true);

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
                    <Button variant={"text"} color={"inherit"} sx={{mr: 0.5}}>
                        <Typography>Logout</Typography>
                    </Button>
                </Toolbar>
            </AppBar>
            <MainDrawer open={open}/>
            <Box component={"main"} sx={{flexGrow: 1}}>
                <Toolbar/>
                <p>rejezfreozk,lspqkd,ofveijgrbhvnejiqzck,coanezrpvijeanjc</p>
            </Box>
        </Box>
    );
}