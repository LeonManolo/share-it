// Bearbeitet von Jaron Rieger, Max Ollech
const Profile = require("../services/profile");
const formidable = require("formidable");
const fs = require("fs");
const pathToStaticFolder = require("../../../global/helpers/pathToStaticFolder");

// Endpoint zum Profilbild updaten
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const editProfile = async (req, res, next) => {
  const form = formidable({});
  let username = req.username;
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.sendStatus(500);
      return;
    }
    const oldpath = `${files.image.filepath}`;
    const path = `/images/profile_images/${files.image.newFilename}.png`;
    var newpath = pathToStaticFolder(path);
    fs.rename(oldpath, newpath, async function (err) {
      if (err) {
        console.log("Img renaming failed");
        res.sendStatus(500);
        return;
      }
      try {
        const profile = new Profile();
        let imageUrl = `http://localhost:8080${path}`;
        let success = await profile.updateProfileImg(imageUrl, username);
        if (success){
          res.sendStatus(200);
        } else {
          res.sendStatus(403);
        }
      } catch (e){
        res.status(500);
        res.send(`Update failed: ${e}`);
      }
    });
  });
};

// Endpoint für um die Profil Daten des Nutzers geliefert zu bekommen
const getProfile = async (req, res, next) => {
  const username = req.username;
  try {
    const profile = new Profile();
    const user = await profile.getProfile(username);
    res.json(user);
  } catch (e){
    res.sendStatus(500);
  }
};

// Endpoint um einen Account zu löschen
const deleteAccount = async (req, res, next) => {};

// Funktionen werden exportiert
module.exports = {
  editProfile,
  getProfile,
  deleteAccount,
};
