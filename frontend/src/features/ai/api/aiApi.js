import axiosInstance from "../../../api/axios";

export const sendAiMessage = async (message) => {
  const response = await axiosInstance.post("/ai/chat", { message });
  return response.data;
};
