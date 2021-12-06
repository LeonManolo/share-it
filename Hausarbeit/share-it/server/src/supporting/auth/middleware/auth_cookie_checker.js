const authCookieChecker = (request, response, next) => {
  const sessionId = request.cookies.sessionid;

  if (sessionId) {
    console.log(sessionId);
    const user = await userLibrary.getUserBySessionId(sessionId);
    console.log("username: " + user);
    request.user = user;
    next();
  } else {
    response.redirect("/");
  }
};

module.exports = authCookieChecker;
