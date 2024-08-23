"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Residents extends Model {
    static associate(models) {
      Residents.belongsTo(models.Houses, { foreignKey: "house_id" });
      Residents.hasMany(models.Bills, { foreignKey: "resident_id" });
    }
  }
  Residents.init(
    {
      house_id: DataTypes.INTEGER,      
      resident_status: DataTypes.STRING,
      marital_status: DataTypes.STRING,
      full_name: DataTypes.STRING,
      identity_card_image: DataTypes.STRING,
      phone_number: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Residents",
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
    }
  );
  return Residents;
};
