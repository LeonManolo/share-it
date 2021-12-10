const express = require("express");
const router = express.Router();
const pathToStaticFolder = require("../../../global/helpers/pathToStaticFolder");
const profileControllers = require("../controller/profile.controllers");
const cookieChecker = require("../../../supporting/auth/middleware/auth_cookie_checker");

/**
 * Route zum Ändern von Profildaten
 */
router.post("/profile-edit",cookieChecker, profileControllers.editProfile);

router.get("/my-profile", cookieChecker, profileControllers.getProfile);
/**
 * Endpoint der die HTML-Seite liefert um Änderungen am Profil vorzunehmen
 */
router.get("/profile", (req, res) => {
  res.sendFile(pathToStaticFolder("/html/profile.html"));
});

module.exports = router;
