'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from "@/lib/api";

import { useRouter } from "next/navigation";


export default function DashboardPage() {
    const router = useRouter();
    const [weather, setWeather] = useState<any>(null);
    const [disaster, setDisaster] = useState<any>(null);
    const [news, setNews] = useState<any>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const [weatherRes, disasterRes, newsRes] =
                    await Promise.all([
                        apiFetch("/my-weather"),
                        apiFetch("/disaster"),
                        apiFetch("/news"),
                    ]);
                
                if (
                    weatherRes.status === 404 ||
                    disasterRes.status === 404 ||
                    newsRes.status === 404
                ) {
                    router.push("/setting");
                    return;
                }
                
                if (!weatherRes.ok || !disasterRes.ok || !newsRes.ok) {
                    throw new Error("API Error");
                }

                const [weatherData, disasterData, newsData] =
                    await Promise.all([
                        weatherRes.json(),
                        disasterRes.json(),
                        newsRes.json(),
                    ]);

                setWeather(weatherData);
                setDisaster(disasterData);
                setNews(newsData);

            } catch (err) {
                console.error(err);

                if (err) {
                    alert("情報の取得に失敗しました");
                } else {
                    alert("通信エラーが発生しました");
                }
            }
        };

        load();
    }, []);

    if (!weather || !disaster || !news) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-md mx-auto mt-10 space-y-8">
            <h1 className="text-2xl font-bold mb-6">
                地域情報
            </h1>

            <div>
                <h2 className="border-b pb-2 mb-3">
                    地域: {weather.city}
                </h2>
            </div>

            <div>
                <h3 className="border-b pb-2 mb-3">☀ 天気</h3>
                <p>{(weather?.description)}</p>
                <p>{(weather?.temp)}℃</p>
            </div>

            <div>
                <h3 className="border-b pb-2 mb-3">⚠ 災害情報</h3>

                {disaster?.headline && (
                    <p>{disaster.headline}</p>
                )}
            </div>

            <div>
                <h3 className="border-b pb-2 mb-3">📰 地域ニュース</h3>

                {(news?.news || []).map((item: any, index: number) => (
                    <p key={index} className="mb-2">
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            {item.title}
                        </a>
                    </p>
            ))}
            </div>
        </div>
    );
}