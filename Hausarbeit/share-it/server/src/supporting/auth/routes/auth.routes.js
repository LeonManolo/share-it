const express = require("express");
const router = express.Router();
const pathToStaticFolder = require("../../../global/helpers/pathToStaticFolder");

const authControllers = require("../controller/auth.controllers");

/**
 * Route zum erstellen eines Users
 */
router.post("/register", authControllers.register);

/**
 * Liefert die Html-Seite zum Registrieren
 */
router.get("/register", (req, res) => {
  res.sendFile(pathToStaticFolder("/html/register.html"));
});

/**
 * Route zum einloggen eines Users
 */
router.post("/login", authControllers.login);

router.get("/login", (req, res) => {
  res.sendFile(pathToStaticFolder("/html/login.html"));
});

/**
 * Route zum ausloggen eines Users
 */
router.post("/logout", authControllers.logout)

module.exports = router;
