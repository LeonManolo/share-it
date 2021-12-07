const sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(__dirname + "/database.sqlite");

class UserLibrary {
  constructor() {
    UserLibrary.init();
  }

  /**
   * Erstellt die User Tabelle sofern diese noch nicht existiert
   * Ein User besteht aus einem:
   * username
   * password
   * sessionid
   * profileImageUrl
   */
  static init() {
    db.run(`CREATE TABLE IF NOT EXISTS user(
                username VARCHAR(50) PRIMARY KEY NOT NULL,
                password TEXT NOT NULL,
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
   * Aktualisiert die sessionId eines Users
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
   * Liefert einen User anhand des Usernames zurück
   * @param {string} username
   * @returns {object} user
   */
  async getUser(username) {
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
   * Liefert alle User die im username die Zeichkette "phrase" enthalten
   * und nicht den angegebenen User sind
   * @param {string} phrase
   * @returns {[object]} user
   */
  async getAllUsernamesContainingPhraseExceptUser(phrase = "", username = "") {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT * FROM user WHERE username LIKE '%?%' AND username != ?",
        [phrase, username],
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
