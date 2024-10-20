// API
const apiBaseUrl = "http://localhost:8080";

const apiServices = {
    auth: `${apiBaseUrl}/auth`
};

export const apiUrls = {
    auth: {
        register: `${apiServices.auth}/register`
    }
};

// Regex
export const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
export const emailRegex = /\S{2,}@\S{2,}\.\S{2,}/;
export const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;