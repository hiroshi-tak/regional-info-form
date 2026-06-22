'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from "@/lib/api";

export default function DashboardPage() {
    const [weather, setWeather] = useState<any>(null);
    const [disaster, setDisaster] = useState<any>(null);
    const [news, setNews] = useState<any>(null);

    useEffect(() => {
        const load = async () => {

            const [weatherRes, disasterRes, newsRes] =
                await Promise.all([
                    apiFetch("/my-weather"),
                    apiFetch("/disaster"),
                    apiFetch("/news"),
                ]);

            const weatherData = await weatherRes.json();
            const disasterData = await disasterRes.json();
            const newsData = await newsRes.json();

            setWeather(weatherData);
            setDisaster(disasterData);
            setNews(newsData);
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