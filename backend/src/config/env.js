const dotenv = require("dotenv");
const path = require("path");

const envFile =
    process.env.NODE_ENV === "test"
        ? ".env.test"
        : ".env";

dotenv.config({
    path: path.resolve(process.cwd(), envFile),
});

// console.log("NODE_ENV:", process.env.NODE_ENV);
// console.log(
//     "Using test database:",
//     process.env.NODE_ENV === "test"
// );

module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT || 5000,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    FRONTEND_URL:
        process.env.FRONTEND_URL || "http://localhost:5173",
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_MODEL: process.env.OPENAI_MODEL,
    AI_RATE_LIMIT_WINDOW_MS:
        process.env.AI_RATE_LIMIT_WINDOW_MS,
    AI_RATE_LIMIT_MAX_REQUESTS:
        process.env.AI_RATE_LIMIT_MAX_REQUESTS,
};