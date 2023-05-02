'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {   
    const statement = `CREATE TABLE products (
      id int NOT NULL AUTO_INCREMENT,
      productName varchar(255) NOT NULL,
      image varchar(255) DEFAULT NULL,
      property varchar(255) DEFAULT NULL,
      price int NOT NULL,
      description varchar(500) DEFAULT NULL,
      ingredients varchar(255) DEFAULT NULL,
      storeId int NOT NULL,
      createdAt datetime DEFAULT CURRENT_TIMESTAMP,
      updatedAt datetime DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      KEY storeId_idx (storeId),
      CONSTRAINT storeId FOREIGN KEY (storeId) REFERENCES stores (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`;

    await queryInterface.sequelize.query(statement)
  },
  async down(queryInterface) {
    const statement = `DROP TABLE products`;
    await queryInterface.sequelize.query(statement);
  }
};