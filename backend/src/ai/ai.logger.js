const safeLog = (obj) => {
  try { console.log(JSON.stringify(obj)); } catch { console.log("AI log serialization failed"); }
};

const info = (message, meta = {}) => {
  const payload = { level: 'info', message, ...meta, ts: new Date().toISOString() };
  safeLog(payload);
};

const error = (message, meta = {}) => {
  const payload = { level: 'error', message, ...meta, ts: new Date().toISOString() };
  safeLog(payload);
};

module.exports = { info, error };
