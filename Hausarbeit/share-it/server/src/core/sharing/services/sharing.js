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
   * Speichert einen neuen Gegenstand ab
   * @param {object} item
   * Aufbau von item Beispiel:
   * {
    "owner": "Dein Vater",
    "title": "Plasma Fernseher",
    "description": "Ein nagelneuer Plasma Fernseher zum Ausleihen",
    "maxBorrowDuration": 10,
    "borrowedBy": "Deine Mutter",
    "imageUrl": "https://www.tvmovie.de/assets/2019/04/26/70516-plasma-fernseher.jpg"
     }
   */
  async addItem(item) {
    // TODO: Validieren des item objects (auf null/undefined etc)
    if (typeof item.maxBorrowDuration === "undefined") {
      item.maxBorrowDuration = 10;
    }
    const result = await itemLibrary.addItem(item);
    console.log(`Suppe: ${result}`);
    return result > 0;
  }

  /**
   * Liefert einen Gegenstand anhand der Id des Gegenstandes
   * @param {number} id
   * @returns {object} item oder "undefined" wenn kein Gegenstand mit der id gefunden wurde
   */
  async getItem(id) {
    if (typeof id === "number") {
      return await itemLibrary.getItem(id);
    } else {
      throw new Error(`id: ${id} is not a number!`);
    }
  }

  /**
   * Liefert alle ausleihbaren Gegenstände für den User (username),
   * also alle Gegenstände die zum Verleih stehen und dessen Besitzer
   * mit dem User (username) befreundet sind
   * @param {string} username
   * @returns {[object]} items
   */
  async getItemsForUsername(username) {
    if (typeof username === "string") {
      console.log("bin in sharing.js");
      return await itemLibrary.getAllItemsForUsername(username);
    } else {
      throw new Error(`username: ${username} is not a string!`);
    }
  }

  /**
   * Liefert alle Gegenstände die der User mit dem username zum Verleih eingestellt hat
   * @param {string} username
   * @returns {[object]} item
   */
  async getAllItemsLendByUser(username) {
    return await itemLibrary.getAllItemsLendByUser(username);
  }

  async getAllItemsBorrowedByUser(username){
    return await itemLibrary.getAllItemsBorrowedByUser(username);
  }

  /**
   * Gibt einen Gegenstand wieder zurück zum Verleihen
   * @param {number} id
   * @param {string} borrowedBy TODO: Wenn geprüft werden soll ob
   * derjenige den Gegenstand auch zurückgeben darf bräuchte
   * es noch einen weiteren Parameter.
   */
  async returnItem(id) {
    if (typeof id === "number") {
      const result = await itemLibrary.updateItemBorrowStateToAvailable(id);
      return result > 0;
    } else {
      throw new Error(`id: ${id} is not a number!`);
    }
  }

  /**
   * Löscht einen Gegenstand aus der Datenbank
   * TODO: Prüfen ob ein Gegenstand gelöscht wurde. Kann sein das es kein
   * Gegenstand mit der id gibt
   * @param {number} id
   */
  async deleteItem(id) {
    if (typeof id === "number") {
      const result = await itemLibrary.deleteItemById(id);
      return result > 0;
    } else {
      throw new Error(`id: ${id} is not a number!`);
    }
  }

  async updateItem(id, item) {
    const result = await itemLibrary.updateItemById(id, item);
    return typeof result !== "undefined";
  }

  /**
   * Leiht den Gegenstand mit der Id aus für den
   * User mit dem username (forUser)
   * TODO: Prüfen ob der Gegenstand bereits ausgeliehen wurde
   * @param {number} id
   * @param {string} username
   */
  async borrowItem(id, forUser) {
    const result = await itemLibrary.updateItemBorrowStateToUnavailable(
      id,
      forUser
    );
    return result > 0;
  }
}

module.exports = Sharing;
