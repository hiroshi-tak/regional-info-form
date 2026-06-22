const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

const { success, options } = require("../utils/response");
const { ApiError, errorResponse } = require("../utils/error");

const { verifyToken } = require("../auth/authMiddleware");

module.exports.myWeather = async (event) => {
    if (event.httpMethod === "OPTIONS") {
        return options();
    }
    
    try {

        const user = verifyToken(event);

        const region = await dynamo.get({
            TableName: "UserRegion",
            Key: {
                userId: user.userId
            }
        }).promise();

        if (!region.Item) {
            throw new ApiError(404, "user not found");
        }

        const { lat, lon, city } = region.Item;

        const url =
            `https://api.openweathermap.org/data/2.5/weather` +
            `?lat=${lat}` +
            `&lon=${lon}` +
            `&appid=${process.env.WEATHER_KEY}` +
            `&units=metric&lang=ja`;

        const res = await fetch(url);
        const weather = await res.json();

        return success(200, {
            city,
            weather: weather.weather?.[0]?.main,
            description: weather.weather?.[0]?.description,
            temp: weather.main?.temp,
            humidity: weather.main?.humidity
        });

    } catch (err) {
        return errorResponse(err);
    }
};