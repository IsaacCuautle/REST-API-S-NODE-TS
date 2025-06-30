import express from "express";
import colors from "colors";
import SwaggerUi, { SwaggerUiOptions} from "swagger-ui-express";

import router from "./router";
import db from "./config/db";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";

// Conect to the database
export async function connectToDatabase() {
  try {
    await db.authenticate();
    db.sync();
    console.log(
      colors.cyan.bold(`Database connection has been established successfully.`)
    );
  } catch (error) {
    console.log(colors.red.bold("Unable to connect to the database"));
  }
}
connectToDatabase();

// Instancia de express
const server = express();

// Leer datos de formularios
server.use(express.json());

// router middleware
server.use("/api/products", router);

// Docs
server.use("/docs", SwaggerUi.serve, SwaggerUi.setup(swaggerSpec, swaggerUiOptions));

export default server;
