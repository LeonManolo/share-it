const Profile = require("../services/profile");
const formidable = require("formidable");
const fs = require("fs");
const pathToStaticFolder = require("../../../global/helpers/pathToStaticFolder");


// Endpoint zum Profilbild updaten
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
    //TODO: filename auf den username ändern!
    var newpath = pathToStaticFolder(
      `/images/profile_images/${files.profile_image.originalFilename}`
    );
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

// Endpoint für "/login" zum Einloggen eines Users
const getProfile = async (req, res, next) => {};

// Endpoint um einen Account zu löschen
const deleteAccount = async (req, res, next) => {};

// Funktionen werden exportiert
module.exports = {
  editProfile,
  getProfile,
  deleteAccount,
};
