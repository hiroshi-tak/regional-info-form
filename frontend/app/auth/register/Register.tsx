'use client';

import Link from "next/link";
import { useState } from 'react';
import { useRouter } from "next/navigation";

import { apiFetch } from "@/lib/api";

export default function Register() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {

        if (!username || !password) {
            alert("ユーザー名とパスワードを入力してください");
            return;
        }
        
        const res = await apiFetch("/auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            }
        );

        const data = await res.json();

        if (!res.ok) {
            alert(data.message || "登録失敗");
            return;
        }

        alert("登録成功");
        router.push('/auth/login')
    };

    return (
        <div className="max-w-md mx-auto mt-10 space-y-6">
            <h1 className="text-2xl font-bold mb-6 text-red-500">
                ユーザー登録
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
                    onClick={handleRegister}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                    登録
                </button>
            </div>

            <div className="flex justify-center">
                <Link href="/auth/login" className="text-blue-600 underline">
                    ログインはこちら
                </Link>
            </div>
        </div>
    );
}