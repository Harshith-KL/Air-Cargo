const safeLog = (obj) => {
  // remove sensitive fields
  const { OPENAI_API_KEY, MONGODB_URI, JWT_SECRET, ...rest } = process.env;
  try {
    console.log(JSON.stringify(rest) ? JSON.stringify(obj) : obj);
  } catch (e) {
    console.log(obj);
  }
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
