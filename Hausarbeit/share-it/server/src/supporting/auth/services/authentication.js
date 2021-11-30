const createSessionId = require("../helpers/createSessionId");
const UserLibrary = require("../../../database/UserLibrary");
let userLibrary;

class Authentication {
  //Initialisiert die User Datenbank/Tabelle
  static init() {
    //Erstellt die User datenbank sofern sie noch nicht existiert
    userLibrary = new UserLibrary();
  }

  constructor() {
    Authentication.init();
  }

  /**
   * Erstellt einen User in der Datenbank und liefert die dazugehörige sessiondId
   * @param {string} username
   * @param {string} password
   * @returns
   */
  async register(username, password) {
    const sessionId = createSessionId();
    const exists = await this.userExists(username);
    console.log(exists)
    if (exists) {
      throw Error("username already exists!");
    } else {
      await userLibrary.createUser(username, password, sessionId);
      return sessionId;
    }
  }

  /**
   * Prüft ob ein User mit dem "username" bereits existiert
   * @param {string} username
   * @returns
   */
  async userExists(username) {
    let result = await userLibrary.userExists(username);
    console.log(result);
    console.log("oben");
    return result !== undefined;
  }

  /**
   * Liefert einen User anhand der übergebenen sessiondId, sofern
   * dieser existiert
   * @param {string} sessionId
   * @returns
   */
  async getUserBySessionId(sessionId) {
    return await userLibrary.getUserBySessionId(sessionId);
  }

  /**
   * Authentifiziert den user anhand dem Passwort und Username.
   * Bei erfolgreicher Authentifizierung wird die sessiondId zurückgegeben,
   * andernfalls ein Fehler
   * @param {string} username
   * @param {string} password
   * @returns
   */
  async login(username, password) {
    const user = await userLibrary.getUser(username, password);
    if (user) {
      const sessionId = createSessionId();
      await userLibrary.updateUserSessionId(username, sessionId);
      return sessionId;
    } else {
      throw Error("User not found!");
    }
  }
}

module.exports = Authentication;
