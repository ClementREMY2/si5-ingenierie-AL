import {Box, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/Auth.tsx";
import {publicRoutes} from "../utils/Routes.ts";

export default function ProfilePage() {
    const navigate = useNavigate();
    const {logout} = useAuth();

    const handleLogout = () => {
        logout();
        navigate(publicRoutes.login);
    };

    return (<Box>
        <Typography variant={"h1"}>Profile page</Typography>
        <Button onClick={handleLogout}>Logout</Button>
    </Box>);
}