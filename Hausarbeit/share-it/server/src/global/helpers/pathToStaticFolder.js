const path = require("path");

/**
 * Liefert die Route um Static Ordner
 * @param {string} additionalRoute
 * @returns {string}
 */
const pathToStaticFolder = (additionalRoute) => {
  let pathToFile = path.join(__dirname, "../../static");

  if (additionalRoute && typeof additionalRoute === "string") {
    pathToFile += additionalRoute;
  }

  return pathToFile;
};

module.exports = pathToStaticFolder;
