"use strict";

const fs = require("fs");
const { encryptPassword } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const parseData = JSON.parse(fs.readFileSync("./seeds/user-seeds.json"));

    const payloads = [];

    parseData.map((datas) => {
      const { username, password, name } = datas;

      const encryptedPassword = encryptPassword(password);

      payloads.push({
        username,
        password: encryptedPassword,
        name,
      });
    });

    await queryInterface.bulkInsert("Users", payloads, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
