import express from "express";

import router from "./router";
import db from "./config/db";

// Conect to the database
async function connectToDatabase() {
  try {
    await db.authenticate();
    db.sync();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.log(error);
    console.error("Unable to connect to the database:", error);
  }
}
connectToDatabase();

const server = express();

// router middleware
server.use("/api/products", router);

export default server;
