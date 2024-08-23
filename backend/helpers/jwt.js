const jwt = require("jsonwebtoken");

const generateToken = (users) => {
  const { id, username, name } = users;

  return jwt.sign(
    {
      id,
      username,
      name,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};

module.exports = {
  generateToken,
  verifyToken
};
