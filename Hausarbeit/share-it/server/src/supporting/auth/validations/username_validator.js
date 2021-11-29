const usernameValidator = (username) => {
  let regex = new RegExp("[^A-Za-z0-9]+");
  console.log(username);
  return !regex.test(username);
};

module.exports = usernameValidator;
