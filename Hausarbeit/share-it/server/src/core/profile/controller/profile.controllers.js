const Profile = require("../services/profile");
const formidable = require("formidable");
const fs = require("fs");
const pathToStaticFolder = require("../../../global/helpers/pathToStaticFolder");

// Endpoint für "/register"
const editProfile = async (req, res, next) => {
  const form = formidable({});

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    const oldpath = files.profile_image.filepath;
    //TODO: filename auf den username ändern!
    var newpath = pathToStaticFolder(
      `/images/profile_images/${files.profile_image.originalFilename}`
    );
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
      res.end();
    });
  });
};

// Endpoint für "/login" zum einloggen eines users
const getProfile = async (req, res, next) => {};

// Endpoint um ein Account zu löschen
const deleteAccount = async (req, res, next) => {};

// Funktionen werden exportiert
module.exports = {
  editProfile,
  getProfile,
  deleteAccount,
};
