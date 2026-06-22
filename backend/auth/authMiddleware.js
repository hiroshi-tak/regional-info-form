const jwt = require("jsonwebtoken");

module.exports.verifyToken = (event) => {

    const authHeader =
        event.headers?.Authorization ||
        event.headers?.authorization;

    if (!authHeader) {
        throw new Error("token required");
    }

    const token = authHeader.replace("Bearer ", "");

    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
    );

    return decoded;
};