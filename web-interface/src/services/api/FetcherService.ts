import {getTokenFromLocalStorage} from "../../context/Auth.tsx";

const request = async <TResponse>(url: string, config?: RequestInit): Promise<TResponse | {error: string}> => {
    const token = getTokenFromLocalStorage();

    const response = await fetch(url, {
        ...config,
        headers: {
            ...config?.headers,
            "Content-Type": "application/json",
            "Authorization": token ? `Bearer ${token}` : ""
        }
    });
    const body = await response.json();
    if (!response.ok) {
        return {error: body.message};
    }
    return body;
};

export const api = {
    get: <TResponse>(url: string) =>
        request<TResponse>(url),
    post: <TBody, TResponse>(url: string, body: TBody) =>
        request<TResponse>(url, {method: "POST", body: JSON.stringify(body)}),
    put: <TBody, TResponse>(url: string, body: TBody) =>
        request<TResponse>(url, {method: "PUT", body: JSON.stringify(body)}),
    delete: <TResponse>(url: string) =>
        request<TResponse>(url, {method: "DELETE"})
};