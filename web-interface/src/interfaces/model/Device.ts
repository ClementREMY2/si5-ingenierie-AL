export interface Device {
    id: number;
    name: string;
    model: {
        id: number;
        name: string;
        brand: string;
        type: string;
    };
}

export interface Gateway extends Device {
    realtimeEnabled: boolean;
}