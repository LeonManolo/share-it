const CommunityLibrary = require("../../../database/CommunityLibrary");
const UserLibrary = require("../../../database/UserLibrary");

let communityLibrary;

class Community {
  //Erstellt die Item-Datenbank sofern diese noch nicht existiert
  init() {
    communityLibrary = new CommunityLibrary();
  }

  constructor() {
    this.init();
  }

  /**
   * Sendet eine Freundschaftsanfrage von einem User (username) an
   * einen anderen User (username)
   * @param {string} fromUser
   * @param {string} toUser
   * @returns {boolean}
   */
  async sentFriendRequest(fromUser, toUser) {
    const result = await communityLibrary.createFriendship(fromUser, toUser);
    return typeof result !== "undefined";
  }

  /**
   * Akzeptiert eine Freundschaftsanfrage. Benötigt wird dafür
   * die Id des Freundschafts Eintrages
   * @param {number} friendshipId
   * @returns {boolean}
   */
  //TODO: evtl. Prüfen ob die Person die Rechte dafür hat
  async acceptFriendRequest(friendshipId) {
    const result = await communityLibrary.updateFriendshipStatus(1);
    return result > 0;
  }

  /**
   * Lehnt eine Freundschaftsanfrage ab. Benötigt wird dafür
   * die Id des Freundschafts Eintrages
   * @param {number} friendshipId
   * @returns {boolean}
   */
  //TODO: evtl. Prüfen ob die Person die Rechte dafür hat
  async declineFriendRequest(friendshipId) {
    const result = await communityLibrary.updateFriendshipStatus(2);
    return result > 0;
  }

  /**
   * Liefert alle unbeantworteten Freundschaftsanfragen für den User mit dem username
   * @param {string} username
   * @returns {[object]}
   */
  async getAllOpenFriendRequestsForUser(username) {
    return await communityLibrary.getAllOpenFriendRequestsForUser(username);
  }

  /**
   * Liefert alle usernames die im Text die Zeichenkette "Phrase" enthalten
   * @param {string} phrase
   * @returns {[string]} usernames
   */
  async getAllUsernamesContainingPhrase(phrase) {
    const userLibrary = new UserLibrary();
    const result = await userLibrary.getAllUsernamesContainingPhrase(phrase);
    const filtered = result.map((item) => {
      return item.username;
    });
    return filtered;
  }
}

module.exports = Community;
