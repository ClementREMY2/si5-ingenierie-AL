export const publicRoutes = {
    all: "*",
    register: "/register",
    login: "/login",
    notFound: "/notFound"
};

export const privateRoutes = {
    profile: "/profile",
    dashboard: "/dashboard",
    doctors: {
        base: "/doctors/*",
        list: "list",
        create: "create",
        view: ":id",
        edit: ":id/edit"
    },
    patients: "/patients"
};