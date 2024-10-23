import {User, UserLogin, UserRegister, UserRole} from "../interfaces/model/User.ts";
import {emptyUserLogin, emptyUserRegister, users} from "../mocks/User.ts";
import {isValidEmail, isValidPassword, isValidPhoneNumber, isValidString} from "../utils/Services.ts";

export const getUserName = (user?: User, defaultValue: string = ""): string =>
    user ? `${user.firstname} ${user.lastname}` : defaultValue;

export const checkLoginUser = (loginData: UserLogin) => {
    let isValid = true;
    let error: UserLogin = {...emptyUserLogin};

    if (loginData.email.length === 0) {
        error.email = "Email is required.";
        isValid = false;
    }

    if (loginData.password.length === 0) {
        error.password = "Password is required.";
        isValid = false;
    }

    if (!isValid) return {error};
};

const getRegisterErrorMessage = (label: string): string => `Please enter a valid ${label}.`;

export const checkRegisterUser = (registerData: UserRegister) => {
    let isValid = true;
    let error: UserRegister = {...emptyUserRegister};

    if (!isValidString(registerData.firstname)) {
        error.firstname = getRegisterErrorMessage("first name");
        isValid = false;
    }

    if (!isValidString(registerData.lastname)) {
        error.lastname = getRegisterErrorMessage("last name");
        isValid = false;
    }

    if (!isValidPhoneNumber(registerData.phone)) {
        error.phone = getRegisterErrorMessage("phone number");
        isValid = false;
    }

    if (!isValidEmail(registerData.email)) {
        error.email = getRegisterErrorMessage("email");
        isValid = false;
    }

    if (!isValidPassword(registerData.password)) {
        error.password = getRegisterErrorMessage("password");
        isValid = false;
    }

    if (registerData.confirmPassword !== registerData.password) {
        error.confirmPassword = "Passwords do not match";
        isValid = false;
    }

    if (!isValid) return {error};
};

export const getUsersWithRole = (role: UserRole) => {
    return users.filter(user => user.role === role);
};