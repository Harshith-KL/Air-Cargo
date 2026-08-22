const express = require("express");
const { chatController } = require("./ai.controller");
const { authenticate } = require("../middleware/auth.middleware");
const rateLimit = require("express-rate-limit");

const aiRouter = express.Router();

const windowMs = Number(process.env.AI_RATE_LIMIT_WINDOW_MS) || 60 * 1000;
const max = Number(process.env.AI_RATE_LIMIT_MAX_REQUESTS) || 10;
const aiLimiter = rateLimit({ windowMs, max, standardHeaders: true, legacyHeaders: false });

aiRouter.post("/chat", authenticate, aiLimiter, chatController);

module.exports = aiRouter;
