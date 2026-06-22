const { success } = require("./response");

class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}

const errorResponse = (err) => {
    console.error("API ERROR:", err);

    const statusCode = err.statusCode || 500;

    return success(statusCode, {
        message: err.message || "Internal Server Error"
    });
};

module.exports = {
    ApiError,
    errorResponse
};