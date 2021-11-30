const express = require("express");
const router = express.Router();
const pathToStaticFolder = require("../../../global/helpers/pathToStaticFolder");

/**
 * Route die die HTML-Seite liefert in der Gegenständige ausgeliehen werden können
 */
router.get("/borrow", (req, res, next) => {
  res.sendFile(pathToStaticFolder("/html/borrow.html"));
});

/**
 * Endpoint für die HTML-Seite in der Gegenstände zum verleihen eingestellt werden können
 */
router.get("/lend", (req, res, next) => {
  res.sendFile(pathToStaticFolder("/html/lend.html"));
});

/**
 * Endpoint für die HTML-Seite in der alle Gegenständige angezeigt werden,
 * die der jeweilige User gerade ausgeliehen hat
 */
router.get("/borrowed", (req, res, next) => {
  res.sendFile(pathToStaticFolder("/html/borrowed.html"));
});

module.exports = router;
