const CommunityLibrary = require("../../../database/CommunityLibrary");

let communityLibrary;

class Community {
  //Erstellt die Item Datenbank sofern diese noch nicht existiert
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
}

module.exports = Community;
