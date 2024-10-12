import {Button, Card, Stack, TextField, Typography} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {UserSignUp} from "../interfaces/User.ts";
import {publicRoutes} from "../utils/Routes.ts";
import {isValidEmail, isValidPassword, isValidPhoneNumber, isValidString} from "../utils/Services.tsx";

const getErrorMessage = (label: string): string => `Please enter a valid ${label}.`;

export default function SignUpPage() {
    const navigate = useNavigate();

    const [signUpData, setSignUpData] = useState<UserSignUp>({});
    const [signUpError, setSignUpError] = useState<UserSignUp>({});

    const handleSignUpChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setSignUpData(prevState => ({...prevState, [name]: value}));
    };

    const changeSignUpError = (name: string, message?: string) => {
        setSignUpError(prevState => ({...prevState, [name]: message}));
    };

    const handleSignUpSubmit = () => {
        let isValid = true;

        if (!isValidString(signUpData.firstName)) {
            changeSignUpError("firstName", getErrorMessage("first name"));
            isValid = false;
        } else {
            changeSignUpError("firstName", undefined);
        }

        if (!isValidString(signUpData.lastName)) {
            changeSignUpError("lastName", getErrorMessage("last name"));
            isValid = false;
        } else {
            changeSignUpError("lastName", undefined);
        }

        if (!isValidPhoneNumber(signUpData.phone)) {
            changeSignUpError("phone", getErrorMessage("phone number"));
            isValid = false;
        } else {
            changeSignUpError("phone", undefined);
        }

        if (!isValidEmail(signUpData.email)) {
            changeSignUpError("email", getErrorMessage("email"));
            isValid = false;
        } else {
            changeSignUpError("email", undefined);
        }

        if (!isValidPassword(signUpData.password)) {
            changeSignUpError("password", getErrorMessage("password"));
            isValid = false;
        } else {
            changeSignUpError("password", undefined);
        }

        if (!signUpData.confirmPassword || signUpData.confirmPassword !== signUpData.password) {
            changeSignUpError("confirmPassword", "Passwords do not match.");
            isValid = false;
        } else {
            changeSignUpError("confirmPassword", undefined);
        }

        if (isValid) {
            // Sign up logic here
            console.log("Sign up successful:", signUpData);
        }
    };

    return (
        <Stack justifyContent={"center"} alignItems={"center"} minHeight={"100%"} padding={2}>
            <Card variant={"outlined"} component={Stack} spacing={2} paddingX={4} paddingY={2}>
                <Typography component={"h1"} variant={"h2"}>Sign up</Typography>
                <Stack spacing={2}>
                    <TextField
                        label={"First Name"}
                        name={"firstName"}
                        value={signUpData.firstName ?? ""}
                        onChange={handleSignUpChange}
                        error={!!signUpError.firstName}
                        helperText={signUpError.firstName ?? ""}
                        color={signUpError.firstName ? "error" : "primary"}
                        required fullWidth/>
                    <TextField
                        label={"Last Name"}
                        name={"lastName"}
                        value={signUpData.lastName ?? ""}
                        onChange={handleSignUpChange}
                        error={!!signUpError.lastName}
                        helperText={signUpError.lastName ?? ""}
                        color={signUpError.lastName ? "error" : "primary"}
                        required fullWidth/>
                    <TextField
                        label={"Phone number"}
                        name={"phone"}
                        value={signUpData.phone ?? ""}
                        onChange={handleSignUpChange}
                        error={!!signUpError.phone}
                        helperText={signUpError.phone ?? ""}
                        color={signUpError.phone ? "error" : "primary"}
                        required fullWidth/>
                    <TextField
                        label={"Email"}
                        name={"email"}
                        value={signUpData.email ?? ""}
                        onChange={handleSignUpChange}
                        error={!!signUpError.email}
                        helperText={signUpError.email ?? ""}
                        color={signUpError.email ? "error" : "primary"}
                        required fullWidth/>
                    <TextField
                        label={"Password"}
                        name={"password"}
                        type={"password"}
                        value={signUpData.password ?? ""}
                        onChange={handleSignUpChange}
                        error={!!signUpError.password}
                        helperText={signUpError.password ?? ""}
                        color={signUpError.password ? "error" : "primary"}
                        required fullWidth/>
                    <TextField
                        label={"Confirm Password"}
                        name={"confirmPassword"}
                        type={"password"}
                        value={signUpData.confirmPassword ?? ""}
                        onChange={handleSignUpChange}
                        error={!!signUpError.confirmPassword}
                        helperText={signUpError.confirmPassword ?? ""}
                        color={signUpError.confirmPassword ? "error" : "primary"}
                        required fullWidth/>
                    <Stack spacing={2}>
                        <Button variant={"contained"} size={"large"} onClick={handleSignUpSubmit} fullWidth>
                            Sign up
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