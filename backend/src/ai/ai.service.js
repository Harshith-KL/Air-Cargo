const crypto = require("crypto");
const OpenAI = require("openai");
const { systemPrompt } = require("./ai.prompts");
const { TOOLS } = require("./ai.tools");
const { executeTool } = require("./ai.tool-executor");
const { chatSchema } = require("./ai.schemas");
const logger = require("./ai.logger");

const MAX_TOOL_ROUNDS = 5;
const MAX_HISTORY_MESSAGES = 20;

const createOpenAiClient = () => {
  if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY not configured");
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
};

const safeHistory = (history = []) => history.slice(-MAX_HISTORY_MESSAGES).map(({ role, content }) => ({ role, content: content.slice(0, 4000) }));
const usage = (response) => response?.usage ? { inputTokens: response.usage.input_tokens || 0, outputTokens: response.usage.output_tokens || 0 } : undefined;

const mockChat = async (parsed, context) => {
  const shipmentNumber = parsed.message.match(/\bSHP(?:-\d{4})?-\d{1,8}\b/i)?.[0];
  let result;
  if (shipmentNumber) {
    result = await executeTool("get_shipment_by_number", { shipmentNumber }, context);
  } else {
    const airportCode = parsed.message.match(/\b(BLR|DXB|DEL|BOM)\b/i)?.[1];
    result = airportCode
      ? await executeTool("search_shipments", { destinationAirportCode: airportCode, limit: 10 }, context)
      : await executeTool("get_recent_shipments", { limit: 5 }, context);
  }
  const data = result?.shipment || result?.results || result?.error;
  return { message: `Mock Responses tool result: ${JSON.stringify(data)}`, conversationId: context.conversationId, usage: { inputTokens: 0, outputTokens: 0 } };
};

const chat = async (user, request) => {
  const parsed = chatSchema.parse(request);
  const conversationId = parsed.conversationId || crypto.randomUUID();
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const startedAt = Date.now();
  const explicitConfirmation = /^(yes|y|confirm|confirmed|go ahead|proceed|create it|do it)\b/i.test(parsed.message.trim());
  const context = { userId: user.userId, organizationId: user.organizationId, role: user.role, conversationId, explicitConfirmation };

  if (process.env.AI_MOCK === "true" && !process.env.OPENAI_API_KEY) {
    return mockChat(parsed, context);
  }

  const client = createOpenAiClient();
  let input = [...safeHistory(parsed.history), { role: "user", content: parsed.message }];
  let rounds = 0;
  let lastResponse;
  let confirmationRequired;
  try {
    while (rounds < MAX_TOOL_ROUNDS) {
      rounds += 1;
      lastResponse = await client.responses.create({ model, instructions: systemPrompt, input, tools: TOOLS, max_output_tokens: 700 });
      const functionCalls = (lastResponse.output || []).filter((item) => item.type === "function_call");
      if (functionCalls.length === 0) {
        const message = (lastResponse.output_text || "").trim();
        return { message: message || "I could not produce an answer.", conversationId, confirmationRequired: confirmationRequired ? { type: confirmationRequired.type, action: confirmationRequired.action, details: confirmationRequired.details } : undefined, usage: usage(lastResponse) };
      }
      input = [...input, ...(lastResponse.output || [])];
      for (const call of functionCalls) {
        let args;
        try { args = JSON.parse(call.arguments || "{}"); } catch { args = null; }
        const result = args === null ? { success: false, error: { code: "VALIDATION_ERROR", message: "The tool arguments were malformed." } } : await executeTool(call.name, args, context);
        if (result?.type === "confirmation_required") confirmationRequired = result;
        logger.info("AI tool execution", { requestId: lastResponse.id, userId: user.userId, organizationId: user.organizationId, toolName: call.name, success: result?.success !== false });
        input.push({ type: "function_call_output", call_id: call.call_id, output: JSON.stringify(result) });
      }
    }
    return { message: "I could not complete that request safely. Please try again.", conversationId, usage: usage(lastResponse) };
  } catch (error) {
    logger.error("AI provider or tool failure", { requestId: lastResponse?.id, userId: user.userId, organizationId: user.organizationId, rounds, error: error.message, durationMs: Date.now() - startedAt });
    throw new Error("The AI assistant is temporarily unavailable.");
  } finally {
    logger.info("AI request completed", { requestId: lastResponse?.id, userId: user.userId, organizationId: user.organizationId, model, rounds, usage: usage(lastResponse), durationMs: Date.now() - startedAt });
  }
};

module.exports = { chat };
