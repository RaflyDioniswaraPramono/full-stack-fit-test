const { verifyToken } = require("../helpers/jwt");
const { response } = require("../helpers/response");

const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return response({
      res,
      statusCode: 401,
      success: false,
      statusText: "Unauthorized",
      message: "Silahkan login terlebih dahulu!",
      endPoint: req.endPoint,
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return response({
      res,
      statusCode: 401,
      success: false,
      statusText: "Unauthorized",
      message: "Silahkan login terlebih dahulu!",
      endPoint: req.endPoint,
    });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;

    next();
  } catch (error) {
    return response({
      res,
      statusCode: 401,
      success: false,
      statusText: "Unauthorized",
      message: "Silahkan login terlebih dahulu!",
      endPoint: req.endPoint,
    });
  }
};

module.exports = {
  auth,
};
