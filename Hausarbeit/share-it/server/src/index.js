const express = require("express");
const app = express();
const PORT = 8080;
const path = require("path");
const cookieParser = require("cookie-parser");
const pathToStaticFolder = require("./global/helpers/pathToStaticFolder");

//test
const variable = {};

// Eigene Routen werden importiert
const authRouter = require("./supporting/auth/routes/auth.routes");
const sharingRouter = require("./core/sharing/routes/sharing.routes");
const communityRouter = require("./core/community/routes/community.routes");
const profileRouter = require("./core/profile/routes/profile.routes");

// Datenbanken werden initialisiert
const initDatabases = require("./database/database");
initDatabases();

// Express middleware
app.use(express.static(pathToStaticFolder()));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Eigene Router werden eingebunden
// (WICHTIG! Erst Express middleware einbinden, vor eigener mw!)
app.use("/", authRouter);
app.use("/", sharingRouter);
app.use("/", communityRouter);

// Startseite wird als HTML geliefert
app.get("/", (req, res) => {
  const pathToFile = path.join(__dirname, "static", "html", "index.html");
  res.sendFile(pathToFile);
});

// Server wird gestartet
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
// Neuer Test
