const Community = require("../services/community");

const addFriend = async (req, res, next) => {
  const fromUser = req.body.fromUser;
  const toUser = req.body.toUser;

  try {
    const community = new Community();
    const result = await community.sentFriendRequest(fromUser, toUser);
    console.log(`Friend result: ${result} for ${fromUser} and ${toUser}`);
    res.sendStatus(200);
  } catch (e) {
    res.status(500);
    res.send(`Adding failed: ${e}`);
  }
};

const getOpenFriendRequests = async (req, res, next) => {

}

// Funktionen werden exportiert
module.exports = {
  addFriend,
  getOpenFriendRequests,
};
