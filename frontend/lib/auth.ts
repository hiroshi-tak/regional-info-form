import { jwtDecode } from "jwt-decode";

type JwtPayload = {
    exp: number;
};

export function getToken() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
}

export function isAuthenticated() {
    return !!getToken();
}

export function isTokenExpired(token: string) {
    try {
        const decoded = jwtDecode<JwtPayload>(token);
        const now = Date.now() / 1000;
        return decoded.exp < now;
    } catch {
        return true;
    }
}

