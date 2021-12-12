// Bearbeitet von Leon-Manolo Stiller
const crypto = require("crypto");

/**
 * Generiert eine Zufällig generierte Zeichenkette als Session Id
 * @returns {string} sessionId
 */
const createSessionId = () => {
  const randomId = crypto.randomUUID();
  const sessionid = crypto.createHash("sha256").update(randomId).digest("hex");
  return sessionid;
};

module.exports = createSessionId;
