import {User, UserLogin, UserRegister, UserRole} from "../interfaces/User.ts";
import {users} from "../mocks/User.ts";
import {isValidEmail, isValidPassword, isValidPhoneNumber, isValidString} from "../utils/Services.ts";

export const getUserName = (user?: User, defaultValue: string = ""): string =>
    user ? `${user.firstname} ${user.lastname}` : defaultValue;

const getRegisterErrorMessage = (label: string): string => `Please enter a valid ${label}.`;

export const registerUser = (registerData: UserRegister) => {
    let isValid = true;
    const error: UserRegister = {};

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

    if (!registerData.confirmPassword || registerData.confirmPassword !== registerData.password) {
        error.confirmPassword = "Passwords do not match";
        isValid = false;
    }

    if (isValid) return {
        user: {
            id: 0,
            firstname: registerData.firstname,
            lastname: registerData.lastname,
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
            firstname: user.firstname,
            lastname: user.lastname,
            phone: user.phone,
            email: user.email,
            role: user.role
        } as User
    };
};

export const getUsersWithRole = (role: UserRole) => {
    return users.filter(user => user.role === role);
};