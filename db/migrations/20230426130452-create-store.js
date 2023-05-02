'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const statement = `CREATE TABLE stores (
      id int NOT NULL AUTO_INCREMENT,
      storeName varchar(45) NOT NULL,
      userId int NOT NULL, 
      createdAt datetime DEFAULT CURRENT_TIMESTAMP,
      updatedAt datetime DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      KEY userId_idx (userId),
      CONSTRAINT userId FOREIGN KEY (userId) REFERENCES users (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`;
    await queryInterface.sequelize.query(statement);
  },
  async down(queryInterface) {
    const statement = `DROP TABLE stores`;
    await queryInterface.sequelize.query(statement);
  }
};