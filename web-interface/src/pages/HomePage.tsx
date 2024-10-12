import {Box, Typography} from "@mui/material";
import {useAuth} from "../context/Auth.tsx";

export default function HomePage() {
    const {user} = useAuth();

    return (
        <Box>
            <Typography variant={"h1"}>Home Page</Typography>
            <Typography>Hello, {user!.firstName} {user?.lastName} ({user!.role})!</Typography>
        </Box>
    );
}