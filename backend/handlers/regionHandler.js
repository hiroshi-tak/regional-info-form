const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

const { success, options } = require("../utils/response");
const { errorResponse } = require("../utils/error");

const { verifyToken } = require("../auth/authMiddleware");

const USER_REGION_TABLE = process.env.USER_REGION_TABLE;

module.exports.registerRegion = async (event) => {
    if (event.httpMethod === "OPTIONS") {
        return options();
    }
    
    try {
        const user = verifyToken(event);

        const body = JSON.parse(event.body);

        const item = {
            userId: user.userId,
            city: body.city,
            lat: body.lat,
            lon: body.lon,
            areaCode: body.areaCode
        };

        await dynamo.put({
            TableName: USER_REGION_TABLE,
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
            TableName: USER_REGION_TABLE,
            Key: {
                userId: user.userId
            }
        }).promise();

        return success(200, result.Item || {});
    } catch (err) {
        return errorResponse(err);
    }
};