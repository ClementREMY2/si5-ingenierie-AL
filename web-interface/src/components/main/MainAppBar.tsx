import {Menu as MenuIcon, MenuOpen} from "@mui/icons-material";
import {AppBar, Avatar, Button, IconButton, Stack, SxProps, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/Auth.tsx";
import {privateRoutes} from "../../utils/Routes.ts";
import {stringToColor} from "../../utils/Services.ts";

interface MainAppBarProps {
    openDrawer?: boolean;
    setOpenDrawer?: (open: boolean) => void;
}

export default function MainAppBar({openDrawer, setOpenDrawer = () => {}}: Readonly<MainAppBarProps>) {
    const navigate = useNavigate();
    const {user} = useAuth();

    const avatarSx: SxProps = {
        fontSize: "0.875rem",
        height: 30,
        width: 30,
        bgcolor: stringToColor(`${user?.firstName} ${user?.lastName}`)
    };

    return (
        <AppBar position={"fixed"} variant={"outlined"} color={"inherit"}
                sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
            <Toolbar disableGutters>
                <IconButton
                    size={"large"}
                    color={"inherit"}
                    onClick={() => setOpenDrawer(!open)}
                    sx={{ml: 0.5, mr: 1.5}}>
                    {openDrawer ? <MenuOpen/> : <MenuIcon/>}
                </IconButton>
                <Typography variant={"h6"} flexGrow={1}>
                    ALM
                </Typography>
                <Stack component={Button} variant={"text"} textTransform={"none"} color={"inherit"}
                       direction={"row"} spacing={1} sx={{mr: 1}} onClick={() => navigate(privateRoutes.profile)}>
                    <Avatar sx={avatarSx}>
                        {user?.firstName.charAt(0).toUpperCase()}{user?.lastName.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography>{user?.firstName} {user?.lastName}</Typography>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}