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
router.get("/register", (req, res, next) => {
  res.sendFile(pathToStaticFolder("/html/register.html"));
});

/**
 * Route zum einloggen eines Users
 */
router.post("/login", authControllers.login);

module.exports = router;
