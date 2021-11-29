const sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("./server/src/database/database.db");

class UserLibrary {
  constructor() {
    this.init();
  }

  /**
   * Erstellt die User Tabelle sofern diese noch nicht existiert
   * Ein User besteht aus einem:
   * username
   * password
   * sessionid
   * profileImageUrl
   */
  init() {
    db.run(`CREATE TABLE IF NOT EXISTS user(
                username VARCHAR(50) PRIMARY KEY NOT NULL,
                password VARCHAR(50) NOT NULL,
                sessionid TEXT UNIQUE,
                profileImageUrl TEXT
            );`);
  }

  /**
   * Erstellt einen User auf der Datenbank
   * @param {string} username 
   * @param {string} password 
   * @param {string} sessionId 
   * @returns 
   */
  async createUser(username, password, sessionId) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO user(username, password, sessionid) VALUES (? ,?, ?)`,
        [username, password, sessionId],
        function () {
          resolve(this.lastID);
        }
      );
    });
  }

  /**
   * Liefert einen User anhand der übergebenen sessiondId, sofern dieser existiert
   * @param {string} sessionId 
   * @returns 
   */
  async getUserBySessionId(sessionId) {
    return new Promise((resolve, reject) => {
      db.get(
        "SELECT * FROM user WHERE sessionid = ?",
        [sessionId],
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
   * 
   * @param {string} username 
   * @param {string} sessiondId 
   */
  async updateUserSessionId(username, sessionId) {
    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE user SET sessionid = ? WHERE username = ?",
        [sessionId, username],
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

  async userExists(username) {
    return new Promise((resolve, reject) => {
      db.get(
        "SELECT * FROM user WHERE username = ?",
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
   * Liefert einen User anhand des Usernames und Passwort zurück
   * @param {string} username 
   * @param {string} password 
   * @returns 
   */
  async getUser(username, password) {
    return new Promise((resolve, reject) => {
      db.get(
        "SELECT * FROM user WHERE username = ? AND password = ?",
        [username, password],
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

module.exports = UserLibrary;
