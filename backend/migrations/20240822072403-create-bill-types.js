"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("BillTypes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      bill_type: {
        type: Sequelize.STRING,
      },
      bill_price: {
        type: Sequelize.BIGINT,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("BillTypes");
  },
};
