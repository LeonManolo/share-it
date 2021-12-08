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
    if (typeof fromUser === "string" && typeof toUser === "string") {
      const result = await communityLibrary.createFriendship(fromUser, toUser);
      return typeof result !== "undefined";
    } else {
      throw new Error("fromUser or toUser is not a string!");
    }
  }

  /**
   * Akzeptiert eine Freundschaftsanfrage. Benötigt wird dafür
   * die Id des Freundschaftseintrages
   * @param {number} friendshipId
   * @returns {boolean}
   */
  //TODO: evtl. Prüfen ob die Person die Rechte dafür hat
  async acceptFriendRequest(friendshipId) {
    if (typeof friendshipId === "number") {
      const result = await communityLibrary.updateFriendshipStatus(1);
      return result > 0;
    } else {
      throw new Error("friendshipId is not a number!");
    }
  }

  /**
   * Lehnt eine Freundschaftsanfrage ab. Benötigt wird dafür
   * die Id des Freundschaftseintrages
   * @param {number} friendshipId
   * @returns {boolean}
   */
  //TODO: evtl. Prüfen ob die Person die Rechte dafür hat
  async declineFriendRequest(friendshipId) {
    if (typeof friendshipId === "number") {
      const result = await communityLibrary.updateFriendshipStatus(2);
      return result > 0;
    } else {
      throw new Error("friendshipId is not a number!");
    }
  }

  /**
   * Liefert alle unbeantworteten Freundschaftsanfragen für den User mit dem username
   * @param {string} username
   * @returns {[object]}
   */
  async getAllOpenFriendRequestsForUser(username) {
    if (typeof username === "string") {
      const result = await communityLibrary.getAllOpenFriendRequestsForUser(
        username
      );
      console.log(result);
      const filtered = [];
      //Filtert die Ausgabe so, dass nur die relevanten Daten weitergegeben werden.
      for (let i = 0; i < result.length; i++) {
        if (result[i].friend1 !== username) {
          filtered.push({
            friendshipId: result[i].friendship_id,
            username: result[i].friend1,
            imageUrl: result[i].profileImageUrl,
          });
        } else {
          filtered.push({
            friendshipId: result[i].friendship_id,
            username: result[i].friend2,
            imageUrl: result[i].profileImageUrl,
          });
        }
      }

      return filtered;
    } else {
      throw new Error("username is not a string!");
    }
  }

  /**
   * Liefert alle usernames die im Text die Zeichenkette "Phrase" enthalten
   * @param {string} phrase
   * @returns {[string]} usernames
   */
  async getAllUsernamesContainingPhraseExceptUser(
    phrase = "",
    exceptUsername = ""
  ) {
    const userLibrary = new UserLibrary();
    const result = await userLibrary.getAllUsernamesContainingPhraseExceptUser(
      phrase,
      exceptUsername
    );
    return result;
  }

  /**
   * Liefert alle Freunde des Users mit dem angegebenen username
   * @param {string} username
   * @returns {[object]}
   */
  async getAllFriendsOfUser(username) {
    const communityLibrary = new CommunityLibrary();
    const result = await communityLibrary.getAllFriendsOfUser(username);
    const filtered = result.map((e) => {
      if (e.friend1 != username) {
        return e.friend1;
      } else {
        return e.friend2;
      }
    });
    return filtered;
  }
}

module.exports = Community;
