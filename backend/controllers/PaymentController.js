const { Bills, BillPayments, Residents, Houses, TransactionHistories } = require("../models");
const { response } = require("../helpers/response");

class PaymentController {
  static async payment(req, res) {
    try {
      const { bill_id, payment_amount } = req.body;
      const endPoint = req.originalUrl;

      const bill = await Bills.findOne({
        where: {
          id: bill_id,
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

      const newPayment = await BillPayments.create({
        bill_id,
        payment_amount,
        payment_date: new Date(),
      });

      if (newPayment) {
        await Bills.update(
          {
            bill_status: "Lunas",
          },
          {
            where: {
              id: bill_id,
            },
          }
        );

        const options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };

        await TransactionHistories.create({
          transaction_name: "Pembayaran Iuran",
          transaction_type: "Pemasukan",
          transaction_amount: +payment_amount,
          transaction_date: new Date(),
        });

        response({
          res,
          statusCode: 200,
          success: true,
          statusText: "OK",
          message: "Berhasil membayar tagihan!",
          data: newPayment,
          endPoint,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getPayments(req, res) {
    try {
      const payments = await BillPayments.findAll({
        include: [{ model: Bills, include: [{ model: Residents, include: [{ model: Houses }] }] }],
      });
      const endPoint = req.originalUrl;

      response({
        res,
        statusCode: 200,
        success: true,
        statusText: "OK",
        message: "Berhasil mengambil data pembayaran!",
        data: payments,
        endPoint,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = {
  PaymentController,
};
