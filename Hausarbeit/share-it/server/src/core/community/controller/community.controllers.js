const Community = require("../services/community");

/**
 * Fügt einen Freund hinzu
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
//TODO: fromUser aus den Cookies lesen!
const addFriend = async (req, res, next) => {
  const fromUser = req.body.fromUser;
  const toUser = req.body.toUser;

  try {
    const community = new Community();
    const success = await community.sentFriendRequest(fromUser, toUser);
    console.log(`Friend result: ${result} for ${fromUser} and ${toUser}`);
    if (success) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.status(500);
    res.send(`Adding failed: ${e}`);
  }
};

/**
 * Liefert alle unbeantworteten Freundesanfragen für den jeweiligen User (username)
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getOpenFriendRequests = async (req, res, next) => {
  const username = "Dein Vater";
  const community = new Community();
  const friendRequests = await community.getAllOpenFriendRequestsForUser(
    username
  );
  res.status(200);
  res.json(friendRequests);
};

/**
 * Akzeptiert eine Freundschaftsanfrage anhand der id des Freundschaftseintrages
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const acceptFriendRequest = async (req, res, next) => {
  const friendshipId = parseInt(req.params.id);
  const community = new Community();
  const success = community.acceptFriendRequest(friendshipId);
  if (success) {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
};

/**
 * Lehnt eine Freundschaftsanfrage anhand der id des Freundschaftseintrages ab
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const declineFriendRequest = async (req, res, next) => {
  const friendshipId = parseInt(req.params.id);
  const community = new Community();
  const success = community.declineFriendRequest(friendshipId);
  if (success) {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
};

/**
 * Liefert alle usernames die die "phrase" enthalten.
 * Phrase muss hierbei als query Parameter gesetzt werden
 * Bsp: https://example.com/usernames?phrase=abcdefg
 * => Liefert alle usernames die "abcdefg" enthalten
 * @param {*} req
 * @param {*} res
 */
const getAllUsernamesContainingPhrase = async (req, res) => {
  const username = "Dein Vater";
  const phrase = req.query.phrase;
  if (!phrase) {
    phrase = "";
  }
  const community = new Community();
  const result = community.getAllUsernamesContainingPhrase(phrase);
  const filtered = result.filter((value) => value !== username);
  res.json(filtered);
};

// Funktionen werden exportiert
module.exports = {
  addFriend,
  getOpenFriendRequests,
  acceptFriendRequest,
  declineFriendRequest,
  getAllUsernamesContainingPhrase,
};
