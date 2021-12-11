const Authentication = require("../services/authentication");
const usernameValidator = require("../validations/username_validator");

const cookieName = "sessionid";

// Endpoint für "/register"
const register = async (req, res, next) => {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  // Prüft ob der Username und das Passwort valide sind
  console.log(usernameValidator(username));
  // TODO: später austauschen
  if (true) {
    try {
      const auth = new Authentication();
      const sessionId = await auth.register(username, password);
      res.cookie(cookieName, sessionId);
      res.status(200);
      res.json({
        status: "200 Ok",
        sessionId: sessionId,
      });
    } catch (e) {
      res.status(401);
      res.json({
        status: `401 ${e}`,
      });
    }
  } else {
    res.status(401);
    res.json({
      status: `401 Invalid Username or Password`,
    });
  }
};

// Endpoint für "/login" zum Einloggen eines Users
const login = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const auth = new Authentication();
    const sessionId = await auth.login(username, password);
    res.cookie(cookieName, sessionId);
    res.status(200);
    res.json({
      status: "200 Ok",
      sessionId: sessionId,
    });
  } catch (e) {
    res.status(401);
    res.json({
      status: `401 ${e}`,
    });
  }
};

// Endpoint für "/logout" zum Ausloggen des momentanen Users
const logout = (req, res) => {
  res.clearCookie(cookieName);
  res.redirect("/");
};

// Funktionen werden exportiert
module.exports = {
  register,
  login,
  logout,
};
