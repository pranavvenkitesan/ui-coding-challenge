import type { User, UserInput } from "@/types";

const BASE_URL = "https://jsonplaceholder.typicode.com/users";
async function request<T>(url: string, options: RequestInit): Promise<T> {

    const res = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        }
    });

    if (!res.ok) {
        throw new Error(`Api request failed with Status ${res.status}`)
    }

    return res.json();
}
export function fetchUsers(signal: AbortSignal): Promise<User[]> {
    return request<User[]>(BASE_URL, { signal });
}
export function addUser(values: UserInput): Promise<User> {
    return request<User>(BASE_URL, { method: "POST", body: JSON.stringify(values) });
}