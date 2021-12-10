const Community = require("../services/community");

/**
 * Fügt einen Freund hinzu. Dafür muss als query Parameter der Freund der
 * eine Freundschaftsanfrage erhalten soll angegeben werden.
 * Bsp:
 * http://example.com/add-friend?toUser=abc
 * => sendet eine Freundschaftsanfrage an den User mit dem username "abc"
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const addFriend = async (req, res, next) => {
  const fromUser = req.username;
  const toUser = req.query.toUser;

  try {
    const community = new Community();
    const success = await community.sentFriendRequest(fromUser, toUser);
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
  try {
    const username = req.username;
    const community = new Community();
    const friendRequests = await community.getAllOpenFriendRequestsForUser(
      username
    );
    res.json(friendRequests);
  } catch (e) {
    res.sendStatus(500);
  }
};

/**
 * Akzeptiert eine Freundschaftsanfrage anhand der id des Freundschaftseintrages
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const acceptFriendRequest = async (req, res, next) => {
  try {
    const friendshipId = parseInt(req.params.id);
    const community = new Community();
    const success = await community.acceptFriendRequest(friendshipId);
    if (success) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.sendStatus(500);
  }
};

/**
 * Lehnt eine Freundschaftsanfrage anhand der id des Freundschaftseintrages ab
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const declineFriendRequest = async (req, res, next) => {
  try {
    const friendshipId = parseInt(req.params.id);
    const community = new Community();
    const success = await community.declineFriendRequest(friendshipId);
    if (success) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.sendStatus(500);
  }
};

/**
 * Endpoint der alle Freunde des eingeloggten Users liefert
 * @param {*} req 
 * @param {*} res 
 */
const getAllFriendsOfUser = async (req, res) => {
  try {
    const username = req.username;
    const community = new Community();
    const result = await community.getAllFriendsOfUser(username);
    res.json(result);
  } catch (e) {
    res.sendStatus(500);
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
const getAllUsernamesContainingPhraseExceptUser = async (req, res) => {
  try {
    const username = req.username;
    const phrase = req.query.phrase;
    if (!phrase) {
      phrase = "";
    }
    const community = new Community();
    const result = await community.getAllUsernamesContainingPhraseExceptUser(
      phrase,
      username
    );
    const filtered = result.filter((value) => value !== username);
    res.json(filtered);
  } catch (e) {
    res.sendStatus(500);
  }
};

/**
 * Endpoint der alle Usernamen liefert die nicht mit dem eingeloggten User befreundet sind.
 * @param {*} req
 * @param {*} res
 */
const getAllUsernamesExceptUser = async (req, res) => {
  try {
    const username = req.username;
    const community = new Community();
    const result = await community.getAllUsernamesExceptFriends(username);
    const filtered = result.filter((value) => value !== username);

    res.json(filtered);
  } catch (e) {
    res.sendStatus(500);
  }
};

// Funktionen werden exportiert
module.exports = {
  addFriend,
  getOpenFriendRequests,
  acceptFriendRequest,
  declineFriendRequest,
  getAllUsernamesContainingPhrase: getAllUsernamesContainingPhraseExceptUser,
  getAllFriendsOfUser,
  getAllUsernamesExceptUser,
};
