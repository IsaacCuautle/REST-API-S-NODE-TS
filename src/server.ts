import express from "express";
import colors from "colors";

import router from "./router";
import db from "./config/db";

// Conect to the database
async function connectToDatabase() {
  try {
    await db.authenticate();
    db.sync();
    console.log(
      colors.cyan.bold(`Database connection has been established successfully.`)
    );
  } catch (error) {
    console.log(error);
    console.error(colors.bgRed(`Unable to connect to the database: ${error}`));
  }
}
connectToDatabase();

// Instancia de express
const server = express();

// Leer datos de formularios
server.use(express.json())

// router middleware
server.use("/api/products", router);

export default server;
