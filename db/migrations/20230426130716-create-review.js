'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const statement = `CREATE TABLE reviews (
      id int NOT NULL AUTO_INCREMENT,
      reviewText varchar(1000) NOT NULL,
      rating int DEFAULT NULL,
      storeId int NOT NULL,
      userId int NOT NULL,
      createdAt datetime DEFAULT CURRENT_TIMESTAMP,
      updatedAt datetime DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      KEY storeId_fk (storeId),
      KEY userId_fk (userId),
      CONSTRAINT storeId_fk FOREIGN KEY (storeId) REFERENCES stores (id),
      CONSTRAINT userId_fk FOREIGN KEY (userId) REFERENCES users (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`;
    await queryInterface.sequelize.query(statement);
  },
  async down(queryInterface) {
    const statement = `DROP TABLE reviews`;
    await queryInterface.sequelize.query(statement);
  }
};

