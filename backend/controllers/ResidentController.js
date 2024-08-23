const { Residents, Houses, Bills, BillTypes } = require("../models");
const { response } = require("../helpers/response");

class ResidentController {
  static async addResident(req, res) {
    try {
      const { house_id, resident_status, marital_status, full_name, phone_number } = req.body;
      const identity_card_image = req.file.path;
      const endPoint = req.originalUrl;

      const isResidents = await Residents.findOne({
        where: {
          house_id,
        },
      });

      if (isResidents) {
        response({
          res,
          statusCode: 409,
          success: false,
          statusText: "Conflict",
          message: "Rumah telah dihuni oleh orang lain!",
          data: {},
          endPoint,
        });
      }

      const phoneNumber = await Residents.findOne({
        where: {
          phone_number,
        },
      });

      if (phoneNumber) {
        return response({
          res,
          statusCode: 409,
          success: false,
          statusText: "Conflict",
          message: "Nomor telepon tidak boleh sama!",
          data: {},
          endPoint,
        });
      }

      if (!req.file) {
        return response({
          res,
          statusCode: 400,
          success: false,
          statusText: "Bad Request",
          message: "Gambar harus berupa .jpg, .jpeg, atau .png",
          data: {},
          endPoint,
        });
      }

      const newResident = await Residents.create({
        house_id,
        resident_status,
        marital_status,
        full_name,
        identity_card_image,
        phone_number,
      });

      response({
        res,
        statusCode: 200,
        success: true,
        statusText: "OK",
        message: "Berhasil menambahkan penghuni baru!",
        data: newResident,
        endPoint,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async getResidents(req, res) {
    try {
      const endPoint = req.originalUrl;

      const residents = await Residents.findAll({
        include: [{ model: Houses }, { model: Bills, include: [{model: BillTypes}] }],
      });

      if (residents.length == 0) {
        return response({
          res,
          statusCode: 404,
          success: false,
          statusText: "Not Found",
          message: "Data penghuni masih kosong!",
          data: [],
          endPoint,
        });
      }

      response({
        res,
        statusCode: 200,
        success: true,
        statusText: "OK",
        message: "Berhasil mengambil data penghuni!",
        data: residents,
        endPoint,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async getResident(req, res) {
    try {
      const id = req.params.id;
      const endPoint = req.originalUrl;

      const resident = await Residents.findOne({
        where: {
          id,
        },
      });

      if (!resident) {
        return response({
          res,
          statusCode: 404,
          success: false,
          statusText: "Not Found",
          message: "Data penghuni tidak ditemukan!",
          endPoint,
        });
      }

      response({
        res,
        statusCode: 200,
        success: true,
        statusText: "OK",
        message: "Berhasil mengambil data penghuni!",
        data: resident,
        endPoint,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async updateResident(req, res) {
    try {
      const id = req.params.id;
      const { house_id, resident_status, marital_status, full_name, phone_number } = req.body;
      const identity_card_image = req.file.path;
      const endPoint = req.originalUrl;

      const resident = await Residents.findOne({
        where: {
          id,
        },
      });

      if (!resident) {
        return response({
          res,
          statusCode: 404,
          success: false,
          statusText: "Not Found",
          message: "Data penghuni tidak ditemukan!",
          endPoint,
        });
      }

      await Residents.update(
        {
          house_id,
          resident_status,
          marital_status,
          full_name,
          identity_card_image,
          phone_number,
        },
        {
          where: {
            id,
          },
        }
      );

      response({
        res,
        statusCode: 200,
        success: true,
        statusText: "OK",
        data: {},
        endPoint,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteResident(req, res) {
    try {
      const id = req.params.id;

      const resident = await Residents.findOne({
        where: {
          id,
        },
      });

      if (!resident) {
        return response({
          res,
          statusCode: 404,
          success: false,
          statusText: "Not Found",
          message: "Data penghuni tidak ditemukan!",
          endPoint,
        });
      }

      await Residents.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = {
  ResidentController,
};
