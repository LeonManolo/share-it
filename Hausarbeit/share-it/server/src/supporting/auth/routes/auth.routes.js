const express = require("express");
const router = express.Router();
const pathToStaticFolder = require("../../../global/helpers/pathToStaticFolder");

const authControllers = require("../controller/auth.controllers");

/**
 * Route zum Erstellen eines Users
 */
router.post("/register", authControllers.register);

/**
 * Liefert die HTML-Seite zum Registrieren
 */
router.get("/register", (req, res) => {
  res.sendFile(pathToStaticFolder("/html/register.html"));
});

/**
 * Route zum Einloggen eines Users
 */
router.post("/login", authControllers.login);

router.get("/login", (req, res) => {
  res.sendFile(pathToStaticFolder("/html/login.html"));
});

/**
 * Route zum Ausloggen eines Users
 */
router.post("/logout", authControllers.logout)

module.exports = router;
