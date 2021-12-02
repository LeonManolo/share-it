const Sharing = require("../services/sharing");

// TODO username aus den cookies lesen
const addItem = async (req, res, next) => {
  const item = req.body;

  try {
    const sharing = new Sharing();
    await sharing.addItem(item);
    res.sendStatus(200);
  } catch (e) {
    res.status(500);
    res.send(`Adding failed: ${e}`);
  }
};

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

const getItems = async (req, res, next) => {
  try {
    const sharing = new Sharing();
    const result = await sharing.getItemsForUsername("Dein Vater");
    console.log(result);
    // TODO: item vorher prüfen
    res.json(result);
  } catch (e) {
    res.sendStatus(500);
  }
};

const updateItem = async (req, res, next) => {};

const deleteItem = async (req, res, next) => {};

// Funktionen werden exportiert
module.exports = {
  addItem,
  updateItem,
  getItem,
  getItems,
  deleteItem,
};
