const express = require("express");
const router = express.Router();
const pathToStaticFolder = require("../../../global/helpers/pathToStaticFolder");
const profileControllers = require("../controller/profile.controllers");

/**
 * Route zum Ändern von Profildaten
 */
router.post("/profile/edit", profileControllers.editProfile);

/**
 * Endpoint der die HTML-Seite liefert um Änderungen am Profil vorzunehmen
 */
router.get("/profile", (req, res) => {
  res.sendFile(pathToStaticFolder("/html/profile.html"));
});

module.exports = router;
