const express = require("express");
const router = express.Router();
const pathToStaticFolder = require("../../../global/helpers/pathToStaticFolder");
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
router.post("/borrow/:id", itemsController.borrowItem);

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

/**
 * Enpoint um einen neuen Gegenstand einzustellen
 */
router.post("/items", itemsController.addItem);

/**
 * Enpoint um einen bestimmten Gegenstand zu erhalten
 */
router.get("/items/:id", itemsController.getItem);

/**
 * Enpoint um alle Gegenständige zu erhalten für den jeweiligen User
 */
router.get("/items", itemsController.getItems);

/**
 * Enpoint um einen bestimmten Gegenstand zu aktualisieren
 */
router.put("/items/:id", itemsController.updateItem);

/**
 * Enpoint um einen bestimmten Gegenstand zu löschen
 */
router.delete("/items/:id", itemsController.deleteItem);

module.exports = router;
