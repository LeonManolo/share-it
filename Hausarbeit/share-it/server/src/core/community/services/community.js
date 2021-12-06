const CommunityLibrary = require("../../../database/CommunityLibrary");

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
   */
  async sentFriendRequest(fromUser, toUser) {
    const result = await communityLibrary.createFriendship(fromUser, toUser);
    console.log(result);
  }

  /**
   * Akzeptiert eine Freundschaftsanfrage. Benötigt wird dafür
   * die Id des Freundschafts Eintrages
   * @param {number} friendshipId
   * @returns
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
   * @returns
   */
  //TODO: evtl. Prüfen ob die Person die Rechte dafür hat
  async declineFriendRequest(friendshipId) {
    const result = await communityLibrary.updateFriendshipStatus(2);
    return result > 0;
  }
}

module.exports = Community;
