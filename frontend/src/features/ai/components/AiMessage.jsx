import { Bot, UserRound } from "lucide-react";

const renderText = (text) => text.split("\n").map((line, index) => {
  if (line.startsWith("### ")) return <h4 key={index}>{line.slice(4)}</h4>;
  if (line.startsWith("## ")) return <h3 key={index}>{line.slice(3)}</h3>;
  if (/^[-*] /.test(line)) return <li key={index}>{line.slice(2)}</li>;
  if (/^\d+\. /.test(line)) return <li key={index}>{line.replace(/^\d+\. /, "")}</li>;
  return <p key={index}>{line || "\u00a0"}</p>;
});

const AiMessage = ({ role, text, timestamp }) => {
  const isAssistant = role === "assistant";
  return (
    <article className={`ai-message ${isAssistant ? "assistant" : "user"}`}>
      <div className="ai-message-avatar" aria-hidden="true">{isAssistant ? <Bot size={18} /> : <UserRound size={18} />}</div>
      <div className="ai-message-body">
        <div className="ai-message-meta">
          <strong>{isAssistant ? "Cargo Intelligence" : "You"}</strong>
          {timestamp && <time>{new Date(timestamp).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</time>}
        </div>
        <div className="ai-message-content">{renderText(text)}</div>
      </div>
    </article>
  );
};

export default AiMessage;
