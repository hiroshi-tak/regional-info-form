const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS"
};

const success = (statusCode, data = {}) => ({
    statusCode,
    headers: cors,
    body: JSON.stringify(data)
});

const options = () => ({
    statusCode: 204,
    headers: cors,
    body: ""
});

module.exports = {
    success,
    options,
    cors
};