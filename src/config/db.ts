import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
const db = new Sequelize(process.env.EXTERNAL_DB_URL!, {
  dialectOptions: {
    ssl: {
      require: false,
    },
  },
});

export default db;
