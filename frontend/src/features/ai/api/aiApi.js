import axiosInstance from "../../../api/axios";

export const sendAiMessage = async (message, history = [], conversationId) => {
  const payload = { message, history };
  if (conversationId) payload.conversationId = conversationId;
  const response = await axiosInstance.post("/ai/chat", payload);
  return response.data;
};
