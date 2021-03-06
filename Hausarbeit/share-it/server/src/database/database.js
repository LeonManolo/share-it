const ItemLibrary = require("./ItemLibrary");
const UserLibrary = require("./UserLibrary");
const CommunityLibrary = require("./CommunityLibrary");

//Initialisert alle SQLite Datenbanken
const initDatabases = () => {
  UserLibrary.init();
  CommunityLibrary.init();
  ItemLibrary.init();
};

module.exports = initDatabases;
