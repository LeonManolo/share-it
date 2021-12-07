const Sharing = require("../services/sharing");
const formidable = require("formidable");
const fs = require("fs");

// TODO username aus den cookies lesen
/**
 * Endpoint um einen neuen Gegenstand einzustellen
 */
const addItem = async (req, res, next) => {
  const item = req.body;
  console.log("ich bin drinn");
  try {
    const sharing = new Sharing();
    await sharing.addItem(item);
    res.sendStatus(200);
  } catch (e) {
    res.status(500);
    res.send(`Adding failed: ${e}`);
  }
};

/**
 * Endpoint um eine bestimmten Gegenstand geliefert zu bekommen
 */
const getItem = async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const sharing = new Sharing();
    const item = await sharing.getItem(id);
    // TODO: item vorher prüfen
    res.json(item);
  } catch (e) {
    res.sendStatus(500);
  }
};

/**
 * Endpoint um alle Gegenstände für einen User zu bekommen die er Ausleihen darf.
 *
 */

const getItems = async (req, res, next) => {
  try {
    const sharing = new Sharing();
    const result = await sharing.getItemsForUsername("Dein Vater");
    console.log("items.controllers getItems: " + result);
    // TODO: item vorher prüfen
    res.json(result);
  } catch (e) {
    res.sendStatus(500);
  }
};

const getAllItemsLendByUser = async (req, res, next) => {
  //TODO akutellen user auslesen
  const username = "Hans Peter";
  const sharing = new Sharing();
  const result = await sharing.getAllItemsLendByUser("Dein Vater");
  console.log("items.contorllers getLendItems: " + result);
  res.json(result);
};

/**
 * Endpoint um ein Gegenstand auszuleihen
 */
const borrowItem = async (req, res) => {
  const id = parseInt(req.params.id);
  const username = "Hans Peter";
  const sharing = new Sharing();
  const result = await sharing.borrowItem(id, username);
  console.log(result);
  res.sendStatus(200);
};

/**
 * Endpoint um einen Gegenstand wieder zurückzugeben
 */
const returnItem = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const sharing = new Sharing();
    const success = await sharing.returnItem(id);
    if (success) {
      res.sendStatus(200);
    } else {
      // id nicht gefunden
      res.sendStatus(404);
    }
    console.log(result);
  } catch (e) {
    res.sendStatus(500);
  }
};

// TODO: auf undefined prüfen etc
const updateItem = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const item = req.body;
  const sharing = new Sharing();
  const success = await sharing.updateItem(id, item);
  if (success) {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
};

/**
 * Endpoint um einen Gegenstand zu löschen
 */
const deleteItem = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const sharing = new Sharing();
  const success = await sharing.deleteItem(id);
  if (success) {
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
};

// Funktionen werden exportiert
module.exports = {
  addItem,
  updateItem,
  getItem,
  getItems,
  deleteItem,
  borrowItem,
  returnItem,
  getAllItemsLendByUser,
};
