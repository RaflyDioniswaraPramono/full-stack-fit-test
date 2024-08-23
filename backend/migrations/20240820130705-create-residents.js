"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Residents", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      house_id: {
        type: Sequelize.INTEGER,
      },
      resident_status: {
        type: Sequelize.STRING,
      },
      marital_status: {
        type: Sequelize.STRING,
      },
      full_name: {
        type: Sequelize.STRING,
      },
      identity_card_image: {
        type: Sequelize.STRING,
      },
      phone_number: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Residents");
  },
};
