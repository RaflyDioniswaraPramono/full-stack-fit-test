"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Expenditures extends Model {
    static associate(models) {
      Expenditures.belongsTo(models.Users, { foreignKey: "user_id" });
    }
  }
  Expenditures.init(
    {
      user_id: DataTypes.INTEGER,
      expenditure_need: DataTypes.STRING,
      expenditure_amount: DataTypes.BIGINT,
      expenditure_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Expenditures",
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
    }
  );
  return Expenditures;
};
