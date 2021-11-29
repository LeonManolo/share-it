const express = require("express");
const app = express();
const PORT = 8080;
const path = require("path");
const cookieParser = require("cookie-parser");
const pathToStaticFolder = require("./global/helpers/pathToStaticFolder")

// Eigene Routen
const authRouter = require("./supporting/auth/routes/auth.routes");

// Express middleware
app.use(express.static(pathToStaticFolder()));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRouter);

app.get("/", (req, res) => {
  const pathToFile = path.join(__dirname, "static", "html", "index.html");
  res.sendFile(pathToFile);
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
