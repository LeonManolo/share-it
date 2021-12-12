// Bearbeitet von Niklas Hargarter und Leon-Manolo Stiller

const Sharing = require("../services/sharing");
const pathToStaticFolder = require("../../../global/helpers/pathToStaticFolder");
const formidable = require("formidable");
const fs = require("fs");

/**
 * Endpoint um einen neuen Gegenstand einzustellen.
 * Um ein Gegenstand einzustellen muss der title,description und ein
 * Bild hochgeladen werden.
 * Aufbau von item/Gegenstand Beispiel:
    {
    "owner": "Dein Vater",  // Aus den Cookies
    "title": "Plasma Fernseher",
    "description": "Ein nagelneuer Plasma Fernseher zum Ausleihen",
    "maxBorrowDuration": 10,
    "imageUrl": "https://www.tvmovie.de/assets/2019/04/26/70516-plasma-fernseher.jpg" //Automatisch
     }
 */
const addItem = async (req, res, next) => {
  const form = formidable({});

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.sendStatus(500);
      return;
    }
    const item = fields;
    item.owner = req.username;
    const oldpath = `${files.image.filepath}`;
    // TODO: dynamisch endung der Datei finden!
    const path = `/images/item_images/${files.image.newFilename}.png`;
    var newpath = pathToStaticFolder(path);
    console.log({ fields, files });
    fs.rename(oldpath, newpath, async function (err) {
      if (err) {
        console.log("renaming failed");
        res.sendStatus(500);
        return;
      }
      try {
        const sharing = new Sharing();
        item.imageUrl = `http://localhost:8080${path}`;
        await sharing.addItem(item);
        res.sendStatus(200);
      } catch (e) {
        res.status(500);
        res.send(`Adding failed: ${e}`);
      }
    });
  });
};

/**
 * Endpoint um einen bestimmten Gegenstand geliefert zu bekommen.
 * Anhand der Id des Items wird der jeweilige Gegenstand geliefert
 */
const getItem = async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const sharing = new Sharing();
    const item = await sharing.getItem(id);
    res.json(item);
  } catch (e) {
    res.sendStatus(500);
  }
};

/**
 * Endpoint um alle Gegenstände für einen User zu bekommen die er ausleihen darf.
 * So werden hier nur Gegenstände geliefert von Inhabern mit denen der Nutzer befreundet ist.
 */
const getItems = async (req, res, next) => {
  try {
    const sharing = new Sharing();
    const username = req.username;
    const result = await sharing.getItemsForUsername(username);
    res.json(result);
  } catch (e) {
    res.sendStatus(500);
  }
};

/**
 * Verleihen
 * Endpoint um alle vom Nutzer reigestellten Artikel zu bekommen.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getAllItemsLendByUser = async (req, res, next) => {
  const username = req.username;
  const sharing = new Sharing();
  const result = await sharing.getAllItemsLendByUser(username);
  res.json(result);
};

/**
 * Liefert alle Gegenstände die der Nutzer ausgeliehen hat.
 * Der Nutzer ist hierbei der eingeloggte Nutzer über die cookies.
 * Bei Erfolg wir hier eine Liste von Items geliefert.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getAllItemsBorrowedByUser = async (req, res, next) => {
  const username = req.username;
  try {
    const sharing = new Sharing();
    const result = await sharing.getAllItemsBorrowedByUser(username);
    res.json(result);
  } catch (e) {
    res.sendStatus(500);
  }
};

/**
 * Endpoint um ein Gegenstand auszuleihen. Hierbei muss
 * die Id des Gegenstandes angegeben werden um diesen auszuleihen.
 * Liefert den
 */
const borrowItem = async (req, res) => {
  const id = parseInt(req.params.id);
  const username = req.username;
  const sharing = new Sharing();
  const result = await sharing.borrowItem(id, username);
  if (result) {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
};

/**
 * Endpoint um einen Gegenstand wieder zurückzugeben.
 * Hierbei muss die Id des Gegenstandes angegeben werden um diesen zurück zugeben.
 * Liefert den Reponse-Code 404 wenn kein Gegenstand mit der angegeben Id gefunden wurde.
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
  } catch (e) {
    res.sendStatus(500);
  }
};

/**
 * Um einen Gegenstand zu bearbeiten wird diese Funktion aufgerufen.
 * Die Id des zu bearbeitenen Gegenstand muss angegeben werden.
 * Liefert den Response Code 500 wenn es Probleme beim umbennen oder
 * sonstige Probleme gab.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const updateItem = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const form = formidable({});
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.sendStatus(500);
      return;
    }
    const item = fields;
    item.owner = req.username;
    const oldpath = `${files.image.filepath}`;
    const path = `/images/item_images/${files.image.newFilename}.png`;
    var newpath = pathToStaticFolder(path);
    fs.rename(oldpath, newpath, async function (err) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      try {
        const sharing = new Sharing();
        item.imageUrl = `http://localhost:8080${path}`;
        await sharing.updateItem(id, item);
        res.sendStatus(200);
      } catch (e) {
        res.status(500);
        res.send(`Adding failed: ${e}`);
      }
    });
  });
};

/**
 * Endpoint um einen Gegenstand zu löschen
 * Zum löschen wird die Id des gegenstandes benötigt.
 * Liefert den Response-Code 404 wenn kein Gegenstand
 * mit dir angegebenen Id zum löschen gefunden wurde.
 */
const deleteItem = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const sharing = new Sharing();
  const success = await sharing.deleteItem(id);
  if (success) {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
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
  getAllItemsBorrowedByUser,
};
