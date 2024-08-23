"use strict";

const fs = require("fs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const parseData = JSON.parse(fs.readFileSync("./seeds/bill-type-seeds.json"));

    const payloads = [];

    parseData.map((datas) => {
      const { bill_type, bill_price } = datas;

      payloads.push({
        bill_type,
        bill_price,
      });
    });

    await queryInterface.bulkInsert("BillTypes", payloads, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("BillTypes", null, {});
  },
};
