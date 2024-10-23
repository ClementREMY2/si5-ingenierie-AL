const apiBaseUrl = "http://localhost:8080";

const apiServices = {
    auth: `${apiBaseUrl}/auth`,
    users: `${apiBaseUrl}/users`
};

export const apiUrls = {
    auth: {
        login: `${apiServices.auth}/login`,
        register: `${apiServices.auth}/register`
    },
    users: {
        getUserById: (id: number) => `${apiServices.users}/${id}`
    }
};