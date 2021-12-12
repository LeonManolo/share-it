// Bearbeitet von Niklas Hargarter, Leon-Manolo Stiller, Jaron Rieger, Max Ollech
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
      const result = await communityLibrary.updateFriendshipStatus(
        1,
        friendshipId
      );
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
      const result = await communityLibrary.updateFriendshipStatus(
        2,
        friendshipId
      );
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
   * Liefert alle Usernamen außer die Freunde eines Users der über
   * den username angegeben wurde
   * @param {string} username
   * @returns
   */
  async getAllUsernamesExceptFriends(username) {
    if (typeof username === "string") {
      const userLibrary = new UserLibrary();
      const result = await userLibrary.getAllUsernamesExceptUsername(username);
      const friendsOfUser = await communityLibrary.getAllFriendsOfUser(
        username
      );

      // Löscht alle Freunde aus der Liste
      const filtered = result.filter((name) => {
        return !friendsOfUser.some(
          (friend) => friend.username === name.username
        );
      });

      return filtered;
    } else {
      throw new Error(`username: ${username} is not a string!`);
    }
  }

  /**
   * Liefert alle Freunde des Users mit dem angegebenen username
   * @param {string} username
   * @returns {[object]}
   */
  async getAllFriendsOfUser(username) {
    const communityLibrary = new CommunityLibrary();
    const result = await communityLibrary.getAllFriendsOfUser(username);
    /*
    const filtered = result.map((e) => {
      if (e.friend1 != username) {
        return { username: e.friend1, imageUrl: e.profileImageUrl };
      } else {
        return { username: e.friend2, imageUrl: e.profileImageUrl };;
      }
    });
    */
    return result;
  }
}

module.exports = Community;
