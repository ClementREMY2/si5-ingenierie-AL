import {Button, Card, Stack, TextField, Typography} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {UserSignIn} from "../interfaces/User.ts";
import {users} from "../mocks/User.ts";
import {publicRoutes} from "../utils/Routes.ts";

const hasEmailAccount = (email: string): boolean => {
    return users.some(user => user.email === email);
};

const hasCorrectPassword = (email: string, password: string): boolean => {
    const user = users.find(user => user.email === email);
    return !!user && user.password === password;
};

export default function SignIn() {
    const navigate = useNavigate();

    const [signInData, setSignInData] = useState<UserSignIn>({});
    const [signInError, setSignInError] = useState<UserSignIn>({});

    const handleSignInChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setSignInData(prevState => ({...prevState, [name]: value}));
    };

    const changeSignInError = (name: string, message?: string) => {
        setSignInError(prevState => ({...prevState, [name]: message}));
    };

    const handleSignInSubmit = () => {
        let isValid = true;

        if (!signInData.email || !hasEmailAccount(signInData.email)) {
            changeSignInError("email", "Cannot find email.");
            isValid = false;
        } else {
            changeSignInError("email", undefined);
            if (!signInData.password || !hasCorrectPassword(signInData.email, signInData.password)) {
                changeSignInError("password", "Wrong credentials.");
                isValid = false;
            } else {
                changeSignInError("password", undefined);
            }
        }

        if (isValid) {
            // Sign in logic here
            console.log("Sign in successful:", signInData);
        }
    };

    return (
        <Stack justifyContent={"center"} alignItems={"center"} minHeight={"100%"} padding={2}>
            <Card variant={"outlined"} component={Stack} spacing={2} paddingX={4} paddingY={2}>
                <Typography component={"h1"} variant={"h2"}>Sign in</Typography>
                <Stack spacing={2}>
                    <TextField
                        label={"Email"}
                        name={"email"}
                        value={signInData.email ?? ""}
                        onChange={handleSignInChange}
                        error={!!signInError.email}
                        helperText={signInError.email ?? ""}
                        color={signInError.email ? "error" : "primary"}
                        required fullWidth/>
                    <TextField
                        label={"Password"}
                        name={"password"}
                        type={"password"}
                        value={signInData.password ?? ""}
                        onChange={handleSignInChange}
                        error={!!signInError.password}
                        helperText={signInError.password ?? ""}
                        color={signInError.password ? "error" : "primary"}
                        required fullWidth/>
                    <Stack spacing={2}>
                        <Button variant={"contained"} size={"large"} onClick={handleSignInSubmit} fullWidth>
                            Sign in
                        </Button>
                        <Typography>
                            Already have an account?
                            <Button variant={"text"} color={"primary"} onClick={() => navigate(publicRoutes.signUp)}>
                                Sign up
                            </Button>
                        </Typography>
                    </Stack>
                </Stack>
            </Card>
        </Stack>
    );
}