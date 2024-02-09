
import type { LoginForm, User } from "../interfaces";

const BASE_URL = '/api/auth';

export async function login(loginForm: LoginForm): Promise<User> {
    const response = await fetch(BASE_URL, {
        method: "POST",
        body: JSON.stringify(loginForm),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw await response.json();
    }
}

export async function logout() {
    await fetch(BASE_URL, {
        method: 'DELETE',
    });
}