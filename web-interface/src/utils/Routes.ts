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
    gateways: {
        base: "/gateways/*",
        list: "list",
        create: "create",
        view: ":id",
        edit: ":id/edit"
    },
    patients: "/patients"
};

const getFullRouteWithBase = (baseRoute: string, endRoute: string): string => (
    baseRoute.slice(0, -1) + endRoute
);

export const privateFullRoutes = {
    ...privateRoutes,
    doctors: {
        ...privateRoutes.doctors,
        list: getFullRouteWithBase(privateRoutes.doctors.base, privateRoutes.doctors.list),
        create: getFullRouteWithBase(privateRoutes.doctors.base, privateRoutes.doctors.create),
        view: getFullRouteWithBase(privateRoutes.doctors.base, privateRoutes.doctors.view),
        edit: getFullRouteWithBase(privateRoutes.doctors.base, privateRoutes.doctors.edit)
    },
    gateways: {
        ...privateRoutes.gateways,
        list: getFullRouteWithBase(privateRoutes.gateways.base, privateRoutes.gateways.list),
        create: getFullRouteWithBase(privateRoutes.gateways.base, privateRoutes.gateways.create),
        view: getFullRouteWithBase(privateRoutes.gateways.base, privateRoutes.gateways.view),
        edit: getFullRouteWithBase(privateRoutes.gateways.base, privateRoutes.gateways.edit)
    }
};