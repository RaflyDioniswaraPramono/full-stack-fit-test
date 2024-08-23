"use strict";

const fs = require("fs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const parseData = JSON.parse(fs.readFileSync("./seeds/house-seeds.json"));

    const payloads = [];

    parseData.map((datas) => {
      const { house_block, house_number, house_address } = datas;

      payloads.push({
        house_block,
        house_number,
        house_address,
      });
    });

    await queryInterface.bulkInsert("Houses", payloads, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Houses", null, {});
  },
};
