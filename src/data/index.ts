import { exit } from "node:process";
import db from "../config/db";

const clearDB = async () => {
  try {
    await db.sync({ force: true });
    console.log(`Datos eliminados correctamente`);
    exit(0);
  } catch (error) {
    console.log(`\n A Ocurrido un error: ${error} \n`);
    exit(1);
  }
};

if (process.argv[2] === "--clear") {
  clearDB();
}

console.log(`\n ${process.argv} \n`);
