"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Houses extends Model {
    static associate(models) {
      Houses.hasOne(models.Residents, { foreignKey: "house_id" });      
    }
  }
  Houses.init(
    {
      house_block: DataTypes.STRING,
      house_number: DataTypes.STRING,
      house_address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Houses",
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
    }
  );
  return Houses;
};
