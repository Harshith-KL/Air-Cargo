const OpenAI = require("openai");
const { systemPrompt } = require("./ai.prompts");
const { TOOLS } = require("./ai.tools");
const { chatSchema, getShipmentByNumberSchema, searchShipmentsSchema, recentShipmentsSchema, dateRangeSchema } = require("./ai.schemas");

const MAX_ITERATIONS = 2;

const validateToolArgs = (toolName, args) => {
  // basic validation mapping
  switch (toolName) {
    case "get_shipment_by_number":
      return getShipmentByNumberSchema.safeParse(args);
    case "search_shipments":
      return searchShipmentsSchema.safeParse(args);
    case "get_recent_shipments":
      return recentShipmentsSchema.safeParse(args);
    case "get_shipments_by_date_range":
      return dateRangeSchema.safeParse(args);
    default:
      return { success: true, data: args };
  }
};

const createOpenAiClient = () => {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OPENAI_API_KEY not configured");
  return new OpenAI({ apiKey: key });
};

const chat = async (user, message) => {
  const logger = require("./ai.logger");
  const startTime = Date.now();
  chatSchema.parse({ message });
  const mockMode = process.env.AI_MOCK === "true";
  const hasKey = !!process.env.OPENAI_API_KEY;
  if (!hasKey && !mockMode) {
    throw new Error("OPENAI_API_KEY not configured");
  }
  if (!hasKey && mockMode) {
    logger.info('AI mock mode enabled - returning canned response');
    return { message: `Mocked response for: ${message}`, toolCalls: [] };
  }
  const client = createOpenAiClient();
  const model = process.env.OPENAI_MODEL || "gpt-4o";

  let lastModelOutput = null;
  let iteration = 0;

  // Initial prompt
  const userInput = `USER: ${message}`;

  while (iteration < MAX_ITERATIONS) {
    logger.info('AI iteration', { iteration, userId: user.userId, organizationId: user.organizationId });
    iteration += 1;
    const prompt = `${systemPrompt}\n${userInput}${lastModelOutput ? `\nTOOL_RESULT:${JSON.stringify(lastModelOutput)}` : ""}`;

    const resp = await client.responses.create({ model, input: prompt });
    const output = resp.output && resp.output[0] && resp.output[0].content && resp.output[0].content[0] && resp.output[0].content[0].text
      ? resp.output[0].content[0].text
      : (resp.output_text || "");

    let parsed = null;
    try {
      parsed = JSON.parse(output);
    } catch (e) {
      // not JSON — assume final message
      return {
        message: output.trim(),
        toolCalls: [],
      };
    }

    if (parsed.tool) {
      const toolName = parsed.tool;
      const args = parsed.args || {};
      // validate args
      const validation = validateToolArgs(toolName, args);
      if (!validation.success) {
        lastModelOutput = { error: validation.error.issues };
        continue;
      }

      try {
        const executor = require("./ai.tool-executor");
        const ctx = { userId: user.userId, organizationId: user.organizationId, role: user.role };
        logger.info('Executing tool', { toolName, userId: user.userId, organizationId: user.organizationId });
        const result = await executor.executeTool(toolName, args, ctx);
        logger.info('Tool executed', { toolName, durationMs: Date.now() - startTime });
        lastModelOutput = { tool: toolName, result };
        continue;
      } catch (err) {
        logger.error('Tool execution failed', { toolName, error: err.message });
        lastModelOutput = { error: err.message };
        continue;
      }
    } else if (parsed.message) {
      // final response
      logger.info('AI final message prepared', { userId: user.userId, organizationId: user.organizationId, durationMs: Date.now() - startTime });
      return {
        message: parsed.message,
        toolCalls: parsed.tool ? [parsed.tool] : [],
      };
    } else {
      return {
        message: output.trim(),
        toolCalls: [],
      };
    }
  }

  return { message: "Unable to generate answer after tool calls.", toolCalls: [] };
};

module.exports = {
  chat,
};
