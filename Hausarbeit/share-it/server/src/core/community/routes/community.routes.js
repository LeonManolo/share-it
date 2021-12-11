const express = require("express");
const router = express.Router();
const pathToStaticFolder = require("../../../global/helpers/pathToStaticFolder");
const authCookieChecker = require("../../../supporting/auth/middleware/auth_cookie_checker");
//Controllers
const communityControllers = require("../controller/community.controllers");

/**
 * Route um einen Freund hinzuzufügen
 */
router.post("/add-friend", authCookieChecker, communityControllers.addFriend);

/**
 * Route um eine Freundschaftsanfrage anzunehmen
 */
router.post("/accept-friend/:id", authCookieChecker, communityControllers.acceptFriendRequest);

/**
 * Route um eine Freundschaftsanfrage abzulehnen
 */
router.post("/decline-friend/:id", authCookieChecker, communityControllers.declineFriendRequest);

/**
 * Route um alle Freunde des eingeloggten Users zu bekommen
 */
router.get(
  "/get-friends",
  authCookieChecker,
  communityControllers.getAllFriendsOfUser
);

/**
 * Route die die HTML-Seite mit der Community liefert
 */
router.get("/community",authCookieChecker , (req, res) => {
  res.sendFile(pathToStaticFolder("/html/community.html"));
});

/**
 * Route um alle offenen Freundschaftsanfragen zu erhalten
 */
router.get(
  "/open-friend-requests",
  authCookieChecker,
  communityControllers.getOpenFriendRequests
);

/**
 * Route die alle Usernames liefert, die eine bestimmte Zeichenketten enthalten
 */
router.get(
  "/usernames",
  authCookieChecker,
  communityControllers.getAllUsernamesContainingPhrase
);

router.get(
  "/all-users",
  authCookieChecker,
  communityControllers.getAllUsernamesExceptUser
);

// Routen werden exportiert
module.exports = router;
