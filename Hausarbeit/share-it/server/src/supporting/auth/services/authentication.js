const createSessionId = require("../helpers/createSessionId");
const hash = require("../helpers/hash");
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
   * Erstellt einen User in der Datenbank und liefert die dazugehörige sessiondId.
   * Prüft außerdem ob es bereits einen user mit dem Username bereits gibt. Sofern
   * dieser noch nicht existiert wird ein neuer User erstellt und das Passwort
   * noch einmal gehashed.
   * @param {string} username
   * @param {string} password
   * @returns {string} sessionid
   */
  async register(username, password) {
    const sessionId = createSessionId();
    const exists = await this.userExists(username);
    console.log(exists);
    if (exists) {
      throw Error("username already exists!");
    } else {
      const hashedPass = await hash.stringToHash(password);
      await userLibrary.createUser(username, hashedPass, sessionId);
      return sessionId;
    }
  }

  /**
   * Prüft ob ein User mit dem "username" bereits existiert
   * @param {string} username
   * @returns {boolean}
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
   * @returns {object} user
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
   * @returns {string} sessionid
   */
  async login(username, password) {
    const user = await userLibrary.getUser(username);
    const matches = await hash.equalsHash(password, user.password);
    console.log(`der user beim login: ${user}`);
    if (typeof user !== "undefined" && matches) {
      const sessionId = createSessionId();
      await userLibrary.updateUserSessionId(username, sessionId);
      return sessionId;
    } else {
      throw Error("User not found!");
    }
  }

  async logout(username) {
    //TODO: sessionid löschen
  }
}

module.exports = Authentication;
