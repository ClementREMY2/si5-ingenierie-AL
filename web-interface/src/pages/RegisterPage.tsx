import {Button, Card, Stack, TextField, Typography} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/Auth.tsx";
import {UserRegister} from "../interfaces/User.ts";
import {privateRoutes, publicRoutes} from "../utils/Routes.ts";

export default function RegisterPage() {
    const navigate = useNavigate();
    const {handleRegister} = useAuth();

    const [registerData, setRegisterData] = useState<UserRegister>({});
    const [registerError, setRegisterError] = useState<UserRegister>({});

    const handleRegisterChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setRegisterData(prevState => ({...prevState, [name]: value}));
    };

    const handleRegisterSubmit = () => {
        const result = handleRegister(registerData);
        if (result?.error) setRegisterError(result.error);
        else navigate(privateRoutes.dashboard);
    };

    return (
        <Stack justifyContent={"center"} alignItems={"center"} minHeight={"100%"} padding={2}>
            <Card variant={"outlined"} component={Stack} spacing={2} paddingX={4} paddingY={2}>
                <Typography component={"h1"} variant={"h2"}>Register</Typography>
                <Stack spacing={2}>
                    <TextField
                        label={"First Name"}
                        name={"firstName"}
                        value={registerData.firstName ?? ""}
                        onChange={handleRegisterChange}
                        error={!!registerError.firstName}
                        helperText={registerError.firstName ?? ""}
                        color={registerError.firstName ? "error" : "primary"}
                        required fullWidth/>
                    <TextField
                        label={"Last Name"}
                        name={"lastName"}
                        value={registerData.lastName ?? ""}
                        onChange={handleRegisterChange}
                        error={!!registerError.lastName}
                        helperText={registerError.lastName ?? ""}
                        color={registerError.lastName ? "error" : "primary"}
                        required fullWidth/>
                    <TextField
                        label={"Phone number"}
                        name={"phone"}
                        value={registerData.phone ?? ""}
                        onChange={handleRegisterChange}
                        error={!!registerError.phone}
                        helperText={registerError.phone ?? ""}
                        color={registerError.phone ? "error" : "primary"}
                        required fullWidth/>
                    <TextField
                        label={"Email"}
                        name={"email"}
                        value={registerData.email ?? ""}
                        onChange={handleRegisterChange}
                        error={!!registerError.email}
                        helperText={registerError.email ?? ""}
                        color={registerError.email ? "error" : "primary"}
                        required fullWidth/>
                    <TextField
                        label={"Password"}
                        name={"password"}
                        type={"password"}
                        value={registerData.password ?? ""}
                        onChange={handleRegisterChange}
                        error={!!registerError.password}
                        helperText={registerError.password ?? ""}
                        color={registerError.password ? "error" : "primary"}
                        required fullWidth/>
                    <TextField
                        label={"Confirm Password"}
                        name={"confirmPassword"}
                        type={"password"}
                        value={registerData.confirmPassword ?? ""}
                        onChange={handleRegisterChange}
                        error={!!registerError.confirmPassword}
                        helperText={registerError.confirmPassword ?? ""}
                        color={registerError.confirmPassword ? "error" : "primary"}
                        required fullWidth/>
                    <Stack spacing={2}>
                        <Button variant={"contained"} size={"large"} onClick={handleRegisterSubmit} fullWidth>
                            Register
                        </Button>
                        <Typography>
                            Already have an account?
                            <Button variant={"text"} color={"primary"} onClick={() => navigate(publicRoutes.login)}>
                                Log in
                            </Button>
                        </Typography>
                    </Stack>
                </Stack>
            </Card>
        </Stack>
    );
}