// Bearbeitet von Leon-Manolo Stiller, Niklas Hargarter
const sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(__dirname + "/database.sqlite");

class ItemLibrary {
  constructor() {
    ItemLibrary.init();
  }

  /**
   * Erstellt die Item Tabelle sofern diese noch nicht existiert
   * Ein User besteht aus:
   * id(nicht änderbar): Einzigartige Nummer des Gegenstandes
   * title: Der Name des Gegenstandes, der zum Verleih steht
   * description: Die Beschreibung des Gegenstandes
   * owner: Der username des Users der den Gegenstand besitzt
   * borrowedBy(optional): Der username des Users der den Gegenstand ausgeliehen hat
   * createdAt(optional): Wann der Gegenstand eingestellt wurde
   * borrowedAt(optional): Wann der Gegenstand vom jemanden ausgeliehen wurde
   * maxBorrowDuration(optional): Die maximale Anzahl an Tagen, die der Gegenstand ausgeliehen werden darf
   * imageUrl(optional): Url zu einem Bild des Gegenstandes
   */
  static init() {
    db.run(`CREATE TABLE IF NOT EXISTS item(
                    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                    title VARCHAR(255) NOT NULL,
                    description TEXT NOT NULL,
                    owner VARCHAR(50) NOT NULL,
                    maxBorrowDuration INTEGER NOT NULL DEFAULT 10,
                    createdAt TEXT NOT NULL DEFAULT CURRENT_DATE,
                    borrowedBy VARCHAR(50),
                    borrowedAt TEXT,
                    imageUrl TEXT
                );`);
  }

  /**
   * Fügt ein Gegenstand in die Datenbank ein
   * @param {object} item
   * @returns
   */
  async addItem(item) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO item(title, description, imageUrl, maxBorrowDuration, owner) VALUES (? ,?, ?, ?, ?)`,
        [
          item.title,
          item.description,
          item.imageUrl,
          item.maxBorrowDuration,
          item.owner,
        ],
        function () {
          resolve(this.lastID);
        }
      );
    });
  }

  /**
   * Liefert einen Gegenstand aus der Datenbank anhand der Id des Gegenstandes
   * @param {number} id
   * @returns {object} item
   */
  async getItem(id) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM item WHERE id = ?", [id], (error, row) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve(row);
        }
      });
    });
  }

  /**
   * Löscht den Eintrag eines Gegenstandes
   * @param {number} id
   * @returns
   */
  async deleteItemById(id) {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM item WHERE id = ?;`, [id], function () {
        resolve(this.changes);
      });
    });
  }

  /**
   * Aktualisiert den Gegenstand mit der "id" und den Daten innerhalb
   * von "item"
   * @param {number} id
   * @param {object} item
   * @returns
   */
  async updateItemById(id, item) {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE item SET title = ?, description = ?, maxBorrowDuration = ?, imageUrl = ? WHERE id = ?;`,
        [
          item.title,
          item.description,
          item.maxBorrowDuration,
          item.imageUrl,
          id,
        ],
        function () {
          resolve(this.changes);
        }
      );
    });
  }

  /**
   * Liefert alle Gegenstände die der User mit dem username zum Verleih eingestellt hat
   * @param {string} username
   * @returns {[object]} item
   */
  async getAllItemsLendByUser(username) {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM item WHERE owner = ?", [username], (error, row) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve(row);
        }
      });
    });
  }

  /**
   * Liefert alle Gegenstände die der User mit der Nutzer ausgeliehen hat
   * @param {*} username
   * @returns
   */
  async getAllItemsBorrowedByUser(username) {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT * FROM item WHERE borrowedBy = ?",
        [username],
        (error, row) => {
          if (error) {
            console.log(error);
            reject(error);
          } else {
            resolve(row);
          }
        }
      );
    });
  }

  /**
   * Liefert alle Gegenstände die zum Verleih stehen. Aber auch nur Gegenstände von
   * Freunden des übergebenen Users (username).
   * Diese query greift auch auf die friendship und user_friendship Tabellen zu!
   * @param {string} username
   * @returns
   */
  async getAllItemsForUsername(username) {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT * FROM item JOIN friendship ON (friend1 = owner OR friend2 = owner) AND friendship.status = 1 WHERE (friend1 = ? OR friend2 = ?) AND owner != ? AND borrowedBy is NULL",
        //"SELECT * FROM item",
        [username, username, username],
        (error, row) => {
          if (error) {
            console.log(error);
            reject(error);
          } else {
            resolve(row);
          }
        }
      );
    });
  }

  /**
   * Setzt einen Artikel von ausgeliehen auf ausleihbar
   * @param {number} id
   * @returns
   */
  async updateItemBorrowStateToAvailable(id) {
    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE item SET borrowedBy = null,borrowedAt = null WHERE id = ?",
        [id],
        function () {
          resolve(this.changes);
        }
      );
    });
  }

  /**
   * Setzt den Gegenstand auf "ausgeliehen" für den user (username)
   * @param {number} id Die Id des Gegenstandes der ausgeliehen wird
   * @param {string} username Name der Person die den Gegenstand ausleiht
   * @param {date} date Datum an dem der Gegenstand ausgeliehen wurde
   * @returns
   */
  async updateItemBorrowStateToUnavailable(id, username) {
    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE item SET borrowedBy = ?,borrowedAt = CURRENT_DATE WHERE id = ?",
        [username, id],
        function () {
          resolve(this.changes);
        }
      );
    });
  }
}

module.exports = ItemLibrary;
