"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BillTypes extends Model {
    static associate(models) {
      BillTypes.hasMany(models.Bills, { foreignKey: "bill_type_id" });
    }
  }
  BillTypes.init(
    {
      bill_type: DataTypes.STRING,
      bill_price: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: "BillTypes",
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
    }
  );
  return BillTypes;
};
