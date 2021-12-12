// Bearbeitet von Leon-Manolo Stiller

/**
 * Prüft ob der Angegebene username den Anforderungen entspricht
 * @param {string} username
 * @returns {boolean}
 */
const usernameValidator = (username) => {
  let regex = new RegExp("[^A-Za-z0-9]+");
  console.log(username);
  return !regex.test(username);
};

module.exports = usernameValidator;
