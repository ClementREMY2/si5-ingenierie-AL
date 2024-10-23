import {Gateway} from "../interfaces/model/Device.ts";

export const emptyGateway: Gateway = {
    id: 0,
    name: "",
    model: {
        id: 0,
        name: "",
        brand: "",
        type: ""
    },
    realtimeEnabled: false
};

export const gateways = [
    {
        id: 1,
        name: "Gateway 1",
        model: {
            id: 1,
            name: "Model 1",
            brand: "Brand 1",
            type: "Type 1"
        },
        realtimeEnabled: true
    },
    {
        id: 2,
        name: "Gateway 2",
        model: {
            id: 2,
            name: "Model 2",
            brand: "Brand 2",
            type: "Type 2"
        },
        realtimeEnabled: false
    },
    {
        id: 3,
        name: "Gateway 3",
        model: {
            id: 3,
            name: "Model 3",
            brand: "Brand 3",
            type: "Type 3"
        },
        realtimeEnabled: true
    }
];