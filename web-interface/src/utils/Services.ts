import {emailRegex, passwordRegex, phoneRegex} from "./Constants.ts";
import {publicRoutes} from "./Routes.ts";

export const isPublicRoute = (route: string): boolean => Object.values(publicRoutes).includes(route);

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

export const stringToColor = (string: string): string => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
};