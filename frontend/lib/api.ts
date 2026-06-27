
import { isTokenExpired } from "./auth";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export async function apiFetch(path: string, options: RequestInit = {}) {
    const token = localStorage.getItem("token");

    // 期限切れチェック
    if (token && isTokenExpired(token)) {
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
        throw new Error("token expired");
    }

    const res = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
            ...(options.headers || {}),
        },
    });

    // サーバ側の401も処理
    if (res.status === 401 && path !== "/auth/login") {
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
        throw new Error("unauthorized");
    }

    return res;
}

