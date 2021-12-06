const express = require("express");
const router = express.Router();
const pathToStaticFolder = require("../../../global/helpers/pathToStaticFolder");
//Controllers
const communityControllers = require("../controller/community.controllers");

/**
 * Route um einen Freund hinzu zufügen
 */
router.post("/add-friend", communityControllers.addFriend);

router.post("/accept-friend/:id");

router.post("/decline-friend/:id");

/**
 * Route um alle offenen Freundschaftsanfragen zu erhalten
 */
router.get("/open-friend-requests", communityControllers.getOpenFriendRequests);

module.exports = router;
