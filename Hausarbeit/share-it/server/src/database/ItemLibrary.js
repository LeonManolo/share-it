const sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("./server/src/database/database.sqlite");

class ItemLibrary {
  constructor() {
    ItemLibrary.init();
  }

  /**
   * Erstellt die Item Tabelle sofern diese noch nicht existiert
   * Ein User besteht aus:
   * id: Einzigarte Nummer des Gegenstandes
   * owner: Der username des Users der den Gegenstand besitzt
   * borrowedBy: Der username des Users der den Gegenstand ausgeliehen hat
   * imageUrl: Url zu einem Bild des Gegenstandes
   */
  // TODO: title, createdAt, borrowedAt date etc. und description hinzufügen!
  static init() {
    db.run(`CREATE TABLE IF NOT EXISTS item(
                    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                    owner VARCHAR(50) NOT NULL,
                    borrowedBy VARCHAR(50),
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
        `INSERT INTO item(owner, borrowedBy, imageUrl) VALUES (? ,?, ?)`,
        [item.owner, item.borrowedBy, item.imageUrl],
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
   * Liefert alle Gegenstände die zum Verleih stehen und auch nur
   * nur freunde von dem übergebenen User (username) sind
   * Diese query greift auch auf die friendship und user_friendship tabellen!
   * @param {string} username
   * @returns
   */
  async getAllItemsForUsername(username) {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT * FROM item JOIN friendship ON (friend1 = ? OR friend2 = ?) AND status = 0;",
        [username, username],
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
}

module.exports = ItemLibrary;
