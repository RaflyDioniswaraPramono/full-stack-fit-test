"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TransactionHistories extends Model {
    static associate(models) {
      // define association here
    }
  }
  TransactionHistories.init(
    {
      transaction_name: DataTypes.STRING,
      transaction_type: DataTypes.STRING,
      transaction_amount: DataTypes.BIGINT,
      transaction_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "TransactionHistories",
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
    }
  );
  return TransactionHistories;
};
