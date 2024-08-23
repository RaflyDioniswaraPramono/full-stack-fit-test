const { TransactionHistories } = require("../models");
const { response } = require("../helpers/response");
const { Op } = require("sequelize");
const { parseDateFromString } = require("../helpers/parse-date");

class TransactionController {
  static async getTransactions(req, res) {
    try {
      const transactions = await TransactionHistories.findAll();
      const endPoint = req.originalUrl;

      response({
        res,
        statusCode: 200,
        success: true,
        statusText: "OK",
        message: "Berhasil mengambil semua data transaksi!",
        data: transactions,
        endPoint,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async getTransactionsByMonth(req, res) {
    try {
      const { month } = req.params;
      const endPoint = req.originalUrl;

      const startDate = `2024-${month}-01T00:00:00Z`;
      const endDate = `2024-${month}-${new Date(2024, parseInt(month, 10), 0).getDate()}T23:59:59Z`;

      const transactions = await TransactionHistories.findAll({
        where: {
          transaction_date: {
            [Op.between]: [startDate, endDate],
          },
        },
        order: [["id", "DESC"]],
      });

      if (transactions.length === 0) {
        return response({
          res,
          statusCode: 404,
          success: false,
          statusText: "Not Found",
          message: `Data transaksi berdasarkan bulan ${month} tidak ditemukan!`,
          data: transactions,
          endPoint,
        });
      }

      return response({
        res,
        statusCode: 200,
        success: true,
        statusText: "OK",
        message: "Berhasil mengambil data transaksi berdasarkan bulan!",
        data: transactions,
        endPoint,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async getRecap(req, res) {
    try {
      const { year } = req.params;

      const startDateString = `Jumat, 01 Januari ${year}`;
      const endDateString = `Jumat, 31 Desember ${year}`;

      const startDate = parseDateFromString(startDateString);
      const endDate = parseDateFromString(endDateString);

      const incomes = await TransactionHistories.findAll({
        where: {
          transaction_type: "Pemasukan",
          transaction_date: {
            [Op.between]: [startDate.toISOString().slice(0, 10), endDate.toISOString().slice(0, 10)],
          },
        },
      });

      const expends = await TransactionHistories.findAll({
        where: {
          transaction_type: "Pengeluaran",
          transaction_date: {
            [Op.between]: [startDate.toISOString().slice(0, 10), endDate.toISOString().slice(0, 10)],
          },
        },
      });

      const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];

      const data = months.map((month) => ({
        name: month,
        incomeTotal: 0,
        expendTotal: 0,
      }));

      const getMonthIndex = (date) => date.getMonth();

      incomes.forEach((income) => {
        const date = new Date(income.transaction_date);
        const monthIndex = getMonthIndex(date);
        data[monthIndex].incomeTotal += income.transaction_amount || 0;
      });

      expends.forEach((expend) => {
        const date = new Date(expend.transaction_date);
        const monthIndex = getMonthIndex(date);
        data[monthIndex].expendTotal += expend.transaction_amount || 0;
      });

      res.status(200).json({
        success: true,
        data,
        message: "Berhasil mengambil rekap grafik tahunan!",
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = {
  TransactionController,
};
