const AiMessage = ({ role, text }) => {
  return (
    <div style={{ padding: 8, margin: 8, borderRadius: 6, background: role === 'assistant' ? '#f1f7ff' : '#eef2f5' }}>
      <b>{role}</b>
      <div>{text}</div>
    </div>
  );
};

export default AiMessage;
