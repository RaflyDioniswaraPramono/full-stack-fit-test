const { Users, Expenditures, TransactionHistories } = require("../models");
const { response } = require("../helpers/response");

class ExpenditureController {
  static async addExpenditure(req, res) {
    try {
      const { expenditure_need, expenditure_amount } = req.body;
      const endPoint = req.originalUrl;
      const user = req.user;

      const newExpenditure = await Expenditures.create({
        user_id: user?.id,
        expenditure_need,
        expenditure_amount,
        expenditure_date: new Date(),
      });

      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };

      if (newExpenditure) {
        await TransactionHistories.create({
          transaction_name: expenditure_need,
          transaction_type: "Pengeluaran",
          transaction_amount: +expenditure_amount,
          transaction_date: new Date(),
        });

        response({
          res,
          statusCode: 200,
          success: true,
          statusText: "OK",
          message: "Berhasil menambahkan pengeluaran!",
          data: newExpenditure,
          endPoint,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getExpenditures(req, res) {
    try {
      const endPoint = req.originalUrl;

      const expenditures = await Expenditures.findAll({
        include: [{ model: Users, attributes: ["name"] }],
        order: [["id", "DESC"]],
      });

      response({
        res,
        statusCode: 200,
        success: true,
        statusText: "OK",
        message: "Berhasil mengambil data pengeluaran!",
        data: expenditures,
        endPoint,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = {
  ExpenditureController,
};
