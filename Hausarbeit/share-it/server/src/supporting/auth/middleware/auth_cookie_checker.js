const authCookieChecker = (request, response, next) => {
  const sessionId = request.cookies.sessionid;

  if (sessionId) {
    console.log(sessionId);
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
