import {User, UserLogin, UserRegister, UserRole} from "../interfaces/model/User.ts";
import {emptyUserRegister, users} from "../mocks/User.ts";
import {isValidEmail, isValidPassword, isValidPhoneNumber, isValidString} from "../utils/Services.ts";

const getRegisterErrorMessage = (label: string): string => `Please enter a valid ${label}.`;

export const checkRegisterUser = (registerData: UserRegister) => {
    let isValid = true;
    let error = {...emptyUserRegister};

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

export const getUserById = (id: number) => {
    const user = users.find(user => user.id === id);
    if (!user) {
        return {error: `User not found by id ${id}`};
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