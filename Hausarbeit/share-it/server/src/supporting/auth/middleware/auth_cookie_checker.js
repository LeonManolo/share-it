const UserLibrary = require("../../../database/UserLibrary");

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
