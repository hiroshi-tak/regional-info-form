
import { isTokenExpired } from "./auth";

export async function apiFetch(url: string, options: RequestInit = {}) {
    const token = localStorage.getItem("token");

    // 期限切れチェック
    if (token && isTokenExpired(token)) {
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
        throw new Error("token expired");
    }

    const res = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
            ...(options.headers || {}),
        },
    });

    // サーバ側の401も処理
    if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
        throw new Error("unauthorized");
    }

    return res;
}

/*
export async function apiFetch(
    url: string,
    options: RequestInit = {}
) {
    const token = localStorage.getItem("token");

    return fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...(options.headers || {})
        }
    });
}
*/