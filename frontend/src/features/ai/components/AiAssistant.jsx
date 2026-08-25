import { useEffect, useRef, useState } from "react";
import { AlertCircle, ArrowUp, Check, ClipboardList, RotateCcw, Sparkles, Trash2, TrendingUp } from "lucide-react";
import { useAiChat } from "../hooks/useAiChat";
import AiMessage from "./AiMessage";
import "../styles/AiAssistant.css";

const suggestions = [
  { label: "Today's activity", prompt: "Give me a summary of today's shipments.", icon: ClipboardList },
  { label: "Pending shipments", prompt: "Show me shipments that are pending.", icon: AlertCircle },
  { label: "Operational trends", prompt: "Give me an overview of shipment activity and important trends.", icon: TrendingUp },
  { label: "Airport activity", prompt: "Which airports have the most shipments?", icon: Sparkles },
];

const AiAssistant = () => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const { messages, loading, error, confirmationRequired, lastMessage, send, clear } = useAiChat();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const submit = async (value = input) => {
    if (!value.trim() || loading) return;
    setInput("");
    try {
      await send(value);
    } catch {
      return null;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  };

  return (
    <section className="ai-assistant" aria-labelledby="ai-title">
      <header className="ai-header">
        <div>
          <div className="ai-eyebrow"><span className="online-dot" /> AI OPERATIONS DESK</div>
          <h1 id="ai-title">AI Assistant</h1>
          <p>Ask questions about shipments, airports, and cargo activity.</p>
        </div>
        <div className="ai-header-actions">
          <span className="online-status">Assistant online</span>
          <button className="icon-button" onClick={clear} disabled={!messages.length && !error} aria-label="Clear conversation" title="Clear conversation">
            <Trash2 size={18} />
          </button>
        </div>
      </header>

      <div className="ai-workspace">
        <div className="ai-conversation" aria-live="polite">
          {messages.length === 0 ? (
            <div className="ai-empty-state">
              <div className="ai-empty-icon"><Sparkles size={24} /></div>
              <h2>How can I help with your cargo operations?</h2>
              <p>Ask for live shipment information, airport activity, or an operational summary.</p>
              <div className="suggestion-grid">
                {suggestions.map(({ label, prompt, icon: Icon }) => (
                  <button key={label} className="suggestion-card" onClick={() => submit(prompt)} disabled={loading}>
                    <Icon size={18} />
                    <span>{label}</span>
                    <small>{prompt}</small>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="ai-message-list">
              {messages.map((message, index) => <AiMessage key={`${message.role}-${index}`} {...message} />)}
              {loading && <div className="ai-loading"><div className="ai-message-avatar"><Sparkles size={18} /></div><div><strong>Cargo Intelligence</strong><span><i /> <i /> <i /></span><p>Analyzing your cargo data...</p></div></div>}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {confirmationRequired && (
          <div className="confirmation-panel" role="status">
            <div><strong>Confirm shipment creation</strong><p>{confirmationRequired.details.originAirportCode} to {confirmationRequired.details.destinationAirportCode} · {confirmationRequired.details.pieces} pieces · {confirmationRequired.details.grossWeight} kg</p></div>
            <button className="primary-button" onClick={() => submit("Yes, confirm creation.")} disabled={loading}><Check size={16} /> Confirm</button>
          </div>
        )}

        {error && <div className="ai-error" role="alert"><AlertCircle size={18} /><span>{error}</span><button onClick={() => submit(lastMessage)} disabled={loading}><RotateCcw size={15} /> Retry</button></div>}

        <div className="ai-composer">
          <textarea value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={handleKeyDown} placeholder="Ask anything about your cargo operations..." aria-label="Ask the AI assistant" rows={2} disabled={loading} />
          <button className="send-button" onClick={() => submit()} disabled={!input.trim() || loading} aria-label="Send message" title="Send message"><ArrowUp size={20} /></button>
          <span className="composer-hint">Enter to send · Shift + Enter for a new line</span>
        </div>
      </div>
    </section>
  );
};

export default AiAssistant;
