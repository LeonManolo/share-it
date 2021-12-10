const UserLibrary = require("../../../database/UserLibrary");

let userLibrary;

class Profile {
    init() {
        userLibrary = new UserLibrary();
    }

    constructor() {
        this.init();
    }

    async updateProfileImg(imageUrl, username) {
        console.log("profile")
        const result = await userLibrary.updateUserImg(imageUrl, username);
        return result > 0;
    }
}



module.exports = Profile;
