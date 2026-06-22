const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

const { success, options } = require("../utils/response");
const { errorResponse } = require("../utils/error");

const { verifyToken } = require("../auth/authMiddleware");

const padAreaCode = (code) =>
    String(code).padStart(6, "0");

module.exports.disaster = async (event) => {
    if (event.httpMethod === "OPTIONS") {
        return options();
    }

    try {

        const user = verifyToken(event);

        const result = await dynamo.get({
            TableName: "UserRegion",
            Key: {
                userId: user.userId
            }
        }).promise();

        if (!result.Item) {
            return success(404, {
                message: "user not found"
            });
        }

        const { city, areaCode } = result.Item;

        const fixedAreaCode =
            padAreaCode(areaCode);

        const url =
            `https://www.jma.go.jp/bosai/warning/data/warning/${fixedAreaCode}.json`;

        const res = await fetch(url);

        const data = await res.json();

        return success(200, {
            city,
            headline: data.headlineText || "情報なし"
        });

    } catch (err) {
        return errorResponse(err);
    }
};