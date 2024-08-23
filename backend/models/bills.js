"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bills extends Model {
    static associate(models) {
      Bills.belongsTo(models.Residents, { foreignKey: "resident_id" });
      Bills.belongsTo(models.BillTypes, { foreignKey: "bill_type_id" });
      Bills.hasMany(models.BillPayments, { foreignKey: "bill_id" });
    }
  }
  Bills.init(
    {
      resident_id: DataTypes.INTEGER,
      bill_type_id: DataTypes.INTEGER,
      bill_date: DataTypes.DATE,
      bill_description: DataTypes.STRING,
      bill_status: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Bills",
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
    }
  );
  return Bills;
};
