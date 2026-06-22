const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

const { success, options } = require("../utils/response");
const { errorResponse } = require("../utils/error");

const { verifyToken } = require("../auth/authMiddleware");

module.exports.registerRegion = async (event) => {
    if (event.httpMethod === "OPTIONS") {
        return options();
    }
    
    try {
        const body = JSON.parse(event.body);

        const item = {
            userId: body.userId,
            city: body.city,
            lat: body.lat,
            lon: body.lon,
            areaCode: body.areaCode
        };

        await dynamo.put({
            TableName: "UserRegion",
            Item: item
        }).promise();

        return success(200, { message: "saved" });

    } catch (err) {
        return errorResponse(err);
    }
};

module.exports.getRegion = async (event) => {
    try {
        const user = verifyToken(event);

        const result = await dynamo.get({
            TableName: "UserRegion",
            Key: {
                userId: user.userId
            }
        }).promise();

        return success(200, result.Item || {});
    } catch (err) {
        return errorResponse(err);
    }
};