// Bearbeitet von Leon-Manolo Stiller
const UserLibrary = require("../../../database/UserLibrary");

/**
 * Middleware die Überprüft ob es einen Nutzer mit der
 * im Cookie gespeicherten sessionId existiert.
 * Wenn dies nicht der Fall ist wird dieser Redirectet zu "/"
 * und der Statuscode 401 geliefert
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const authCookieChecker = async (request, response, next) => {
  const sessionId = request.cookies.sessionid;

  if (sessionId) {
    console.log(sessionId);
    const userLibrary = new UserLibrary();
    const user = await userLibrary.getUserBySessionId(sessionId);
    console.log("username: " + user);
    request.username = user.username;
    next();
  } else {
    response.redirect("/");
    response.status(401);
  }
};

module.exports = authCookieChecker;
