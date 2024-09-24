import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Role } from "../entities/Role";
import { Author } from "../entities/Author";
import { Artwork } from "../entities/Artwork";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "mydb.sqlite",
  synchronize: true,
  logging: false,
  entities: [User, Role, Author, Artwork],
  migrations: [],
  subscribers: [],
});