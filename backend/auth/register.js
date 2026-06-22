const AWS = require("aws-sdk");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const dynamo = new AWS.DynamoDB.DocumentClient();

const { success, options } = require("../utils/response");
const { ApiError, errorResponse } = require("../utils/error");

module.exports.register = async (event) => {
    if (event.httpMethod === "OPTIONS") {
        return options();
    }

    try {
        const { username, password } = JSON.parse(event.body);

        if (!username || !password) {
            return success(400, {
                message: "username and password required"
            });
        }

        const existing = await dynamo.query({
            TableName: "Users",
            IndexName: "username-index",
            KeyConditionExpression: "username = :u",
            ExpressionAttributeValues: {
                ":u": username
            }
        }).promise();

        if (existing.Items.length > 0) {
            return success(409, {
                message: "username already exists"
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = {
            userId: crypto.randomUUID(),
            username,
            passwordHash,
            createdAt: new Date().toISOString()
        };

        await dynamo.put({
            TableName: "Users",
            Item: user
        }).promise();

        return success(201, {
            message: "user created",
            userId: user.userId
        });

    } catch (err) {
        return errorResponse(err);
    }
};