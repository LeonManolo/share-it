const bcrypt = require("bcrypt");

/**
 * Wandelt einen Text in Hash um
 * @param {string} string
 * @returns {string} hashed string
 */
const stringToHash = async (string) => {
  const saltRounds = 10;
  return await bcrypt.hash(string, saltRounds);
};

/**
 * Prüft ob ein Text dem Hash entspricht
 * @param {string} string
 * @returns {string} hashed string
 */
const equalsHash = async (string, hash) => {
  return await bcrypt.compare(string, hash);
};

module.exports = {
  stringToHash,
  equalsHash,
};
