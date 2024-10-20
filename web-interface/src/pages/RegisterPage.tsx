import {Button, Card, Stack, TextField, Typography} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useAuth} from "../context/Auth.tsx";
import {UserRegister} from "../interfaces/model/User.ts";
import {emptyUserRegister} from "../mocks/User.ts";
import {checkRegisterUser} from "../services/UserService.ts";
import {privateRoutes, publicRoutes} from "../utils/Routes.ts";

export default function RegisterPage() {
    const navigate = useNavigate();
    const {handleRegister} = useAuth();

    const [registerData, setRegisterData] = useState<UserRegister>({...emptyUserRegister});
    const [registerError, setRegisterError] = useState<UserRegister>({...emptyUserRegister});

    const handleRegisterChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setRegisterData(prevState => ({...prevState, [name]: value}));
    };

    const handleRegisterSubmit = () => {
        const result = checkRegisterUser(registerData);
        if (result?.error) setRegisterError(result.error);
        else {
            handleRegister(registerData).then(result => {
                if (result?.error) toast.error(result.error);
                else navigate(privateRoutes.dashboard);
            });
        }
    };

    return (
        <Stack justifyContent={"center"} alignItems={"center"} minHeight={"100%"} padding={2}>
            <Card variant={"outlined"} component={Stack} spacing={2} paddingX={4} paddingY={2}>
                <Typography component={"h1"} variant={"h2"}>Register</Typography>
                <Stack spacing={2}>
                    <TextField
                        label={"Firstname"}
                        name={"firstname"}
                        value={registerData.firstname ?? ""}
                        onChange={handleRegisterChange}
                        error={!!registerError.firstname}
                        helperText={registerError.firstname ?? ""}
                        color={registerError.firstname ? "error" : "primary"}
                        required fullWidth/>
                    <TextField
                        label={"Lastname"}
                        name={"lastname"}
                        value={registerData.lastname ?? ""}
                        onChange={handleRegisterChange}
                        error={!!registerError.lastname}
                        helperText={registerError.lastname ?? ""}
                        color={registerError.lastname ? "error" : "primary"}
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
                        label={"Confirm password"}
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