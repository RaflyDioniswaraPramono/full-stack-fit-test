const bcrypt = require("bcryptjs");

const encryptPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

const decryptPassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

module.exports = {
  encryptPassword,
  decryptPassword,
};
