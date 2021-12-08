const express = require("express");
const router = express.Router();
const pathToStaticFolder = require("../../../global/helpers/pathToStaticFolder");
//Controllers
const communityControllers = require("../controller/community.controllers");

/**
 * Route um einen Freund hinzuzufügen
 */
router.post("/add-friend", communityControllers.addFriend);

/**
 * Route um eine Freundschaftsanfrage anzunehmen
 */
router.post("/accept-friend/:id", communityControllers.acceptFriendRequest);

/**
 * Route um eine Freundschaftsanfrage abzulehnen
 */
router.post("/decline-friend/:id", communityControllers.declineFriendRequest);

/**
 * Route um alle Freunde des eingeloggten Users zu bekommen
 */
router.get("/get-friends", communityControllers.getAllFriendsOfUser);

/**
 * Route die die HTML-Seite mit der Community liefert
 */
router.get("/community", (req, res) => {
  res.sendFile(pathToStaticFolder("/html/community.html"));
});

/**
 * Route um alle offenen Freundschaftsanfragen zu erhalten
 */
router.get("/open-friend-requests", communityControllers.getOpenFriendRequests);

/**
 * Route die alle Usernames liefert, die eine bestimmte Zeichenketten enthalten
 */
router.get("/usernames", communityControllers.getAllUsernamesContainingPhrase);

// Routen werden exportiert
module.exports = router;
