import {Gateway} from "../interfaces/Device.ts";
import {gateways} from "../mocks/Device.ts";

export const getGateways = (): Gateway[] => gateways;

export const getGatewayById = (id: number): Gateway | undefined => {
    const gateways = getGateways();
    return gateways.find((g) => g.id === id);
};