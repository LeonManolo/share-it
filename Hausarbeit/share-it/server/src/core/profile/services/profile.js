// Bearbeitet von Jaron Rieger, Max Ollech

const UserLibrary = require("../../../database/UserLibrary");

let userLibrary;

class Profile {
  init() {
    userLibrary = new UserLibrary();
  }

  constructor() {
    this.init();
  }

  /**
   * Aktualisiert die Profildaten des Nutzers
   * @param {string} imageUrl
   * @param {string} username
   * @returns {boolean} success
   */
  async updateProfileImg(imageUrl, username) {
    console.log("profile");
    const result = await userLibrary.updateUserImg(imageUrl, username);
    return result > 0;
  }

  /**
   * Liefert die Profil Daten des Nutzers
   * @param {*} username
   * @returns {object} user
   */
  async getProfile(username) {
    return await userLibrary.getProfile(username);
  }
}

module.exports = Profile;
