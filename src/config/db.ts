import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();
const db = new Sequelize(process.env.EXTERNAL_DB_URL!, {
  models: [__dirname + "/../models/**/*.ts"],

  dialectOptions: {
    ssl: {
      require: false,
    },
  },

  logging: false,
});

export default db;
