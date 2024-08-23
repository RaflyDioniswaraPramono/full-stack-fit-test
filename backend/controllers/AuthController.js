const { Users } = require("../models");
const { response } = require("../helpers/response");
const { generateToken } = require("../helpers/jwt");
const { encryptPassword, decryptPassword } = require("../helpers/bcrypt");

class AuthController {
  static async signIn(req, res) {    
    try {
      const { username, password } = req.body;
      const endPoint = req.originalUrl;

      const user = await Users.findOne({
        where: {
          username,
        },
      });

      if (!user) {
        return response({
          res,
          statusCode: 404,
          success: false,
          statusText: "Not Found",
          message: "Username tidak terdaftar!",
          endPoint,
        });
      }

      const encoded = decryptPassword(password, user.password);

      if (!encoded) {
        return response({
          res,
          statusCode: 401,
          success: false,
          statusText: "Unauthorized",
          message: "Password yang anda masukkan salah!",
          endPoint,
        });
      }

      const token = generateToken(user);

      response({
        res,
        statusCode: 200,
        success: true,
        statusText: "OK",
        message: "Sign in berhasil!",
        data: token,
        endPoint,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async signUp(req, res) {
    try {
      const { username, password, confPassword, name } = req.body;
      const endPoint = req.originalUrl;

      const findUsername = await Users.findOne({
        where: {
          username,
        },
      });

      if (findUsername) {
        return response({
          res,
          statusCode: 409,
          success: false,
          statusText: "Conflict",
          message: "Username telah dipakai, gunakan username yang lain!",
          endPoint,
        });
      }

      if (password !== confPassword) {
        return response({
          res,
          statusCode: 400,
          success: false,
          statusText: "Bad Request",
          message: "Password dan konfirmasi password tidak sama!",
          endPoint,
        });
      }

      const encryptedPassword = encryptPassword(password);

      const newUser = await Users.create({
        username,
        password: encryptedPassword,
        name,
      });

      const token = generateToken(newUser);

      response({
        res,
        statusCode: 200,
        success: true,
        statusText: "OK",
        message: "Sign up berhasil!",
        data: token,
        endPoint,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = {
  AuthController,
};
