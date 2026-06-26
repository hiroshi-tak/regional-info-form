const AWS = require("aws-sdk");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const dynamo = new AWS.DynamoDB.DocumentClient();

const { success, options } = require("../utils/response");
const { ApiError, errorResponse } = require("../utils/error");

const USER_TABLE = process.env.USER_TABLE;

module.exports.login = async (event) => {
    if (event.httpMethod === "OPTIONS") {
        return options();
    }

    try {
        const { username, password } = JSON.parse(event.body);

        const result = await dynamo.query({
            TableName: USER_TABLE,
            IndexName: "username-index",
            KeyConditionExpression: "username = :u",
            ExpressionAttributeValues: {
                ":u": username
            }
        }).promise();

        if (result.Items.length === 0) {
            return success(401, {
                message: "invalid credentials"
            });
        }

        const user = result.Items[0];

        const valid = await bcrypt.compare(
            password,
            user.passwordHash
        );

        if (!valid) {
            return success(401, {
                message: "invalid credentials"
            });
        }

        const token = jwt.sign(
            {
                userId: user.userId,
                username: user.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h"
            }
        );

        return success(200, {
            token,
            userId: user.userId,
            username: user.username
        });

    } catch (err) {
        return errorResponse(err);
    }
};