"use client";

import { useMemo, useState } from "react";
import { REGIONS } from "../../lib/cities";
import { jwtDecode } from "jwt-decode";
import { apiFetch } from "@/lib/api";

export default function Setting() {
    const [regionName, setRegionName] = useState("");
    const [cityName, setCityName] = useState("");

    const token =
        typeof window !== "undefined"
            ? localStorage.getItem("token")
            : null;

    const decoded: any = token ? jwtDecode(token) : null;
    const userId = decoded?.userId;

    const region = useMemo(() => {
        return REGIONS.find((r) => r.name === regionName);
    }, [regionName]);

    const cities = region?.cities ?? [];

    const selectedCity = useMemo(() => {
        return cities.find((c) => c.name === cityName);
    }, [cities, cityName]);

    const handleSubmit = async () => {
        try {
            if (!region || !selectedCity) {
                alert("地域と市を選択してください");
                return;
            }

            const payload = {
                city: selectedCity.name,
                lat: selectedCity.lat,
                lon: selectedCity.lon,
                areaCode: region.code
            };

            const res = await apiFetch("/regions",
                {
                    method: "POST",
                    body: JSON.stringify(payload),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                alert("登録失敗");
                console.error(data);
                return;
            }

            alert("登録完了");
            console.log(data);
        } catch (err) {
            console.error(err);
            alert("通信エラーが発生しました");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 space-y-6">
            <h1 className="text-2xl font-bold mb-6">
                地域登録
            </h1>
            <div className="flex flex-col gap-4">

                {/* 地域選択 */}
                <select
                    value={regionName}
                    onChange={(e) => {
                        setRegionName(e.target.value);
                        setCityName(""); // 地域変わったら市リセット
                    }}
                    className="border p-2"
                >
                    <option value="">地域を選択</option>
                    {REGIONS.map((r) => (
                        <option key={r.name} value={r.name}>
                            {r.name}
                        </option>
                    ))}
                </select>

                {/* 市選択 */}
                <select
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    disabled={!region}
                    className="border p-2"
                >
                    <option value="">市を選択</option>
                    {cities.map((c) => (
                        <option key={c.name} value={c.name}>
                            {c.name}
                        </option>
                    ))}
                </select>

                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    登録
                </button>

                {/* プレビュー */}
                {selectedCity && (
                    <div className="border rounded p-3 text-sm">
                        <div>市: {selectedCity.name}</div>
                        <div>lat: {selectedCity.lat}</div>
                        <div>lon: {selectedCity.lon}</div>
                        <div>areaCode: {region?.code}</div>
                    </div>
                )}
            </div>
        </div>
    );
}