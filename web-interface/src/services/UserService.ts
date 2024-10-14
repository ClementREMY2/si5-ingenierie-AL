import {User, UserLogin, UserRegister, UserRole} from "../interfaces/User.ts";
import {users} from "../mocks/User.ts";
import {isValidEmail, isValidPassword, isValidPhoneNumber, isValidString} from "../utils/Services.ts";

const getRegisterErrorMessage = (label: string): string => `Please enter a valid ${label}.`;

export const registerUser = (registerData: UserRegister) => {
    let isValid = true;
    const error: UserRegister = {};

    if (!isValidString(registerData.firstName)) {
        error.firstName = getRegisterErrorMessage("first name");
        isValid = false;
    }

    if (!isValidString(registerData.lastName)) {
        error.lastName = getRegisterErrorMessage("last name");
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

    if (!registerData.confirmPassword || registerData.confirmPassword !== registerData.password) {
        error.confirmPassword = "Passwords do not match";
        isValid = false;
    }

    if (isValid) return {
        user: {
            id: "0",
            firstName: registerData.firstName,
            lastName: registerData.lastName,
            phone: registerData.phone,
            email: registerData.email,
            role: UserRole.FAMILY
        } as User
    };
    else return {error};
};

export const getUserByLogin = (loginData: UserLogin) => {
    const user = users.find(user => user.email === loginData.email);

    if (!user) {
        return {error: {email: "Cannot find user by email."} as UserLogin};
    }
    if (user.password !== loginData.password) {
        return {error: {password: "Wrong credentials."} as UserLogin};
    }
    return {
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.email,
            role: user.role
        } as User
    };
};