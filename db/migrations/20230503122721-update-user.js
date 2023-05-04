'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, ) {
    const statement = `ALTER TABLE users
    RENAME COLUMN name TO firstName,
    ADD lastName VARCHAR(100) NOT NULL,
    ADD slug VARCHAR(200) NOT NULL`;
    await queryInterface.sequelize.query(statement)
  },
  async down (queryInterface, Sequelize) {
    const statement = `ALTER TABLE users
    RENAME COLUMN firstName TO name,
    DROP COLUMN lastName,
    DROP COLUMN slug`;
    await queryInterface.sequelize.query(statement);
  }
};
