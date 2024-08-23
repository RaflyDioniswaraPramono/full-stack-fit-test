"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("TransactionHistories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      transaction_name: {
        type: Sequelize.STRING,
      },
      transaction_type: {
        type: Sequelize.STRING,
      },
      transaction_amount: {
        type: Sequelize.BIGINT,
      },
      transaction_date: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("TransactionHistories");
  },
};
