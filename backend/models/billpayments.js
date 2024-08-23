"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BillPayments extends Model {
    static associate(models) {
      BillPayments.belongsTo(models.Bills, { foreignKey: "bill_id" });
    }
  }
  BillPayments.init(
    {
      bill_id: DataTypes.INTEGER,
      payment_amount: DataTypes.BIGINT,
      payment_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "BillPayments",
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
    }
  );
  return BillPayments;
};
