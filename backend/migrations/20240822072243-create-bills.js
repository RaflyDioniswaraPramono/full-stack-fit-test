"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Bills", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      resident_id: {
        type: Sequelize.INTEGER,
      },
      bill_type_id: {
        type: Sequelize.INTEGER,
      },
      bill_date: {
        type: Sequelize.DATE,
      },
      bill_description: {
        type: Sequelize.STRING,
      },
      bill_status: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Bills");
  },
};
