const { Bills, Houses, Residents, BillTypes } = require("../models");
const { response } = require("../helpers/response");

class BillController {
  static async addBill(req, res) {
    try {
      const { resident_id, bill_type_id, bill_description } = req.body;
      const endPoint = req.originalUrl;

      const newBill = await Bills.create({
        resident_id,
        bill_type_id,
        bill_date: new Date(),
        bill_description,
        bill_status: "Belum Dibayar",
      });

      response({
        res,
        statusCode: 200,
        success: true,
        statusText: "OK",
        message: "Berhasil membuat tagihan!",
        data: newBill,
        endPoint,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async getBills(req, res) {
    try {
      const endPoint = req.originalUrl;

      const bills = await Bills.findAll({
        include: [{ model: Residents, include: [{ model: Houses }] }, { model: BillTypes }],
        order: [["id", "DESC"]],
      });

      if (bills.length == 0) {
        return response({
          res,
          statusCode: 404,
          success: false,
          statusText: "Not Found",
          message: "Tagihan tidak ditemukan!",
          endPoint,
        });
      }

      response({
        res,
        statusCode: 200,
        success: true,
        statusText: "OK",
        message: "Berhasil mengambil data tagihan!",
        data: bills,
        endPoint,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async getBill(req, res) {
    try {
      const id = req.params.id;
      const endPoint = req.originalUrl;

      const bill = await Bills.findOne({
        where: {
          id,
        },
      });

      if (!bill) {
        return response({
          res,
          statusCode: 404,
          success: false,
          statusText: "Not Found",
          message: "Tagihan tidak ditemukan!",
          endPoint,
        });
      }

      response({
        res,
        statusCode: 200,
        success: true,
        statusText: "OK",
        message: "Berhasil mengambil data tagihan!",
        data: bill,
        endPoint,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async getBillByResident(req, res) {
    try {
      const id = req.params.id;
      const endPoint = req.originalUrl;

      const bill = await Bills.findOne({
        where: {
          resident_id: id,
        },
      });

      if (!bill) {
        return response({
          res,
          statusCode: 404,
          success: false,
          statusText: "Not Found",
          message: "Tagihan tidak ditemukan!",
          endPoint,
        });
      }

      response({
        res,
        statusCode: 200,
        success: true,
        statusText: "OK",
        message: "Berhasil mengambil data tagihan!",
        data: bill,
        endPoint,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async getBillsByResidentAndMonth(req, res) {
    try {
      const { id, month } = req.params;

      const bills = await Bills.findAll({
        where: {
          resident_id: id,
          bill_date: month,
        },
      });

      if (bills.length == 0) {
        return response({
          res,
          statusCode: 404,
          success: false,
          statusText: "Not Found",
          message: "Tagihan tidak ditemukan!",
          endPoint,
        });
      }

      response({
        res,
        statusCode: 200,
        success: true,
        statusText: "OK",
        message: "Berhasil mengambil data tagihan!",
        data: bills,
        endPoint,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async getBillByMonth(req, res) {
    try {
      const month = req.params.month;

      const bill = await Bills.findOne({
        where: {
          bill_date: month,
        },
      });

      if (!bill) {
        return response({
          res,
          statusCode: 404,
          success: false,
          statusText: "Not Found",
          message: "Tagihan tidak ditemukan!",
          endPoint,
        });
      }

      response({
        res,
        statusCode: 200,
        success: true,
        statusText: "OK",
        message: "Berhasil mengambil data tagihan!",
        data: bill,
        endPoint,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = {
  BillController,
};
