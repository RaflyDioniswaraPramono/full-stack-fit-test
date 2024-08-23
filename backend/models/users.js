"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {    
    static associate(models) {
      Users.hasMany(models.Expenditures, { foreignKey: "user_id" });
    }
  }
  Users.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
    }
  );
  return Users;
};
