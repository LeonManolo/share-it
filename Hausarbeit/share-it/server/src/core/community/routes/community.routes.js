const express = require("express");
const router = express.Router();
const pathToStaticFolder = require("../../../global/helpers/pathToStaticFolder");
//Controllers
const communityControllers = require("../controller/community.controllers");

/**
 * Route um einen Freund hinzu zufügen
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
 * Route die die HTML-Seite mit der Community liefert
 */
router.get("/community", (req, res) => {
  res.sendFile(pathToStaticFolder("/html/community.html"));
});

/**
 * Route um alle offenen Freundschaftsanfragen zu erhalten
 */
router.get("/open-friend-requests", communityControllers.getOpenFriendRequests);

// Routen werden exportiert
module.exports = router;
