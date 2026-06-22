const Parser = require("rss-parser");
const parser = new Parser();

const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

const { success, options } = require("../utils/response");
const { ApiError, errorResponse } = require("../utils/error");

const { verifyToken } = require("../auth/authMiddleware");

// ===== normalize =====
const normalize = (title) => {
    return title
        .replace(/【.*?】/g, "")
        .replace(/\s+/g, " ")
        .trim();
};

// ===== 3日フィルタ =====
const isRecent = (item) => {
    const now = new Date();
    const limit = new Date();
    limit.setDate(now.getDate() - 3);
    return new Date(item.pubDate) >= limit;
};

// ===== dedupe =====
const dedupe = (items) => {
    const seen = new Set();

    return items.filter((item) => {
        const key = normalize(item.title);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
};

// ===== score =====
const score = (item, city) => {
    let s = 0;

    const title = item.title || "";

    if (city && title.includes(city)) s += 10;

    const pub = new Date(item.pubDate);
    const hours = (Date.now() - pub) / 3600000;

    if (hours < 24) s += 5;

    return s;
};

// ===== NEWS HANDLER（これが正しいLambda）=====
module.exports.news = async (event) => {
    if (event.httpMethod === "OPTIONS") {
        return options();
    }

    try {
        const user = verifyToken(event);

        const userId = user.userId;

        const result = await dynamo.get({
            TableName: "UserRegion",
            Key: { userId }
        }).promise();

        if (!result.Item) {
            throw new ApiError(404, "user not found");
        }

        const { city } = result.Item;

        const url =
            `https://news.google.com/rss/search?q=${encodeURIComponent(city)}&hl=ja&gl=JP&ceid=JP:ja`;

        const feed = await parser.parseURL(url);

        const items = dedupe(
            feed.items.map((item) => ({
                ...item,
                title: normalize(item.title || "")
            }))
        )
            .filter(isRecent)
            .sort((a, b) => score(b, city) - score(a, city))
            .slice(0, 10)
            .map((item) => ({
                title: item.title,
                link: item.link,
                date: item.pubDate,
                score: score(item, city)
            }));

        return success(200, {
            city,
            news: items
        });

    } catch (err) {
        return errorResponse(err);
    }
};
