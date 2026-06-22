"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Login() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            if (!username || !password) {
                alert("ユーザー名とパスワードを入力してください");
                return;
            }

            const res = await fetch(
                "https://j2pe3bi435.execute-api.ap-northeast-1.amazonaws.com/dev/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        password
                    })
                }
            );

            if (!res.ok) {
                alert("ログイン失敗");
                return;
            }

            const data = await res.json();

            localStorage.setItem("token", data.token);

            router.push('/')
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 space-y-6">
            <h1 className="text-2xl font-bold mb-6 text-blue-500">
                ログイン
            </h1>

            <div>
                <label
                    className="block mb-1"
                >
                    ユーザー名
                </label>
                <input
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border p-2 w-full rounded"
                />
            </div>

            <div>
                <label
                    className="block mb-1"
                >
                    パスワード
                </label>
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 w-full rounded"
                />
            </div>

            <div className="flex justify-center">
                <button
                    onClick={handleLogin}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    ログイン
                </button>
            </div>

            <div className="flex justify-center">
                <Link href="/auth/register" className="text-blue-600 underline">
                    ユーザー登録はこちら
                </Link>
            </div>
        </div>
    );
}