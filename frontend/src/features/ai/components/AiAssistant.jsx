import { useState } from "react";
import { useAiChat } from "../hooks/useAiChat";
import "../styles/AiAssistant.css";

const SAMPLE_QUESTIONS = [
  "Show my shipments in transit",
  "How many shipments are currently submitted?",
  "What is the status of SHP-2026-000001?",
  "Show shipments going to DXB",
  "Give me a summary of recent shipments",
];

const AiAssistant = () => {
  const [input, setInput] = useState("");
  const { messages, loading, error, send, clear } = useAiChat();
  const [view, setView] = useState("list"); // 'list' or 'chat'
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [sampleResponses, setSampleResponses] = useState({});

  const handleSend = async (text) => {
    if (!text || !text.trim()) return;
    try {
      const res = await send(text.trim());
      return res;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleClickQuestion = async (q) => {
    setActiveQuestion(q);
    setView("chat");
    setInput("");
    // show loading under the question
    setSampleResponses((s) => ({ ...s, [q]: { loading: true } }));
    try {
      const res = await handleSend(q);
      const text = res?.data?.data?.message || res?.data?.message || (res?.data && typeof res.data === 'string' ? res.data : null);
      setSampleResponses((s) => ({ ...s, [q]: { loading: false, text } }));
    } catch (err) {
      const errMsg = err?.message || 'Error';
      setSampleResponses((s) => ({ ...s, [q]: { loading: false, error: errMsg } }));
    }
  };

  const renderList = () => (
    <div className="ai-list">
      <h2>AI Assistant — Quick Questions</h2>
      <p className="hint">Click a question to ask the assistant. Or type your own below.</p>
      <ul className="questions">
        {SAMPLE_QUESTIONS.map((q, idx) => (
          <li key={idx} className="question-item">
            <div onClick={() => handleClickQuestion(q)}>{q}</div>
            {sampleResponses[q] && (
              <div className="sample-response">
                {sampleResponses[q].loading && <div className="resp-loading">Loading...</div>}
                {sampleResponses[q].text && <div className="resp-text">{sampleResponses[q].text}</div>}
                {sampleResponses[q].error && <div className="resp-error">{sampleResponses[q].error}</div>}
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="compose">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about your shipments" />
        <button onClick={() => handleClickQuestion(input)} disabled={loading || !input.trim()}>Ask</button>
      </div>
    </div>
  );

  const renderChat = () => (
    <div className="ai-chat">
      <div className="chat-header">
        <button className="back-btn" onClick={() => setView("list")}>Go to main chat</button>
        <h3>{activeQuestion || "Chat"}</h3>
        <div style={{ marginLeft: 'auto' }}>
          <button className="back-btn" onClick={() => { clear(); setSampleResponses({}); }}>Clear Chat</button>
        </div>
      </div>

      <div className="ai-messages" style={{ minHeight: 300 }}>
        {messages.length === 0 && <div className="empty">No messages yet.</div>}
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role}`}>
            <div className="msg-role">{m.role}</div>
            <div className="msg-text">{m.text}</div>
          </div>
        ))}
      </div>

      <div className="compose">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a follow-up question" />
        <button onClick={async () => { await handleSend(input); setInput(""); }} disabled={loading || !input.trim()}>Send</button>
      </div>

      {error && <div className="error">{error}</div>}
    </div>
  );

  return (
    <div className="ai-assistant-grid">
      <div className="left-col">
        {renderList()}
      </div>
      <div className="right-col">
        {view === "list" ? (
          <div className="placeholder">
            <h2>Ask the AI</h2>
            <p className="hint">Select a sample question or compose your own on the left.</p>
          </div>
        ) : (
          renderChat()
        )}
      </div>
    </div>
  );
};

export default AiAssistant;
