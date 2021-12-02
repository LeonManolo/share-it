const express = require("express");
const router = express.Router();
const pathToStaticFolder = require("../../../global/helpers/pathToStaticFolder");
//Controllers
const communityControllers = require("../controller/community.controllers");

/**
 * Route die die HTML-Seite liefert in der Gegenständige ausgeliehen werden können
 */
router.post("/add-friend", communityControllers.addFriend);

module.exports = router;
