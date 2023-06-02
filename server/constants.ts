import Entity from "../src/models/entity";

export enum Roles {
  ADMIN = "admin",
  SELLER = "seller",
  USER = "user"
}

export enum METHODS {
  GET = "GET",
  POST = "POST"
}

export const entity = new Entity();
