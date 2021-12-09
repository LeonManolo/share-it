const express = require("express");
const router = express.Router();
const pathToStaticFolder = require("../../../global/helpers/pathToStaticFolder");
const cookieChecker = require("../../../supporting/auth/middleware/auth_cookie_checker");
//Controllers
const itemsController = require("../controller/items.controllers");

/**
 * Route die die HTML-Seite liefert in der Gegenständige ausgeliehen werden können
 */
router.get("/borrow", (req, res, next) => {
  res.sendFile(pathToStaticFolder("/html/borrow.html"));
});

/**
 * Route um einen Gegenstand auszuleihen
 */
router.post("/borrow/:id", cookieChecker, itemsController.borrowItem);

/**
 * Route um einen Gegenstand zurückzugeben
 */
router.post("/return/:id", cookieChecker, itemsController.returnItem);

/**
 * Endpoint für die HTML-Seite in der Gegenstände zum Verleihen eingestellt werden können
 */
router.get("/lend", (req, res, next) => {
  res.sendFile(pathToStaticFolder("/html/lend.html"));
});

/**
 * Endpoint für die HTML-Seite in der alle Gegenstände angezeigt werden,
 * die der jeweilige User gerade ausgeliehen hat
 */
router.get("/borrowed", (req, res, next) => {
  res.sendFile(pathToStaticFolder("/html/borrowed.html"));
});

/**
 * Enpoint um einen neuen Gegenstand einzustellen
 */
router.post("/items",cookieChecker, itemsController.addItem);

/**
 * Enpoint um einen bestimmten Gegenstand zu erhalten
 */
router.get("/items/:id", itemsController.getItem);

/**
 * Enpoint um alle Gegenstände für den jeweiligen User zu erhalten
 */
router.get("/items", cookieChecker, itemsController.getItems);

/**
 * Enpoint um alle Gegenstände zu erhalten die der User erstellt hat
 */
router.get("/itemsLend", cookieChecker, itemsController.getAllItemsLendByUser);

/**
 * Endpoint um alle Gegenstände zu erhalten die der User ausgeliehen hat
 */
router.get("/borrowed-items", cookieChecker, itemsController.getAllItemsBorrowedByUser);

/**
 * Enpoint um einen bestimmten Gegenstand zu aktualisieren
 */
router.put("/items/:id", itemsController.updateItem);

/**
 * Enpoint um einen bestimmten Gegenstand zu löschen
 */
router.delete("/items/:id", itemsController.deleteItem);

module.exports = router;
