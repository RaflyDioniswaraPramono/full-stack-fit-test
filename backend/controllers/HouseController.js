const { Houses, Residents, Bills, BillTypes } = require("../models");
const { response } = require("../helpers/response");

class HouseController {
  static async addHouse(req, res) {
    try {
      const { house_block, house_number, house_address } = req.body;
      const endPoint = req.originalUrl;

      const newHouse = await Houses.create({
        house_block,
        house_number,
        house_address,
      });

      response({
        res,
        statusCode: 200,
        success: true,
        statusText: "OK",
        message: "Berhasil menambahkan rumah baru!",
        data: newHouse,
        endPoint,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async getHouses(req, res) {
    try {
      const endPoint = req.originalUrl;

      const houses = await Houses.findAll({
        include: [
          {
            model: Residents,
            include: [
              {
                model: Bills,
                where: {
                  bill_status: "Belum Dibayar",
                },
                include: [
                  {
                    model: BillTypes,
                  },
                ],
                required: false,
              },
            ],
            required: false,
          },
        ],
      });

      if (houses.length == 0) {
        return response({
          res,
          statusCode: 404,
          success: false,
          statusText: "Not Found",
          message: "Data rumah tidak ditemukan!",
          data: [],
          endPoint,
        });
      }

      response({
        res,
        statusCode: 200,
        success: true,
        statusText: "OK",
        message: "Berhasil mengambil data rumah!",
        data: houses,
        endPoint,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async getHouse(req, res) {
    try {
      const id = req.params.id;
      const endPoint = req.originalUrl;

      const house = await Houses.findOne({
        where: {
          id: id,
        },
        include: [{ model: Residents }],
      });

      response({
        res,
        statusCode: 200,
        success: true,
        statusText: "OK",
        message: "Berhasil mengambil data rumah!",
        data: house,
        endPoint,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async updateHouse(req, res) {
    try {
      const id = req.params.id;
      const { house_block, house_number, house_address } = req.body;
      const endPoint = req.originalUrl;

      const house = await Houses.findOne({
        where: {
          id: id,
        },
      });

      if (!house) {
        return response({
          res,
          statusCode: 404,
          success: false,
          statusText: "Not Found",
          message: "Data rumah tidak ditemukan!",
          data: {},
          endPoint,
        });
      }

      await Houses.update(
        {
          house_block,
          house_number,
          house_address,
        },
        {
          where: {
            id: id,
          },
        }
      );

      response({
        res,
        statusCode: 200,
        success: true,
        statusText: "OK",
        message: "Data rumah berhasil diedit!",
        data: {},
        endPoint,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteHouse(req, res) {
    try {
      const id = req.params.id;
      const endPoint = req.originalUrl;

      const house = await Houses.findOne({
        where: {
          id: id,
        },
      });

      if (!house) {
        return response({
          res,
          statusCode: 404,
          success: false,
          statusText: "Not Found",
          message: "Data rumah tidak ditemukan!",
          data: {},
          endPoint,
        });
      }

      await Houses.destroy({
        where: {
          id: id,
        },
      });

      response({
        res,
        statusCode: 200,
        success: true,
        statusText: "OK",
        message: "Data rumah berhasil dihapus!",
        data: {},
        endPoint,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = {
  HouseController,
};
