'use client';

import Link from "next/link";
import { useEffect } from 'react';
import AuthGuard from "@/components/AuthGuard";

/*
export default function Home() {

  useEffect(() => {
  }, []);

  return (
    <AuthGuard>
      <div className="max-w-md mx-auto flex flex-col gap-4">
        <h1 className="text-3xl font-bold mb-6">
          トップページ
        </h1>

        <Link href="/setting" className="text-blue-600 underline">
          地域設定
        </Link>

        <Link href="/dashboard" className="text-blue-600 underline">
          地域情報
        </Link>
      </div>
    </AuthGuard>
  );
}
*/

export default function Home() {
  return <div>HOME OK</div>;
}