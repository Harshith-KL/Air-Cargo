const { chat } = require("./ai.service");
const { chatSchema } = require("./ai.schemas");
const logger = require("./ai.logger");

const chatController = async (req, res) => {
  const start = Date.now();
  const user = req.user || {};
  try {
    const payload = chatSchema.parse(req.body);
    logger.info('AI request received', { userId: user.userId, organizationId: user.organizationId });
    const result = await chat(req.user, payload);
    logger.info('AI request completed', { userId: user.userId, organizationId: user.organizationId, durationMs: Date.now() - start });
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    logger.error('AI request failed', { userId: user.userId, organizationId: user.organizationId, error: err.message });
    const status = err.name === "ZodError" ? 400 : 500;
    res.status(status).json({ success: false, message: status === 400 ? "Invalid AI request." : "The AI assistant is temporarily unavailable." });
  }
};

module.exports = {
  chatController,
};
