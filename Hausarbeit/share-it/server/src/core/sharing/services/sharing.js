const ItemLibrary = require("../../../database/ItemLibrary");

let itemLibrary;

class Sharing {
  //Erstellt die Item Datenbank sofern diese noch nicht existiert
  init() {
    itemLibrary = new ItemLibrary();
  }

  constructor() {
    this.init();
  }

  /**
   * Speichert ein Gegenstand ab
   * @param {object} item
   */
  async addItem(item) {
    // TODO: Validieren des item objects (auf null/undefined etc)
    await itemLibrary.addItem(item);
  }

  /**
   * Liefert ein Gegenstand anhand der Id des Gegenstandes
   * @param {number} id
   * @returns
   */
  async getItem(id) {
    if (typeof id === "number") {
      return await itemLibrary.getItem(id);
    } else {
      throw new Error(`id: ${id} is not a number!`);
    }
  }

  async getItemsForUsername(username) {
    console.log("inside Sharing getItem()");
    if (typeof username === "string") {
      return await itemLibrary.getAllItemsForUsername(username);
    } else {
      throw new Error(`username: ${username} is not a string!`);
    }
  }
}

module.exports = Sharing;
