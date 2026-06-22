export type City = {
    name: string;
    lat: number;
    lon: number;
};

export type Region = {
    name: string;
    code: string; 
    cities: City[]; 
};

export const REGIONS: Region[] = [
    {
        name: "北海道_稚内",
        code: "11000",
        cities: [{ name: "稚内市", lat: 45.4156, lon: 141.6731 }]
    },
    {
        name: "北海道_旭川",
        code: "12000",
        cities: [{ name: "旭川市", lat: 43.7706, lon: 142.3649 }]
    },
    {
        name: "北海道_網走",
        code: "13000",
        cities: [{ name: "網走市", lat: 44.0177, lon: 144.2724 }]
    },
    {
        name: "北海道_釧路",
        code: "14100",
        cities: [{ name: "釧路市", lat: 42.9849, lon: 144.3811 }]
    },
    {
        name: "北海道_室蘭",
        code: "15000",
        cities: [{ name: "室蘭市", lat: 42.3105, lon: 140.9772 }]
    },
    {
        name: "北海道_札幌",
        code: "16000",
        cities: [{ name: "札幌市", lat: 43.0618, lon: 141.3545 }]
    },
    {
        name: "北海道_函館",
        code: "17000",
        cities: [{ name: "函館市", lat: 41.7687, lon: 140.7291 }]
    },

    {
        name: "青森",
        code: "20000",
        cities: [
            { name: "青森市", lat: 40.8246, lon: 140.7406 },
            { name: "弘前市", lat: 40.6031, lon: 140.4638 }
        ]
    },

    {
        name: "岩手",
        code: "30000",
        cities: [{ name: "盛岡市", lat: 39.7036, lon: 141.1527 }]
    },

    {
        name: "宮城",
        code: "40000",
        cities: [{ name: "仙台市", lat: 38.2682, lon: 140.8694 }]
    },

    {
        name: "秋田",
        code: "50000",
        cities: [{ name: "秋田市", lat: 39.7199, lon: 140.1024 }]
    },

    {
        name: "山形",
        code: "60000",
        cities: [{ name: "山形市", lat: 38.2404, lon: 140.3633 }]
    },

    {
        name: "福島",
        code: "70000",
        cities: [{ name: "福島市", lat: 37.7608, lon: 140.4747 }]
    },

    {
        name: "茨城",
        code: "80000",
        cities: [{ name: "水戸市", lat: 36.3418, lon: 140.4468 }]
    },

    {
        name: "栃木",
        code: "90000",
        cities: [{ name: "宇都宮市", lat: 36.5551, lon: 139.8828 }]
    },

    {
        name: "群馬",
        code: "100000",
        cities: [{ name: "前橋市", lat: 36.3895, lon: 139.0634 }]
    },

    {
        name: "埼玉",
        code: "110000",
        cities: [{ name: "さいたま市", lat: 35.8616, lon: 139.6455 }]
    },

    {
        name: "千葉",
        code: "120000",
        cities: [{ name: "千葉市", lat: 35.6074, lon: 140.1065 }]
    },

    {
        name: "東京",
        code: "130000",
        cities: [
            { name: "新宿区", lat: 35.6938, lon: 139.7034 },
            { name: "渋谷区", lat: 35.6580, lon: 139.7016 },
            { name: "世田谷区", lat: 35.6466, lon: 139.6532 }
        ]
    },

    {
        name: "神奈川",
        code: "140000",
        cities: [
            { name: "横浜市", lat: 35.4437, lon: 139.6380 },
            { name: "川崎市", lat: 35.5308, lon: 139.7029 }
        ]
    },

    {
        name: "愛知",
        code: "230000",
        cities: [
            { name: "名古屋市", lat: 35.1815, lon: 136.9066 },
            { name: "豊田市", lat: 35.0825, lon: 137.1563 },
            { name: "岡崎市", lat: 34.9545, lon: 137.1736 },
            { name: "一宮市", lat: 35.3041, lon: 136.8029 },
            { name: "大府市", lat: 35.0116, lon: 136.9635 }
        ]
    },

    {
        name: "大阪",
        code: "270000",
        cities: [
            { name: "大阪市", lat: 34.6937, lon: 135.5023 },
            { name: "堺市", lat: 34.5733, lon: 135.4828 }
        ]
    },

    {
        name: "京都",
        code: "260000",
        cities: [{ name: "京都市", lat: 35.0116, lon: 135.7681 }]
    },

    {
        name: "兵庫",
        code: "280000",
        cities: [{ name: "神戸市", lat: 34.6901, lon: 135.1956 }]
    },

    {
        name: "福岡",
        code: "400000",
        cities: [
            { name: "福岡市", lat: 33.5904, lon: 130.4017 },
            { name: "北九州市", lat: 33.8834, lon: 130.8752 }
        ]
    },

    {
        name: "沖縄",
        code: "471000",
        cities: [{ name: "那覇市", lat: 26.2124, lon: 127.6809 }]
    }
];