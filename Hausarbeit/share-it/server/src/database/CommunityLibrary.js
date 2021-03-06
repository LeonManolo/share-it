// Bearbeitet von Leon-Manolo Stiller, Niklas Hargarter
const sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(__dirname + "/database.sqlite");

class CommunityLibrary {
  constructor() {
    CommunityLibrary.init();
  }

  static init() {
    // status: 0 = ausstehend, 1 = angenommen, 2 = abgelehnt
    db.run(`CREATE TABLE IF NOT EXISTS friendship(
        friendship_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        friend1 VARCHAR(50) NOT NULL,
        friend2 VARCHAR(50) NOT NULL,
        requestedBy VARCHAR(50) NOT NULL,
        status INTEGER NOT NULL DEFAULT 0,
        UNIQUE(friend1, friend2) ON CONFLICT IGNORE
    );`);
  }

  /**
   * Erstellt einen Freundeseintrag zwischen fromUser und toUser in der Datenbank.
   * Standardmäßig wird status auf 0 gesetzt (für ausstehend).
   * @param {string} fromUser
   * @param {string} toUser
   * @returns
   */
  async createFriendship(fromUser, toUser) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT OR IGNORE INTO friendship(friend1, friend2, requestedBy, status) VALUES(?, ?, ?, 0);`,
        [fromUser, toUser, fromUser],
        function () {
          resolve(this.lastID);
        }
      );
    });
  }

  /**
   * Setzt den Status einer Freudschaft
   * status: 0 = ausstehend, 1 = angenommen, 2 = abgelehnt
   * TODO: Prüfen ob wenn status = 0, username != requestedBy (So dass derjenige
   * der die Freundschaftsanfrage gesendet hat sie nicht für den anderen annehmen kann!)
   * @param {number} status
   * @param {number} friendship_id
   * @returns
   */
  async updateFriendshipStatus(status, friendship_id) {
    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE friendship SET status = ? WHERE friendship_id = ?",
        [status, friendship_id],
        function () {
          resolve(this.changes);
        }
      );
    });
  }

  /**
   * Liefert alle unbeantworteten Freundes Einträge
   * @param {string} username
   * @returns {[object]}
   */
  async getAllOpenFriendRequestsForUser(username) {
    return new Promise((resolve, reject) => {
      db.all(
        //"SELECT * FROM friendship WHERE status = 0 AND (friend1 = ? OR friend2 = ?) AND requestedBy != ?",
        "SELECT DISTINCT friendship_id, friend1, friend2, username, profileImageUrl FROM friendship JOIN user ON friend1 = username OR friend2 = username WHERE status = 0 AND (friend1 = ? OR friend2 = ?) AND requestedBy != ? AND username != ?",
        [username, username, username, username],
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
   * Liefert alle User die mit dem angegebenen username befreundet sind.
   * @param {string} username
   * @returns {[object]} user
   */
  async getAllFriendsOfUser(username) {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT DISTINCT profileImageUrl, username FROM friendship JOIN user ON (friend1 = username) OR (friend2 = username) WHERE (friend1 = ? OR friend2 = ?) AND status = 1 AND username != ?",
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
}

module.exports = CommunityLibrary;
