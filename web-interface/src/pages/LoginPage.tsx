import {Button, Card, Stack, TextField, Typography} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/Auth.tsx";
import {UserLogin} from "../interfaces/model/User.ts";
import {privateRoutes, publicRoutes} from "../utils/Routes.ts";

export default function LoginPage() {
    const navigate = useNavigate();
    const {handleLogin} = useAuth();

    const [loginData, setLoginData] = useState<UserLogin>({});
    const [loginError, setLoginError] = useState<UserLogin>({});

    const handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setLoginData(prevState => ({...prevState, [name]: value}));
    };

    const handleLoginSubmit = () => {
        const result = handleLogin(loginData);
        if (result?.error) setLoginError(result.error);
        else navigate(privateRoutes.dashboard);
    };

    return (
        <Stack justifyContent={"center"} alignItems={"center"} minHeight={"100%"} padding={2}>
            <Card variant={"outlined"} component={Stack} spacing={2} paddingX={4} paddingY={2}>
                <Typography component={"h1"} variant={"h2"}>Login</Typography>
                <Stack spacing={2}>
                    <TextField
                        label={"Email"}
                        name={"email"}
                        value={loginData.email ?? ""}
                        onChange={handleLoginChange}
                        error={!!loginError.email}
                        helperText={loginError.email ?? ""}
                        color={loginError.email ? "error" : "primary"}
                        required fullWidth/>
                    <TextField
                        label={"Password"}
                        name={"password"}
                        type={"password"}
                        value={loginData.password ?? ""}
                        onChange={handleLoginChange}
                        error={!!loginError.password}
                        helperText={loginError.password ?? ""}
                        color={loginError.password ? "error" : "primary"}
                        required fullWidth/>
                    <Stack spacing={2}>
                        <Button variant={"contained"} size={"large"} onClick={handleLoginSubmit} fullWidth>
                            Login
                        </Button>
                        <Typography>
                            Don't have an account?
                            <Button variant={"text"} color={"primary"} onClick={() => navigate(publicRoutes.register)}>
                                Register
                            </Button>
                        </Typography>
                    </Stack>
                </Stack>
            </Card>
        </Stack>
    );
}