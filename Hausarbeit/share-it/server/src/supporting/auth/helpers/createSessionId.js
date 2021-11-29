const crypto = require("crypto");

const createSessionId = () => {
  const randomId = crypto.randomUUID();
  const sessionid = crypto.createHash("sha256").update(randomId).digest("hex");
  return sessionid;
};

module.exports = createSessionId;
