const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    PORT: process.env.PORT || 5000,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_MODEL: process.env.OPENAI_MODEL,
    AI_RATE_LIMIT_WINDOW_MS: process.env.AI_RATE_LIMIT_WINDOW_MS,
    AI_RATE_LIMIT_MAX_REQUESTS: process.env.AI_RATE_LIMIT_MAX_REQUESTS,
};