'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
  const statement = `CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    role varchar(100) NOT NULL,
    password varchar(100) NOT NULL,
    createdAt datetime DEFAULT CURRENT_TIMESTAMP,
    updatedAt datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`;
    await queryInterface.sequelize.query(statement)
  },
  async down(queryInterface) {
    const statement = `DROP TABLE users`;
    await queryInterface.sequelize.query(statement);
  }
};
