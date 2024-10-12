import {emailRegex, passwordRegex, phoneRegex} from "./Constants.ts";

export const isValidString = (value?: string): boolean => {
    if (!value) return false;
    return value.length > 0;
};

export const isValidPhoneNumber = (phone?: string): boolean => {
    if (!phone) return false;
    return phoneRegex.test(phone);
};

export const isValidEmail = (email?: string): boolean => {
    if (!email) return false;
    return emailRegex.test(email);
};

export const isValidPassword = (password?: string): boolean => {
    if (!password) return false;
    return passwordRegex.test(password);
};