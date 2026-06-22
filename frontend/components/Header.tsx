'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {

    const router = useRouter();

    const handleLogout = async () => {

        localStorage.removeItem("token");
        sessionStorage.clear();

        router.replace("/auth/login");
        router.refresh();
    };

    return (
        <header className="bg-blue-500 text-white sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

                <Link
                    href="/"
                    className="text-xl font-bold"
                >
                    地域情報アプリ
                </Link>

                <nav className="flex gap-6 items-center">
                    <Link href="/">
                        トップページ
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="bg-white text-blue-500 px-3 py-1 rounded"
                    >
                        ログアウト
                    </button>
                </nav>
            </div>
        </header>
    );
}