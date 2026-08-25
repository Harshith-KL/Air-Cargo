import { useState } from "react";
import { sendAiMessage } from "../api/aiApi";

export const useAiChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [confirmationRequired, setConfirmationRequired] = useState(null);
  const [lastMessage, setLastMessage] = useState("");

  const send = async (text) => {
    const trimmedText = text.trim();
    if (!trimmedText || loading) return null;
    try {
      setLoading(true);
      setError(null);
      setLastMessage(trimmedText);
      setMessages((m) => [...m, { role: "user", text: trimmedText, timestamp: new Date() }]);
      const history = messages.map(({ role, text: content }) => ({ role, content }));
      const res = await sendAiMessage(trimmedText, history, conversationId);
      const aiText = res?.data?.data?.message || res?.data?.message || (res?.data && typeof res.data === 'string' ? res.data : null);
      if (res?.data?.data?.conversationId) setConversationId(res.data.data.conversationId);
      setConfirmationRequired(res?.data?.data?.confirmationRequired || null);
      if (aiText) {
        setMessages((m) => [...m, { role: "assistant", text: aiText, timestamp: new Date() }]);
        return res.data;
      } else {
        throw new Error(res?.data?.message || "Invalid AI response");
      }
    } catch (err) {
      setError("Sorry, I couldn't process that request.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setMessages([]);
    setConversationId(null);
    setConfirmationRequired(null);
    setError(null);
    setLastMessage("");
  };

  return { messages, loading, error, confirmationRequired, lastMessage, send, clear };
};
