const path = require("path");

const pathToStaticFolder = (additionalRoute) => {
  let pathToFile = path.join(
    __dirname,
    "../../static",
  );

  if (additionalRoute && typeof additionalRoute === "string") {
    pathToFile += additionalRoute;
  }

  return pathToFile;
};

module.exports = pathToStaticFolder;
