import { useState } from "react";
import { sendAiMessage } from "../api/aiApi";

export const useAiChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const send = async (text) => {
    try {
      setLoading(true);
      setError(null);
      const userMsg = { role: "user", text };
      setMessages((m) => [...m, userMsg]);
      const res = await sendAiMessage(text);
      // backend wraps result as { success, data: { message } }
      const aiText = res?.data?.data?.message || res?.data?.message || (res?.data && typeof res.data === 'string' ? res.data : null);
      if (aiText) {
        setMessages((m) => [...m, { role: "assistant", text: aiText }]);
        return res.data;
      } else {
        throw new Error(res?.data?.message || "Invalid AI response");
      }
    } catch (err) {
      const serverMsg = err?.response?.data?.message;
      const message = serverMsg || err.message || "Unknown error";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setMessages([]);
    setError(null);
  };

  return { messages, loading, error, send, clear };
};
